// @ts-check

import { GroupCaptureRegExp } from '../expressions.js';

/**
 * Matches a predetermined query chunk with the line of code and annotation lines starting at the lastIndex.
 */
const queryChunkMatcher =
    /** @type {GroupCaptureRegExp<'code'|'indent'|'annotation'|'marker'|'head'|'offset'|'tail'>} */
    (/(?<code>(?<indent>[ \t]*).*?(?:\r\n?|\n))(?<annotation>(?<marker>(?<head>\k<indent>\/\/)(?!\/)(?<offset>[ \t]*)\^\?.*?(?:\r\n?|\n))(?<tail>(?:\k<head>.*?(?:\r\n?|\n))*))/g);

/**
 * Matches each annotation line in the annotation lines matched by queryChunkMatcher.
 */
const annotationQueryLineMatcher =
    /** @type {GroupCaptureRegExp<'head'|'indent'|'offset'|'marker'|'parameter'|'body'|'terminator'>} */
    (/^(?<head>(?<indent>[ \t]*)\/\/)(?!\/)(?<offset>[ \t]*)(?:(?<marker>\^\?)|(?<parameter>@?[a-z]+):[ \t]*)?(?<body>.*?)$(?<terminator>\r\n?|\n)/mg);

annotationQueryLineMatcher.exec('')?.groups

/**
 * Matches each line along with the line terminator if found.
 */
const lineMatcher = /^.*(?:\r\n?|\n|$)/mg;

/** See: https://en.wikipedia.org/wiki/Null_character */
const NUL = '\0';

/** @type {Readonly<string[]>} */
const VOID = Object.freeze([NUL]);

const quoteKeyword = keyword => `\u00AB${(typeof keyword === 'string' && keyword) ?? ''}\u00BB`;

/** 
 * @param {string} sourceText
 * @param {annotateTwoslashSouceText.TwoslashResult} twoslashResult
 * @param {annotateTwoslashSouceText.Options} [options]
 */
export function annotateTwoslashSouceText(sourceText, twoslashResult, options) {

    const {
        annotationQueryParameterPropertyMappings
    } = {
        ...annotateTwoslashSouceText.defaults,
        ...options,
    };

    const currentState = {};

    currentState.sourceText = sourceText;

    currentState.twoslashCode = twoslashResult.code;
    currentState.twoslashErrors = [...twoslashResult.errors];
    currentState.twoslashQueries = [...twoslashResult.queries];

    /** @type {number} */
    currentState.twoslashTextLineIndex = currentState.twoslashTextIndex =
        currentState.sourceTextLineIndex = currentState.sourceTextIndex =
        currentState.twoslashQueryIndex = currentState.twoslashErrorIndex = -1;

    /** @type {string} */
    currentState.sourceTextLine = currentState.twoslashTextLine = '';

    /** @type {Readonly<string[]> | VOID} */
    currentState.previousTwoslashTextLines = currentState.previousSourceTextLines = VOID;

    /** @type {Readonly<string[]> | VOID} */
    currentState.currentAnnotationTextFragments = currentState.currentAnnotatedTextFragments = VOID;

    currentState.annotatedTextLines = [];

    const sourceTextLineIterator = lineMatcher[Symbol.matchAll](currentState.sourceText);
    const twoslashedTextLineIterator = lineMatcher[Symbol.matchAll](currentState.twoslashCode);

    /**
    * Assumes all the arguments passed are identical to the source text lines.
    */
    const forwardSourceTextByTextLines = (nextLine, ...nextLines) => {
        let matched = false;
        if (Object.isFrozen(currentState.previousSourceTextLines))
            currentState.previousSourceTextLines = [];
        for ({ 0: currentState.sourceTextLine = NUL, index: currentState.sourceTextIndex = NaN } of sourceTextLineIterator) {
            currentState.sourceTextLineIndex++;
            (/** @type {string[]} */ (currentState.previousSourceTextLines)).push(currentState.sourceTextLine);
            // currentState.annotatedTextLines.push(currentState.sourceTextLine);
            if (currentState.sourceTextLine === nextLine) {
                matched = true;
                break;
            }
        }
        if (nextLines.length === 0) {
            if (currentState.previousSourceTextLines.length === 0)
                currentState.previousSourceTextLines = VOID;
            else
                Object.freeze(currentState.previousSourceTextLines);
            return matched;
        }
        return matched === false ? matched : forwardSourceTextByTextLines(...nextLines);
    }

    const forwardTwoslashTextToLineIndex = (lineIndex) => {
        let matched = false;
        currentState.previousTwoslashTextLines = [];
        for ({ 0: currentState.twoslashTextLine = NUL, index: currentState.twoslashTextIndex = NaN } of twoslashedTextLineIterator) {
            currentState.twoslashTextLineIndex++;
            (/** @type {string[]} */ (currentState.previousTwoslashTextLines)).push(currentState.twoslashTextLine);
            if (currentState.twoslashTextLineIndex === lineIndex) {
                matched = true;
                break;
            }
        }
        if (currentState.previousTwoslashTextLines.length === 0)
            currentState.previousTwoslashTextLines = VOID;
        else
            Object.freeze(currentState.previousTwoslashTextLines);
        return matched;
    }

    /**
    * Assumes that each argument is equal to a corresponding line in the source text.
    * 
    * NOTE: This is a very naive implementation that doesn't handle line continuations.
    */
    const pushAnnotatedSourceTextLines = (...lines) => {
        if (lines.length) {
            currentState.annotatedTextLines.push(...lines);
            return true;
        } else if (currentState.previousSourceTextLines !== VOID) {
            const {
                annotatedTextLines: { length: annotatedTextLinesCount },
                previousSourceTextLines: { length: previousSourceTextLinesCount },
                sourceTextLineIndex: sourceTextLineIndex,
            } = currentState;
            const start = (sourceTextLineIndex - previousSourceTextLinesCount) + 1;
            const offset = annotatedTextLinesCount - start;
            // console.log({ start, offset, annotatedTextLinesCount, previousSourceTextLinesCount, sourceTextLineIndex });
            if (offset > 0)
                currentState.annotatedTextLines.push(...currentState.previousSourceTextLines.slice(offset));
            else if (offset < currentState.previousSourceTextLines.length)
                currentState.annotatedTextLines.push(...currentState.previousSourceTextLines);

            return true;
        }
        return false;
    }

    const getErrorsAtLineIndex = (lineIndex) => {
        const errors = [];

        if (currentState.twoslashErrors?.length) {

            let index;

            for (
                index = currentState.twoslashErrorIndex >= 0 ? currentState.twoslashErrorIndex : 0;
                index < currentState.twoslashErrors.length;
                index++
            ) {
                const error = currentState.twoslashErrors[index];

                if (/** @type {{line: number}} */(error).line > lineIndex)
                    break;

                if (error.line === lineIndex)
                    errors.push(error);

                currentState.twoslashErrorIndex = index;
            }
        }

        return errors;
    }

    while (currentState.sourceTextLine !== NUL && !isNaN(currentState.sourceTextIndex)) {
        currentState.twoslashQuery = currentState.twoslashQueries[++currentState.twoslashQueryIndex];

        if (currentState.twoslashQuery) {
            // const previousState = { ...currentState };

            const previousTwoslashLineIndex = currentState.twoslashQuery.line - 1;

            if (!forwardTwoslashTextToLineIndex(previousTwoslashLineIndex))
                throw new Error(`Twoslash forward mismatch: ${currentState.twoslashTextLineIndex} : ${previousTwoslashLineIndex}`);

            if (!forwardSourceTextByTextLines(...currentState.previousTwoslashTextLines))
                throw new Error(`Source text forward mismatch:\n\t${currentState.sourceTextLine?.trimEnd?.()}\n\t${currentState.twoslashTextLine?.trimEnd?.()}`);

            pushAnnotatedSourceTextLines();

            switch (currentState.twoslashQuery.kind) {
                case 'query':
                    queryChunkMatcher.lastIndex = currentState.sourceTextIndex - 1;
                    const queryChunkMatch = queryChunkMatcher.exec(currentState.sourceText);

                    if (queryChunkMatch?.groups?.code !== currentState.sourceTextLine)
                        throw new Error(`Query code mismatch:\n\t${queryChunkMatch?.groups?.code?.trimEnd?.()}\n\t${currentState.sourceTextLine?.trimEnd?.()}`);

                    // console.log({ previousSourceTextLines: currentState.previousSourceTextLines, queryChunkMatch: queryChunkMatch?.groups?.annotation });

                    currentState.currentAnnotatedTextFragments = [];
                    currentState.currentAnnotationTextFragments = [];

                    // /** @type {import('@typescript/twoslash').TwoSlashReturn['errors'][0][]} */
                    const errors = [
                        ...getErrorsAtLineIndex(currentState.twoslashQuery.line - 2),
                        ...getErrorsAtLineIndex(currentState.twoslashQuery.line - 1)
                    ];

                    // if (errors.length) console.log(errors);

                    let parameter;

                    let lastOffset = 0;
                    for (const { 0: line, index, groups } of annotationQueryLineMatcher[Symbol.matchAll](queryChunkMatch.groups.annotation)) {
                        let property, value;
                        (/** @type { string[] } */ (currentState.currentAnnotationTextFragments)).push(line);
                        if (groups?.parameter) {
                            parameter = groups.parameter;
                            property = annotationQueryParameterPropertyMappings[groups.parameter] ?? groups.parameter;
                            value = currentState.twoslashQuery[property];
                            lastOffset = (groups.offset?.length ?? 0) + groups.parameter.length + 1;

                            if (property === 'text' && errors.length) {
                                const lines = new Set();
                                for (const error of errors) {
                                    if (error.character && error.length && currentState.twoslashQuery.offset >= error.character &&
                                        currentState.twoslashQuery.offset <= error.character + error.length) {
                                        if (error.line === currentState.twoslashQuery.line - 2) {
                                            const previousLines = currentState.previousTwoslashTextLines.slice(-2);
                                            const currentLineExpression = previousLines[1]?.trim().length > 1 && previousLines[1].slice(error.character, error.character + error.length);
                                            const foundCurrentLineExpression = currentLineExpression && /^\w+$/i.test(currentLineExpression);
                                            const previousLineExpression = previousLines[0]?.trim().length > 0 && previousLines[0].slice(error.character, error.character + error.length);
                                            const foundPreviousLineExpression = previousLineExpression && /^\w+$/i.test(previousLineExpression);
                                            const currentLineIndex = currentState.sourceTextLineIndex + 1;
                                            if (foundCurrentLineExpression && foundPreviousLineExpression) {
                                                const padding = `${currentLineIndex}`.length;
                                                // console.log(previousLineExpression);
                                                console.warn([
                                                    `\nAn error was reported for line ${error.line} above a query for ${quoteKeyword(currentLineExpression)} on line ${currentLineIndex}:\n\n`,
                                                    `    [${`${currentLineIndex - 1}`.padStart(padding)}] ${previousLines[0].trimEnd()}\n`,
                                                    `    [${`${currentLineIndex}`.padStart(padding)}] ${previousLines[1].trimEnd()}\n\n`,
                                                    `This error may reflect also reflect ${quoteKeyword(previousLineExpression)} on line ${currentLineIndex - 1}.\n`,
                                                    `Adding a new line before line ${currentLineIndex} would ensure proper error reporting.\n`
                                                ].join(''));
                                                continue;
                                            } else if (!foundCurrentLineExpression) {
                                                continue;
                                            }
                                            // console.log({ query: currentState.twoslashQuery, error, previousLines: currentState.previousTwoslashTextLines });
                                        }
                                        lines.add(`[Error: ${error.code}]: ${error.renderedMessage.trim()}`);
                                    }
                                }
                                if (lines.size)
                                    value = `${value ? `${value}\n` : ''}${[...lines].join('\n')}`;
                            }

                            const body = property in currentState.twoslashQuery && (value == null || value === '') ? '‹void›' : `${value ?? ''}`.trim();
                            const wrappedBody = `${body}\n`.replace(/\s*\n/g, `${groups.terminator}${groups.head ?? ''}${groups.offset ?? ''}${' '.repeat(groups.parameter.length + 2)}`).trimEnd();
                            const annotation = `${groups.head}${groups.offset}${groups.parameter}: ${wrappedBody}${groups.terminator}`;
                            (/** @type { string[] } */ (currentState.currentAnnotatedTextFragments)).push(annotation);
                        } else {
                            if (/** @type {number} */ (index) > 0

                                && parameter
                                && (((groups?.offset?.length ?? 0) >= lastOffset || groups?.body?.trim?.().length === 0))
                            ) {
                                (/** @type { string[] } */ (currentState.currentAnnotatedTextFragments)).push('')
                            } else {
                                lastOffset = 0;
                                parameter = undefined;
                                (/** @type { string[] } */ (currentState.currentAnnotatedTextFragments)).push(line)
                            }
                        }

                        // if (property) console.log({ line, property, value, parameter, groups });
                    }

                    // console.log({ currentAnnotatedTextLines: currentState.currentAnnotatedTextFragments, currentAnnotationTextLines: currentState.currentAnnotationTextFragments });
                    break;
                default:
                    break;
            }

            if (currentState.currentAnnotatedTextFragments !== VOID) {
                pushAnnotatedSourceTextLines(...currentState.currentAnnotatedTextFragments);
                currentState.currentAnnotatedTextFragments = currentState.currentAnnotationTextFragments = VOID;
                continue;
            }

            // console.log({ previousState, currentState });
        } else {
            forwardSourceTextByTextLines();
            pushAnnotatedSourceTextLines();
            break;
        }
    }

    return currentState.annotatedTextLines.join('');

}

annotateTwoslashSouceText.defaults = {
    /** @type {{[name: string]: keyof (import('@typescript/twoslash').TwoSlashReturn['queries'][number])}} */
    annotationQueryParameterPropertyMappings: {
        type: 'text',
        docs: 'docs',
        '@docs': 'docs',
        '@defs': 'text',
    },
}

/** @typedef {import('./twoslash').twoslashSourceText.TwoslashResult} annotateTwoslashSouceText.TwoslashResult */
/** @typedef {Partial<typeof annotateTwoslashSouceText['defaults']>} annotateTwoslashSouceText.Options */
/** @typedef {annotateTwoslashSouceText.TwoslashResult['queries']} annotateTwoslashSouceText.TwoslashQueries */
/** @typedef {annotateTwoslashSouceText.TwoslashQueries[number]} annotateTwoslashSouceText.TwoslashQuery */