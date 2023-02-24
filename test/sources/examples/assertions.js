// @errors: 7027 2775 2502
// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/**
 * @example
 * 
 * For assertion functions to work, they need to have explicit type annotations on every declaration.
 * 
 * Their expected behaviour is that code following a falsy assertion would be unreachable.
 * 
 * @param {unknown} value
 * @returns { asserts value }
 */
export const assert1 = (value) => { if (!value) throw new Error('Expected true'); };

() => { assert1(false); assert1; };
//      ^?
// @errs:

() => { assert1(false); assert1; };
//                      ^?
// @errs:

() => { assert1(true); assert1; };
//                     ^?
// @errs:

/**
 * @example
 * 
 * The following works because of the type annotation on the declaration.
 * 
 * @type { typeof assert1 }
 */
export const assert2 = assert1;

() => { assert2(false); assert2; };
//      ^?
// @errs:

() => { assert2(false); assert2; };
//                      ^?
// @errs:

() => { assert2(true); assert2; };
//                     ^?
// @errs:

/**
 * @example
 * 
 * This does not work since there is no type annotation on the declaration.
 * 
 * @no-type-annotation
 */
export const assert3 = assert1;

() => { assert3(false); assert3; };
//      ^?
// @errs:

() => { assert3(false); assert3; };
//                      ^?
// @errs:

() => { assert3(true); assert3; };
//                     ^?
// @errs:

/**
 * @example
 * 
 * The following works because of the type annotation on the argument.
 * 
 * @param {(value) => asserts value} assert
 */
(
    /**/ assert
    //   ^?
    // @errs:
) => {

    /**/ assert(false);
    //   ^?
    // @errs:

    /**/ assert;
    //   ^?
    // @errs:

};

/**
 * @example
 * 
 * The following does not work because of a circularity problem.
 * 
 * @param {typeof assert1} assert
 */
(

    /**/ assert
    //   ^?
    // @errs:

) => {

    /**/ assert(false);
    //   ^?
    // @errs:

    /**/ assert;
    //   ^?
    // @errs:

};

/**
 * @example
 * 
 * The following does not work as well because of a circularity problem.
 * 
 * @param {typeof assert2} callAssertAnything
 */
(

    /**/ callAssertAnything
    //   ^?
    // @errs:

) => {

    /**/ callAssertAnything(false);
    //   ^?
    // @errs:

    /**/ callAssertAnything;
    //   ^?
    // @errs:

};

// @source: test/sources/examples/assertions.js
