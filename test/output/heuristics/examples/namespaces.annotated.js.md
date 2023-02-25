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

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm function1
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

    /**/ context.number1;
    //           ^?
    // @defs: (property) functionNamespace1.number1: number
    //
    // @docs: I'm functionNamespace1.number1

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm functionNamespace1.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1
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

    /**/ context.number1;
    //           ^?
    // @defs: (property) objectNamespace1.number1: number
    //
    // @docs: I'm objectNamespace1.number1

    /**/ number1b;
    //   ^?
    // @defs: const number1b: number
    //
    // @docs: I'm objectNamespace1.number1b

    /**/ context.number1b;
    //           ^?
    // @defs: (property) objectNamespace1.number1b: number
    //
    // @docs: I'm objectNamespace1.number1b

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace1.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1
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

    /**/ context.number1;
    //           ^?
    // @defs: (property) number1: number
    //
    // @docs: I'm objectNamespace2.number1

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace2.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1
}

// @source: test/sources/examples/namespaces.js
```

## Annotation Results

``` json
{
  "heuristics": {
    "program": {
      "currentDirectory": "vfs",
      "rootFileNames": ["sources/examples/namespaces.js"],
      "optionsDiagnostics": [],
      "configFileParsingDiagnostics": [],
      "globalDiagnostics": [],
      "compilerOptions": {
        "target": 99,
        "jsx": 1,
        "strict": true,
        "esModuleInterop": true,
        "module": 99,
        "suppressOutputPathCheck": true,
        "skipLibCheck": true,
        "skipDefaultLibCheck": true,
        "moduleResolution": 99,
        "allowJs": true,
        "checkJs": true,
        "noEmit": true,
        "removeComments": false,
        "allowUnreachableCode": false,
        "noEmitOnError": false,
        "rootDir": "sources",
        "noImplicitAny": true
      }
    },
    "file": {
      "fileName": "sources/examples/namespaces.js",
      "inlineCompilerOptions": { "strict": true, "allowUnreachableCode": false, "noImplicitAny": true },
      "inlineParameters": { "strict": "true", "allowUnreachableCode": "false", "noImplicitAny": "true" },
      "spans": { "multilineComments": [] },
      "diagnostics": { "errors": [], "warnings": [], "suggestions": [], "messages": [] },
      "annotationBlocks": {
        "0": {
          "start": 0,
          "end": 17,
          "lines": {
            "0": { "start": 0, "end": 17, "text": "// @strict: true\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@strict", "body": "true", "terminator": "\n" } },
            "1": { "start": 17, "end": 49, "text": "// @allowUnreachableCode: false\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@allowUnreachableCode", "body": "false", "terminator": "\n" } },
            "2": { "start": 49, "end": 73, "text": "// @noImplicitAny: true\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@noImplicitAny", "body": "true", "terminator": "\n" } },
            "start": 0,
            "end": 3
          }
        },
        "12": {
          "start": 166,
          "end": 224,
          "lines": {
            "11": { "start": 166, "end": 184, "text": "    /**/ number1;\n" },
            "12": { "start": 184, "end": 196, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "13": { "start": 196, "end": 210, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "14": { "start": 210, "end": 224, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 12,
            "end": 15
          },
          "query": { "code": "    /**/ number1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "number1",
            "start": 175,
            "end": 182,
            "line": 11,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 99, "length": 7 },
                "kind": "const",
                "name": "number1",
                "containerName": "",
                "contextSpan": { "start": 93, "length": 18 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": { "kind": "const", "kindModifiers": "", "display": [{ "keyword": "const" }, { "space": " " }, { "localName": "number1" }, { "punctuation": ":" }, { "space": " " }, { "stringLiteral": "1" }], "documentation": [{ "text": "I'm number1" }] }
          }
        },
        "17": {
          "start": 225,
          "end": 285,
          "lines": {
            "16": { "start": 225, "end": 245, "text": "    /**/ function1;\n" },
            "17": { "start": 245, "end": 257, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "18": { "start": 257, "end": 271, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "19": { "start": 271, "end": 285, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 17,
            "end": 20
          },
          "query": { "code": "    /**/ function1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "function1",
            "start": 234,
            "end": 243,
            "line": 16,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 140, "length": 9 },
                "kind": "const",
                "name": "function1",
                "containerName": "",
                "contextSpan": { "start": 134, "length": 28 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm function1" }]
            }
          }
        },
        "35": {
          "start": 571,
          "end": 629,
          "lines": {
            "34": { "start": 571, "end": 589, "text": "    /**/ number1;\n" },
            "35": { "start": 589, "end": 601, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "36": { "start": 601, "end": 615, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "37": { "start": 615, "end": 629, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 35,
            "end": 38
          },
          "query": { "code": "    /**/ number1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "number1",
            "start": 580,
            "end": 587,
            "line": 34,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 538, "length": 7 },
                "kind": "const",
                "name": "number1",
                "containerName": "",
                "contextSpan": { "start": 530, "length": 39 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [{ "keyword": "const" }, { "space": " " }, { "localName": "number1" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "number" }],
              "documentation": [{ "text": "I'm functionNamespace1.number1" }]
            }
          }
        },
        "40": {
          "start": 630,
          "end": 704,
          "lines": {
            "39": { "start": 630, "end": 656, "text": "    /**/ context.number1;\n" },
            "40": { "start": 656, "end": 676, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "41": { "start": 676, "end": 690, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "42": { "start": 690, "end": 704, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 40,
            "end": 43
          },
          "query": {
            "code": "    /**/ context.number1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "number1",
            "dottedName": "context.number1",
            "start": 647,
            "end": 654,
            "line": 39,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 381, "length": 7 },
                "kind": "property",
                "name": "number1",
                "containerName": "functionNamespace1",
                "contextSpan": { "start": 362, "length": 26 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "functionName": "functionNamespace1" },
                { "punctuation": "." },
                { "propertyName": "number1" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "number" }
              ],
              "documentation": [{ "text": "I'm functionNamespace1.number1" }]
            }
          }
        },
        "45": {
          "start": 705,
          "end": 765,
          "lines": {
            "44": { "start": 705, "end": 725, "text": "    /**/ function1;\n" },
            "45": { "start": 725, "end": 737, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "46": { "start": 737, "end": 751, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "47": { "start": 751, "end": 765, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 45,
            "end": 48
          },
          "query": { "code": "    /**/ function1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "function1",
            "start": 714,
            "end": 723,
            "line": 44,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 547, "length": 9 },
                "kind": "const",
                "name": "function1",
                "containerName": "",
                "contextSpan": { "start": 530, "length": 39 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm functionNamespace1.function1" }]
            }
          }
        },
        "50": {
          "start": 766,
          "end": 842,
          "lines": {
            "49": { "start": 766, "end": 794, "text": "    /**/ context.function1;\n" },
            "50": { "start": 794, "end": 814, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "51": { "start": 814, "end": 828, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "52": { "start": 828, "end": 842, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 50,
            "end": 53
          },
          "query": {
            "code": "    /**/ context.function1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "function1",
            "dottedName": "context.function1",
            "start": 783,
            "end": 792,
            "line": 49,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 460, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "functionNamespace1",
                "contextSpan": { "start": 441, "length": 28 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "functionName": "functionNamespace1" },
                { "punctuation": "." },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm functionNamespace1.function1" }]
            }
          }
        },
        "55": {
          "start": 843,
          "end": 926,
          "lines": {
            "54": { "start": 843, "end": 876, "text": "    /**/ context?.['function1'];\n" },
            "55": { "start": 876, "end": 898, "text": "    //             ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "             ", "marker": "^?", "body": "", "terminator": "\n" } },
            "56": { "start": 898, "end": 912, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "57": { "start": 912, "end": 926, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 55,
            "end": 58
          },
          "query": {
            "code": "    /**/ context?.['function1'];\n",
            "indent": "    ",
            "annotation": "    //             ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //             ^?\n",
            "head": "    //",
            "offset": "             ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "'function1'",
            "start": 862,
            "end": 873,
            "line": 54,
            "character": 19,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 460, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "functionNamespace1",
                "contextSpan": { "start": 441, "length": 28 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "functionName": "functionNamespace1" },
                { "punctuation": "." },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm functionNamespace1.function1" }]
            }
          }
        },
        "77": {
          "start": 1301,
          "end": 1359,
          "lines": {
            "76": { "start": 1301, "end": 1319, "text": "    /**/ number1;\n" },
            "77": { "start": 1319, "end": 1331, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "78": { "start": 1331, "end": 1345, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "79": { "start": 1345, "end": 1359, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 77,
            "end": 80
          },
          "query": { "code": "    /**/ number1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "number1",
            "start": 1310,
            "end": 1317,
            "line": 76,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1258, "length": 7 },
                "kind": "const",
                "name": "number1",
                "containerName": "",
                "contextSpan": { "start": 1250, "length": 49 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [{ "keyword": "const" }, { "space": " " }, { "localName": "number1" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "number" }],
              "documentation": [{ "text": "I'm objectNamespace1.number1" }]
            }
          }
        },
        "82": {
          "start": 1360,
          "end": 1434,
          "lines": {
            "81": { "start": 1360, "end": 1386, "text": "    /**/ context.number1;\n" },
            "82": { "start": 1386, "end": 1406, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "83": { "start": 1406, "end": 1420, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "84": { "start": 1420, "end": 1434, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 82,
            "end": 85
          },
          "query": {
            "code": "    /**/ context.number1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "number1",
            "dottedName": "context.number1",
            "start": 1377,
            "end": 1384,
            "line": 81,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1012, "length": 7 },
                "kind": "property",
                "name": "number1",
                "containerName": "objectNamespace1",
                "contextSpan": { "start": 995, "length": 24 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "localName": "objectNamespace1" },
                { "punctuation": "." },
                { "propertyName": "number1" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "number" }
              ],
              "documentation": [{ "text": "I'm objectNamespace1.number1" }]
            }
          }
        },
        "87": {
          "start": 1435,
          "end": 1494,
          "lines": {
            "86": { "start": 1435, "end": 1454, "text": "    /**/ number1b;\n" },
            "87": { "start": 1454, "end": 1466, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "88": { "start": 1466, "end": 1480, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "89": { "start": 1480, "end": 1494, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 87,
            "end": 90
          },
          "query": { "code": "    /**/ number1b;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "number1b",
            "start": 1444,
            "end": 1452,
            "line": 86,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1267, "length": 8 },
                "kind": "const",
                "name": "number1b",
                "containerName": "",
                "contextSpan": { "start": 1250, "length": 49 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [{ "keyword": "const" }, { "space": " " }, { "localName": "number1b" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "number" }],
              "documentation": [{ "text": "I'm objectNamespace1.number1b" }]
            }
          }
        },
        "92": {
          "start": 1495,
          "end": 1570,
          "lines": {
            "91": { "start": 1495, "end": 1522, "text": "    /**/ context.number1b;\n" },
            "92": { "start": 1522, "end": 1542, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "93": { "start": 1542, "end": 1556, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "94": { "start": 1556, "end": 1570, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 92,
            "end": 95
          },
          "query": {
            "code": "    /**/ context.number1b;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "number1b",
            "dottedName": "context.number1b",
            "start": 1512,
            "end": 1520,
            "line": 91,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1086, "length": 8 },
                "kind": "property",
                "name": "number1b",
                "containerName": "objectNamespace1",
                "contextSpan": { "start": 1069, "length": 25 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "localName": "objectNamespace1" },
                { "punctuation": "." },
                { "propertyName": "number1b" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "number" }
              ],
              "documentation": [{ "text": "I'm objectNamespace1.number1b" }]
            }
          }
        },
        "97": {
          "start": 1571,
          "end": 1631,
          "lines": {
            "96": { "start": 1571, "end": 1591, "text": "    /**/ function1;\n" },
            "97": { "start": 1591, "end": 1603, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "98": { "start": 1603, "end": 1617, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "99": { "start": 1617, "end": 1631, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 97,
            "end": 100
          },
          "query": { "code": "    /**/ function1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "function1",
            "start": 1580,
            "end": 1589,
            "line": 96,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1277, "length": 9 },
                "kind": "const",
                "name": "function1",
                "containerName": "",
                "contextSpan": { "start": 1250, "length": 49 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace1.function1" }]
            }
          }
        },
        "102": {
          "start": 1632,
          "end": 1708,
          "lines": {
            "101": { "start": 1632, "end": 1660, "text": "    /**/ context.function1;\n" },
            "102": { "start": 1660, "end": 1680, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "103": { "start": 1680, "end": 1694, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "104": { "start": 1694, "end": 1708, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 102,
            "end": 105
          },
          "query": {
            "code": "    /**/ context.function1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "function1",
            "dottedName": "context.function1",
            "start": 1649,
            "end": 1658,
            "line": 101,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1181, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "objectNamespace1",
                "contextSpan": { "start": 1164, "length": 26 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "localName": "objectNamespace1" },
                { "punctuation": "." },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace1.function1" }]
            }
          }
        },
        "107": {
          "start": 1709,
          "end": 1792,
          "lines": {
            "106": { "start": 1709, "end": 1742, "text": "    /**/ context?.['function1'];\n" },
            "107": { "start": 1742, "end": 1764, "text": "    //             ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "             ", "marker": "^?", "body": "", "terminator": "\n" } },
            "108": { "start": 1764, "end": 1778, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "109": { "start": 1778, "end": 1792, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 107,
            "end": 110
          },
          "query": {
            "code": "    /**/ context?.['function1'];\n",
            "indent": "    ",
            "annotation": "    //             ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //             ^?\n",
            "head": "    //",
            "offset": "             ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "'function1'",
            "start": 1728,
            "end": 1739,
            "line": 106,
            "character": 19,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1181, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "objectNamespace1",
                "contextSpan": { "start": 1164, "length": 26 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "localName": "objectNamespace1" },
                { "punctuation": "." },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace1.function1" }]
            }
          }
        },
        "124": {
          "start": 2020,
          "end": 2078,
          "lines": {
            "123": { "start": 2020, "end": 2038, "text": "    /**/ number1;\n" },
            "124": { "start": 2038, "end": 2050, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "125": { "start": 2050, "end": 2064, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "126": { "start": 2064, "end": 2078, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 124,
            "end": 127
          },
          "query": { "code": "    /**/ number1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "number1",
            "start": 2029,
            "end": 2036,
            "line": 123,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1987, "length": 7 },
                "kind": "const",
                "name": "number1",
                "containerName": "",
                "contextSpan": { "start": 1979, "length": 39 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [{ "keyword": "const" }, { "space": " " }, { "localName": "number1" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "number" }],
              "documentation": [{ "text": "I'm objectNamespace2.number1" }]
            }
          }
        },
        "129": {
          "start": 2079,
          "end": 2153,
          "lines": {
            "128": { "start": 2079, "end": 2105, "text": "    /**/ context.number1;\n" },
            "129": { "start": 2105, "end": 2125, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "130": { "start": 2125, "end": 2139, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "131": { "start": 2139, "end": 2153, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 129,
            "end": 132
          },
          "query": {
            "code": "    /**/ context.number1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "number1",
            "dottedName": "context.number1",
            "start": 2096,
            "end": 2103,
            "line": 128,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1866, "length": 7 },
                "kind": "property",
                "name": "number1",
                "containerName": "objectNamespace2",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "property" }, { "punctuation": ")" }, { "space": " " }, { "propertyName": "number1" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "number" }],
              "documentation": [{ "text": "I'm objectNamespace2.number1" }]
            }
          }
        },
        "134": {
          "start": 2154,
          "end": 2214,
          "lines": {
            "133": { "start": 2154, "end": 2174, "text": "    /**/ function1;\n" },
            "134": { "start": 2174, "end": 2186, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "135": { "start": 2186, "end": 2200, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "136": { "start": 2200, "end": 2214, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 134,
            "end": 137
          },
          "query": { "code": "    /**/ function1;\n", "indent": "    ", "annotation": "    //   ^?\n    // @defs:\n    // @docs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @defs:\n    // @docs:\n" },
          "target": {
            "name": "function1",
            "start": 2163,
            "end": 2172,
            "line": 133,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1996, "length": 9 },
                "kind": "const",
                "name": "function1",
                "containerName": "",
                "contextSpan": { "start": 1979, "length": 39 },
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace2.function1" }]
            }
          }
        },
        "139": {
          "start": 2215,
          "end": 2291,
          "lines": {
            "138": { "start": 2215, "end": 2243, "text": "    /**/ context.function1;\n" },
            "139": { "start": 2243, "end": 2263, "text": "    //           ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "           ", "marker": "^?", "body": "", "terminator": "\n" } },
            "140": { "start": 2263, "end": 2277, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "141": { "start": 2277, "end": 2291, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 139,
            "end": 142
          },
          "query": {
            "code": "    /**/ context.function1;\n",
            "indent": "    ",
            "annotation": "    //           ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //           ^?\n",
            "head": "    //",
            "offset": "           ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "function1",
            "dottedName": "context.function1",
            "start": 2232,
            "end": 2241,
            "line": 138,
            "character": 17,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1921, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "objectNamespace2",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace2.function1" }]
            }
          }
        },
        "144": {
          "start": 2292,
          "end": 2375,
          "lines": {
            "143": { "start": 2292, "end": 2325, "text": "    /**/ context?.['function1'];\n" },
            "144": { "start": 2325, "end": 2347, "text": "    //             ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "             ", "marker": "^?", "body": "", "terminator": "\n" } },
            "145": { "start": 2347, "end": 2361, "text": "    // @defs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "146": { "start": 2361, "end": 2375, "text": "    // @docs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "start": 144,
            "end": 147
          },
          "query": {
            "code": "    /**/ context?.['function1'];\n",
            "indent": "    ",
            "annotation": "    //             ^?\n    // @defs:\n    // @docs:\n",
            "marker": "    //             ^?\n",
            "head": "    //",
            "offset": "             ",
            "tail": "    // @defs:\n    // @docs:\n"
          },
          "target": {
            "name": "'function1'",
            "start": 2311,
            "end": 2322,
            "line": 143,
            "character": 19,
            "definitions": [
              {
                "fileName": "sources/examples/namespaces.js",
                "textSpan": { "start": 1921, "length": 9 },
                "kind": "property",
                "name": "function1",
                "containerName": "objectNamespace2",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "propertyName": "function1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" }
              ],
              "documentation": [{ "text": "I'm objectNamespace2.function1" }]
            }
          }
        }
      }
    }
  },
  "annotated": {
    "code": "// @strict: true\n// @allowUnreachableCode: false\n// @noImplicitAny: true\n\n/** I'm number1 */\nconst number1 = 1;\n\n/** I'm function1 */\nconst function1 = () => { };\n\n{\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: 1\n    //\n    // @docs: I'm number1\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm function1\n}\n\nfunction functionNamespace1() { };\n\n/** I'm functionNamespace1.number1 */\nfunctionNamespace1.number1 = number1;\n\n/** I'm functionNamespace1.function1 */\nfunctionNamespace1.function1 = function1;\n\n{\n    const context = functionNamespace1;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm functionNamespace1.number1\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) functionNamespace1.number1: number\n    //\n    // @docs: I'm functionNamespace1.number1\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) functionNamespace1.function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) functionNamespace1.function1: () => void\n    //\n    // @docs: I'm functionNamespace1.function1\n}\n\nconst objectNamespace1 = {};\n\n/** I'm objectNamespace1.number1 */\nobjectNamespace1.number1 = number1;\n\n/** I'm objectNamespace1.number1b */\nobjectNamespace1.number1b = functionNamespace1.number1;\n\n/** I'm objectNamespace1.function1 */\nobjectNamespace1.function1 = function1;\n\n\n{\n    const context = objectNamespace1;\n    const { number1, number1b, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm objectNamespace1.number1\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) objectNamespace1.number1: number\n    //\n    // @docs: I'm objectNamespace1.number1\n\n    /**/ number1b;\n    //   ^?\n    // @defs: const number1b: number\n    //\n    // @docs: I'm objectNamespace1.number1b\n\n    /**/ context.number1b;\n    //           ^?\n    // @defs: (property) objectNamespace1.number1b: number\n    //\n    // @docs: I'm objectNamespace1.number1b\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) objectNamespace1.function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) objectNamespace1.function1: () => void\n    //\n    // @docs: I'm objectNamespace1.function1\n}\n\nconst objectNamespace2 = {\n    /** I'm objectNamespace2.number1 */\n    number1,\n    /** I'm objectNamespace2.function1 */\n    function1\n};\n\n{\n    const context = objectNamespace2;\n    const { number1, function1 } = context;\n\n    /**/ number1;\n    //   ^?\n    // @defs: const number1: number\n    //\n    // @docs: I'm objectNamespace2.number1\n\n    /**/ context.number1;\n    //           ^?\n    // @defs: (property) number1: number\n    //\n    // @docs: I'm objectNamespace2.number1\n\n    /**/ function1;\n    //   ^?\n    // @defs: const function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n\n    /**/ context.function1;\n    //           ^?\n    // @defs: (property) function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n\n    /**/ context?.['function1'];\n    //             ^?\n    // @defs: (property) function1: () => void\n    //\n    // @docs: I'm objectNamespace2.function1\n}\n\n// @source: test/sources/examples/namespaces.js"
  }
}
```
