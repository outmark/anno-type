# examples/imports.js

## Source Code

```js
/// <reference types="node" />

import ts from 'typescript';

const defaultCompilerOptions = ts.getDefaultCompilerOptions();
//                                ^?
// @docs:
// @defs: 

defaultCompilerOptions.moduleResolution;
//                     ^?
// @docs:
// @defs: 

import fs from 'fs';

(() => fs.readFile('test.txt'));
//        ^?
// @docs: Asynchronously reads the entire contents of a file.
//        ```js
//        import { readFile } from 'fs';
//        readFile('/etc/passwd', (err, data) => {
//          if (err) throw err;
//          console.log(data);
//        });
//        ```
//        The callback is passed two arguments `(err, data)`, where `data` is the
//        contents of the file.
//        If no encoding is specified, then the raw buffer is returned.
//        If `options` is a string, then it specifies the encoding:
//        ```js
//        import { readFile } from 'fs';
//        readFile('/etc/passwd', 'utf8', callback);
//        ```
//        When the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an
//        error will be returned. On FreeBSD, a representation of the directory's contents
//        will be returned.
//        ```js
//        import { readFile } from 'fs';
//        // macOS, Linux, and Windows
//        readFile('<directory>', (err, data) => {
//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]
//        });
//        //  FreeBSD
//        readFile('<directory>', (err, data) => {
//          // => null, <data>
//        });
//        ```
//        It is possible to abort an ongoing request using an `AbortSignal`. If a
//        request is aborted the callback is called with an `AbortError`:
//        ```js
//        import { readFile } from 'fs';
//        const controller = new AbortController();
//        const signal = controller.signal;
//        readFile(fileInfo[0].name, { signal }, (err, buf) => {
//          // ...
//        });
//        // When you want to abort the request
//        controller.abort();
//        ```
//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,
//        when possible prefer streaming via `fs.createReadStream()`.
//        Aborting an ongoing request does not abort individual operating
//        system requests but rather the internal buffering `fs.readFile` performs.
//
// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({
//            encoding?: null | undefined;
//            flag?: string | undefined;
//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)
//        namespace readFile
//
// @errs: 
//

// @source test/sources/examples/imports.js
```

## Annotated Code

```js
/// <reference types="node" />

import ts from 'typescript';

const defaultCompilerOptions = ts.getDefaultCompilerOptions();
//                                ^?
// @docs: 
//
// @defs: function ts.getDefaultCompilerOptions(): ts.CompilerOptions

defaultCompilerOptions.moduleResolution;
//                     ^?
// @docs: 
//
// @defs: (property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined

import fs from 'fs';

(() => fs.readFile('test.txt'));
//        ^?
// @docs: Asynchronously reads the entire contents of a file.
//        ```js
//        import { readFile } from 'fs';
//        readFile('/etc/passwd', (err, data) => {
//          if (err) throw err;
//          console.log(data);
//        });
//        ```
//        The callback is passed two arguments `(err, data)`, where `data` is the
//        contents of the file.
//        If no encoding is specified, then the raw buffer is returned.
//        If `options` is a string, then it specifies the encoding:
//        ```js
//        import { readFile } from 'fs';
//        readFile('/etc/passwd', 'utf8', callback);
//        ```
//        When the path is a directory, the behavior of `fs.readFile()` and {@link readFileSync} is platform-specific. On macOS, Linux, and Windows, an
//        error will be returned. On FreeBSD, a representation of the directory's contents
//        will be returned.
//        ```js
//        import { readFile } from 'fs';
//        // macOS, Linux, and Windows
//        readFile('<directory>', (err, data) => {
//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]
//        });
//        //  FreeBSD
//        readFile('<directory>', (err, data) => {
//          // => null, <data>
//        });
//        ```
//        It is possible to abort an ongoing request using an `AbortSignal`. If a
//        request is aborted the callback is called with an `AbortError`:
//        ```js
//        import { readFile } from 'fs';
//        const controller = new AbortController();
//        const signal = controller.signal;
//        readFile(fileInfo[0].name, { signal }, (err, buf) => {
//          // ...
//        });
//        // When you want to abort the request
//        controller.abort();
//        ```
//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,
//        when possible prefer streaming via `fs.createReadStream()`.
//        Aborting an ongoing request does not abort individual operating
//        system requests but rather the internal buffering `fs.readFile` performs.
//
// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({
//            encoding?: null | undefined;
//            flag?: string | undefined;
//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)
//        namespace readFile
//
// @errs: [Error: 2554] Expected 2-3 arguments, but got 1.

// @source test/sources/examples/imports.js
```

## Annotation Results

``` json
{
  "heuristics": {
    "program": {
      "currentDirectory": "vfs",
      "rootFileNames": ["sources/examples/imports.js"],
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
        "rootDir": "sources"
      }
    },
    "file": {
      "fileName": "sources/examples/imports.js",
      "inlineCompilerOptions": {},
      "inlineParameters": {},
      "spans": { "multilineComments": [] },
      "diagnostics": { "errors": [{ "code": 2554, "start": 305, "end": 325, "message": "Expected 2-3 arguments, but got 1.", "line": 16, "character": 10 }], "warnings": [], "suggestions": [], "messages": [] },
      "annotationBlocks": {
        "5": {
          "start": 62,
          "end": 183,
          "lines": {
            "4": { "start": 62, "end": 125, "text": "const defaultCompilerOptions = ts.getDefaultCompilerOptions();\n" },
            "5": { "start": 125, "end": 162, "text": "//                                ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                                ", "marker": "^?", "body": "", "terminator": "\n" } },
            "6": { "start": 162, "end": 172, "text": "// @docs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "7": { "start": 172, "end": 183, "text": "// @defs: \n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "start": 5,
            "end": 8
          },
          "query": {
            "code": "const defaultCompilerOptions = ts.getDefaultCompilerOptions();\n",
            "indent": "",
            "annotation": "//                                ^?\n// @docs:\n// @defs: \n",
            "marker": "//                                ^?\n",
            "head": "//",
            "offset": "                                ",
            "tail": "// @docs:\n// @defs: \n"
          },
          "target": {
            "name": "getDefaultCompilerOptions",
            "dottedName": "ts.getDefaultCompilerOptions",
            "start": 96,
            "end": 121,
            "line": 4,
            "character": 34,
            "definitions": [
              {
                "fileName": "../node_modules/typescript/lib/typescript.d.ts",
                "textSpan": { "start": 385891, "length": 25 },
                "kind": "function",
                "name": "getDefaultCompilerOptions",
                "containerName": "ts",
                "contextSpan": { "start": 385882, "length": 54 },
                "isLocal": true,
                "isAmbient": true,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "function",
              "kindModifiers": "declare",
              "display": [
                { "keyword": "function" },
                { "space": " " },
                { "moduleName": "ts" },
                { "punctuation": "." },
                { "functionName": "getDefaultCompilerOptions" },
                { "punctuation": "(" },
                { "punctuation": ")" },
                { "punctuation": ":" },
                { "space": " " },
                { "aliasName": "ts" },
                { "punctuation": "." },
                { "interfaceName": "CompilerOptions" }
              ]
            }
          }
        },
        "10": {
          "start": 184,
          "end": 272,
          "lines": {
            "9": { "start": 184, "end": 225, "text": "defaultCompilerOptions.moduleResolution;\n" },
            "10": { "start": 225, "end": 251, "text": "//                     ^?\n", "annotation": { "head": "//", "indent": "", "offset": "                     ", "marker": "^?", "body": "", "terminator": "\n" } },
            "11": { "start": 251, "end": 261, "text": "// @docs:\n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@docs", "body": "", "terminator": "\n" } },
            "12": { "start": 261, "end": 272, "text": "// @defs: \n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@defs", "body": "", "terminator": "\n" } },
            "start": 10,
            "end": 13
          },
          "query": {
            "code": "defaultCompilerOptions.moduleResolution;\n",
            "indent": "",
            "annotation": "//                     ^?\n// @docs:\n// @defs: \n",
            "marker": "//                     ^?\n",
            "head": "//",
            "offset": "                     ",
            "tail": "// @docs:\n// @defs: \n"
          },
          "target": {
            "name": "moduleResolution",
            "dottedName": "defaultCompilerOptions.moduleResolution",
            "start": 207,
            "end": 223,
            "line": 9,
            "character": 23,
            "definitions": [
              {
                "fileName": "../node_modules/typescript/lib/typescript.d.ts",
                "textSpan": { "start": 139536, "length": 16 },
                "kind": "property",
                "name": "moduleResolution",
                "containerName": "ts.CompilerOptions",
                "contextSpan": { "start": 139536, "length": 40 },
                "isLocal": true,
                "isAmbient": true,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "details": {
              "kind": "property",
              "kindModifiers": "declare,optional",
              "display": [
                { "punctuation": "(" },
                { "text": "property" },
                { "punctuation": ")" },
                { "space": " " },
                { "moduleName": "ts" },
                { "punctuation": "." },
                { "interfaceName": "CompilerOptions" },
                { "punctuation": "." },
                { "propertyName": "moduleResolution" },
                { "punctuation": "?" },
                { "punctuation": ":" },
                { "space": " " },
                { "aliasName": "ts" },
                { "punctuation": "." },
                { "enumName": "ModuleResolutionKind" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "undefined" }
              ]
            }
          }
        },
        "17": {
          "start": 295,
          "end": 2819,
          "lines": {
            "16": { "start": 295, "end": 328, "text": "(() => fs.readFile('test.txt'));\n" },
            "17": { "start": 328, "end": 341, "text": "//        ^?\n", "annotation": { "head": "//", "indent": "", "offset": "        ", "marker": "^?", "body": "", "terminator": "\n" } },
            "18": {
              "start": 341,
              "end": 403,
              "text": "// @docs: Asynchronously reads the entire contents of a file.\n",
              "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@docs", "body": "Asynchronously reads the entire contents of a file.", "terminator": "\n" }
            },
            "65": {
              "start": 2470,
              "end": 2541,
              "text": "// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({\n",
              "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@defs", "body": "function readFile(path: fs.PathOrFileDescriptor, options: ({", "terminator": "\n" }
            },
            "71": { "start": 2805, "end": 2816, "text": "// @errs: \n", "annotation": { "head": "//", "indent": "", "offset": " ", "parameter": "@errs", "body": "", "terminator": "\n" } },
            "start": 17,
            "end": 73
          },
          "query": {
            "code": "(() => fs.readFile('test.txt'));\n",
            "indent": "",
            "annotation": "//        ^?\n// @docs: Asynchronously reads the entire contents of a file.\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', (err, data) => {\n//          if (err) throw err;\n//          console.log(data);\n//        });\n//        ```\n//        The callback is passed two arguments `(err, data)`, where `data` is the\n//        contents of the file.\n//        If no encoding is specified, then the raw buffer is returned.\n//        If `options` is a string, then it specifies the encoding:\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', 'utf8', callback);\n//        ```\n//        When the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an\n//        error will be returned. On FreeBSD, a representation of the directory's contents\n//        will be returned.\n//        ```js\n//        import { readFile } from 'fs';\n//        // macOS, Linux, and Windows\n//        readFile('<directory>', (err, data) => {\n//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n//        });\n//        //  FreeBSD\n//        readFile('<directory>', (err, data) => {\n//          // => null, <data>\n//        });\n//        ```\n//        It is possible to abort an ongoing request using an `AbortSignal`. If a\n//        request is aborted the callback is called with an `AbortError`:\n//        ```js\n//        import { readFile } from 'fs';\n//        const controller = new AbortController();\n//        const signal = controller.signal;\n//        readFile(fileInfo[0].name, { signal }, (err, buf) => {\n//          // ...\n//        });\n//        // When you want to abort the request\n//        controller.abort();\n//        ```\n//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,\n//        when possible prefer streaming via `fs.createReadStream()`.\n//        Aborting an ongoing request does not abort individual operating\n//        system requests but rather the internal buffering `fs.readFile` performs.\n//\n// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({\n//            encoding?: null | undefined;\n//            flag?: string | undefined;\n//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\n//        namespace readFile\n//\n// @errs: \n//\n",
            "marker": "//        ^?\n",
            "head": "//",
            "offset": "        ",
            "tail": "// @docs: Asynchronously reads the entire contents of a file.\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', (err, data) => {\n//          if (err) throw err;\n//          console.log(data);\n//        });\n//        ```\n//        The callback is passed two arguments `(err, data)`, where `data` is the\n//        contents of the file.\n//        If no encoding is specified, then the raw buffer is returned.\n//        If `options` is a string, then it specifies the encoding:\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', 'utf8', callback);\n//        ```\n//        When the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an\n//        error will be returned. On FreeBSD, a representation of the directory's contents\n//        will be returned.\n//        ```js\n//        import { readFile } from 'fs';\n//        // macOS, Linux, and Windows\n//        readFile('<directory>', (err, data) => {\n//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n//        });\n//        //  FreeBSD\n//        readFile('<directory>', (err, data) => {\n//          // => null, <data>\n//        });\n//        ```\n//        It is possible to abort an ongoing request using an `AbortSignal`. If a\n//        request is aborted the callback is called with an `AbortError`:\n//        ```js\n//        import { readFile } from 'fs';\n//        const controller = new AbortController();\n//        const signal = controller.signal;\n//        readFile(fileInfo[0].name, { signal }, (err, buf) => {\n//          // ...\n//        });\n//        // When you want to abort the request\n//        controller.abort();\n//        ```\n//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,\n//        when possible prefer streaming via `fs.createReadStream()`.\n//        Aborting an ongoing request does not abort individual operating\n//        system requests but rather the internal buffering `fs.readFile` performs.\n//\n// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({\n//            encoding?: null | undefined;\n//            flag?: string | undefined;\n//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\n//        namespace readFile\n//\n// @errs: \n//\n"
          },
          "target": {
            "name": "readFile",
            "dottedName": "fs.readFile",
            "start": 305,
            "end": 313,
            "line": 16,
            "character": 10,
            "definitions": [
              {
                "fileName": "../node_modules/@types/node/fs.d.ts",
                "textSpan": { "start": 110355, "length": 8 },
                "kind": "function",
                "name": "readFile",
                "containerName": "\"fs\"",
                "contextSpan": { "start": 110339, "length": 349 },
                "isLocal": false,
                "isAmbient": true,
                "unverified": false,
                "failedAliasResolution": false
              }
            ],
            "diagnostics": { "errors": [{ "code": 2554, "start": 305, "end": 325, "message": "Expected 2-3 arguments, but got 1.", "line": 16, "character": 10 }] },
            "details": {
              "kind": "function",
              "kindModifiers": "export,declare",
              "display": [
                { "keyword": "function" },
                { "space": " " },
                { "functionName": "readFile" },
                { "punctuation": "(" },
                { "parameterName": "path" },
                { "punctuation": ":" },
                { "space": " " },
                { "aliasName": "fs" },
                { "punctuation": "." },
                { "aliasName": "PathOrFileDescriptor" },
                { "punctuation": "," },
                { "space": " " },
                { "parameterName": "options" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "punctuation": "{" },
                { "lineBreak": "\n" },
                { "space": "    " },
                { "propertyName": "encoding" },
                { "punctuation": "?" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "null" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "undefined" },
                { "punctuation": ";" },
                { "lineBreak": "\n" },
                { "space": "    " },
                { "propertyName": "flag" },
                { "punctuation": "?" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "string" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "undefined" },
                { "punctuation": ";" },
                { "lineBreak": "\n" },
                { "punctuation": "}" },
                { "space": " " },
                { "punctuation": "&" },
                { "space": " " },
                { "className": "EventEmitter" },
                { "punctuation": "." },
                { "interfaceName": "Abortable" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "null" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "undefined" },
                { "punctuation": "," },
                { "space": " " },
                { "parameterName": "callback" },
                { "punctuation": ":" },
                { "space": " " },
                { "punctuation": "(" },
                { "parameterName": "err" },
                { "punctuation": ":" },
                { "space": " " },
                { "moduleName": "NodeJS" },
                { "punctuation": "." },
                { "interfaceName": "ErrnoException" },
                { "space": " " },
                { "punctuation": "|" },
                { "space": " " },
                { "keyword": "null" },
                { "punctuation": "," },
                { "space": " " },
                { "parameterName": "data" },
                { "punctuation": ":" },
                { "space": " " },
                { "localName": "Buffer" },
                { "punctuation": ")" },
                { "space": " " },
                { "punctuation": "=>" },
                { "space": " " },
                { "keyword": "void" },
                { "punctuation": ")" },
                { "punctuation": ":" },
                { "space": " " },
                { "keyword": "void" },
                { "space": " " },
                { "punctuation": "(" },
                { "operator": "+" },
                { "numericLiteral": "3" },
                { "space": " " },
                { "text": "overloads" },
                { "punctuation": ")" },
                { "lineBreak": "\n" },
                { "keyword": "namespace" },
                { "space": " " },
                { "functionName": "readFile" }
              ],
              "documentation": [
                {
                  "text": "Asynchronously reads the entire contents of a file.\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n```\n\nThe callback is passed two arguments `(err, data)`, where `data` is the\ncontents of the file.\n\nIf no encoding is specified, then the raw buffer is returned.\n\nIf `options` is a string, then it specifies the encoding:\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', 'utf8', callback);\n```\n\nWhen the path is a directory, the behavior of `fs.readFile()` and "
                },
                { "link": "{@link " },
                { "linkName": "readFileSync" },
                { "link": "}" },
                {
                  "text": " is platform-specific. On macOS, Linux, and Windows, an\nerror will be returned. On FreeBSD, a representation of the directory's contents\nwill be returned.\n\n```js\nimport { readFile } from 'fs';\n\n// macOS, Linux, and Windows\nreadFile('<directory>', (err, data) => {\n  // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n});\n\n//  FreeBSD\nreadFile('<directory>', (err, data) => {\n  // => null, <data>\n});\n```\n\nIt is possible to abort an ongoing request using an `AbortSignal`. If a\nrequest is aborted the callback is called with an `AbortError`:\n\n```js\nimport { readFile } from 'fs';\n\nconst controller = new AbortController();\nconst signal = controller.signal;\nreadFile(fileInfo[0].name, { signal }, (err, buf) => {\n  // ...\n});\n// When you want to abort the request\ncontroller.abort();\n```\n\nThe `fs.readFile()` function buffers the entire file. To minimize memory costs,\nwhen possible prefer streaming via `fs.createReadStream()`.\n\nAborting an ongoing request does not abort individual operating\nsystem requests but rather the internal buffering `fs.readFile` performs."
                }
              ],
              "tags": [{ "since": [{ "text": "v0.1.29" }] }, { "param": [{ "parameterName": "path" }, { "space": " " }, { "text": "filename or file descriptor" }] }]
            }
          }
        }
      }
    }
  },
  "annotated": {
    "code": "/// <reference types=\"node\" />\n\nimport ts from 'typescript';\n\nconst defaultCompilerOptions = ts.getDefaultCompilerOptions();\n//                                ^?\n// @docs: \n//\n// @defs: function ts.getDefaultCompilerOptions(): ts.CompilerOptions\n\ndefaultCompilerOptions.moduleResolution;\n//                     ^?\n// @docs: \n//\n// @defs: (property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined\n\nimport fs from 'fs';\n\n(() => fs.readFile('test.txt'));\n//        ^?\n// @docs: Asynchronously reads the entire contents of a file.\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', (err, data) => {\n//          if (err) throw err;\n//          console.log(data);\n//        });\n//        ```\n//        The callback is passed two arguments `(err, data)`, where `data` is the\n//        contents of the file.\n//        If no encoding is specified, then the raw buffer is returned.\n//        If `options` is a string, then it specifies the encoding:\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', 'utf8', callback);\n//        ```\n//        When the path is a directory, the behavior of `fs.readFile()` and {@link readFileSync} is platform-specific. On macOS, Linux, and Windows, an\n//        error will be returned. On FreeBSD, a representation of the directory's contents\n//        will be returned.\n//        ```js\n//        import { readFile } from 'fs';\n//        // macOS, Linux, and Windows\n//        readFile('<directory>', (err, data) => {\n//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n//        });\n//        //  FreeBSD\n//        readFile('<directory>', (err, data) => {\n//          // => null, <data>\n//        });\n//        ```\n//        It is possible to abort an ongoing request using an `AbortSignal`. If a\n//        request is aborted the callback is called with an `AbortError`:\n//        ```js\n//        import { readFile } from 'fs';\n//        const controller = new AbortController();\n//        const signal = controller.signal;\n//        readFile(fileInfo[0].name, { signal }, (err, buf) => {\n//          // ...\n//        });\n//        // When you want to abort the request\n//        controller.abort();\n//        ```\n//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,\n//        when possible prefer streaming via `fs.createReadStream()`.\n//        Aborting an ongoing request does not abort individual operating\n//        system requests but rather the internal buffering `fs.readFile` performs.\n//\n// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({\n//            encoding?: null | undefined;\n//            flag?: string | undefined;\n//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\n//        namespace readFile\n//\n// @errs: [Error: 2554] Expected 2-3 arguments, but got 1.\n\n// @source test/sources/examples/imports.js"
  }
}
```