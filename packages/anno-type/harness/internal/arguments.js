/**
 * Command line argument matcher with named capture groups.
 */
export const CommandLineArgumentGroupMatcher =
    // [
    //     Object.create({
    //         '[[RegExp]]': new RegExp(String.raw`
    //             ^-(?:
    //                 (?:(?<flagPrefix>!)(?=[a-z]+$))?
    //                 (?<flags>[a-z]+(?=$))
    //                 |(?<flag>[a-z])(?==|[0-9]*$)
    //                 |-(?:
    //                     (?:(?<parameterPrefix>no|dont(?=-use-))-(?=[a-z]+(?:-[a-z0-9]+)*$))?
    //                     (?<parameter>[a-z]+(?:-[a-z0-9]+)*?)(?==|$)
    //                 )
    //             )(?:(?<valuePrefix>=)?(?<value>.+)?)?$|
    //         `.replace(/^\s*|\s*\n+\s*|\s*$/g, ''), 'i')
    //     }),
    //     `-flags`, `-!flags`, `-f0`, `-f=0`,
    //     `--param`, `--no-param`, `--other-param`, `--param=0`, `--other-param=1`, `--empty-param=`,
    //     `anything`,
    // ].reduce((r, v) => (r[JSON.stringify(v = v.trim())] = r['[[RegExp]]'].exec(v)?.groups, r));
    // // 
    /** @type {import('./expressions.js').GroupCaptureRegExp<'flagPrefix'|'flags'|'flag'|'parameterPrefix'|'parameter'|'valuePrefix'|'value'>} */
    (/^-(?:(?:(?<flagPrefix>!)(?=[a-z]+$))?(?<flags>[a-z]+(?=$))|(?<flag>[a-z])(?==|[0-9]*$)|-(?:(?:(?<parameterPrefix>no|dont(?=-use-))-(?=[a-z]+(?:-[a-z0-9]+)*$))?(?<parameter>[a-z]+(?:-[a-z0-9]+)*?)(?==|$)))(?:(?<valuePrefix>=)?(?<value>.+)?)?$|/i);

export const TruthyArgumentValueMatcher = /^(?:true|yes|on|1)$/i;
export const FalsyArgumentValueMatcher = /^(?:false|no|off|0)$/i;
export const NumericArgumentValueMatcher = /^-?[0-9]+(?:\.[0-9]+)?$/;

export const PrimitiveArgumentValueMatcher =
    /** @type {import('./expressions.js').GroupCaptureRegExp<'truthy' | 'falsy' | 'numeric' | 'string'>} */
    (/^(?:(?<truthy>true|yes|on)|(?<falsy>false|no|off)|(?<numeric>-?[0-9]+(?:\.[0-9]+)?)|(?<string>.+))$|/i);

/**
 * @template {string} flag
 * @template {string} parameter
 * @template {string} group
 */
export class ArgumentParser {
    static defaults = Object.freeze({
        argumentMatcher: CommandLineArgumentGroupMatcher,
    });

    $options;

    /** 
     * @param {ArgumentParserOptions<flag, parameter, group> | undefined} options 
     */
    constructor(options) {

        /** @type {Partial<ArgumentParserInstanceOptions<flag, parameter, group>> & ArgumentParser.defaults} */
        const defaults = { ...ArgumentParser.defaults, ... new.target.defaults };

        let { argumentMatcher, parameterGroups, parameterGroupsMatcher, keyMappings } = defaults;

        if (options?.argumentMatcher) {
            if (argumentMatcher == null)
                throw new TypeError(`Argument matcher is omitted in the class defaults but specified in options.`);

            if (!(argumentMatcher instanceof RegExp))
                throw new TypeError(`Argument matcher in class defaults must be a RegExp or undefined.`);

            if (!(options.argumentMatcher instanceof RegExp))
                throw new TypeError(`Argument matcher must be a RegExp, got ${typeof options.argumentMatcher}.`);

            if (this.parse === new.target.prototype.parse) {
                const expectedGroups = argumentMatcher.exec('')?.groups ?? undefined;

                if (typeof expectedGroups === 'object') {
                    const actualGroups = options.argumentMatcher.exec('')?.groups ?? undefined;
                    const missingGroups = typeof actualGroups === 'object'
                        ? Object.keys(expectedGroups).filter(group => !(group in actualGroups))
                        : Object.keys(expectedGroups);

                    if (missingGroups.length)
                        throw new TypeError(`Argument matcher capture groups { ${missingGroups.join(', ')} are missing }.`);
                } else if (this.parse === ArgumentParser.prototype.parse) {
                    throw new TypeError(`Argument matcher in class defaults must have named capture groups.`);
                }
            }

            argumentMatcher = /** @type {CommandLineArgumentGroupMatcher} */ (options.argumentMatcher);
        }

        if (options?.keyMappings) {
            for (const [key, mapping] of Object.entries(options.keyMappings))
                if (typeof key !== 'string' || typeof mapping !== 'string')
                    throw new TypeError(`Key mappings must be strings, got ${typeof key} and ${typeof mapping}.`);

            keyMappings = Object.freeze(Object.setPrototypeOf({ ...options.keyMappings }, null));
        }

        if (options?.parameterGroups) {

            for (const group of options.parameterGroups)
                if (typeof group !== 'string')
                    throw new TypeError(`Parameter groups must be a string, got ${typeof group}.`);

            parameterGroups = Object.freeze([... new Set(options.parameterGroups)]);
            parameterGroupsMatcher = new RegExp(`^--(${parameterGroups.join('|')})(?:-|$)|`, 'i');
        }

        /** @type {Readonly<ArgumentParserInstanceOptions<flag, parameter, group>>} */
        this.$options = Object.freeze({
            ...defaults,
            argumentMatcher,
            parameterGroups,
            parameterGroupsMatcher,
            keyMappings,
        });

    }

    get argumentMatcher() {
        return this.$options.argumentMatcher;
    }

    get keyMappings() {
        return this.$options.keyMappings;
    }

    get parameterGroups() {
        return this.$options.parameterGroups;
    }

    /** 
     * Returns a parser generator instance.
     * 
     * @param {...T} arguments
     * @template T
     */
    *parse() {
        for (const [indexString, argument] of Object.entries([...arguments])) {
            if (typeof argument !== 'string')
                throw new TypeError(`Argument must be a string, got ${typeof argument}.`);

            const match = (/** @type {ArgumentParser.defaults['argumentMatcher']} */(this.$options.argumentMatcher))?.exec(argument);

            if (match == null)
                throw new Error(`Argument matcher did not return a match when expected.`);

            const partialRecord = {};

            partialRecord.argument = argument;
            partialRecord.index = parseInt(indexString);
            partialRecord.matched = (match?.groups) ?? undefined;

            if (partialRecord.matched.value)
                partialRecord.value = this.parseValue(partialRecord.matched.value);
            else if (partialRecord.matched.valuePrefix === '=')
                partialRecord.value = '';

            if (partialRecord.matched?.flags || partialRecord.matched?.flag) {
                for (const flag of /** @type {Iterable<flag>} */ (partialRecord.matched.flags || partialRecord.matched.flag)) {
                    const partialFlagRecord = {};

                    partialFlagRecord.key = this.keyFrom(`-${/** @type {flag} */ (flag)}`);
                    partialFlagRecord.parameter = this.parameterFor(partialFlagRecord.key);
                    partialFlagRecord.value = partialRecord.matched.flagPrefix === '!' ? false : partialRecord.value ?? true;

                    yield this.createParsedArgumentRecord({ ...partialRecord, ...partialFlagRecord });
                }
            } else if (partialRecord.matched?.parameter) {
                const partialParameterRecord = {};

                partialParameterRecord.key = this.keyFrom(`--${/** @type {parameter} */ (partialRecord.matched.parameter)}`);
                partialParameterRecord.parameter = this.parameterFor(partialParameterRecord.key) ?? /** @type {parameter} */(partialRecord.matched.parameter);
                partialParameterRecord.value = partialRecord.matched.parameterPrefix && /^(?:no|dont)$/i.test(partialRecord.matched.parameterPrefix) ? false : partialRecord.value ?? true;

                yield this.createParsedArgumentRecord({ ...partialRecord, ...partialParameterRecord });
            } else {
                yield this.createParsedArgumentRecord(partialRecord);
            }
        }

    }

    parseValue(value) {
        const { truthy, falsy, numeric, string } = PrimitiveArgumentValueMatcher.exec(value ?? '').groups;
        return truthy ? true : falsy ? false : numeric ? parseFloat(numeric) : string;
    }

    /** 
     * @param {ParameterKey<parameter> | FlagKey<flag> | string} key
     * @returns {key extends ParameterKey ? ParameterKey<parameter> : FlagKey<flag>}
     */
    keyFrom(key) {
        return this.$options.keyMappings?.[key] ?? key;
    }

    /** 
     * @template {parameter} T 
     * @param {ParameterKey<T> | string} key
     */
    parameterFor(key) {
        // console.log(`parameterFor(${key}) => %o`, this.$options.argumentMatcher.exec(key)?.groups);
        return (/** @type {T} */ (this.$options.argumentMatcher?.exec(key)?.groups?.parameter)) ?? undefined;
    }

    /** 
     * @template {group} T
     * @param {ParameterKey<T> | ParameterKey<`${T}-${string}`> | string} key
     */
    groupFor(key) {
        return (/** @type {T} */ (this.$options.parameterGroupsMatcher?.exec?.(key)?.[1])) ?? undefined;
    }

    /**
     * @param {Partial<ArgumentParserRecordArguments<flag, parameter, group>>} arguments 
     */
    createParsedArgumentRecord({
        index,
        argument,
        matched,
        key,
        flag,
        parameter,
        group = (key && this.groupFor(key)) ?? undefined,
        value,
    }) {
        return Object.freeze(/** @type {ParsedArgument<flag, parameter, group>} */(
            Object.setPrototypeOf({ index, argument, flag, parameter, group, key, value, matched }, ParsedArgument.prototype)
        ));
    }

}

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @template {string} [group = string]
 * @template [value = any]
 * @implements {ArgumentParserRecord<flag, parameter, group, value>}
 */
class ParsedArgument {
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return JSON.parse(JSON.stringify(this));
    }

    /** @type {number} */
    index;
    /** @type {string} */
    argument;
    /** @type {flag | undefined} */
    flag;
    /** @type {parameter | undefined} */
    parameter;
    /** @type {group | undefined} */
    group;
    /** @type {`-${flag}` | `--${parameter}` | `--${group}-${string}` | `--${group}` | undefined} */
    key;
    /** @type {value} */
    value;
    /** @type { Record<string, string|undefined>} */
    matched;
}

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @typedef  {{[name: `-${string}` | `--${string}`]: `-${flag}` | `--${parameter}`}} ArgumentKeyMappings
 */

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @template {string} [group = string]
 * @typedef {Partial<ArgumentParserInstanceOptions<flag, parameter, group>> & {parameterGroups?: Iterable<group>}} ArgumentParserOptions
*/

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @template {string} [group = string]
 * @typedef {{argumentMatcher: import('./expressions.js').GroupCaptureRegExp, keyMappings?: Readonly<ArgumentKeyMappings<flag, parameter>>, parameterGroups?: Readonly<group[]>, parameterGroupsMatcher?:RegExp}} ArgumentParserInstanceOptions
 */

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @template {string} [group = string]
 * @template [value = any]
 * @typedef {{argument: string, index: number, flag: flag | undefined, parameter: parameter | undefined, group: group | undefined, key: `-${flag}` | `--${parameter}` | `--${group}-${string}` | `--${group}` | undefined, value: value, matched?: Record<string, string|undefined>}} ArgumentParserRecord
 */

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @template {string} [group = string]
 * @typedef {Partial<ArgumentParserRecord<flag, parameter, group>> & Pick<ArgumentParserRecord<flag, parameter, group>, 'argument'|'index'>} ArgumentParserRecordArguments
 */

/**
 * @template {string} [flag = string]
 * @typedef {`-${flag}`} FlagKey
 */

/**
 * @template {string} [parameter = string]
 * @typedef {`--${parameter}`} ParameterKey
 */

/**
 * @template {string} [flag = string]
 * @template {string} [parameter = string]
 * @typedef {FlagKey<flag> | ParameterKey<parameter>} ArgumentKey
 */
