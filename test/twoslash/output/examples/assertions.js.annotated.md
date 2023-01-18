**Source Code**

```js
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

() => { assert1(false); assert1; };
//                      ^?
// @errs:

() => { assert1(true); assert1; };
//                     ^?
// @errs:

/** 
 * This works because of the type annotation on the declaration.
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
 * This does not work since there is type annotation on the declaration.
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

// @source: test/twoslash/examples/assertions.js

```

**Annotated Code**

```js
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

```

**Annotation Results**

``` json
{
  "annotated": {
    "code": "// @ts-check\n// @errors: 7027\n// @strict: true\n// @allowUnreachableCode: false\n\n/** \n * For this to work, it needs to have explicit type annotations on the declaration itself.\n * \n * The expected behaviour is that code following a falsy assertion would be unreachable.\n * \n * @return { asserts value } \n */\nexport const assert1 = (value) => { if (!value) throw new Error('Expected true'); }\n\n() => { assert1(false); assert1; };\n//      ^?\n// @errs: \n//\n\n() => { assert1(false); assert1; };\n//                      ^?\n// @errs: [Error: 7027]: Unreachable code detected.\n//\n\n() => { assert1(true); assert1; };\n//                     ^?\n// @errs: \n//\n\n/** \n * This works because of the type annotation on the declaration.\n * \n * @type { typeof assert1 } \n */\nexport const assert2 = assert1;\n\n() => { assert2(false); assert2; };\n//      ^?\n// @errs: \n//\n\n() => { assert2(false); assert2; };\n//                      ^?\n// @errs: [Error: 7027]: Unreachable code detected.\n//\n\n() => { assert2(true); assert2; };\n//                     ^?\n// @errs: \n//\n\n/** \n * This does not work since there is type annotation on the declaration.\n */\nexport const assert3 = assert1;\n\n() => { assert3(false); assert3; };\n//      ^?\n// @errs: [Error: 2775]: Assertions require every name in the call target to be declared with an explicit type annotation.\n//\n\n() => { assert3(false); assert3; };\n//                      ^?\n// @errs: \n//\n\n() => { assert3(true); assert3; };\n//                     ^?\n// @errs: \n//\n\n// @source: test/twoslash/examples/assertions.js\n"
  },
  "twoslash": {
    "code": "// @ts-check\n\n/** \n * For this to work, it needs to have explicit type annotations on the declaration itself.\n * \n * The expected behaviour is that code following a falsy assertion would be unreachable.\n * \n * @return { asserts value } \n */\nexport const assert1 = (value) => { if (!value) throw new Error('Expected true'); }\n\n() => { assert1(false); assert1; };\n// @errs:\n\n() => { assert1(false); assert1; };\n// @errs:\n\n() => { assert1(true); assert1; };\n// @errs:\n\n/** \n * This works because of the type annotation on the declaration.\n * \n * @type { typeof assert1 } \n */\nexport const assert2 = assert1;\n\n() => { assert2(false); assert2; };\n// @errs:\n\n() => { assert2(false); assert2; };\n// @errs:\n\n() => { assert2(true); assert2; };\n// @errs:\n\n/** \n * This does not work since there is type annotation on the declaration.\n */\nexport const assert3 = assert1;\n\n() => { assert3(false); assert3; };\n// @errs:\n\n() => { assert3(false); assert3; };\n// @errs:\n\n() => { assert3(true); assert3; };\n// @errs:\n\n",
    "extension": "js",
    "highlights": [],
    "queries": [
      {
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "kind": "query",
        "start": 334,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 8,
        "line": 12
      },
      {
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "kind": "query",
        "start": 397,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 24,
        "line": 15
      },
      {
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "kind": "query",
        "start": 443,
        "length": 44,
        "text": "const assert1: (value: any) => asserts value",
        "offset": 23,
        "line": 18
      },
      {
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "kind": "query",
        "start": 614,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 8,
        "line": 28
      },
      {
        "docs": "This works because of the type annotation on the declaration.",
        "kind": "query",
        "start": 677,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 24,
        "line": 31
      },
      {
        "docs": "This works because of the type annotation on the declaration.",
        "kind": "query",
        "start": 723,
        "length": 44,
        "text": "const assert2: (value: any) => asserts value",
        "offset": 23,
        "line": 34
      },
      {
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "kind": "query",
        "start": 869,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 8,
        "line": 42
      },
      {
        "docs": "This does not work since there is type annotation on the declaration.",
        "kind": "query",
        "start": 932,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 24,
        "line": 45
      },
      {
        "docs": "This does not work since there is type annotation on the declaration.",
        "kind": "query",
        "start": 978,
        "length": 44,
        "text": "const assert3: (value: any) => asserts value",
        "offset": 23,
        "line": 48
      }
    ],
    "staticQuickInfos": [
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 254,
        "length": 7,
        "line": 9,
        "character": 13,
        "targetString": "assert1"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 265,
        "length": 5,
        "line": 9,
        "character": 24,
        "targetString": "value"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 282,
        "length": 5,
        "line": 9,
        "character": 41,
        "targetString": "value"
      },
      {
        "text": "var Error: ErrorConstructor\nnew (message?: string | undefined) => Error",
        "docs": "",
        "start": 299,
        "length": 5,
        "line": 9,
        "character": 58,
        "targetString": "Error"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 334,
        "length": 7,
        "line": 11,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 350,
        "length": 7,
        "line": 11,
        "character": 24,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 381,
        "length": 7,
        "line": 14,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 397,
        "length": 7,
        "line": 14,
        "character": 24,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 428,
        "length": 7,
        "line": 17,
        "character": 8,
        "targetString": "assert1"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 443,
        "length": 7,
        "line": 17,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "This works because of the type annotation on the declaration.",
        "start": 586,
        "length": 7,
        "line": 25,
        "character": 13,
        "targetString": "assert2"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 596,
        "length": 7,
        "line": 25,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 614,
        "length": 7,
        "line": 27,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "This works because of the type annotation on the declaration.",
        "start": 630,
        "length": 7,
        "line": 27,
        "character": 24,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 661,
        "length": 7,
        "line": 30,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "This works because of the type annotation on the declaration.",
        "start": 677,
        "length": 7,
        "line": 30,
        "character": 24,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 708,
        "length": 7,
        "line": 33,
        "character": 8,
        "targetString": "assert2"
      },
      {
        "text": "const assert2: (value: any) => asserts value",
        "docs": "This works because of the type annotation on the declaration.",
        "start": 723,
        "length": 7,
        "line": 33,
        "character": 23,
        "targetString": "assert2"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "This does not work since there is type annotation on the declaration.",
        "start": 841,
        "length": 7,
        "line": 39,
        "character": 13,
        "targetString": "assert3"
      },
      {
        "text": "const assert1: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 851,
        "length": 7,
        "line": 39,
        "character": 23,
        "targetString": "assert1"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 869,
        "length": 7,
        "line": 41,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "This does not work since there is type annotation on the declaration.",
        "start": 885,
        "length": 7,
        "line": 41,
        "character": 24,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 916,
        "length": 7,
        "line": 44,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "This does not work since there is type annotation on the declaration.",
        "start": 932,
        "length": 7,
        "line": 44,
        "character": 24,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "For this to work, it needs to have explicit type annotations on the declaration itself.\n\nThe expected behaviour is that code following a falsy assertion would be unreachable.",
        "start": 963,
        "length": 7,
        "line": 47,
        "character": 8,
        "targetString": "assert3"
      },
      {
        "text": "const assert3: (value: any) => asserts value",
        "docs": "This does not work since there is type annotation on the declaration.",
        "start": 978,
        "length": 7,
        "line": 47,
        "character": 23,
        "targetString": "assert3"
      }
    ],
    "errors": [
      {
        "category": 1,
        "code": 7006,
        "length": 5,
        "start": 265,
        "line": 9,
        "character": 24,
        "renderedMessage": "Parameter 'value' implicitly has an 'any' type.",
        "id": "err-7006-265-5"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 350,
        "line": 11,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-350-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 397,
        "line": 14,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-397-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 630,
        "line": 27,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-630-8"
      },
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 677,
        "line": 30,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-677-8"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 869,
        "line": 41,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-869-7"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 916,
        "line": 44,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-916-7"
      },
      {
        "category": 1,
        "code": 2775,
        "length": 7,
        "start": 963,
        "line": 47,
        "character": 8,
        "renderedMessage": "Assertions require every name in the call target to be declared with an explicit type annotation.",
        "id": "err-2775-963-7"
      }
    ],
    "playgroundURL": "https://www.typescriptlang.org/play/#code/PTAEAEBcGcFoGMAWBTeBrAUCCyBOuB7XaALlAHYAGAJnKzHGklwEt5IzmBXZeiAQwA2gggHcAqgDtcyfkn4AjQcgDCBACbIyAMyHReWAFSHQGUCYBiRUJEQtoNgqFFE0AGlAtIoScmTqHSCdEfgA3ZFBkAA8AB0E2LxsATxiI-klJAkh+SBYCSQd8mxRQTXhBflwcvMlPGGRBbQA6MxNW0AAVEujU9n9QBWQQ0LyuXE9AkO94DQjtAmExFkkAc1B+UF1BaCT16H1cXKKXLkF1AYiuaVl5JWQW81NH8BlIMdqAbz2DmFBQoR4oAAvk9DMAMD0iNN8kxvnhIABGUAAXlAAAp-oIeABKFEAPlAXxY2nRAEJMTjioRRD5kDSAKL4IhogDk9NiqEg-W4yBZ2IA3MCMBg0bjkQSvvx9vCEWitvoBXDDgjBUD+XxQJrNQA9AD8fHAeGIJGFovxhKViLlemQiqlPxVwPV2C1rrd7q1eoNRtIprFEstsp5dulytVzrAHqjbq92EN+F9Rjajy69mcrgcg3g-C4+lABBJtgikBSaQyWWqRSKRdKqAqVSOkgeyZMUFLFpLqQLgeBoPBkMOoBmBW89vh1BRgfVIv9FrHh2o1u2tsF88g1HDGtdsYYPpNM-NktD66XCtXx43Tq30ZvO5wCf3ZvFc4vaOD55+l7V15vHrv8eNYVgGMUFOjsBx1AIZAHEybwXFwNBQGgZZ4GLFAZAmZJUnWctskbfNahrMp60rJtWn7WIoSHGFR2PABmSc1xVP1D0tOjTxXNjNxdbd9TjPcWOfI8fnY+VOLXOjuMjX9o3-ASDyEti31wHEP3hSSrx4mT3Tkh8gIYaACDGVDOGgyBgEgFxoAqaBEGAaJ+AAWziaDgDXGpoCaAAraAMCAA",
    "tags": [
      {
        "name": "source",
        "line": 62,
        "annotation": "test/twoslash/examples/assertions.js"
      }
    ]
  }
}
```
