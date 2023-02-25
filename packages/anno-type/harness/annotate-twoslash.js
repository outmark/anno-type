#!/usr/bin/env node

/** @type {boolean | undefined} */
const USE_LANGUAGE_SERVICE = true;
/** @type {boolean | undefined} */
const USE_TWOSLASH = undefined;

const TYPESCRIPT_MODULE = 'typescript';
const CUSTOM_DOCS_TAG = 'docs';
const CUSTOM_TYPES_TAG = 'defs';
const CUSTOM_ERRORS_TAG = 'errs';

// TODO: Fix workspaceRoot detection

if (
    process?.argv?.[1] === new URL(import.meta.url).pathname
    || /[\\/]node_modules[\\/].bin[\\/]annotate-twoslash$/.test(process?.argv?.[1])
) {
    const path = await import("path");
    const fs = await import("fs/promises");
    const url = await import("url");
    const module = await import('module');

    let annotatedCount = 0;

    const configuredOptions = {};
    /** @type {import('./internal/arguments.js').ArgumentParserRecord[]} */
    const parametricArguments = [];
    /** @type {import('./internal/arguments.js').ArgumentParserRecord[]} */
    const arbitraryArguments = [];
    /** @type {string[]} */
    const handledSources = [];

    configuredOptions.help = process.argv.includes('-h') || process.argv.includes('--help');

    const packageOptions = {
        /** @type {{[name in 'debug' | `debug-${string}`]?: boolean} | null | undefined} */
        debug: undefined,
    };

    const unsupportedPackageOptions = {};

    class SourceDetails {
        /** @type {string | null | undefined} */
        specifier = undefined;
        /** @type {string | null | undefined} */
        path = undefined;
        /** @type {string | null | undefined} */
        name = undefined;
        /** @type {string | null | undefined} */
        extension = undefined;
        /** @type {'file' | 'link' | 'directory' | 'FIFO pipe' | 'socket' | 'block device' | 'character device' | null | undefined} */
        type = undefined;
        /** @type {string | null | undefined} */
        directory = undefined;
        /** @type {string | null | undefined} */
        rootPath = undefined;
        /** @type {string | null | undefined} */
        relativePath = undefined;
        /** @type {string | null | undefined} */
        realPath = undefined;
        /** @type {Error | (Error & {code?: string}) | null | undefined} */
        error = undefined;

        /**
         * Attempts to resolve all relevant details about the source file.
         * 
         * @param {string} specifier 
         * @param {Readonly<{cwd?: string?, 'root-path'?: string?}>} options
         */
        static async resolveFrom(specifier, options) {
            const sourceDetails = new (this ?? SourceDetails)();

            try {
                sourceDetails.specifier = `${specifier}`;
                // TODO: Use packageRoot when it applies!
                sourceDetails.path = path.resolve(/** @type {string} */(options.cwd), sourceDetails.specifier);
                sourceDetails.extension = path.extname(sourceDetails.path).slice(1);
                sourceDetails.name = path.basename(sourceDetails.path).slice(0, -sourceDetails.extension.length - 1);
                sourceDetails.directory = path.dirname(sourceDetails.path);
                sourceDetails.rootPath = path.resolve(/** @type {string} */(options.cwd), options['root-path']);
                sourceDetails.relativePath = path.relative(sourceDetails.rootPath, sourceDetails.path);

                if (sourceDetails.relativePath.startsWith('..'))
                    throw new Error(`Source outside of root path: ${sourceDetails.relativePath}`);

                if (sourceDetails.extension !== "ts" && sourceDetails.extension !== "tsx" && sourceDetails.extension !== "js" && sourceDetails.extension !== "jsx")
                    throw new Error(`Unsupported source extension: ${sourceDetails.extension}`);

                sourceDetails.type = null;
                sourceDetails.realPath = null;

                let sourceStats = await fs.stat(sourceDetails.path);
                let sourceRealPath = sourceDetails.path;

                if (sourceStats.isSymbolicLink()) {
                    const sourcePaths = new Set([sourceRealPath]);
                    do {
                        sourceRealPath = await fs.realpath(sourceRealPath);
                        if (sourcePaths.has(sourceRealPath))
                            throw new Error(`Circular symbolic link: ${[...sourcePaths].join(' -> ')} -> ${sourceRealPath}`);
                        sourcePaths.add(sourceRealPath);
                        sourceStats = await fs.stat(sourceRealPath);
                    } while (sourceStats.isSymbolicLink());
                }

                sourceDetails.realPath = sourceRealPath;
                sourceDetails.type = (sourceStats.isFile() && 'file')
                    || (sourceStats.isDirectory() && 'directory')
                    || (sourceStats.isFIFO() && 'FIFO pipe')
                    || (sourceStats.isSocket() && 'socket')
                    || (sourceStats.isBlockDevice() && 'block device')
                    || (sourceStats.isCharacterDevice() && 'character device')
                    || null;

            } catch (error) {
                sourceDetails.error = /** @type {Error} */ (error);
            }

            return Object.freeze(sourceDetails);
        }
    }

    class OutputDetails {
        /** @type {string | null | undefined} */
        path = undefined;
        /** @type {string | null | undefined} */
        name = undefined;
        /** @type {string | null | undefined} */
        extension = undefined;
        /** @type {string | null | undefined} */
        directory = undefined;
        /** @type {'file' | 'link' | 'directory' | 'FIFO pipe' | 'socket' | 'block device' | 'character device' | null | undefined} */
        type = undefined;
        /** @type {Error | (Error & {code?: string}) | null | undefined} */
        error = undefined;

        /**
         * 
         * @param {Readonly<SourceDetails>} sourceDetails 
         * @param {Readonly<{cwd?: string?, 'output-path'?: string?, 'output-annotated-source'?: boolean }>} options 
         */
        static async resolveFrom(sourceDetails, options) {
            const outputDetails = new (this ?? OutputDetails)();

            try {
                outputDetails.name = `${sourceDetails.name}.annotated`;
                outputDetails.extension = sourceDetails.extension;
                outputDetails.path = options['output-path'] ? path.resolve(/** @type {string} */(options.cwd), options['output-path']) : undefined;

                outputDetails.directory = outputDetails.path
                    ? path.resolve(outputDetails.path, path.dirname(sourceDetails.relativePath))
                    : sourceDetails.directory;

                // TODO: Preemptively look for output destination errors.

            } catch (error) {
                outputDetails.error = /** @type {Error} */ (error);
            }

            return Object.freeze(outputDetails);
        }
    }

    class PackageDetails {
        /** @type {string | null | undefined} */
        packageRoot = undefined;
        // /** @type {string | null | undefined} */
        // workspaceRoot = undefined;
        /** @type {import('@schemastore/package').JSONSchemaForNPMPackageJsonFiles | null | undefined} */
        packageManifest = undefined;
        /** @type {string | null | undefined} */
        lifecycleScript = undefined;
        /** @type {string | null | undefined} */
        lifecycleEvent = undefined;
    }

    const packageDetails = new PackageDetails();

    let lastSourceDetails = Object.freeze(new SourceDetails());
    let lastOutputDetails = Object.freeze(new OutputDetails());

    let exitCode = 0;
    let thrownError = null;

    try {

        const { OutputFormatDefinitions } = await import("./internal/formats.js");
        const { ArgumentParser } = await import("./internal/arguments.js");
        const formatter = new (await import('./internal/node.js')).ConsoleFormatter();
        const reparse = (await import('./internal/json.js')).reparse;

        const definitions = {
            outputFormats: new OutputFormatDefinitions(
                {
                    format: 'annotated-source',
                    /** This is to be determined by the input */
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
        /** @typedef {OutputDefinition['extensions'][number]} OutputFormatExtension */

        const mappings = {
            outputFormats: definitions.outputFormats.mappings,
            argumentKeys: /** @type {import('./internal/arguments.js').ArgumentKeyMappings} */ (Object.setPrototypeOf({
                '-h': '--help',
                '-d': '--debug',
                '-o': '--output-path',
                '--dry': '--dry-run',
                '--output': '--output-path',
                '-r': '--root-path',
                '--root': '--root-path',
                '--outputs': '--output-formats',
                '-t': '--typescript-module',
                '--typescript': '--typescript-module',
                '-l': '--use-language-service',
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

        // console.log({ env });

        if (env['INIT_CWD'] && ('npm_lifecycle_script' in env || env['npm_lifecycle_event'] === 'annotate-twoslash')) {
            ({
                PWD: packageDetails.packageRoot = null,
                // INIT_CWD: packageDetails.workspaceRoot = null,
                npm_lifecycle_script: packageDetails.lifecycleScript = null,
                npm_lifecycle_event: packageDetails.lifecycleEvent = null,
            } = env);

            // TODO: Hoist positional arguments
            // npm_config_argv: '{"remain":[],"cooked":["run","test:twoslash:examples"],"original":["test:twoslash:examples","--","--no-debug"]}'
        }

        if (packageDetails.packageRoot)
            packageDetails.packageManifest = JSON.parse(await fs.readFile(path.join(packageDetails.packageRoot, 'package.json'), 'utf8'));

        if (packageDetails.packageManifest?.['annotate-twoslash'])
            Object.assign(packageOptions, reparse(packageDetails.packageManifest['annotate-twoslash']));

        const workingPath = packageDetails?.packageRoot ?? process.cwd();
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
                        checkJs: true,
                        // sourceMap: true,
                    },
                    defaultOptions: {
                        emit: false,
                        showEmit: false,
                        noStaticSemanticInfo: false,
                        // noErrors: true,
                        noErrorValidation: true,
                    },
                    customTags: ["source", "result", CUSTOM_DOCS_TAG, CUSTOM_TYPES_TAG, CUSTOM_ERRORS_TAG],
                },
                ['typescript-module']: TYPESCRIPT_MODULE,

                // Default to use language service if not specified
                // @spec: console.table([[1,0],[1],[,1],[0,1],[0,0],[]].map(([a,b]) => ({in: {a, b}, out: {a: !!(a ?? !(b ?? 0)), b: !!(b ?? !(a ?? 1))}})))
                ['use-language-service']: USE_LANGUAGE_SERVICE ?? !(USE_TWOSLASH ?? false),
                ['use-twoslash']: USE_TWOSLASH ?? !(USE_LANGUAGE_SERVICE ?? true),
                ['dry-run']: false,
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

        // TODO: Improve package.json options handing by applying packageOptions directly into options.

        if (packageOptions.debug != null) {
            if (typeof packageOptions.debug === 'boolean')
                defaults.debug.debug = packageOptions.debug;
            else if (typeof packageOptions.debug !== 'object' && packageOptions.debug != null)
                unsupportedPackageOptions.debug = packageOptions.debug;
            else for (const [specifier, value] of Object.entries(packageOptions.debug)) {
                if (specifier.includes('*') || typeof value !== 'boolean')
                    (unsupportedPackageOptions.debug || (unsupportedPackageOptions.debug = {}))[specifier] = value;
                else
                    defaults.debug[`debug-specifier`] = value;
            }
            !unsupportedPackageOptions.debug || console.warn(
                `Unsupported package.json debug options: %o\n\tin: %s`,
                unsupportedPackageOptions.debug,
                packageDetails.packageRoot && path.join(packageDetails.packageRoot, 'package.json')
            );
        }

        const options = {
            .../** @type {Omit<defaults['options'], 'typescript-module'> & Partial<defaults['options']>} */ (defaults.options),
            ...defaults.output,
            ...defaults.debug,
            /** @type {import('@typescript/twoslash').TwoSlashOptions} */
            twoslash: {
                ...defaults.options.twoslash,
                defaultCompilerOptions: { ...defaults.options?.twoslash?.defaultCompilerOptions },
                defaultOptions: { ...defaults.options?.twoslash?.defaultOptions },
            },
            'root-path': packageDetails?.packageRoot || undefined,
        };

        const argumentParser = new ArgumentParser({ keyMappings: mappings.argumentKeys, parameterGroups: ['debug', 'output'] });

        for await (const argument of argumentParser.parse(...process.argv.slice(2))) {

            if (argument.key != null) {
                parametricArguments.push(argument);

                if (configuredOptions.help) continue;

                switch (argument.parameter) {
                    case 'help':
                        // TODO: This is for completeness in case the logic changes elsewhere
                        continue;
                    case 'typescript-module':
                        if (argument.value === '') {
                            configuredOptions[argument.parameter] = options[argument.parameter] = undefined;
                            options.twoslash.tsModule = defaults.options?.twoslash?.tsModule ?? undefined;
                            options.twoslash.tsLibDirectory = defaults.options?.twoslash?.tsLibDirectory ?? undefined;
                            continue;
                        } else if (typeof argument.value === 'string') {
                            try {
                                configuredOptions[argument.parameter] = options[argument.parameter] = require.resolve(argument.value);
                                options.twoslash.tsModule = require(argument.value);
                                options.twoslash.tsLibDirectory = path.dirname(/** @type {string} */(options[argument.parameter]));
                            } catch (error) {
                                console.error(error);
                                console.log({ packageRoot: packageDetails?.packageRoot, typescriptSpecifier: argument.value, typescriptPath: options[argument.parameter] });
                                process.exit(1);
                            }
                            continue;
                        }
                        throw new Error(`Invalid ${argument.parameter.split('-', 1)[0]} specifier: ${argument.value}`);
                    case 'root-path':
                    case 'output-path':
                        if (typeof argument.value === 'string') {
                            configuredOptions[argument.parameter] = options[argument.parameter] = argument.value;
                            continue;
                        }
                        throw new Error(`Invalid ${argument.parameter.split('-', 1)[0]} path: ${argument.value}`);
                    case 'output-formats':
                        if (typeof argument.value === 'string' || argument.value === true) {
                            const mutatedOptions = definitions.outputFormats.optionsFor(...argument.value.length && argument.value.split?.(/[,; ]+/g) || []);
                            const unsupportedFormats = mutatedOptions[OutputFormatDefinitions.unsupportedFormats];
                            const disabledFormats = new Set();

                            for (const option in mutatedOptions) {
                                mutatedOptions[option] === false && options[option] === true && disabledFormats.add(mappings.outputFormats.parameters[option].format);
                                configuredOptions[option] = options[option] = mutatedOptions[option];
                            }

                            unsupportedFormats.length === 0 || console.warn(`\nIgnoring unsupported output format${unsupportedFormats.length === 1 ? '' : 's'}: ${unsupportedFormats.join(', ')}\n`);
                            disabledFormats.size === 0 || console.warn(`\nDisabling output format${disabledFormats.size === 1 ? '' : 's'}: ${[...disabledFormats].join(', ')}\n`);
                            continue;
                        } else if (argument.value === false) {
                            for (const parameter in mappings.outputFormats.parameters)
                                configuredOptions[parameter] = options[parameter] = false;
                            continue;
                        }
                        break;
                    default:
                        if (argument.parameter != null) {
                            switch (argument.group) {
                                case 'debug':
                                    if (typeof argument.value === 'boolean') {
                                        configuredOptions[argument.parameter] = options[argument.parameter] = argument.value;
                                        continue;
                                    }
                                    break;
                                case 'output':
                                    if (typeof argument.value === 'boolean') {
                                        if (typeof defaults.output[argument.parameter] === 'boolean')
                                            configuredOptions[argument.parameter] = options[argument.parameter] = argument.value;
                                        else
                                            console.warn(`\nIgnoring unsupported output format: ${argument.parameter.replace(/^output-/, '')}\n`);
                                        continue;
                                    }
                                    break;
                                default: {
                                    if (argument.parameter in defaults.options) {
                                        if (defaults.options[argument.parameter] === undefined
                                            || typeof defaults.options[argument.parameter] === typeof argument.value)
                                            configuredOptions[argument.parameter] = options[argument.parameter] = argument.value;
                                        else
                                            throw new Error(`Invalid parameter type: ${argument.parameter} (${typeof argument.value} !== ${typeof defaults.options[argument.parameter]})`);
                                        continue;
                                    }
                                }
                            }
                        }
                        console.warn(`\nIgnoring unsupported argument: ${argument.key}\n`);
                        continue;
                }
                continue;
            } else if (argument.argument === '!' || argument.argument === '!!' || argument.argument === '!!!') {
                arbitraryArguments.push(argument);
                try {
                    console.group(`\nWhat the Fudge${argument.argument}`);
                    const { twoslash: twoslashOptions, ...otherOptions } = options;
                    if (argument.argument === '!!' || argument.argument === '!!!') {
                        if (argument.argument === '!!!') {
                            try {
                                console.group('\nCurrent Arbitrary Arguments');
                                console.log(formatter.formatTable(reparse(arbitraryArguments), ['index', 'argument']));
                            } catch (error) {
                                console.error(error);
                            } finally {
                                console.groupEnd();
                            }
                        }
                        try {
                            console.group('\nCurrent Parametric Arguments');
                            console.log(formatter.formatTable(reparse(parametricArguments), ['index', 'argument', 'parameter', 'value']));
                        } catch (error) {
                            console.error(error);
                        } finally {
                            console.groupEnd();
                        }
                        if (argument.argument === '!!!') {
                            console.log('\nPackage Details: %o', packageDetails);
                            console.log('\nLast Source Details: %o', lastSourceDetails);
                            console.log('\nLast Output Details: %o', lastOutputDetails);
                        }
                        console.log('\nCurrent Configured Options: %o', configuredOptions);
                    }
                    console.log('\nCurrent Options: %o', otherOptions);
                } finally {
                    console.groupEnd();
                }
            } else {
                handledSources.push(argument.argument);
                arbitraryArguments.push(argument);

                if (configuredOptions.help) continue;

                // parsed.argument is a source path?
                (options['debug'] !== false && options['debug-options']) && console.log('Annotating: %o with: %o', argument.argument, options);

                lastSourceDetails = lastOutputDetails = null;

                const sourceDetails = lastSourceDetails = await SourceDetails.resolveFrom(argument.argument, options);
                const outputDetails = lastOutputDetails = await OutputDetails.resolveFrom(sourceDetails, options);

                // TODO: Handle outputDetails.error

                if (options['dry-run'] === true) {
                    console.group(`\nWould be attempting to annotate source: ${sourceDetails.relativePath}`);
                    console.log(`Type: ${sourceDetails.type}`);
                    console.log(`Path: ${sourceDetails.path}`);
                    sourceDetails.realPath != null && sourceDetails.realPath !== sourceDetails.path && console.log(`Realpath: ${sourceDetails.realPath} (symbolic link)`);
                    console.groupEnd();
                    continue;
                }

                try {
                    console.group(`\nAnnotating source: ${sourceDetails.relativePath}`);

                    if (sourceDetails.type !== 'file' || sourceDetails.error != null)
                        throw new Error(`Invalid source: ${sourceDetails.relativePath} (Type: ${sourceDetails.type})`, { cause: sourceDetails.error });

                    options.debug && sourceDetails.realPath !== sourceDetails.path && console.log(`Realpath: ${sourceDetails.realPath} (symbolic link)`);

                    const sourceText = await fs.readFile(sourceDetails.path, "utf8");

                    const results = {};

                    /** @type {import("@typescript/twoslash").TwoSlashOptions} */
                    const twoslashOptions = {
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
                    };

                    if (options['use-twoslash'] === true || (
                        !('use-twoslash' in configuredOptions)
                        && options['use-language-service'] === false
                    )) {
                        const { twoslashSourceText } = await import('./internal/twoslash/twoslash.js');
                        const { annotateTwoslashSouceText } = await import('./internal/twoslash/annotate.js');

                        try {
                            console.time(`Analyzing using twoslash`);
                            results.twoslash = await twoslashSourceText(sourceText, sourceDetails.extension, twoslashOptions);
                        } finally {
                            console.timeEnd(`Analyzing using twoslash`);
                        }

                        try {
                            console.time(`Annotating from twoslash`);
                            (results.annotated || (results.annotated = {})).code = annotateTwoslashSouceText(sourceText, results.twoslash);
                        } finally {
                            console.timeEnd(`Annotating from twoslash`);
                        }
                    }

                    if (options['use-language-service'] === true || (
                        !('use-language-service' in configuredOptions)
                        && options['use-twoslash'] === false
                    )) {
                        const { analyzeSourceText } = await import('./internal/heuristics.js');
                        const { annotateSourceText } = await import('./internal/heuristics/annotate.js');

                        try {
                            console.time(`Analyzing using language service`);
                            results.heuristics = await analyzeSourceText(sourceText, {
                                ...options,
                                configuredOptions,
                                packageOptions,
                                sourceDetails,
                                outputDetails,
                                packageDetails,
                                twoslashOptions,
                                argv: process.argv,
                                require,
                            });
                        } finally {
                            console.timeEnd(`Analyzing using language service`);
                        }

                        try {
                            console.time(`Annotating from heuristics`);
                            (results.annotated || (results.annotated = {})).code = annotateSourceText(sourceText, results.heuristics);
                        } finally {
                            console.timeEnd(`Annotating from heuristics`);
                        }
                    }

                    if (options['output-json'] === true || options['output-markdown'] === true || options['output-annotated-source'] === false) {
                        const { condenseWellFormedJSONObjects } = await import('./internal/json.js');

                        try {
                            console.time('Generating Condensed JSON');
                            results.json = condenseWellFormedJSONObjects.reduce(JSON.stringify(
                                results,
                                (key, value) => {
                                    if (typeof value === 'string') {
                                        // TODO: Ensure no absolute paths are leaking in the JSON output.

                                        if (
                                            (key === 'fileName' || key === 'currentDirectory' || key === 'rootDir')
                                            && (value.startsWith(packageDetails.packageRoot) || value.includes('node_modules'))
                                        ) {
                                            return path.relative(packageDetails.packageRoot, value);
                                        } else if (
                                            key === 'containerName'
                                            && value.startsWith('"')
                                            && value.endsWith('"')
                                        ) {
                                            return `"${path.relative(packageDetails.packageRoot, value.slice(1, -1))}"`;
                                        }
                                    } else if (key === 'rootFileNames' && Array.isArray(value)) {
                                        return value.map(fileName => path.relative(packageDetails.packageRoot, fileName));
                                    }
                                    return value;
                                },
                                2
                            ), 250, 250, 250, 250);
                        } finally {
                            console.timeEnd('Generating Condensed JSON');
                        }
                    }

                    annotatedCount++;

                    if (
                        options['output-annotated-source'] !== true
                        && options['output-json'] !== true
                        && options['output-markdown'] !== true
                    ) {
                        if (options['output-path'])
                            options.debug && console.log(`Skipping output: no specified output options.`);
                        else
                            console.log(results.json);
                        continue;
                    }

                    // TODO: Refactor to work with the OutputDetails class.

                    if (options['output-annotated-source'] === true) {
                        const annotatedOutputPath = path.resolve(outputDetails.directory, `${outputDetails.name}.${outputDetails.extension}`);
                        options.debug && console.log(`Writing annotated source: ${annotatedOutputPath}`);
                        await fs.mkdir(path.dirname(annotatedOutputPath), { recursive: true });
                        await fs.writeFile(annotatedOutputPath, `${results.annotated?.code ?? ''} `);
                    }

                    if (options['output-json'] === true) {
                        const resultsOutputPath = path.resolve(outputDetails.directory, `${outputDetails.name}.${outputDetails.extension}.json`);
                        options.debug && console.log(`Writing annotation results: ${resultsOutputPath}`);
                        await fs.mkdir(path.dirname(resultsOutputPath), { recursive: true });
                        await fs.writeFile(resultsOutputPath, `${results.json}\n`);
                    }

                    if (options['output-markdown'] === true) {
                        const markdownOutputPath = path.resolve(outputDetails.directory, `${outputDetails.name}.${outputDetails.extension}.md`);
                        const markdownOutput = [
                            `# ${sourceDetails.relativePath}`,
                            `## Source Code`,
                            `${'```'}${sourceDetails.extension}\n${sourceText}\n${'```'}`,
                            `## Annotated Code`,
                            results.annotated?.code != null
                                ? `${'```'}${sourceDetails.extension}\n${results.annotated.code}\n${'```'}`
                                : `${'```'}${sourceDetails.extension}\n${'```'}`,
                            `## Annotation Results`,
                            `${'```'} json\n${results.json}\n${'```'}`,
                        ];
                        const markdownOutputString = markdownOutput.join('\n\n');
                        options.debug && console.log(`Writing markdown: ${markdownOutputPath}`);
                        await fs.mkdir(path.dirname(markdownOutputPath), { recursive: true });
                        await fs.writeFile(markdownOutputPath, `${markdownOutputString}\n`);
                    }
                } catch (error) {
                    console.error(error);
                    exitCode = 1;
                } finally {
                    console.groupEnd();
                }
            }
        }

        // throw new Error(`Just checking!`);

    } catch (error) {
        thrownError = error;
        exitCode = 1;
    } finally {
        if (configuredOptions.help && handledSources.length > 0)
            console.warn(`\n🔴  Nothing was annotated. Using the "-h" or "--help" option ignores all other options.\n`);
        else if (handledSources.length > 0)
            console.log(`\n${annotatedCount === handledSources.length ? '🟢' : annotatedCount > 0 ? '🟡' : '🔴'}  Annotated ${annotatedCount} of ${handledSources.length} file${handledSources.length === 1 ? '' : 's'}.`);
        else if (!configuredOptions.help)
            console.warn(`\n🔴  Nothing to annotate. Use the "-h" or "--help" option to see available options.\n`);

        if (configuredOptions.help === true)
            // TODO: Implement help.
            console.log('🙃  Sorry, help is not yet implemented!');
        else if (
            annotatedCount === 0
            && Object.keys(configuredOptions).length > 0
            && !process.argv.includes('!')
            && !process.argv.includes('!!')
            && !process.argv.includes('!!!')
        )
            console.log('Specified Options: %o', configuredOptions);

        if (thrownError !== null) console.error(thrownError);
        if (exitCode > 0) process.exit(exitCode);
    }
}