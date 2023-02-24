# examples/namespaces.js

## Source Code

```js
// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/** I'm number1 */
const number1 = 1;

/** I'm function1 */
const function1 = () => { };

{
    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:
}

function functionNamespace1() { };

/** I'm functionNamespace1.number1 */
functionNamespace1.number1 = number1;

/** I'm functionNamespace1.function1 */
functionNamespace1.function1 = function1;

{
    const context = functionNamespace1;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

const objectNamespace1 = {};

/** I'm objectNamespace1.number1 */
objectNamespace1.number1 = number1;

/** I'm objectNamespace1.number1b */
objectNamespace1.number1b = functionNamespace1.number1;

/** I'm objectNamespace1.function1 */
objectNamespace1.function1 = function1;


{
    const context = objectNamespace1;
    const { number1, number1b, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ number1b;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1b;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

const objectNamespace2 = {
    /** I'm objectNamespace2.number1 */
    number1,
    /** I'm objectNamespace2.function1 */
    function1
};

{
    const context = objectNamespace2;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

// @source: test/sources/examples/namespaces.js
```

## Annotated Code

```js
// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/** I'm number1 */
const number1 = 1;

/** I'm function1 */
const function1 = () => { };

{
    /**/ number1;
    //   ^?
    // @defs: const number1: 1
    //
    // @docs: I'm number1
    //

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm function1
    //
}

function functionNamespace1() { };

/** I'm functionNamespace1.number1 */
functionNamespace1.number1 = number1;

/** I'm functionNamespace1.function1 */
functionNamespace1.function1 = function1;

{
    const context = functionNamespace1;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs: const number1: number
    //
    // @docs: I'm functionNamespace1.number1
    //

    /**/ context.number1;
    //           ^?
    // @defs: (property) functionNamespace1.number1: number
    //
    // @docs: I'm functionNamespace1.number1
    //

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm functionNamespace1.function1
    //

    /**/ context.function1;
    //           ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1
    //

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1
    //
}

const objectNamespace1 = {};

/** I'm objectNamespace1.number1 */
objectNamespace1.number1 = number1;

/** I'm objectNamespace1.number1b */
objectNamespace1.number1b = functionNamespace1.number1;

/** I'm objectNamespace1.function1 */
objectNamespace1.function1 = function1;


{
    const context = objectNamespace1;
    const { number1, number1b, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs: const number1: number
    //
    // @docs: I'm objectNamespace1.number1
    //

    /**/ context.number1;
    //           ^?
    // @defs: (property) objectNamespace1.number1: number
    //
    // @docs: I'm objectNamespace1.number1
    //

    /**/ number1b;
    //   ^?
    // @defs: const number1b: number
    //
    // @docs: I'm objectNamespace1.number1b
    //

    /**/ context.number1b;
    //           ^?
    // @defs: (property) objectNamespace1.number1b: number
    //
    // @docs: I'm objectNamespace1.number1b
    //

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace1.function1
    //

    /**/ context.function1;
    //           ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1
    //

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1
    //
}

const objectNamespace2 = {
    /** I'm objectNamespace2.number1 */
    number1,
    /** I'm objectNamespace2.function1 */
    function1
};

{
    const context = objectNamespace2;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs: const number1: number
    //
    // @docs: I'm objectNamespace2.number1
    //

    /**/ context.number1;
    //           ^?
    // @defs: (property) number1: number
    //
    // @docs: I'm objectNamespace2.number1
    //

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace2.function1
    //

    /**/ context.function1;
    //           ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1
    //

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1
    //
}

// @source: test/sources/examples/namespaces.js
```

## Annotation Results

``` json
{
  "twoslash": {
    "code": "\n/** I'm number1 */\nconst number1 = 1;\n\n/** I'm function1 */\nconst function1 = () => { };\n\n{\n    /**/ number1;\n    // @defs:\n    // @docs:\n\n    /**/ function1;\n    // @defs:\n    // @docs:\n}\n\nfunction functionNamespace1() { };\n\n/** I'm functionNamespace1.number1 */\nfunctionNamespace1.number1 = number1;\n\n/** I'm functionNamespace1.function1 */\nfunctionNamespace1.function1 = function1;\n\n{\n    const context = functionNamespace1;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    // @defs:\n    // @docs:\n\n    /**/ context.number1;\n    // @defs:\n    // @docs:\n\n    /**/ function1;\n    // @defs:\n    // @docs:\n\n    /**/ context.function1;\n    // @defs:\n    // @docs:\n\n    /**/ context?.['function1'];\n    // @defs:\n    // @docs:\n}\n\nconst objectNamespace1 = {};\n\n/** I'm objectNamespace1.number1 */\nobjectNamespace1.number1 = number1;\n\n/** I'm objectNamespace1.number1b */\nobjectNamespace1.number1b = functionNamespace1.number1;\n\n/** I'm objectNamespace1.function1 */\nobjectNamespace1.function1 = function1;\n\n\n{\n    const context = objectNamespace1;\n    const { number1, number1b, function1 } = context;\n\n    /**/ number1;\n    // @defs:\n    // @docs:\n\n    /**/ context.number1;\n    // @defs:\n    // @docs:\n\n    /**/ number1b;\n    // @defs:\n    // @docs:\n\n    /**/ context.number1b;\n    // @defs:\n    // @docs:\n\n    /**/ function1;\n    // @defs:\n    // @docs:\n\n    /**/ context.function1;\n    // @defs:\n    // @docs:\n\n    /**/ context?.['function1'];\n    // @defs:\n    // @docs:\n}\n\nconst objectNamespace2 = {\n    /** I'm objectNamespace2.number1 */\n    number1,\n    /** I'm objectNamespace2.function1 */\n    function1\n};\n\n{\n    const context = objectNamespace2;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    // @defs:\n    // @docs:\n\n    /**/ context.number1;\n    // @defs:\n    // @docs:\n\n    /**/ function1;\n    // @defs:\n    // @docs:\n\n    /**/ context.function1;\n    // @defs:\n    // @docs:\n\n    /**/ context?.['function1'];\n    // @defs:\n    // @docs:\n}\n",
    "extension": "js",
    "highlights": [],
    "queries": [
      { "docs": "I'm number1", "kind": "query", "start": 102, "length": 16, "text": "const number1: 1", "offset": 9, "line": 9 },
      { "docs": "I'm function1", "kind": "query", "start": 149, "length": 27, "text": "const function1: () => void", "offset": 9, "line": 13 },
      { "docs": "I'm functionNamespace1.number1", "kind": "query", "start": 483, "length": 21, "text": "const number1: number", "offset": 9, "line": 30 },
      { "docs": "I'm functionNamespace1.number1", "kind": "query", "start": 538, "length": 45, "text": "(property) functionNamespace1.number1: number", "offset": 17, "line": 34 },
      { "docs": "I'm functionNamespace1.function1", "kind": "query", "start": 585, "length": 27, "text": "const function1: () => void", "offset": 9, "line": 38 },
      { "docs": "I'm functionNamespace1.function1", "kind": "query", "start": 642, "length": 51, "text": "(property) functionNamespace1.function1: () => void", "offset": 17, "line": 42 },
      { "docs": "I'm functionNamespace1.function1", "kind": "query", "start": 701, "length": 51, "text": "(property) functionNamespace1.function1: () => void", "offset": 19, "line": 46 },
      { "docs": "I'm objectNamespace1.number1", "kind": "query", "start": 1127, "length": 21, "text": "const number1: number", "offset": 9, "line": 67 },
      { "docs": "I'm objectNamespace1.number1", "kind": "query", "start": 1182, "length": 43, "text": "(property) objectNamespace1.number1: number", "offset": 17, "line": 71 },
      { "docs": "I'm objectNamespace1.number1b", "kind": "query", "start": 1229, "length": 22, "text": "const number1b: number", "offset": 9, "line": 75 },
      { "docs": "I'm objectNamespace1.number1b", "kind": "query", "start": 1285, "length": 44, "text": "(property) objectNamespace1.number1b: number", "offset": 17, "line": 79 },
      { "docs": "I'm objectNamespace1.function1", "kind": "query", "start": 1333, "length": 27, "text": "const function1: () => void", "offset": 9, "line": 83 },
      { "docs": "I'm objectNamespace1.function1", "kind": "query", "start": 1390, "length": 49, "text": "(property) objectNamespace1.function1: () => void", "offset": 17, "line": 87 },
      { "docs": "I'm objectNamespace1.function1", "kind": "query", "start": 1449, "length": 49, "text": "(property) objectNamespace1.function1: () => void", "offset": 19, "line": 91 },
      { "docs": "I'm objectNamespace2.number1", "kind": "query", "start": 1728, "length": 21, "text": "const number1: number", "offset": 9, "line": 107 },
      { "docs": "I'm objectNamespace2.number1", "kind": "query", "start": 1783, "length": 26, "text": "(property) number1: number", "offset": 17, "line": 111 },
      { "docs": "I'm objectNamespace2.function1", "kind": "query", "start": 1830, "length": 27, "text": "const function1: () => void", "offset": 9, "line": 115 },
      { "docs": "I'm objectNamespace2.function1", "kind": "query", "start": 1887, "length": 32, "text": "(property) function1: () => void", "offset": 17, "line": 119 },
      { "docs": "I'm objectNamespace2.function1", "kind": "query", "start": 1946, "length": 32, "text": "(property) function1: () => void", "offset": 19, "line": 123 }
    ],
    "staticQuickInfos": [
      { "text": "const number1: 1", "docs": "I'm number1", "start": 26, "length": 7, "line": 2, "character": 6, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm function1", "start": 67, "length": 9, "line": 5, "character": 6, "targetString": "function1" },
      { "text": "const number1: 1", "docs": "I'm number1", "start": 102, "length": 7, "line": 8, "character": 9, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm function1", "start": 149, "length": 9, "line": 12, "character": 9, "targetString": "function1" },
      { "text": "function functionNamespace1(): void\nmodule functionNamespace1", "docs": "", "start": 200, "length": 18, "line": 17, "character": 9, "targetString": "functionNamespace1" },
      { "text": "module functionNamespace1\nfunction functionNamespace1(): void", "docs": "", "start": 265, "length": 18, "line": 20, "character": 0, "targetString": "functionNamespace1" },
      { "text": "(property) functionNamespace1.number1: number", "docs": "I'm functionNamespace1.number1", "start": 284, "length": 7, "line": 20, "character": 19, "targetString": "number1" },
      { "text": "const number1: 1", "docs": "I'm number1", "start": 294, "length": 7, "line": 20, "character": 29, "targetString": "number1" },
      { "text": "module functionNamespace1\nfunction functionNamespace1(): void", "docs": "", "start": 344, "length": 18, "line": 23, "character": 0, "targetString": "functionNamespace1" },
      { "text": "(property) functionNamespace1.function1: () => void", "docs": "I'm functionNamespace1.function1", "start": 363, "length": 9, "line": 23, "character": 19, "targetString": "function1" },
      { "text": "const function1: () => void", "docs": "I'm function1", "start": 375, "length": 9, "line": 23, "character": 31, "targetString": "function1" },
      { "text": "const context: typeof functionNamespace1", "docs": "", "start": 399, "length": 7, "line": 26, "character": 10, "targetString": "context" },
      { "text": "module functionNamespace1\nfunction functionNamespace1(): void", "docs": "", "start": 409, "length": 18, "line": 26, "character": 20, "targetString": "functionNamespace1" },
      { "text": "const number1: number", "docs": "I'm functionNamespace1.number1", "start": 441, "length": 7, "line": 27, "character": 12, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm functionNamespace1.function1", "start": 450, "length": 9, "line": 27, "character": 21, "targetString": "function1" },
      { "text": "const context: typeof functionNamespace1", "docs": "", "start": 464, "length": 7, "line": 27, "character": 35, "targetString": "context" },
      { "text": "const number1: number", "docs": "I'm functionNamespace1.number1", "start": 483, "length": 7, "line": 29, "character": 9, "targetString": "number1" },
      { "text": "const context: typeof functionNamespace1", "docs": "", "start": 530, "length": 7, "line": 33, "character": 9, "targetString": "context" },
      { "text": "(property) functionNamespace1.number1: number", "docs": "I'm functionNamespace1.number1", "start": 538, "length": 7, "line": 33, "character": 17, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm functionNamespace1.function1", "start": 585, "length": 9, "line": 37, "character": 9, "targetString": "function1" },
      { "text": "const context: typeof functionNamespace1", "docs": "", "start": 634, "length": 7, "line": 41, "character": 9, "targetString": "context" },
      { "text": "(property) functionNamespace1.function1: () => void", "docs": "I'm functionNamespace1.function1", "start": 642, "length": 9, "line": 41, "character": 17, "targetString": "function1" },
      { "text": "const context: typeof functionNamespace1", "docs": "", "start": 691, "length": 7, "line": 45, "character": 9, "targetString": "context" },
      { "text": "module objectNamespace1\nconst objectNamespace1: typeof objectNamespace1", "docs": "", "start": 752, "length": 16, "line": 50, "character": 6, "targetString": "objectNamespace1" },
      { "text": "module objectNamespace1\nconst objectNamespace1: typeof objectNamespace1", "docs": "", "start": 812, "length": 16, "line": 53, "character": 0, "targetString": "objectNamespace1" },
      { "text": "(property) objectNamespace1.number1: number", "docs": "I'm objectNamespace1.number1", "start": 829, "length": 7, "line": 53, "character": 17, "targetString": "number1" },
      { "text": "const number1: 1", "docs": "I'm number1", "start": 839, "length": 7, "line": 53, "character": 27, "targetString": "number1" },
      { "text": "module objectNamespace1\nconst objectNamespace1: typeof objectNamespace1", "docs": "", "start": 886, "length": 16, "line": 56, "character": 0, "targetString": "objectNamespace1" },
      { "text": "(property) objectNamespace1.number1b: number", "docs": "I'm objectNamespace1.number1b", "start": 903, "length": 8, "line": 56, "character": 17, "targetString": "number1b" },
      { "text": "module functionNamespace1\nfunction functionNamespace1(): void", "docs": "", "start": 914, "length": 18, "line": 56, "character": 28, "targetString": "functionNamespace1" },
      { "text": "(property) functionNamespace1.number1: number", "docs": "I'm functionNamespace1.number1", "start": 933, "length": 7, "line": 56, "character": 47, "targetString": "number1" },
      { "text": "module objectNamespace1\nconst objectNamespace1: typeof objectNamespace1", "docs": "", "start": 981, "length": 16, "line": 59, "character": 0, "targetString": "objectNamespace1" },
      { "text": "(property) objectNamespace1.function1: () => void", "docs": "I'm objectNamespace1.function1", "start": 998, "length": 9, "line": 59, "character": 17, "targetString": "function1" },
      { "text": "const function1: () => void", "docs": "I'm function1", "start": 1010, "length": 9, "line": 59, "character": 29, "targetString": "function1" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1035, "length": 7, "line": 63, "character": 10, "targetString": "context" },
      { "text": "module objectNamespace1\nconst objectNamespace1: typeof objectNamespace1", "docs": "", "start": 1045, "length": 16, "line": 63, "character": 20, "targetString": "objectNamespace1" },
      { "text": "const number1: number", "docs": "I'm objectNamespace1.number1", "start": 1075, "length": 7, "line": 64, "character": 12, "targetString": "number1" },
      { "text": "const number1b: number", "docs": "I'm objectNamespace1.number1b", "start": 1084, "length": 8, "line": 64, "character": 21, "targetString": "number1b" },
      { "text": "const function1: () => void", "docs": "I'm objectNamespace1.function1", "start": 1094, "length": 9, "line": 64, "character": 31, "targetString": "function1" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1108, "length": 7, "line": 64, "character": 45, "targetString": "context" },
      { "text": "const number1: number", "docs": "I'm objectNamespace1.number1", "start": 1127, "length": 7, "line": 66, "character": 9, "targetString": "number1" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1174, "length": 7, "line": 70, "character": 9, "targetString": "context" },
      { "text": "(property) objectNamespace1.number1: number", "docs": "I'm objectNamespace1.number1", "start": 1182, "length": 7, "line": 70, "character": 17, "targetString": "number1" },
      { "text": "const number1b: number", "docs": "I'm objectNamespace1.number1b", "start": 1229, "length": 8, "line": 74, "character": 9, "targetString": "number1b" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1277, "length": 7, "line": 78, "character": 9, "targetString": "context" },
      { "text": "(property) objectNamespace1.number1b: number", "docs": "I'm objectNamespace1.number1b", "start": 1285, "length": 8, "line": 78, "character": 17, "targetString": "number1b" },
      { "text": "const function1: () => void", "docs": "I'm objectNamespace1.function1", "start": 1333, "length": 9, "line": 82, "character": 9, "targetString": "function1" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1382, "length": 7, "line": 86, "character": 9, "targetString": "context" },
      { "text": "(property) objectNamespace1.function1: () => void", "docs": "I'm objectNamespace1.function1", "start": 1390, "length": 9, "line": 86, "character": 17, "targetString": "function1" },
      { "text": "const context: typeof objectNamespace1", "docs": "", "start": 1439, "length": 7, "line": 90, "character": 9, "targetString": "context" },
      { "text": "const objectNamespace2: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1500, "length": 16, "line": 95, "character": 6, "targetString": "objectNamespace2" },
      { "text": "(property) number1: number", "docs": "I'm objectNamespace2.number1", "start": 1565, "length": 7, "line": 97, "character": 4, "targetString": "number1" },
      { "text": "(property) function1: () => void", "docs": "I'm objectNamespace2.function1", "start": 1620, "length": 9, "line": 99, "character": 4, "targetString": "function1" },
      { "text": "const context: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1646, "length": 7, "line": 103, "character": 10, "targetString": "context" },
      { "text": "const objectNamespace2: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1656, "length": 16, "line": 103, "character": 20, "targetString": "objectNamespace2" },
      { "text": "const number1: number", "docs": "I'm objectNamespace2.number1", "start": 1686, "length": 7, "line": 104, "character": 12, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm objectNamespace2.function1", "start": 1695, "length": 9, "line": 104, "character": 21, "targetString": "function1" },
      { "text": "const context: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1709, "length": 7, "line": 104, "character": 35, "targetString": "context" },
      { "text": "const number1: number", "docs": "I'm objectNamespace2.number1", "start": 1728, "length": 7, "line": 106, "character": 9, "targetString": "number1" },
      { "text": "const context: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1775, "length": 7, "line": 110, "character": 9, "targetString": "context" },
      { "text": "(property) number1: number", "docs": "I'm objectNamespace2.number1", "start": 1783, "length": 7, "line": 110, "character": 17, "targetString": "number1" },
      { "text": "const function1: () => void", "docs": "I'm objectNamespace2.function1", "start": 1830, "length": 9, "line": 114, "character": 9, "targetString": "function1" },
      { "text": "const context: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1879, "length": 7, "line": 118, "character": 9, "targetString": "context" },
      { "text": "(property) function1: () => void", "docs": "I'm objectNamespace2.function1", "start": 1887, "length": 9, "line": 118, "character": 17, "targetString": "function1" },
      { "text": "const context: {\n    number1: number;\n    function1: () => void;\n}", "docs": "", "start": 1936, "length": 7, "line": 122, "character": 9, "targetString": "context" }
    ],
    "errors": [],
    "playgroundURL": "https://www.typescriptlang.org/play/#code/PTAEAEGcBcCcEsDG0Bco4FcCmAoEEBDAGyIHsB3AVQDtYsDEALAgIyKwGFSATLNAM2KRc+cNVIBJALYAHIknjQAgtQCeaTLjwAqbaAkByKaGoYpLLLACMobcByJS1GCbMXroALygrAbhw6eobG-BjUyPBONnYOTi6h4dCR1DbeABQAlF4AfKAA3qAAvv44eTigFaDAumCm5pZ+5ZX4FQB6APxNFaK8-JAoXVVg4NykiP0BlVU1oAkRUf5TLaAdgz1YfQNLw6PjA4UBc0lOs2Hz1AByBFJYkDIMWFaZ+UUl1UFGp4nJVzd3D1YAHR1dzRexHH7XW73RCPYFuBpeVz1axvXT6T4Qpy-aEAwFYlK2cFnY6XKH-WFAgmpL7nRqlQaOZzQUBM6BYAAeLO8BJxFMei0qTJcBRBDQANLTSTZCki2ZzoCUljMxai1mA2p1thBehNtSMxhM1jN5Vz4SjGtqptaVlrmjsNnr7TrDQNjXYpclLc7NeqdY6ts6DXtJs0TU52WbqYLuhqbZVVvrdYHYy6Q+6wKboO1AQBtAzUgwAXRjQ3jNsTQeTfuDEwOsWZoFILAAVlhkHyYY8kXligF3hjjM22x3yV2gaqwThh+3oJ28ZOkZO0R8h63Z-PKebQSwidP16O-uPtw1dzySZCjwuEWrAoOmwe52O8dS9zPD7it6-z98FgEGVMwoslmSLvk+V6UqWQEvJOkqTiwkqvrK3hZkqYYesufq+kmAY1rsRrKh6WYnmqVrlraeG4Umrqht0Ko3lYLClsslapiMVFVjRGashGCokYxzFxuWrFluxmx4VxhFgNGWEUTh4nUemUk8dQkbQPiF5-mRwl2mx1aKQR6GZrxXI5vmhYlrJ5FyVWHF6TR9bQWBm5YAATD27r3s5z6wq5-F7lMsGecED4juBn5uRpv6EjEUzUjgfYAUKcTASZ3KhRuPluVBKUwQxiGaYSyEqWpaF0RhDGCQmumifpnFKUZJV8Zh2nxiJ6wKfVhnldJhXeqm2G2Z19kNT1TVRn1VXWe1DrDbVkmNVmZkFn1xZTdZNl6XZ80hvWoiQKQGCwLCGi3NAwAHUdsKQMAnLXHItzANQWWQICLaQEAA",
    "tags": [{ "name": "source", "line": 149, "annotation": "test/sources/examples/namespaces.js" }]
  },
  "annotated": {
    "code": "// @strict: true\n// @allowUnreachableCode: false\n// @noImplicitAny: true\n\n/** I'm number1 */\nconst number1 = 1;\n\n/** I'm function1 */\nconst function1 = () => { };\n\n{\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: 1\n    //\n    // @docs: I'm number1\n    //\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm function1\n    //\n}\n\nfunction functionNamespace1() { };\n\n/** I'm functionNamespace1.number1 */\nfunctionNamespace1.number1 = number1;\n\n/** I'm functionNamespace1.function1 */\nfunctionNamespace1.function1 = function1;\n\n{\n    const context = functionNamespace1;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm functionNamespace1.number1\n    //\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) functionNamespace1.number1: number\n    //\n    // @docs: I'm functionNamespace1.number1\n    //\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n    //\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) functionNamespace1.function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n    //\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) functionNamespace1.function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n    //\n}\n\nconst objectNamespace1 = {};\n\n/** I'm objectNamespace1.number1 */\nobjectNamespace1.number1 = number1;\n\n/** I'm objectNamespace1.number1b */\nobjectNamespace1.number1b = functionNamespace1.number1;\n\n/** I'm objectNamespace1.function1 */\nobjectNamespace1.function1 = function1;\n\n\n{\n    const context = objectNamespace1;\n    const { number1, number1b, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm objectNamespace1.number1\n    //\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) objectNamespace1.number1: number\n    //\n    // @docs: I'm objectNamespace1.number1\n    //\n\n    /**/ number1b;\n    //   ^?\n    // @defs: const number1b: number\n    //\n    // @docs: I'm objectNamespace1.number1b\n    //\n\n    /**/ context.number1b;\n    //           ^?\n    // @defs: (property) objectNamespace1.number1b: number\n    //\n    // @docs: I'm objectNamespace1.number1b\n    //\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n    //\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) objectNamespace1.function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n    //\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) objectNamespace1.function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n    //\n}\n\nconst objectNamespace2 = {\n    /** I'm objectNamespace2.number1 */\n    number1,\n    /** I'm objectNamespace2.function1 */\n    function1\n};\n\n{\n    const context = objectNamespace2;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm objectNamespace2.number1\n    //\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) number1: number\n    //\n    // @docs: I'm objectNamespace2.number1\n    //\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n    //\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n    //\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n    //\n}\n\n// @source: test/sources/examples/namespaces.js"
  }
}
```