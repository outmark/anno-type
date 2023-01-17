#!/usr/bin/env node

import { annotateTwoslashSouceText } from "./internal/twoslash/annotate.js";
import { twoslashSourceText } from "./internal/twoslash/twoslash.js";

// @ts-check

if (
    process?.argv?.[1] === new URL(import.meta.url).pathname
    || /[\\/]node_modules[\\/].bin[\\/]annotate-twoslash$/.test(process?.argv?.[1])
) {
    const path = await import("path");
    const fs = await import("fs/promises");
    const url = await import("url");
    const module = await import('module');

    let annotatedCount = 0;

    try {

        const { OutputFormatDefinitions } = await import("./internal/formats.js");
        const { ArgumentParser } = await import("./internal/arguments.js");

        const definitions = {
            outputFormats: new OutputFormatDefinitions(
                {
                    format: 'annotated-source',
                    /** This is determined by the input */
                    extensions: ['js', 'ts', 'jsx', 'tsx'],
                    parameter: 'output-annotated-source',
                    default: false,
                    argumentKeys: ['-a', '--annotate']
                },
                {
                    format: 'json',
                    extensions: ['json'],
                    parameter: 'output-json',
                    default: false,
                    argumentKeys: ['-j', '--json']
                },
                {
                    format: 'markdown',
                    extensions: ['md'],
                    parameter: 'output-markdown',
                    default: false,
                    argumentKeys: ['-m', '--md', '--markdown']
                },
            ),
        };

        /** @typedef {definitions['outputFormats']['mappings']['formats'][string]} OutputDefinition */
        /** @typedef {OutputDefinition['parameter']} OutputFormatParameter */
        /** @typedef {OutputDefinition['extension']} OutputFormatExtension */

        const mappings = {
            outputFormats: definitions.outputFormats.mappings,
            argumentKeys: /** @type {import('./internal/arguments').ArgumentKeyMappings} */ (Object.setPrototypeOf({
                '-d': '--debug',
                '-o': '--output-path',
                '--output': '--output-path',
                '-r': '--root-path',
                '--root': '--root-path',
                '--outputs': '--output-formats',
                '-t': '--typescript-module',
                '--typescript': '--typescript-module',
                // '-i': '--output-in-place',
                // '--in-place': '--output-in-place',
            }, null)),
        };

        for (const { format, parameter, argumentKeys } of Object.values(definitions.outputFormats.mappings.formats)) {
            if (parameter == null) continue;
            for (const argumentKey of argumentKeys) {
                if (argumentKey in mappings.argumentKeys)
                    throw new Error(`Duplicate output argument key in "${format}" definition: ${argumentKey}`);
                mappings.argumentKeys[argumentKey] = `--${parameter}`;
            }
        }

        const env = { ...process.env };

        // console.log(env);
        // process.exit(0);

        const packageLifecycleScript = env['npm_lifecycle_script'] ?? null;
        const packageLifecycleEvent = env['npm_lifecycle_event'] ?? null;
        const isPackageScoped = env['INIT_CWD'] && ('npm_lifecycle_script' in env || env['npm_lifecycle_event'] === 'annotate-twoslash');
        const packageWorksapcePath = isPackageScoped && env['INIT_CWD'] || null;
        const packagePath = isPackageScoped && env['PWD'] || null;
        const isPackageWorkspaceScoped = isPackageScoped && packageWorksapcePath && packagePath && packageWorksapcePath !== packagePath;
        const packageJSONPath = packagePath && path.join(packagePath, 'package.json') || null;
        const packageJSON = packageJSONPath && JSON.parse(await fs.readFile(packageJSONPath, 'utf8')) || null;
        const packageOptions = packageJSON?.['annotate-twoslash'] ?? null;
        const workingPath = isPackageScoped && packagePath || process.cwd();
        const require = module.default.createRequire(`${url.pathToFileURL(workingPath)}/`);

        // console.log({ packagePath, packageJSON, packageOptions });

        const defaults = {
            options: {
                cwd: workingPath,
                /** @type {import('@typescript/twoslash').TwoSlashOptions} */
                twoslash: {
                    defaultCompilerOptions: {
                        // explainFiles: true,
                        // suppressImplicitAnyIndexErrors: true,
                        // suppressExcessPropertyErrors: true,
                        removeComments: false,
                        allowJs: true,
                        // sourceMap: true,
                    },
                    defaultOptions: {
                        emit: false,
                        showEmit: false,
                        noStaticSemanticInfo: false,
                        // noErrors: true,
                        noErrorValidation: true,
                    },
                    customTags: [
                        "source",
                        "result",
                        "docs",
                        "defs",
                        "errs",
                        // "type",
                    ],
                },
                ['typescript-module']: 'typescript',
            },
            /** @type {{[name in 'debug' | `debug-${string}`]?: boolean}} */
            debug: {
                // debug: false,
            },
            /** @type {{[name in `output-${string}`]?: unknown} & {[name in OutputFormatParameter]?: boolean} & {['output-path']?: string}} */
            output: {
                ...definitions.outputFormats.defaults,
            }
        };

        try {
            defaults.options.twoslash.tsModule = require(defaults.options['typescript-module']);
            defaults.options.twoslash.tsLibDirectory = path.dirname(require.resolve(defaults.options['typescript-module']));
        } catch (error) {
            defaults.options.twoslash['typescript-module'] = undefined;
            defaults.options.twoslash.tsModule = undefined;
            defaults.options.twoslash.tsLibDirectory = undefined;
        }

        if (packageOptions != null && 'debug' in packageOptions) {
            if (typeof packageOptions.debug === 'object' && packageOptions.debug != null) {
                for (const [specifier, value] of Object.entries(packageOptions.debug)) {
                    if (!specifier.includes('*')) {
                        if (typeof value === 'boolean') {
                            defaults.debug[`debug-specifier`] = value;
                            continue;
                        }
                    }
                    console.warn(`Unsupported debug specifier in package.json: ${specifier}\n  in: ${packageJSONPath}`)
                }
            } else if (typeof packageOptions.debug === 'boolean') {
                defaults.debug.debug = packageOptions.debug;
            } else {
                console.warn(`Unsupported debug option in package.json: ${packageOptions.debug}\n  in: ${packageJSONPath}`)
            }
        }

        const options = {
            ...defaults.options,
            ...defaults.output,
            ...defaults.debug,
            /** @type {import('@typescript/twoslash').TwoSlashOptions} */
            twoslash: {
                ...defaults.options.twoslash,
                defaultCompilerOptions: { ...defaults.options?.twoslash?.defaultCompilerOptions },
                defaultOptions: { ...defaults.options?.twoslash?.defaultOptions },
            }
        };

        const argumentParser = new ArgumentParser({ keyMappings: mappings.argumentKeys, parameterGroups: ['debug', 'output'] });

        for await (const parsed of argumentParser.parse(...process.argv.slice(2))) {
            // console.log(parsed);

            if (parsed.key != null) {
                switch (parsed.parameter) {
                    case 'typescript-module':
                        if (parsed.value === '') {
                            options[parsed.parameter] = undefined;
                            options.twoslash.tsModule = defaults.options?.twoslash?.tsModule ?? undefined;
                            options.twoslash.tsLibDirectory = defaults.options?.twoslash?.tsLibDirectory ?? undefined;
                            continue;
                        } else if (typeof parsed.value === 'string') {
                            try {
                                options[parsed.parameter] = require.resolve(parsed.value);
                                options.twoslash.tsModule = require(parsed.value);
                                options.twoslash.tsLibDirectory = path.dirname(options[parsed.parameter]);

                            } catch (error) {
                                console.error(error);
                                console.log({ moduleScope, typescriptSpecifier: parsed.value, typescriptPath: options[parsed.parameter] });
                                process.exit(1);
                            }
                            continue;
                        }
                        throw new Error(`Invalid ${parsed.parameter.split('-', 1)[0]} specifier: ${parsed.value}`);
                    case 'root-path':
                    case 'output-path':
                        if (typeof parsed.value === 'string') {
                            options[parsed.parameter] = parsed.value;
                            continue;
                        }
                        throw new Error(`Invalid ${parsed.parameter.split('-', 1)[0]} path: ${parsed.value}`);
                    case 'output-formats':
                        if (typeof parsed.value === 'string' || parsed.value === true) {
                            const mutatedOptions = definitions.outputFormats.optionsFor(...parsed.value.length && parsed.value.split?.(/[,; ]+/g) || []);
                            const unsupportedFormats = mutatedOptions[OutputFormatDefinitions.unsupportedFormats];
                            const disabledFormats = new Set();

                            for (const option in mutatedOptions) {
                                mutatedOptions[option] === false && options[option] === true && disabledFormats.add(mappings.outputFormats.parameters[option].format);
                                options[option] = mutatedOptions[option];
                            }

                            unsupportedFormats.length === 0 || console.warn(`\nIgnoring unsupported output format${unsupportedFormats.length === 1 ? '' : 's'}: ${unsupportedFormats.join(', ')}\n`);
                            disabledFormats.size === 0 || console.warn(`\nDisabling output format${disabledFormats.size === 1 ? '' : 's'}: ${[...disabledFormats].join(', ')}\n`);
                            continue;
                        } else if (parsed.value === false) {
                            for (const parameter in mappings.outputFormats.parameters)
                                options[parameter] = false;
                            continue;
                        }
                        break;
                    default:
                        if (parsed.parameter != null) {
                            switch (parsed.group) {
                                case 'debug':
                                    if (typeof parsed.value === 'boolean') {
                                        options[parsed.parameter] = parsed.value;
                                        continue;
                                    }
                                    break;
                                case 'output':
                                    if (typeof parsed.value === 'boolean') {
                                        if (typeof defaults.output[parsed.parameter] === 'boolean')
                                            options[parsed.parameter] = parsed.value;
                                        else
                                            console.warn(`\nIgnoring unsupported output format: ${parsed.parameter.replace(/^output-/, '')}\n`);
                                        continue;
                                    }
                                    break;
                            }
                        }
                        console.warn(`\nIgnoring unsupported argument: ${parsed.key}\n`);
                        continue;
                }
                continue;
            } else {
                // parsed.argument is a source path?
                (options['debug'] !== false && options['debug-options']) && console.log('Annotating: %o with: %o', parsed.argument, options);

                const outputPath = options['output-path'] ? path.resolve(options.cwd, options['output-path']) : undefined;

                const sourcePath = path.resolve(options.cwd, parsed.argument);
                const sourceRootRelativePath = path.relative(options['root-path'], sourcePath);

                if (sourceRootRelativePath.startsWith('..')) {
                    console.warn(`\nSkipping source outside of root path: ${sourceRootRelativePath}`);
                    continue;
                }

                const sourceExtension = path.extname(sourcePath).slice(1);
                const sourceName = path.basename(sourcePath).slice(0, -sourceExtension.length - 1);

                if (sourceExtension !== "ts" && sourceExtension !== "tsx" && sourceExtension !== "js" && sourceExtension !== "jsx") {
                    console.warn(`\nSkipping unknown source: ${sourceRootRelativePath}`);
                    continue;
                }

                const sourceDirectory = path.dirname(sourcePath);
                const outputDirectory = outputPath
                    ? path.resolve(outputPath, path.dirname(sourceRootRelativePath))
                    : sourceDirectory;

                // console.log({ sourcePath, sourceRootRelativePath, sourceDirectory, outputDirectory });
                // continue;

                const sourceStats = await fs.stat(sourcePath);

                const sourceType = sourceStats.isFile() ? 'file' : sourceStats.isSymbolicLink() ? 'link' : sourceStats.isDirectory() ? 'directory' : sourceStats.isFIFO() ? 'FIFO pipe' : sourceStats.isSocket() ? 'socket' : sourceStats.isBlockDevice() ? 'block device' : sourceStats.isCharacterDevice() ? 'character device' : 'unknown';

                switch (sourceType) {
                    case 'file':
                    case 'link':
                        break;
                    default:
                        console.warn(`\nSkipping ${sourceType} source: ${sourceRootRelativePath}`);
                        continue;
                }

                if (sourceName.endsWith(".annotated")) {
                    if (outputDirectory === sourceDirectory) {
                        console.warn(`\nSkipping potentially annotated twoslash source: ${sourceRootRelativePath}`);
                        continue;
                    }

                    try {
                        const possibleSourcePath = path.resolve(outputDirectory, `${sourceName.slice(0, -10)}.${sourceExtension}`);
                        const possibleSourceStats = await fs.stat(possibleSourcePath);
                        console.warn(`\nSkipping potentially annotated twoslash source: ${sourceRootRelativePath}`);
                        console.log({ possibleSourceStats });
                    } catch (error) {
                        console.log(error);
                    }
                    continue;
                }

                console.log(`\nAnnotating twoslash source: ${sourceRootRelativePath}`);

                const sourceRealPath = sourceType === 'link' ? await fs.realpath(sourcePath) : sourcePath;

                options.debug && sourceRealPath !== sourcePath && console.log(`\tRealpath: ${sourceRealPath} (symbolic link)}`);

                const sourceText = await fs.readFile(sourcePath, "utf8");

                // const sourceTextFragments = (await import('./internal/twoslash/simple-annotation-matcher.js')).matchSourceTextFragments(sourceText);
                // console.log(sourceTextFragments);

                const results = {};
                results.annotated = {};



                // const { default: tsdTSModule } = await import("@tsd/typescript");

                results.twoslash = await twoslashSourceText(
                    sourceText,
                    sourceExtension,
                    {
                        ...defaults?.twoslash,
                        ...options?.twoslash,
                        defaultCompilerOptions: {
                            ...defaults?.twoslash?.defaultCompilerOptions,
                            ...options?.twoslash?.defaultCompilerOptions,
                        },
                        defaultOptions: {
                            ...defaults?.twoslash?.defaultOptions,
                            ...options?.twoslash?.defaultOptions,
                        }
                    },
                );

                results.annotated.code = annotateTwoslashSouceText(sourceText, results.twoslash);

                results.json = JSON.stringify(results, null, 2);

                annotatedCount++;

                if (
                    options['output-annotated-source'] !== true
                    && options['output-json'] !== true
                    && options['output-markdown'] !== true
                ) {
                    if (options['output-path']) {
                        options.debug && console.log(`\tSkipping output: no specified output options.`);
                    } else {
                        console.log(results.json);
                    }
                    continue;
                }

                // console.log(options);

                if (options['output-annotated-source'] === true) {
                    const annotatedOutputPath = path.resolve(outputDirectory, `${sourceName}.annotated.${sourceExtension}`);
                    options.debug && console.log(`\tWriting annotated source: ${annotatedOutputPath}`);
                    await fs.mkdir(path.dirname(annotatedOutputPath), { recursive: true });
                    await fs.writeFile(annotatedOutputPath, `${results.annotated.code} `);
                }

                if (options['output-json'] === true) {
                    const resultsOutputPath = path.resolve(outputDirectory, `${sourceName}.${sourceExtension}.annotated.json`)
                    options.debug && console.log(`\tWriting annotation results: ${resultsOutputPath}`);
                    await fs.mkdir(path.dirname(resultsOutputPath), { recursive: true });
                    await fs.writeFile(resultsOutputPath, `${results.json}\n`);
                }

                if (options['output-markdown'] === true) {
                    const markdownOutputPath = path.resolve(outputDirectory, `${sourceName}.${sourceExtension}.annotated.md`);
                    const markdownOutput = [
                        `** Source Code **`,
                        `${'```'}${sourceExtension}\n${sourceText}\n${'```'}`,
                        `** Annotated Code **`,
                        `${'```'}${sourceExtension}\n${results.annotated.code}\n${'```'}`,
                        `** Annotation Results **`,
                        `${'```'} json\n${results.json}\n${'```'}`,
                    ];
                    const markdownOutputString = markdownOutput.join('\n\n');
                    options.debug && console.log(`\tWriting markdown: ${markdownOutputPath}`);
                    await fs.mkdir(path.dirname(markdownOutputPath), { recursive: true });
                    await fs.writeFile(markdownOutputPath, `${markdownOutputString}\n`);
                }

            }

        }
        // console.log(options);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }


    annotatedCount > 0 && console.log(`\nAnnotated ${annotatedCount} source file${annotatedCount === 1 ? '' : 's'}.\n`);
}