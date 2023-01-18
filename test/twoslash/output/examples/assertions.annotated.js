// @ts-check
// @errors: 7027
// @strict: true
// @allowUnreachableCode: false

/** 
 * For this to work, it needs to have explicit type annotations on the declaration itself.
 * 
 * The expected behaviour is that code following a falsy assertion would be unreachable.
 * 
 * @return { asserts value } 
 */
export const assert1 = (value) => { if (!value) throw new Error('Expected true'); }

() => { assert1(false); assert1; };
//      ^?
// @errs: 
//

() => { assert1(false); assert1; };
//                      ^?
// @errs: [Error: 7027]: Unreachable code detected.
//

() => { assert1(true); assert1; };
//                     ^?
// @errs: 
//

/** 
 * This works because of the type annotation on the declaration.
 * 
 * @type { typeof assert1 } 
 */
export const assert2 = assert1;

() => { assert2(false); assert2; };
//      ^?
// @errs: 
//

() => { assert2(false); assert2; };
//                      ^?
// @errs: [Error: 7027]: Unreachable code detected.
//

() => { assert2(true); assert2; };
//                     ^?
// @errs: 
//

/** 
 * This does not work since there is type annotation on the declaration.
 */
export const assert3 = assert1;

() => { assert3(false); assert3; };
//      ^?
// @errs: [Error: 2775]: Assertions require every name in the call target to be declared with an explicit type annotation.
//

() => { assert3(false); assert3; };
//                      ^?
// @errs: 
//

() => { assert3(true); assert3; };
//                     ^?
// @errs: 
//

// @source: test/twoslash/examples/assertions.js
 