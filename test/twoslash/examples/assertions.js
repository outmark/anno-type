// @ts-check
// @errors: 7027
// @strict: true
// @allowUnreachableCode: false

/** @param {*} value @return { asserts value } */
export const asserts = (value) => { if (!value) throw new Error('Expected true'); }

() => { asserts(false); asserts; };
//                      ^?
// @defs:

/** @param {*} value @return { asserts never } */
export const neverAsserts = (value) => { }

() => { neverAsserts(false); neverAsserts; };
//                           ^?
// @defs:

// @source: test/twoslash/examples/assertions.js
