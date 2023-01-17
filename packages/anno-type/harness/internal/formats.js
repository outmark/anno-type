// @ts-check

/** 
 * @template {{format: Format, extensions?: Iterable<Extension>  | undefined, parameter?: Parameter | undefined, default?: boolean | undefined}} T 
 * @template {string} Format
 * @template {string} Extension
 * @template {string} Parameter
 */
export class OutputFormatDefinitions extends Array {

    /** @param  {...T} outputs  */
    constructor(...outputs) {

        const definitions = [];

        /** @type {{[name in Parameter & string]: T['default']}} */
        const defaults = Object.setPrototypeOf({}, null)

        /** @type {{[format in Format & string]: T}} */
        const formatMap = Object.setPrototypeOf({}, null);

        /** @type {{[extension in Extension & string]: T}} */
        const extensionMap = Object.setPrototypeOf({}, null);

        /** @type {{[parameter in Parameter & string]: T}} */
        const parameterMap = Object.setPrototypeOf({}, null);


        for (const output of outputs) {
            const definition = { ...output };

            if (typeof definition.format !== 'string')
                throw new TypeError(`Output format must be a string, got ${typeof definition.format}.`);

            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(definition.format))
                throw new Error(`Invalid output format in definitions: ${definition.format}`);

            if (formatMap[definition.format] != null)
                throw new Error(`Duplicate output format in definitions: ${definition.format}`);

            formatMap[definition.format] = definition;

            if (definition.extensions != null) {
                if (typeof definition.extensions?.[Symbol.iterator] !== 'function')
                    throw new TypeError(`Output extensions must be an iterable, got ${typeof definition.extensions}.`);

                for (const extension of new Set(definition.extensions)) {
                    if (!/^[a-z0-9_][\w.]*$/.test(extension))
                        throw new Error(`Invalid output extension in definitions: ${extension}`);

                    if (extensionMap[extension] != null)
                        throw new Error(`Duplicate output extension in definitions: ${extension}`);

                    extensionMap[extension] = definition;

                }
            }

            if (definition.parameter != null) {
                if (typeof definition.format !== 'string')
                    throw new TypeError(`Output parameter must be a string, got ${typeof definition.parameter}.`);

                if (!/^output(?:-[a-z0-9]+)+$/.test(definition.parameter))
                    throw new Error(`Invalid output parameter in definitions: ${definition.parameter}`);

                if (parameterMap[definition.parameter] != null)
                    throw new Error(`Duplicate output parameter in definitions: ${definition.parameter}`);

                parameterMap[definition.parameter] = definition;
            }


            if (definition.default != null) {
                if (typeof definition.default !== 'boolean')
                    throw new TypeError(`Output default is optional but must be a boolean, got ${typeof definition.default}.`);

                if (definition.parameter == null)
                    throw new Error(`Output default is optional but requires a parameter.`);

                defaults[definition.parameter] = definition.default;
            }

            definitions.push(Object.freeze(definition));
        }

        super(...definitions);

        this.defaults = Object.freeze(defaults);
        this.mappings = Object.freeze({
            formats: Object.freeze(formatMap),
            extensions: Object.freeze(extensionMap),
            parameters: Object.freeze(parameterMap),
        });

        Object.freeze(this);
    }

    /** 
     * @param {... string} specifiedFormats 
     */
    optionsFor(...specifiedFormats) {
        const specifiedParameters = /** @type {Set<string>} */ (new Set());
        const unsupportedFormats = /** @type {string[]} */ ([]);
        const mutatedOptions = {};

        if (specifiedFormats.length > 0) {
            for (const specifiedFormat of specifiedFormats) {
                const mapping =
                    this.mappings.formats[specifiedFormat]
                    ?? this.mappings.extensions[specifiedFormat]
                    ?? null;
                mapping == null
                    ? unsupportedFormats.push(specifiedFormat)
                    : specifiedParameters.add(mapping.parameter);
            }

            if (unsupportedFormats.length === specifiedFormats.length)
                throw new Error(`Unsupported output format${unsupportedFormats.length === 1 ? '' : 's'}: ${[...unsupportedFormats].join(', ')}`);

            for (const parameter in this.mappings.parameters)
                mutatedOptions[parameter] = specifiedParameters.has(parameter);
        }

        // console.log({ specifiedFormats, specifiedParameters, unsupportedFormats, mutatedOptions });

        return { ... this.defaults, ...mutatedOptions, [OutputFormatDefinitions.unsupportedFormats]: unsupportedFormats };
    }

    static unsupportedFormats = Symbol('UnsupportedFormats');
}

export const UnsupportedFormats = Symbol('UnsupportedFormats');