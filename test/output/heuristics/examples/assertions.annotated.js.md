# examples/assertions.js

## Source Code

```js
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

```

## Annotated Code

```js
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
// @errs: [Error: 7027] Unreachable code detected.

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
// @errs: [Error: 7027] Unreachable code detected.

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
// @errs: [Error: 2775] Assertions require every name in the call target to be declared with an explicit type annotation.

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
    // @errs: [Error: 7027] Unreachable code detected.

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
    // @errs: [Error: 2502] 'assert' is referenced directly or indirectly in its own type annotation.

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
    // @errs: [Error: 2502] 'callAssertAnything' is referenced directly or indirectly in its own type annotation.

) => {

    /**/ callAssertAnything(false);
    //   ^?
    // @errs: 

    /**/ callAssertAnything;
    //   ^?
    // @errs: 

};

// @source: test/sources/examples/assertions.js

```

## Annotation Results

``` json
{
  "heuristics": {
    "program": {
      "currentDirectory": "vfs",
      "rootFileNames": ["sources/examples/assertions.js"],
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
      "fileName": "sources/examples/assertions.js",
      "inlineCompilerOptions": { "strict": true, "allowUnreachableCode": false, "noImplicitAny": true },
      "inlineParameters": { "errors": "7027,2775,2502", "strict": "true", "allowUnreachableCode": "false", "noImplicitAny": "true" },
      "spans": { "multilineComments": [{ "start": 101, "length": 280 }, { "start": 672, "length": 129 }, { "start": 1039, "length": 126 }, { "start": 1403, "length": 142 }, { "start": 1697, "length": 126 }, { "start": 1977, "length": 146 }] },
      "diagnostics": {
        "errors": [
          { "code": 7027, "start": 492, "end": 500, "message": "Unreachable code detected.", "line": 17, "character": 24, "reportsUnnecessary": true },
          { "code": 7027, "start": 550, "end": 558, "message": "Unreachable code detected.", "line": 21, "character": 24, "reportsUnnecessary": true },
          { "code": 7027, "start": 859, "end": 867, "message": "Unreachable code detected.", "line": 38, "character": 24, "reportsUnnecessary": true },
          { "code": 7027, "start": 917, "end": 925, "message": "Unreachable code detected.", "line": 42, "character": 24, "reportsUnnecessary": true },
          { "code": 2775, "start": 1207, "end": 1214, "message": "Assertions require every name in the call target to be declared with an explicit type annotation.", "line": 59, "character": 8 },
          { "code": 2775, "start": 1265, "end": 1272, "message": "Assertions require every name in the call target to be declared with an explicit type annotation.", "line": 63, "character": 8 },
          { "code": 2775, "start": 1339, "end": 1346, "message": "Assertions require every name in the call target to be declared with an explicit type annotation.", "line": 67, "character": 8 },
          { "code": 7006, "start": 1510, "end": 1515, "message": "Parameter 'value' implicitly has an 'any' type.", "line": 76, "character": 12 },
          { "code": 7027, "start": 1658, "end": 1665, "message": "Unreachable code detected.", "line": 88, "character": 9, "reportsUnnecessary": true },
          { "code": 2502, "start": 1836, "end": 1842, "message": "'assert' is referenced directly or indirectly in its own type annotation.", "line": 103, "character": 9 },
          { "code": 2502, "start": 2136, "end": 2154, "message": "'callAssertAnything' is referenced directly or indirectly in its own type annotation.", "line": 128, "character": 9 }
        ],
        "warnings": [],
        "suggestions": [],
        "messages": []
      },
      "annotationBlocks": {
        "0": {
          "start": 0,
          "end": 27,
          "lines": {
            "0": { "start": 0, "end": 27, "text": "// @errors: 7027 2775 2502\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errors", "body": "7027 2775 2502", "terminator": "\n" } },
            "1": { "start": 27, "end": 44, "text": "// @strict: true\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@strict", "body": "true", "terminator": "\n" } },
            "2": { "start": 44, "end": 76, "text": "// @allowUnreachableCode: false\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@allowUnreachableCode", "body": "false", "terminator": "\n" } },
            "3": { "start": 76, "end": 100, "text": "// @noImplicitAny: true\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@noImplicitAny", "body": "true", "terminator": "\n" } },
            "start": 0,
            "end": 4
          }
        },
        "18": {
          "start": 468,
          "end": 525,
          "lines": {
            "17": { "start": 468, "end": 504, "text": "() => { assert1(false); assert1; };\n" },
            "18": { "start": 504, "end": 515, "text": "//      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "19": { "start": 515, "end": 525, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 18,
            "end": 20
          },
          "query": { "code": "() => { assert1(false); assert1; };\n", "indent": "", "annotation": "//      ^?\n// @errs:\n", "marker": "//      ^?\n", "head": "//", "offset": "      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert1",
            "start": 476,
            "end": 483,
            "line": 17,
            "character": 8,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 395, "length": 7 },
                "kind": "function",
                "name": "assert1",
                "containerName": "",
                "contextSpan": { "start": 405, "length": 60 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [
                { "example": [{ "text": "For assertion functions to work, they need to have explicit type annotations on every declaration.\n\nTheir expected behaviour is that code following a falsy assertion would be unreachable." }] },
                { "param": [{ "text": "value" }] },
                { "returns": [] }
              ]
            }
          }
        },
        "22": {
          "start": 526,
          "end": 599,
          "lines": {
            "21": { "start": 526, "end": 562, "text": "() => { assert1(false); assert1; };\n" },
            "22": { "start": 562, "end": 589, "text": "//                      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "23": { "start": 589, "end": 599, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 22,
            "end": 24
          },
          "query": { "code": "() => { assert1(false); assert1; };\n", "indent": "", "annotation": "//                      ^?\n// @errs:\n", "marker": "//                      ^?\n", "head": "//", "offset": "                      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert1",
            "start": 550,
            "end": 557,
            "line": 21,
            "character": 24,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 395, "length": 7 },
                "kind": "const",
                "name": "assert1",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 382, "length": 84 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "diagnostics": { "errors": [{ "code": 7027, "start": 550, "end": 558, "message": "Unreachable code detected.", "line": 21, "character": 24, "reportsUnnecessary": true }] },
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [
                { "example": [{ "text": "For assertion functions to work, they need to have explicit type annotations on every declaration.\n\nTheir expected behaviour is that code following a falsy assertion would be unreachable." }] },
                { "param": [{ "text": "value" }] },
                { "returns": [] }
              ]
            }
          }
        },
        "26": {
          "start": 600,
          "end": 671,
          "lines": {
            "25": { "start": 600, "end": 635, "text": "() => { assert1(true); assert1; };\n" },
            "26": { "start": 635, "end": 661, "text": "//                     ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                     ", "marker": "^?", "body": "", "terminator": "\n" } },
            "27": { "start": 661, "end": 671, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 26,
            "end": 28
          },
          "query": { "code": "() => { assert1(true); assert1; };\n", "indent": "", "annotation": "//                     ^?\n// @errs:\n", "marker": "//                     ^?\n", "head": "//", "offset": "                     ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert1",
            "start": 623,
            "end": 630,
            "line": 25,
            "character": 23,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 395, "length": 7 },
                "kind": "const",
                "name": "assert1",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 382, "length": 84 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert1" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [
                { "example": [{ "text": "For assertion functions to work, they need to have explicit type annotations on every declaration.\n\nTheir expected behaviour is that code following a falsy assertion would be unreachable." }] },
                { "param": [{ "text": "value" }] },
                { "returns": [] }
              ]
            }
          }
        },
        "39": {
          "start": 835,
          "end": 892,
          "lines": {
            "38": { "start": 835, "end": 871, "text": "() => { assert2(false); assert2; };\n" },
            "39": { "start": 871, "end": 882, "text": "//      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "40": { "start": 882, "end": 892, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 39,
            "end": 41
          },
          "query": { "code": "() => { assert2(false); assert2; };\n", "indent": "", "annotation": "//      ^?\n// @errs:\n", "marker": "//      ^?\n", "head": "//", "offset": "      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert2",
            "start": 843,
            "end": 850,
            "line": 38,
            "character": 8,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 815, "length": 7 },
                "kind": "const",
                "name": "assert2",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 802, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              },
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 395, "length": 7 },
                "kind": "function",
                "name": "assert1",
                "containerName": "",
                "contextSpan": { "start": 405, "length": 60 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert2" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [
                { "example": [{ "text": "For assertion functions to work, they need to have explicit type annotations on every declaration.\n\nTheir expected behaviour is that code following a falsy assertion would be unreachable." }] },
                { "param": [{ "text": "value" }] },
                { "returns": [] }
              ]
            }
          }
        },
        "43": {
          "start": 893,
          "end": 966,
          "lines": {
            "42": { "start": 893, "end": 929, "text": "() => { assert2(false); assert2; };\n" },
            "43": { "start": 929, "end": 956, "text": "//                      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "44": { "start": 956, "end": 966, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 43,
            "end": 45
          },
          "query": { "code": "() => { assert2(false); assert2; };\n", "indent": "", "annotation": "//                      ^?\n// @errs:\n", "marker": "//                      ^?\n", "head": "//", "offset": "                      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert2",
            "start": 917,
            "end": 924,
            "line": 42,
            "character": 24,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 815, "length": 7 },
                "kind": "const",
                "name": "assert2",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 802, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "diagnostics": { "errors": [{ "code": 7027, "start": 917, "end": 925, "message": "Unreachable code detected.", "line": 42, "character": 24, "reportsUnnecessary": true }] },
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert2" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "example": [{ "text": "The following works because of the type annotation on the declaration." }] }, { "type": [{ "text": "{ typeof assert1 }" }] }]
            }
          }
        },
        "47": {
          "start": 967,
          "end": 1038,
          "lines": {
            "46": { "start": 967, "end": 1002, "text": "() => { assert2(true); assert2; };\n" },
            "47": { "start": 1002, "end": 1028, "text": "//                     ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                     ", "marker": "^?", "body": "", "terminator": "\n" } },
            "48": { "start": 1028, "end": 1038, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 47,
            "end": 49
          },
          "query": { "code": "() => { assert2(true); assert2; };\n", "indent": "", "annotation": "//                     ^?\n// @errs:\n", "marker": "//                     ^?\n", "head": "//", "offset": "                     ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert2",
            "start": 990,
            "end": 997,
            "line": 46,
            "character": 23,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 815, "length": 7 },
                "kind": "const",
                "name": "assert2",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 802, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert2" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "example": [{ "text": "The following works because of the type annotation on the declaration." }] }, { "type": [{ "text": "{ typeof assert1 }" }] }]
            }
          }
        },
        "60": {
          "start": 1199,
          "end": 1256,
          "lines": {
            "59": { "start": 1199, "end": 1235, "text": "() => { assert3(false); assert3; };\n" },
            "60": { "start": 1235, "end": 1246, "text": "//      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "61": { "start": 1246, "end": 1256, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 60,
            "end": 62
          },
          "query": { "code": "() => { assert3(false); assert3; };\n", "indent": "", "annotation": "//      ^?\n// @errs:\n", "marker": "//      ^?\n", "head": "//", "offset": "      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert3",
            "start": 1207,
            "end": 1214,
            "line": 59,
            "character": 8,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 1179, "length": 7 },
                "kind": "const",
                "name": "assert3",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 1166, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              },
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 395, "length": 7 },
                "kind": "function",
                "name": "assert1",
                "containerName": "",
                "contextSpan": { "start": 405, "length": 60 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "diagnostics": { "errors": [{ "code": 2775, "start": 1207, "end": 1214, "message": "Assertions require every name in the call target to be declared with an explicit type annotation.", "line": 59, "character": 8 }] },
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert3" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [
                { "example": [{ "text": "For assertion functions to work, they need to have explicit type annotations on every declaration.\n\nTheir expected behaviour is that code following a falsy assertion would be unreachable." }] },
                { "param": [{ "text": "value" }] },
                { "returns": [] }
              ]
            }
          }
        },
        "64": {
          "start": 1257,
          "end": 1330,
          "lines": {
            "63": { "start": 1257, "end": 1293, "text": "() => { assert3(false); assert3; };\n" },
            "64": { "start": 1293, "end": 1320, "text": "//                      ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                      ", "marker": "^?", "body": "", "terminator": "\n" } },
            "65": { "start": 1320, "end": 1330, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 64,
            "end": 66
          },
          "query": { "code": "() => { assert3(false); assert3; };\n", "indent": "", "annotation": "//                      ^?\n// @errs:\n", "marker": "//                      ^?\n", "head": "//", "offset": "                      ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert3",
            "start": 1281,
            "end": 1288,
            "line": 63,
            "character": 24,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 1179, "length": 7 },
                "kind": "const",
                "name": "assert3",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 1166, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert3" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "example": [{ "text": "This does not work since there is no type annotation on the declaration." }] }, { "no-type-annotation": [] }]
            }
          }
        },
        "68": {
          "start": 1331,
          "end": 1402,
          "lines": {
            "67": { "start": 1331, "end": 1366, "text": "() => { assert3(true); assert3; };\n" },
            "68": { "start": 1366, "end": 1392, "text": "//                     ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                     ", "marker": "^?", "body": "", "terminator": "\n" } },
            "69": { "start": 1392, "end": 1402, "text": "// @errs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 68,
            "end": 70
          },
          "query": { "code": "() => { assert3(true); assert3; };\n", "indent": "", "annotation": "//                     ^?\n// @errs:\n", "marker": "//                     ^?\n", "head": "//", "offset": "                     ", "tail": "// @errs:\n" },
          "target": {
            "name": "assert3",
            "start": 1354,
            "end": 1361,
            "line": 67,
            "character": 23,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 1179, "length": 7 },
                "kind": "const",
                "name": "assert3",
                "containerName": "\"sources/examples/assertions\"",
                "contextSpan": { "start": 1166, "length": 31 },
                "isLocal": false,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "const",
              "kindModifiers": "export",
              "display": [
                { "keyword": "const" },
                { "space": " " },
                { "localName": "assert3" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "unknown" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "example": [{ "text": "This does not work since there is no type annotation on the declaration." }] }, { "no-type-annotation": [] }]
            }
          }
        },
        "80": {
          "start": 1548,
          "end": 1590,
          "lines": {
            "79": { "start": 1548, "end": 1564, "text": "    /**/ assert\n" },
            "80": { "start": 1564, "end": 1576, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "81": { "start": 1576, "end": 1590, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 80,
            "end": 82
          },
          "query": { "code": "    /**/ assert\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1557,
            "end": 1563,
            "line": 79,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1557, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "parameter" },
                { "punctuation": ")" },
                { "space": " " },
                { "parameterName": "assert" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "any" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "85": {
          "start": 1598,
          "end": 1648,
          "lines": {
            "84": { "start": 1598, "end": 1622, "text": "    /**/ assert(false);\n" },
            "85": { "start": 1622, "end": 1634, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "86": { "start": 1634, "end": 1648, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 85,
            "end": 87
          },
          "query": { "code": "    /**/ assert(false);\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1607,
            "end": 1613,
            "line": 84,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1557, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "parameter" },
                { "punctuation": ")" },
                { "space": " " },
                { "parameterName": "assert" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "any" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "89": {
          "start": 1649,
          "end": 1692,
          "lines": {
            "88": { "start": 1649, "end": 1666, "text": "    /**/ assert;\n" },
            "89": { "start": 1666, "end": 1678, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "90": { "start": 1678, "end": 1692, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 89,
            "end": 91
          },
          "query": { "code": "    /**/ assert;\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1658,
            "end": 1664,
            "line": 88,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1557, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "diagnostics": { "errors": [{ "code": 7027, "start": 1658, "end": 1665, "message": "Unreachable code detected.", "line": 88, "character": 9, "reportsUnnecessary": true }] },
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [
                { "punctuation": "(" },
                { "text": "parameter" },
                { "punctuation": ")" },
                { "space": " " },
                { "parameterName": "assert" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "value" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "any" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "asserts" },
                { "space": " " },
                { "text": "value" }
              ],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "104": {
          "start": 1827,
          "end": 1869,
          "lines": {
            "103": { "start": 1827, "end": 1843, "text": "    /**/ assert\n" },
            "104": { "start": 1843, "end": 1855, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "105": { "start": 1855, "end": 1869, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 104,
            "end": 106
          },
          "query": { "code": "    /**/ assert\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1836,
            "end": 1842,
            "line": 103,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1836, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "diagnostics": { "errors": [{ "code": 2502, "start": 1836, "end": 1842, "message": "'assert' is referenced directly or indirectly in its own type annotation.", "line": 103, "character": 9 }] },
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "assert" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "110": {
          "start": 1878,
          "end": 1928,
          "lines": {
            "109": { "start": 1878, "end": 1902, "text": "    /**/ assert(false);\n" },
            "110": { "start": 1902, "end": 1914, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "111": { "start": 1914, "end": 1928, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 110,
            "end": 112
          },
          "query": { "code": "    /**/ assert(false);\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1887,
            "end": 1893,
            "line": 109,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1836, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "assert" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "114": {
          "start": 1929,
          "end": 1972,
          "lines": {
            "113": { "start": 1929, "end": 1946, "text": "    /**/ assert;\n" },
            "114": { "start": 1946, "end": 1958, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "115": { "start": 1958, "end": 1972, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 114,
            "end": 116
          },
          "query": { "code": "    /**/ assert;\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "assert",
            "start": 1938,
            "end": 1944,
            "line": 113,
            "character": 9,
            "definitions": [
              { "fileName": "sources/examples/assertions.js", "textSpan": { "start": 1836, "length": 6 }, "kind": "parameter", "name": "assert", "containerName": "", "isLocal": true, "isAmbient": false, "unverified": false, "failedAliasResolution": false }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "assert" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "assert" }] }]
            }
          }
        },
        "129": {
          "start": 2127,
          "end": 2181,
          "lines": {
            "128": { "start": 2127, "end": 2155, "text": "    /**/ callAssertAnything\n" },
            "129": { "start": 2155, "end": 2167, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "130": { "start": 2167, "end": 2181, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 129,
            "end": 131
          },
          "query": { "code": "    /**/ callAssertAnything\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "callAssertAnything",
            "start": 2136,
            "end": 2154,
            "line": 128,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 2136, "length": 18 },
                "kind": "parameter",
                "name": "callAssertAnything",
                "containerName": "",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "diagnostics": { "errors": [{ "code": 2502, "start": 2136, "end": 2154, "message": "'callAssertAnything' is referenced directly or indirectly in its own type annotation.", "line": 128, "character": 9 }] },
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "callAssertAnything" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "callAssertAnything" }] }]
            }
          }
        },
        "135": {
          "start": 2190,
          "end": 2252,
          "lines": {
            "134": { "start": 2190, "end": 2226, "text": "    /**/ callAssertAnything(false);\n" },
            "135": { "start": 2226, "end": 2238, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "136": { "start": 2238, "end": 2252, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 135,
            "end": 137
          },
          "query": { "code": "    /**/ callAssertAnything(false);\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "callAssertAnything",
            "start": 2199,
            "end": 2217,
            "line": 134,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 2136, "length": 18 },
                "kind": "parameter",
                "name": "callAssertAnything",
                "containerName": "",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "callAssertAnything" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "callAssertAnything" }] }]
            }
          }
        },
        "139": {
          "start": 2253,
          "end": 2308,
          "lines": {
            "138": { "start": 2253, "end": 2282, "text": "    /**/ callAssertAnything;\n" },
            "139": { "start": 2282, "end": 2294, "text": "    //   ^?\n", "annotation": { "head": "    //", "indent": "    ", "offset": "   ", "marker": "^?", "body": "", "terminator": "\n" } },
            "140": { "start": 2294, "end": 2308, "text": "    // @errs:\n", "annotation": { "head": "    //", "indent": "    ", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 139,
            "end": 141
          },
          "query": { "code": "    /**/ callAssertAnything;\n", "indent": "    ", "annotation": "    //   ^?\n    // @errs:\n", "marker": "    //   ^?\n", "head": "    //", "offset": "   ", "tail": "    // @errs:\n" },
          "target": {
            "name": "callAssertAnything",
            "start": 2262,
            "end": 2280,
            "line": 138,
            "character": 9,
            "definitions": [
              {
                "fileName": "sources/examples/assertions.js",
                "textSpan": { "start": 2136, "length": 18 },
                "kind": "parameter",
                "name": "callAssertAnything",
                "containerName": "",
                "isLocal": true,
                "isAmbient": false,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "parameter",
              "kindModifiers": "",
              "display": [{ "punctuation": "(" }, { "text": "parameter" }, { "punctuation": ")" }, { "space": " " }, { "parameterName": "callAssertAnything" }, { "punctuation": ":" }, { "space": " " }, { "keyword": "any" }],
              "tags": [{ "param": [{ "text": "callAssertAnything" }] }]
            }
          }
        },
        "144": {
          "start": 2313,
          "end": 2361,
          "lines": {
            "144": {
              "start": 2313,
              "end": 2361,
              "text": "// @source: test/sources/examples/assertions.js\n",
              "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@source", "body": "test/sources/examples/assertions.js", "terminator": "\n" }
            },
            "start": 144,
            "end": 145
          }
        }
      }
    }
  },
  "annotated": {
    "code": "// @errors: 7027 2775 2502\n// @strict: true\n// @allowUnreachableCode: false\n// @noImplicitAny: true\n\n/**\n * @example\n * \n * For assertion functions to work, they need to have explicit type annotations on every declaration.\n * \n * Their expected behaviour is that code following a falsy assertion would be unreachable.\n * \n * @param {unknown} value\n * @returns { asserts value }\n */\nexport const assert1 = (value) => { if (!value) throw new Error('Expected true'); };\n\n() => { assert1(false); assert1; };\n//      ^?\n// @errs: \n\n() => { assert1(false); assert1; };\n//                      ^?\n// @errs: [Error: 7027] Unreachable code detected.\n\n() => { assert1(true); assert1; };\n//                     ^?\n// @errs: \n\n/**\n * @example\n * \n * The following works because of the type annotation on the declaration.\n * \n * @type { typeof assert1 }\n */\nexport const assert2 = assert1;\n\n() => { assert2(false); assert2; };\n//      ^?\n// @errs: \n\n() => { assert2(false); assert2; };\n//                      ^?\n// @errs: [Error: 7027] Unreachable code detected.\n\n() => { assert2(true); assert2; };\n//                     ^?\n// @errs: \n\n/**\n * @example\n * \n * This does not work since there is no type annotation on the declaration.\n * \n * @no-type-annotation\n */\nexport const assert3 = assert1;\n\n() => { assert3(false); assert3; };\n//      ^?\n// @errs: [Error: 2775] Assertions require every name in the call target to be declared with an explicit type annotation.\n\n() => { assert3(false); assert3; };\n//                      ^?\n// @errs: \n\n() => { assert3(true); assert3; };\n//                     ^?\n// @errs: \n\n/**\n * @example\n * \n * The following works because of the type annotation on the argument.\n * \n * @param {(value) => asserts value} assert\n */\n(\n    /**/ assert\n    //   ^?\n    // @errs: \n) => {\n\n    /**/ assert(false);\n    //   ^?\n    // @errs: \n\n    /**/ assert;\n    //   ^?\n    // @errs: [Error: 7027] Unreachable code detected.\n\n};\n\n/**\n * @example\n * \n * The following does not work because of a circularity problem.\n * \n * @param {typeof assert1} assert\n */\n(\n\n    /**/ assert\n    //   ^?\n    // @errs: [Error: 2502] 'assert' is referenced directly or indirectly in its own type annotation.\n\n) => {\n\n    /**/ assert(false);\n    //   ^?\n    // @errs: \n\n    /**/ assert;\n    //   ^?\n    // @errs: \n\n};\n\n/**\n * @example\n * \n * The following does not work as well because of a circularity problem.\n * \n * @param {typeof assert2} callAssertAnything\n */\n(\n\n    /**/ callAssertAnything\n    //   ^?\n    // @errs: [Error: 2502] 'callAssertAnything' is referenced directly or indirectly in its own type annotation.\n\n) => {\n\n    /**/ callAssertAnything(false);\n    //   ^?\n    // @errs: \n\n    /**/ callAssertAnything;\n    //   ^?\n    // @errs: \n\n};\n\n// @source: test/sources/examples/assertions.js\n"
  }
}
```
