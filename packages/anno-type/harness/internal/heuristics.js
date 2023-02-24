import typescript from 'typescript';
import { createFSBackedSystem, createVirtualTypeScriptEnvironment } from '@typescript/vfs';
import { queryChunkMatcher, annotationQueryLineMatcher, lineMatcher, quoteKeyword } from './twoslash/annotate.js';

class Range {
    /** 
     * First range element index 
     * @type {number} 
     */
    start;

    /** 
     * First non-range element index 
     * @type {number} 
     */
    end;
}

class SourceRange extends Range {
    /** @readonly */
    static sourceText = Symbol(`${SourceRange.name}.sourceText`);
    static { Object.freeze(SourceRange); }
    /** @type {string | undefined} */
    text;
}

class SourceLineRange extends SourceRange {
    /** @type {number | undefined} */
    line;
    /** @type {number | undefined} */
    character;
}

class SourceLine extends SourceRange {
    /** @type {ReturnType<typeof annotationQueryLineMatcher.exec>['groups'] | undefined} */
    annotation;
    // /** @type {string | undefined} */
    // goal;
}

/** @typedef {{[line: number]: SourceLine} & Partial<Range>} SourceLines */

class SourceAnnotationBlock extends SourceRange {
    /** @type {SourceLines} */
    lines;
    /** @type {ReturnType<typeof queryChunkMatcher.exec>['groups'] | undefined} */
    query;
    /** @type {SourceAnnotationTarget} */
    target;
}

class SourceAnnotationTarget extends SourceLineRange {
    /** @type {string | undefined} */
    name;
    /** @type {string | undefined} */
    dottedName;
    /** @type {readonly typescript.DefinitionInfo[] | typescript.DefinitionInfo[] | undefined} */
    definitions;
    /** @type {Partial<Record<'errors'|'warnings'|'suggestions'|'messages',SourceDiagnostic[]>> | undefined} */
    diagnostics;
    /** @type {Partial<Omit<typescript.QuickInfo, 'textSpan'|'displayParts'|'documentation'|'tags'> & {display: SymbolDisplayPartTokens, displayText?: string, documentation: SymbolDisplayPartTokens, documentationText?: string, tags: Array<Record<string, SymbolDisplayPartTokens>>}>} */
    details;
}

class SourceDiagnostic extends SourceRange {
    /** @type {number} */
    code;
    /** @type {string | TextTokens} */
    message;
    /** @type {number} */
    line;
    /** @type {number} */
    character;
    /** @optional @type {boolean | undefined} */
    reportsUnnecessary;
    /** @optional @type {boolean | undefined} */
    reportsDeprecated;
}

/** 
 * @template {string} [K=string]
 * @extends {Array<{[name in K]: string}>}
 */
class TextTokens extends Array { }

/** @extends {TextTokens<keyof typeof typescript.SymbolDisplayPartKind>} */
class SymbolDisplayPartTokens extends TextTokens {
    /** @param {...(typescript.SymbolDisplayPart | typescript.SymbolDisplayPart[])} symbolDisplayParts */
    static fromSymbolDisplayParts(...symbolDisplayParts) {
        const symbolDisplayPartsArray = symbolDisplayParts.flat();
        const textTokens = new SymbolDisplayPartTokens(symbolDisplayPartsArray.length);
        for (const [index, { kind, text }] of symbolDisplayPartsArray.entries())
            textTokens[index] = /** @type {SymbolDisplayPartTokens[number]} */({ [kind]: text });
        return textTokens;
    }
}

/** 
 * @param {{targetLineIndex: number, targetOffset: number, targetPosition: number, previousLine: SourceLine | undefined, currentLineText: string}} details
 * @param {string} [specifics]
 */
const formatInvalidQueryErrorMessage = ({ targetLineIndex, targetOffset, targetPosition, previousLine, currentLineText }, specifics) => [
    `Invalid query target on line ${targetLineIndex + 1} column ${targetOffset + 1} position ${targetPosition}.`,
    previousLine ? `░░${previousLine.text?.replace?.(/\r?\n$/, '') ?? ''}` : undefined,
    currentLineText ? `░░${currentLineText.replace(/\r?\n$/, '')}` : targetOffset >= 0 ? `░░${' '.repeat(targetOffset)}^?}` : undefined,
    specifics || undefined,
].filter(Boolean).join('\n');

export async function analyzeSourceText(sourceText, options) {

    // TODO: Find a way to make sure all paths are relatively obfuscated so they don't end up leaking.
    // SEE: https://github.com/microsoft/TypeScript-Website/tree/v2/packages/typescript-vfs#when-working-with-node

    /** @type {NodeJS.Require} */
    const projectRequire = options?.require;

    const projectRoot = options?.packageDetails?.packageRoot ?? projectRequire?.resolve?.('./package.json').replace(/package\.json$/i, '');

    /** @type {typeof typescript} */
    const projectTypeScript = projectRequire?.('typescript') ?? typescript;

    const defaultCompilerOptions = projectTypeScript.getDefaultCompilerOptions();

    /** @type {typescript.CompilerOptions} */
    const projectCompilerOptions = {

        ...defaultCompilerOptions,

        // TODO: See how we would bring in the actual project's tsconfig.json settings.

        target: typescript.ScriptTarget.ESNext,
        module: typescript.ModuleKind.ESNext,
        moduleResolution: typescript.ModuleResolutionKind.NodeNext,
        allowJs: true,
        checkJs: true,
        noEmit: true,
        removeComments: false,
        allowUnreachableCode: false,
        noEmitOnError: false,
        // strict: true, 
        // esModuleInterop: true, 
        // resolveJsonModule: true,
        // lib: ['esnext'],
    };

    /** @type {Map<string, string>} */
    const projectFSMap = new Map();

    // console.log({ sourceText, options, projectRoot });

    const fileName = options.sourceDetails.path;

    /** @type {typescript.CompilerOptions} */
    const fileCompilerOptions = {
        ...projectCompilerOptions,
        // TODO: Consider if also using TypeScript's root path checking is redundant or worthwhile.
        rootDir: options.sourceDetails.rootPath,
    };
    /** @type {typescript.CompilerOptions} */
    const inlineCompilerOptions = {};
    const inlineParameters = {};
    const leadingAnnotations = /^(?:\s*\/\/\s*@[a-z]+[^\n]*?\n)+/i.exec(sourceText)?.[0] ?? undefined;

    if (leadingAnnotations) {
        const commandLine = [];

        for (const { groups: { parameter, body } } of annotationQueryLineMatcher[Symbol.matchAll](leadingAnnotations)) {
            if (parameter && body && /^@[a-z]+(?:[A-Z]+[a-z]*)*$/.test(parameter)) {
                const value = body?.trim().replace(/^['"]|['"]$/g, '').replace(/[ \t,]+/g, ',') ?? 'true';
                inlineParameters[parameter.slice(1)] = value;
                value == null || commandLine.push(`--${parameter.slice(1)}`, value);
            }
        }

        const parsedCommandLine = commandLine.length > 0 ? projectTypeScript.parseCommandLine(commandLine) : undefined;

        parsedCommandLine?.options && Object.assign(fileCompilerOptions, Object.assign(inlineCompilerOptions, parsedCommandLine.options));
        // console.log({ leadingAnnotations, parameters: inlineParameters, commandLine, inlineCompilerOptions });
    }

    projectFSMap.set(fileName, sourceText);

    const system = createFSBackedSystem(
        // TODO: Consider how to best handle reading files from disk.
        projectFSMap,
        // TODO: Consider how to best handle node_modules.
        projectRoot,
        // TODO: Decide on how to handle the TypeScript versions.
        projectTypeScript
    );
    const env = createVirtualTypeScriptEnvironment(system, [...projectFSMap.keys()], projectTypeScript, fileCompilerOptions);
    const program = env.languageService.getProgram();

    if (!program)
        throw new Error(`Unable to create program for source text: ${fileName}`);

    const programDetails = {
        currentDirectory: program.getCurrentDirectory(),
        rootFileNames: program.getRootFileNames(),
        optionsDiagnostics: program.getOptionsDiagnostics(),
        configFileParsingDiagnostics: program.getConfigFileParsingDiagnostics(),
        globalDiagnostics: program.getGlobalDiagnostics(),
        compilerOptions: program.getCompilerOptions(),
        projectReferences: program.getProjectReferences(),
        resolvedProjectReferences: program.getResolvedProjectReferences(),
    };

    const sourceFile = program.getSourceFile(fileName);

    if (!sourceFile)
        throw new Error(`Unable to get source file for source text: ${fileName}`);

    const fileSourceText = sourceFile.text;
    const fileLineStarts = sourceFile.getLineStarts();
    const fileDiagnostics = [
        ...env.languageService.getSemanticDiagnostics(fileName),
        ...env.languageService.getSyntacticDiagnostics(fileName),
    ];

    const fileDiagnosticsByType = {
        errors: /** @type {SourceDiagnostic[]} */([]),
        warnings: /** @type {SourceDiagnostic[]} */([]),
        suggestions: /** @type {SourceDiagnostic[]} */([]),
        messages: /** @type {SourceDiagnostic[]} */([]),
    };

    /** @type {Partial<{[position:number]: SourceAnnotationTarget['diagnostics']}>} */
    const fileDiagnosticsByPosition = {};

    const fileSpansByType = {
        multilineComments: /** @type {typescript.TextSpan[]} */ ([]),
    };

    /** @type {{[line: number]: SourceAnnotationBlock}} */
    const fileAnnotationBlocks = {};

    const fileDetails = {
        fileName,
        inlineCompilerOptions,
        inlineParameters,
        sourceFile,
        sourceText: fileSourceText,
        lineStarts: fileLineStarts,
        spans: fileSpansByType,
        diagnostics: fileDiagnosticsByType,
        annotationBlocks: fileAnnotationBlocks,
    };

    Object.defineProperties(fileDetails, {
        sourceText: { value: fileDetails.sourceText, enumerable: false },
        sourceFile: { value: fileDetails.sourceFile, enumerable: false },
        lineStarts: { value: fileDetails.lineStarts, enumerable: false },
    });

    if (fileDiagnostics.length) {
        const diagnosticsNameMap = {
            [projectTypeScript.DiagnosticCategory.Error]: 'errors',
            [projectTypeScript.DiagnosticCategory.Warning]: 'warnings',
            [projectTypeScript.DiagnosticCategory.Suggestion]: 'suggestions',
            [projectTypeScript.DiagnosticCategory.Message]: 'messages',
        };

        for (const { file, category, code, start, length, messageText, reportsUnnecessary, reportsDeprecated, ...rest } of fileDiagnostics) {
            if (!file || file.fileName !== fileName || start == null) continue;

            const { line, character } = start != null && file.getLineAndCharacterOfPosition(start) || {};

            const diagnostic = { code, start, end: start + length, message: messageText, line, character };

            if (reportsUnnecessary) diagnostic.reportsUnnecessary = reportsUnnecessary;
            if (reportsDeprecated) diagnostic.reportsDeprecated = reportsDeprecated;

            const descriptors = Object.getOwnPropertyDescriptors({ file, ...rest });

            for (const descriptor of Object.values(descriptors)) descriptor.enumerable = false;

            Object.defineProperties(diagnostic, descriptors);

            const diagnosticsKey = diagnosticsNameMap[category];

            (fileDiagnosticsByType[diagnosticsKey] || (fileDiagnosticsByType[diagnosticsKey] = [])).push(diagnostic);
            ((fileDiagnosticsByPosition[start] || (fileDiagnosticsByPosition[start] = {}))[diagnosticsKey] || (fileDiagnosticsByPosition[start][diagnosticsKey] = [])).push(diagnostic);
        }

    }

    /** @type {SourceLine[]} */
    const fileLines = [];

    /** @type {typescript.TextSpan | undefined} */
    let currentMultilineCommentSpan;

    /** @type {SourceAnnotationBlock | undefined} */
    let currentAnnotationBlock;

    /** @type {number} */
    let remainingAnnotationBlockLines = 0;

    for (const [currentLineIndex, currentLineStart] of fileLineStarts.entries()) {
        const previousLine = fileLines[fileLines.length - 1];

        const currentLineEnd = fileLineStarts[fileLineStarts.indexOf(currentLineStart) + 1] ?? fileSourceText.length;
        const currentLineText = fileSourceText.substring(currentLineStart, currentLineEnd);

        currentMultilineCommentSpan
            && currentMultilineCommentSpan.start <= currentLineStart
            && currentMultilineCommentSpan.start + currentMultilineCommentSpan.length >= currentLineEnd - 1
            || (
                (currentMultilineCommentSpan = env.languageService.getSpanOfEnclosingComment(fileName, currentLineEnd, true))
                && fileSpansByType.multilineComments.push(currentMultilineCommentSpan)
            );

        const trailingCommentRanges = !(
            currentMultilineCommentSpan
            && currentLineStart >= currentMultilineCommentSpan.start
            && currentLineEnd <= currentMultilineCommentSpan.start + currentMultilineCommentSpan.length
        ) && projectTypeScript.getTrailingCommentRanges(fileSourceText, currentLineStart) || undefined;

        const trailingComment = trailingCommentRanges
            && trailingCommentRanges[0]?.pos >= currentLineStart
            && trailingCommentRanges[0]?.end <= currentLineEnd
            && fileSourceText.slice(trailingCommentRanges[0].pos, trailingCommentRanges[0].end)
            || undefined;

        const annotationMatch = trailingComment
            && (
                annotationQueryLineMatcher.lastIndex = -1,
                annotationQueryLineMatcher.exec(currentLineText)
            ) || undefined;

        const isAnnotation = ((annotationMatch?.groups?.marker || annotationMatch?.groups?.parameter) ?? false !== false);

        /** @type {SourceLine} */
        const currentLine = {
            start: currentLineStart,
            end: currentLineEnd,
            text: currentLineText,
            annotation: isAnnotation ? annotationMatch.groups : undefined,
        };

        fileLines.push(currentLine);

        if (annotationMatch || remainingAnnotationBlockLines > 0) {
            if (isAnnotation && !currentAnnotationBlock) {
                const queryMatch = annotationMatch?.groups?.marker === '^?'
                    && previousLine?.start >= 0
                    && (
                        queryChunkMatcher.lastIndex = previousLine?.start,
                        queryChunkMatcher.exec(fileSourceText)
                    ) || undefined;

                const queryLines = queryMatch?.[0]?.split?.(/\r\n?|\n/);

                queryLines && queryLines.length > 0 && !queryLines[queryLines.length - 1].trim() && queryLines.pop();

                /** @type {SourceAnnotationBlock} */
                const annotationBlock = {};

                annotationBlock.start = queryMatch ? queryMatch.index : currentLineStart;
                annotationBlock.end = queryMatch ? queryMatch.index + queryMatch[0].length : currentLineEnd;
                annotationBlock.lines = { start: currentLineIndex, end: undefined, [currentLineIndex]: currentLine }; // queryMatch ? [previousLine, currentLine] : [currentLine];
                annotationBlock.query = queryMatch?.groups ?? undefined;

                if (annotationBlock.query) {
                    if (annotationMatch?.groups?.marker === '^?') {
                        const targetOffset = annotationMatch.groups.head.length + annotationMatch.groups.offset.length;
                        const targetPosition = previousLine.start + targetOffset < previousLine.end ? previousLine.start + targetOffset : NaN;
                        const targetLineIndex = currentLineIndex - 1;
                        const nameSpan = !isNaN(targetPosition) ? env.languageService.getNameOrDottedNameSpan(fileName, fileSourceText[targetPosition] === '.' ? targetPosition + 1 : targetPosition, fileSourceText[targetPosition] === '.' ? targetPosition + 2 : targetPosition + 1) : null;

                        remainingAnnotationBlockLines = annotationBlock.query.annotation && annotationBlock.query.annotation.split(/\r\n?|\n/).length - 1 || 0;
                        annotationBlock.lines.end = currentLineIndex + remainingAnnotationBlockLines;

                        if (!nameSpan || nameSpan.length === 0)
                            throw new Error(formatInvalidQueryErrorMessage(
                                { targetLineIndex, targetOffset, targetPosition, previousLine, currentLineText },
                                currentLineIndex === 0 ? `Query annotation is on the first line of the file.`
                                    : targetPosition >= currentLineStart ? `Query marker target ends before the indicated position.`
                                        : undefined
                            ));

                        /** @type {SourceAnnotationTarget} */
                        const target = {};

                        if (nameSpan.start < targetPosition && nameSpan.start + nameSpan.length > targetPosition) {
                            const dottedName = fileSourceText.slice(nameSpan.start, nameSpan.start + nameSpan.length) || undefined;
                            const nameOffset = targetPosition - nameSpan.start;
                            const nameStart = dottedName ? dottedName.lastIndexOf('.', nameOffset) + 1 : undefined;
                            const nameEnd = dottedName ? ((dottedName.indexOf('.', nameOffset) + 1) || (dottedName.length + 1)) - 1 : undefined;
                            const name = dottedName.slice(nameStart, nameEnd) || undefined;

                            if (!name || dottedName[nameOffset] === '.' || !dottedName.includes('.'))
                                throw new Error(formatInvalidQueryErrorMessage(
                                    { targetLineIndex, targetOffset, targetPosition, previousLine, currentLineText },
                                    `Query marker target "${dottedName[nameOffset] === '.' ? '.' : dottedName}" is ambiguous.`
                                ));

                            target.name = name;
                            target.dottedName = dottedName;
                            nameSpan.start += nameStart;
                            nameSpan.length = nameEnd - nameStart;
                        } else {
                            target.name = fileSourceText.slice(nameSpan.start, nameSpan.start + nameSpan.length);
                        }

                        target.start = nameSpan.start;
                        target.end = nameSpan.start + nameSpan.length;

                        ({ line: target.line, character: target.character } = sourceFile.getLineAndCharacterOfPosition(nameSpan.start));

                        if (target.line !== targetLineIndex)
                            throw new Error(formatInvalidQueryErrorMessage(
                                { targetLineIndex, targetOffset, targetPosition, previousLine, currentLineText },
                                `Problem: The query marker target is expected on line ${targetLineIndex + 1} but is pointing to ${target.line + 1} instead.`
                            ));

                        annotationBlock.lines[target.line] = previousLine;

                        target.definitions = env.languageService.getDefinitionAtPosition(fileName, targetPosition);
                        target.diagnostics = fileDiagnosticsByPosition[nameSpan.start];

                        const targetQuickInfo = env.languageService.getQuickInfoAtPosition(fileName, targetPosition);

                        if (targetQuickInfo) {
                            const { textSpan, displayParts, documentation: documentation, tags, ...rest } = targetQuickInfo;

                            target.details = { ...rest };

                            if (displayParts && displayParts?.length > 0) {
                                target.details.display = SymbolDisplayPartTokens.fromSymbolDisplayParts(displayParts);
                                // target.details.displayText = projectTypeScript.displayPartsToString(displayParts);
                            }

                            if (documentation && documentation?.length > 0) {
                                target.details.documentation = SymbolDisplayPartTokens.fromSymbolDisplayParts(documentation);
                                // target.details.documentationText = projectTypeScript.displayPartsToString(documentation);
                            }

                            if (tags && tags?.length > 0) {
                                target.details.tags = [];
                                for (const { name, text } of tags)
                                    target.details.tags.push({ [name]: text ? SymbolDisplayPartTokens.fromSymbolDisplayParts(text) : [] });
                            }
                        }

                        annotationBlock.target = target;
                    }
                }

                fileAnnotationBlocks[currentLineIndex] = currentAnnotationBlock = annotationBlock;
            } else if (isAnnotation) {
                currentAnnotationBlock.lines[currentLineIndex] = currentLine;
            }

            if (remainingAnnotationBlockLines > 0 && --remainingAnnotationBlockLines === 0) {
                if (currentAnnotationBlock.lines.end !== currentLineIndex + 1)
                    // TODO: Ensure there are no scenarios where the annotation block line count is mismatched
                    console.warn('Query annotation block line end mismatched: %o', { currentAnnotationBlock, currentLine, lineIndex: currentLineIndex });

                currentAnnotationBlock = undefined;
            }

        } else if (currentAnnotationBlock) {
            if (currentAnnotationBlock.query == null)
                // TODO: Consider eager counting of annotation block lines
                currentAnnotationBlock.lines.end = currentLineIndex;
            else
                // TODO: Ensure there are no scenarios where the annotation block is not closed
                console.warn('Query annotation block not closed: %o', { currentAnnotationBlock, currentLine });

            currentAnnotationBlock = undefined;

        }
    }

    // console.table(fileLines);

    return { program: programDetails, file: fileDetails };
}
