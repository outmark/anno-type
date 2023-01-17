// @ts-check
// @errors: 7027
// @strict: true
// @allowUnreachableCode: false

/** @param {*} value @return { asserts value } */
export const asserts = (value) => { if (!value) throw new Error('Expected true'); }

() => { asserts(false); asserts; };
//                      ^?
// @defs: const asserts: (value: any) => asserts value
//        [Error: 7027]: Unreachable code detected.
//

/** @param {*} value @return { asserts never } */
export const neverAsserts = (value) => { }

() => { neverAsserts(false); neverAsserts; };
//                           ^?
// @defs: const neverAsserts: (value: any) => asserts never
//

// @source: test/twoslash/examples/assertions.js
 