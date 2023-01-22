**Source Code**

```js
// @ts-check
// @errors: 7027 2775 2502
// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/**
 * @example
 * 
 * For assertion functions to work, they needs to have explicit type annotations on every declaration.
 * 
 * Their expected behaviour is that code following a falsy assertion would be unreachable.
 * 
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

// @source: test/twoslash/examples/assertions.js

```

**Annotated Code**

```js
// @ts-check
// @errors: 7027 2775 2502
// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/**
 * @example
 * 
 * For assertion functions to work, they needs to have explicit type annotations on every declaration.
 * 
 * Their expected behaviour is that code following a falsy assertion would be unreachable.
 * 
 * @returns { asserts value }
 */
export const assert1 = (value) => { if (!value) throw new Error('Expected true'); };

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
 * @example
 * 
 * This does not work since there is no type annotation on the declaration.
 * 
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
    //
) => {

    /**/ assert(false);
    //   ^?
    // @errs: 
    //

    /**/ assert;
    //   ^?
    // @errs: [Error: 7027]: Unreachable code detected.
    //

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
    // @errs: [Error: 2502]: 'assert' is referenced directly or indirectly in its own type annotation.
    //

) => {

    /**/ assert(false);
    //   ^?
    // @errs: 
    //

    /**/ assert;
    //   ^?
    // @errs: 
    //

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
    // @errs: [Error: 2502]: 'callAssertAnything' is referenced directly or indirectly in its own type annotation.
    //

) => {

    /**/ callAssertAnything(false);
    //   ^?
    // @errs: 
    //

    /**/ callAssertAnything;
    //   ^?
    // @errs: 
    //

};

// @source: test/twoslash/examples/assertions.js

```

**Annotation Results**

``` json
{
  "annotated": {
    "code": "// @ts-check\n// @errors: 7027 2775 2502\n// @strict: true\n// @allowUnreachableCode: false\n// @noImplicitAny: true\n\n/**\n * @example\n * \n * For assertion functions to work, they needs to have explicit type annotations on every declaration.\n * \n * Their expected behaviour is that code following a falsy assertion would be unreachable.\n * \n * @returns { asserts value }\n */\nexport const assert1 = (value) => { if (!value) throw new Error('Expected true'); };\n\n() => { assert1(false); assert1; };\n//      ^?\n// @errs: \n//\n\n() => { assert1(false); assert1; };\n//                      ^?\n// @errs: [Error: 7027]: Unreachable code detected.\n//\n\n() => { assert1(true); assert1; };\n//                     ^?\n// @errs: \n//\n\n/**\n * @example\n * \n * The following works because of the type annotation on the declaration.\n * \n * @type { typeof assert1 }\n */\nexport const assert2 = assert1;\n\n() => { assert2(false); assert2; };\n//      ^?\n// @errs: \n//\n\n() => { assert2(false); assert2; };\n//                      ^?\n// @errs: [Error: 7027]: Unreachable code detected.\n//\n\n() => { assert2(true); assert2; };\n//                     ^?\n// @errs: \n//\n\n/**\n * @example\n * \n * This does not work since there is no type annotation on the declaration.\n * \n */\nexport const assert3 = assert1;\n\n() => { assert3(false); assert3; };\n//      ^?\n// @errs: [Error: 2775]: Assertions require every name in the call target to be declared with an explicit type annotation.\n//\n\n() => { assert3(false); assert3; };\n//                      ^?\n// @errs: \n//\n\n() => { assert3(true); assert3; };\n//                     ^?\n// @errs: \n//\n\n/**\n * @example\n * \n * The following works because of the type annotation on the argument.\n * \n * @param {(value) => asserts value} assert\n */\n(\n    /**/ assert\n    //   ^?\n    // @errs: \n    //\n) => {\n\n    /**/ assert(false);\n    //   ^?\n    // @errs: \n    //\n\n    /**/ assert;\n    //   ^?\n    // @errs: [Error: 7027]: Unreachable code detected.\n    //\n\n};\n\n/**\n * @example\n * \n * The following does not work because of a circularity problem.\n * \n * @param {typeof assert1} assert\n */\n(\n\n    /**/ assert\n    //   ^?\n    // @errs: [Error: 2502]: 'assert' is referenced directly or indirectly in its own type annotation.\n    //\n\n) => {\n\n    /**/ assert(false);\n    //   ^?\n    // @errs: \n    //\n\n    /**/ assert;\n    //   ^?\n    // @errs: \n    //\n\n};\n\n/**\n * @example\n * \n * The following does not work as well because of a circularity problem.\n * \n * @param {typeof assert2} callAssertAnything\n */\n(\n\n    /**/ callAssertAnything\n    //   ^?\n    // @errs: [Error: 2502]: 'callAssertAnything' is referenced directly or indirectly in its own type annotation.\n    //\n\n) => {\n\n    /**/ callAssertAnything(false);\n    //   ^?\n    // @errs: \n    //\n\n    /**/ callAssertAnything;\n    //   ^?\n    // @errs: \n    //\n\n};\n\n// @source: test/twoslash/examples/assertions.js\n"
  },
  "twoslash": {
    "code": "// @ts-check\n\n/**\n * @example\n * \n * For assertion functions to work, they needs to have explicit type annotations on every declaration.\n * \n * Their expected behaviour is that code following a falsy assertion would be unreachable.\n * \n * @returns { asserts value }\n */\nexport const assert1 = (value) => { if (!value) throw new Error('Expected true'); };\n\n() => { assert1(false); assert1; };\n// @errs:\n\n() => { assert1(false); assert1; };\n// @errs:\n\n() => { assert1(true); assert1; };\n// @errs:\n\n/**\n * @example\n * \n * The following works because of the type annotation on the declaration.\n * \n * @type { typeof assert1 }\n */\nexport const assert2 = assert1;\n\n() => { assert2(false); assert2; };\n// @errs:\n\n() => { assert2(false); assert2; };\n// @errs:\n\n() => { assert2(true); assert2; };\n// @errs:\n\n/**\n * @example\n * \n * This does not work since there is no type annotation on the declaration.\n * \n */\nexport const assert3 = assert1;\n\n() => { assert3(false); assert3; };\n// @errs:\n\n() => { assert3(false); assert3; };\n// @errs:\n\n() => { assert3(true); assert3; };\n// @errs:\n\n/**\n * @example\n * \n * The following works because of the type annotation on the argument.\n * \n * @param {(value) => asserts value} assert\n */\n(\n    /**/ assert\n    // @errs:\n) => {\n\n    /**/ assert(false);\n    // @errs:\n\n    /**/ assert;\n    // @errs:\n\n};\n\n/**\n * @example\n * \n * The following does not work because of a circularity problem.\n * \n * @param {typeof assert1} assert\n */\n(\n\n    /**/ assert\n    // @errs:\n\n) => {\n\n    /**/ assert(false);\n    // @errs:\n\n    /**/ assert;\n    // @errs:\n\n};\n\n/**\n * @example\n * \n * The following does not work as well because of a circularity problem.\n * \n * @param {typeof assert2} callAssertAnything\n */\n(\n\n    /**/ callAssertAnything\n    // @errs:\n\n) => {\n\n    /**/ callAssertAnything(false);\n    // @errs:\n\n    /**/ callAssertAnything;\n    // @errs:\n\n};\n\n",
    "extension": "js",
    "highlights": [],
    "queries": [
      {
        "docs": "",
        "kind": "query",
        "start": 364,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 8,
        "line": 14
      },
      {
        "docs": "",
        "kind": "query",
        "start": 427,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 24,
        "line": 17
      },
      {
        "docs": "",
        "kind": "query",
        "start": 473,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 23,
        "line": 20
      },
      {
        "docs": "",
        "kind": "query",
        "start": 667,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 8,
        "line": 32
      },
      {
        "docs": "",
        "kind": "query",
        "start": 730,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 24,
        "line": 35
      },
      {
        "docs": "",
        "kind": "query",
        "start": 776,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 23,
        "line": 38
      },
      {
        "docs": "",
        "kind": "query",
        "start": 944,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 8,
        "line": 49
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1007,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 24,
        "line": 52
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1053,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 23,
        "line": 55
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1230,
        "length": 49,
        "text": "(parameter) assert: (value: any) => asserts value",
        "offset": 9,
        "line": 66
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1268,
        "length": 49,
        "text": "(parameter) assert: (value: any) => asserts value",
        "offset": 9,
        "line": 70
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1307,
        "length": 49,
        "text": "(parameter) assert: (value: any) => asserts value",
        "offset": 9,
        "line": 73
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1473,
        "length": 23,
        "text": "(parameter) assert: any",
        "offset": 9,
        "line": 87
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1512,
        "length": 23,
        "text": "(parameter) assert: any",
        "offset": 9,
        "line": 92
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1551,
        "length": 23,
        "text": "(parameter) assert: any",
        "offset": 9,
        "line": 95
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1737,
        "length": 35,
        "text": "(parameter) callAssertAnything: any",
        "offset": 9,
        "line": 109
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1788,
        "length": 35,
        "text": "(parameter) callAssertAnything: any",
        "offset": 9,
        "line": 114
      },
      {
        "docs": "",
        "kind": "query",
        "start": 1839,
        "length": 35,
        "text": "(parameter) callAssertAnything: any",
        "offset": 9,
        "line": 117
      }
    ],
    "staticQuickInfos": [
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 283,
        "length": 7,
        "line": 11,
        "character": 13,
        "targetString": "assert1"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 294,
        "length": 5,
        "line": 11,
        "character": 24,
        "targetString": "value"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 311,
        "length": 5,
        "line": 11,
        "character": 41,
        "targetString": "value"
      },
      {
        "text": "var Error: ErrorConstructor\nnew (message?: string | undefined) => Error",
        "docs": "",
        "start": 328,
        "length": 5,
        "line": 11,
        "character": 58,
        "targetString": "Error"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 364,
        "length": 7,
        "line": 13,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 380,
        "length": 7,
        "line": 13,
        "character": 24,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 411,
        "length": 7,
        "line": 16,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 427,
        "length": 7,
        "line": 16,
        "character": 24,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 458,
        "length": 7,
        "line": 19,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 473,
        "length": 7,
        "line": 19,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 639,
        "length": 7,
        "line": 29,
        "character": 13,
        "targetString": "assert2"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 649,
        "length": 7,
        "line": 29,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 667,
        "length": 7,
        "line": 31,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 683,
        "length": 7,
        "line": 31,
        "character": 24,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 714,
        "length": 7,
        "line": 34,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 730,
        "length": 7,
        "line": 34,
        "character": 24,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 761,
        "length": 7,
        "line": 37,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "",
        "start": 776,
        "length": 7,
        "line": 37,
        "character": 23,
        "targetString": "assert2"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 916,
        "length": 7,
        "line": 46,
        "character": 13,
        "targetString": "assert3"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "",
        "start": 926,
        "length": 7,
        "line": 46,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 944,
        "length": 7,
        "line": 48,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 960,
        "length": 7,
        "line": 48,
        "character": 24,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 991,
        "length": 7,
        "line": 51,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 1007,
        "length": 7,
        "line": 51,
        "character": 24,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 1038,
        "length": 7,
        "line": 54,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "",
        "start": 1053,
        "length": 7,
        "line": 54,
        "character": 23,
        "targetString": "assert3"
      },
      {
        "text": "(parameter) assert: (value: any) => asserts value",
        "docs": "",
        "start": 1230,
        "length": 6,
        "line": 65,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) assert: (value: any) => asserts value",
        "docs": "",
        "start": 1268,
        "length": 6,
        "line": 69,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) assert: (value: any) => asserts value",
        "docs": "",
        "start": 1307,
        "length": 6,
        "line": 72,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) assert: any",
        "docs": "",
        "start": 1473,
        "length": 6,
        "line": 86,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) assert: any",
        "docs": "",
        "start": 1512,
        "length": 6,
        "line": 91,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) assert: any",
        "docs": "",
        "start": 1551,
        "length": 6,
        "line": 94,
        "character": 9,
        "targetString": "assert"
      },
      {
        "text": "(parameter) callAssertAnything: any",
        "docs": "",
        "start": 1737,
        "length": 18,
        "line": 108,
        "character": 9,
        "targetString": "callAssertAnything"
      },
      {
        "text": "(parameter) callAssertAnything: any",
        "docs": "",
        "start": 1788,
        "length": 18,
        "line": 113,
        "character": 9,
        "targetString": "callAssertAnything"
      },
      {
        "text": "(parameter) callAssertAnything: any",
        "docs": "",
        "start": 1839,
        "length": 18,
        "line": 116,
        "character": 9,
        "targetString": "callAssertAnything"
      }
    ],
    "errors": [
      {
        "category": 1,
        "code": 7006,
        "length": 5,
        "start": 294,
        "line": 11,
        "character": 24,
        "renderedMessage": "Parameter 'value' implicitly has an 'any' type.",
        "id": "err-7006-294-5"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 380,
        "line": 13,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-380-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 427,
        "line": 16,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-427-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 683,
        "line": 31,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-683-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 730,
        "line": 34,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-730-8"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 944,
        "line": 48,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-944-7"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 991,
        "line": 51,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-991-7"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 1038,
        "line": 54,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-1038-7"
      },
      {
        "category": 1,
        "code": 7006,
        "length": 5,
        "start": 1183,
        "line": 62,
        "character": 12,
        "renderedMessage": "Parameter 'value' implicitly has an 'any' type.",
        "id": "err-7006-1183-5"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 7,
        "start": 1307,
        "line": 72,
        "character": 9,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-1307-7"
      },
      {
        "category": 1,
        "code": 2502,
        "length": 6,
        "start": 1473,
        "line": 86,
        "character": 9,
        "renderedMessage": "'assert' is referenced directly or indirectly in its own type annotation.",
        "id": "err-2502-1473-6"
      },
      {
        "category": 1,
        "code": 2502,
        "length": 18,
        "start": 1737,
        "line": 108,
        "character": 9,
        "renderedMessage": "'callAssertAnything' is referenced directly or indirectly in its own type annotation.",
        "id": "err-2502-1737-18"
      }
    ],
    "playgroundURL": "https://www.typescriptlang.org/play/#code/PTAEAEBcGcFoGMAWBTeBrAUCCyBOuB7XaALlAHYAGAJnNFvIFZ7GasxxpJcBLeSMtwCuydhACGAG0kEA7gFUAdrmTik4gEaTkAYQIATZGQBmU6KOzhFBAJIBbAA6S+PSAEFFAT0G4RGLABUARigATgAHuKO2iFhsaAAYkSg4tDmuJA8BIqgxkKK-FmK0KCQBKCyRGgANKUonqCKyMj6JWWgiOIAbsigyOFOLpClng694orWkOKZ2SXZfT24DYbwkuK4M0UAdPHxACooPLh9A6iQLaAayJ1dWUInPG2dw-AGvcYE0nI8igDmKVyZgaqXSsxylSEkn0V16+RUak6WmQu1CoHi4BUkAexVAAG8Umk8DBQF0pCJQABfWLADD9BxEV5zYag4kARlAAF5QAAKMmSEQASi5AD58aAeMZeQBCflCuqEWSNZBKgCi+CIPIA5KqzvxLsJkFrBQBuKkm-w84WcsUE1kZNk80yScymwlgtlmykW7CgP1+gB6AH4xOA8MQSJbrbb3eynWZkG77ZBPeaxP6M5ms-7g6Hw6Qo6LxcnHYak0SHV6fWBs7XM7nLPnI4Fgmiw5FoqI0QcULkvjJZL8AZVcGgStd4OIhOZQAQpZBe5BRuNJgRpuDZzkF71VutNuDUXE20uxuKT8g57GHVSaXSBozQG9iiyK5BqFyrymLRgrUW7a-qHjF1EzNZNqCrdMMwbDgm0LG1iwAoDXVAgCIN9OsMNAaCcHwAsf2jBCwUAssUKItCa0w2tsLDXDm2AIIMX6KInC7I8wkOJ5QH0AhkBKKYKiqUBoF+eBem3FQJT48pzxSVd1yKTc6h3VA9y2bJD3RUJaXpB8ny4T8AGYPxLb9f3g-8wQMpCQMM8is2o2D8L-QzrPLSy7MousHNouCY2TKySNstN0M8+sQ0bHyW0YjsWL2NFDg+fsfn+ATR3HVApxnS9txGU8JimNScgWHKNj+IQ7GQRRIA0jEHA2KJ8T5clEyLZMSjlZBKU-W8eRCf16ICMBkz6v10NzDMIojDACLxfwJqCIbX1ci0Joo8b+pgyL5sGz8Vo2nMQ1WnCpowb1-AG6LmJibt4t7T5vkHFLuN4xo11StBYUnadekvcRH2OeAoQ2VwGgcQhkTsGq2zqzY7Hxc9ftfNkuuGrSfzm-qFu6o7A0O-aaJOmaMdGrHk2WkbQDGvHRs2k7tsWsE9ppg6KcmvCzqitsmM7OL2LupLHoBZ6pOGEcPtSCpkGkT7Mp+qU-vgAGgd4JdQDBggIahsJwBhhq8QR+WAK6ydpDcV8PE8Bchx64nKaxk3JDNsELat-5WbW6nKdpvCidZ+2pEd82vFdv5yZxrDPbZ5t6cfAOneJF3ECHJmvZZo6CfZ79LGgAgHlEwReMgYBIEqaB1mgRBgG5ljoGAZMimgbYACtoAwIA",
    "tags": [
      {
        "name": "source",
        "line": 143,
        "annotation": "test/twoslash/examples/assertions.js"
      }
    ]
  }
}
```
