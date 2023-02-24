export const condenseWellFormedJSONObjects = (json, limit = 120) =>
    json.replace(/(^(?<indent>\s+)(?:[^\n]+: )?)(?<opener>[{\[])\n(?<subindent>\s+)([^\n]+?(?:,\n\k<subindent>[^\n]+?)*?\n)\k<indent>(?<closer>[}\]])/gm, (match, head, indent, opener, subindent, body, closer) => {
        if (!((opener === '{' && closer === '}') || (opener === '[' && closer === ']')))
            throw new Error(`Unmatched json group: "${match}"\n`);
        const replacement = `${head}${opener === '{' ? `{ ` : opener}${body.trim().replace(/\n\s*/g, ' ')}${closer === '}' ? ' }' : closer}`;
        return replacement && (limit === Infinity || replacement.trim().length < limit) ? replacement : match;
    });

condenseWellFormedJSONObjects.reduce = (json, ...limits) => limits.reduce(condenseWellFormedJSONObjects, json);

/**
 * @template T
 * @param {T} value
 * @param {(this: any, key: string, value: any) => any|(number|string)[]} [replacer]
 * @returns {T extends object ? Partial<infer T> : infer T}
 */
export const reparse = (value, replacer) => JSON.parse(JSON.stringify(value, replacer));