// @ts-check

/**
 * @template {string} [K=string]
 * @template {string|undefined} [V=string|undefined]
 * @template {RegExpExecArray|RegExpMatchArray} [T=RegExpExecArray|RegExpMatchArray]
 * @typedef {T & {groups: {[name in K]: V}}} GroupCaptureRegExpArray
 */

/**
 * @template {string} [K=string]
 * @template {string|undefined} [V=string|undefined]
 * @typedef {GroupCaptureRegExpArray<K, V, RegExpExecArray>} GroupCaptureRegExpExecArray
 */

/**
 * @template {string} [K=string]
 * @template {string|undefined} [V=string|undefined]
 * @typedef {GroupCaptureRegExpArray<K, V, RegExpMatchArray>} GroupCaptureRegExpMatchArray
 */

/**
 * @template {string} [K=string]
 * @template {string|undefined} [V=string|undefined]
 */
export class GroupCaptureRegExp extends RegExp {
    /**
     * @param {GroupCaptureRegExp<K, V> | GroupCaptureRegExp<K,V>['source'] | RegExp | string} source 
     * @param {string} [flags]
     */
    constructor(source, flags) {
        // @ts-ignore
        super(...arguments);
    }

    exec() {
        return /** @type {GroupCaptureRegExpExecArray<K, V>} */ (
            // @ts-ignore
            super.exec(...arguments)
        );
    }

    [Symbol.match]() {
        return /** @type {GroupCaptureRegExpMatchArray<K, V>} */ (
            // @ts-ignore
            super[Symbol.match](...arguments)
        );
    }

    [Symbol.matchAll]() {
        return /** @type {IterableIterator<GroupCaptureRegExpMatchArray<K, V>>} */ (
            // @ts-ignore
            super[Symbol.matchAll](...arguments)
        );
    }
}