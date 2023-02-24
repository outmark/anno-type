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
// @docs: ‹void›
//
// @defs: function ts.getDefaultCompilerOptions(): ts.CompilerOptions
//

defaultCompilerOptions.moduleResolution;
//                     ^?
// @docs: ‹void›
//
// @defs: (property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined
//

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
// @errs: [Error: 2554]: Expected 2-3 arguments, but got 1.
//

// @source test/sources/examples/imports.js
```

## Annotation Results

``` json
{
  "twoslash": {
    "code": "/// <reference types=\"node\" />\n\nimport ts from 'typescript';\n\nconst defaultCompilerOptions = ts.getDefaultCompilerOptions();\n// @docs:\n\ndefaultCompilerOptions.moduleResolution;\n// @docs:\n\nimport fs from 'fs';\n\n(() => fs.readFile('test.txt'));\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', (err, data) => {\n//          if (err) throw err;\n//          console.log(data);\n//        });\n//        ```\n//        The callback is passed two arguments `(err, data)`, where `data` is the\n//        contents of the file.\n//        If no encoding is specified, then the raw buffer is returned.\n//        If `options` is a string, then it specifies the encoding:\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', 'utf8', callback);\n//        ```\n//        When the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an\n//        error will be returned. On FreeBSD, a representation of the directory's contents\n//        will be returned.\n//        ```js\n//        import { readFile } from 'fs';\n//        // macOS, Linux, and Windows\n//        readFile('<directory>', (err, data) => {\n//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n//        });\n//        //  FreeBSD\n//        readFile('<directory>', (err, data) => {\n//          // => null, <data>\n//        });\n//        ```\n//        It is possible to abort an ongoing request using an `AbortSignal`. If a\n//        request is aborted the callback is called with an `AbortError`:\n//        ```js\n//        import { readFile } from 'fs';\n//        const controller = new AbortController();\n//        const signal = controller.signal;\n//        readFile(fileInfo[0].name, { signal }, (err, buf) => {\n//          // ...\n//        });\n//        // When you want to abort the request\n//        controller.abort();\n//        ```\n//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,\n//        when possible prefer streaming via `fs.createReadStream()`.\n//        Aborting an ongoing request does not abort individual operating\n//        system requests but rather the internal buffering `fs.readFile` performs.\n//\n//            encoding?: null | undefined;\n//            flag?: string | undefined;\n//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\n//        namespace readFile\n//\n//\n\n// @source test/sources/examples/imports.js",
    "extension": "js",
    "highlights": [],
    "queries": [
      { "docs": "", "kind": "query", "start": 96, "length": 59, "text": "function ts.getDefaultCompilerOptions(): ts.CompilerOptions", "offset": 34, "line": 5 },
      { "docs": "", "kind": "query", "start": 159, "length": 84, "text": "(property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined", "offset": 23, "line": 8 },
      {
        "docs": "Asynchronously reads the entire contents of a file.\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n```\n\nThe callback is passed two arguments `(err, data)`, where `data` is the\ncontents of the file.\n\nIf no encoding is specified, then the raw buffer is returned.\n\nIf `options` is a string, then it specifies the encoding:\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', 'utf8', callback);\n```\n\nWhen the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an\nerror will be returned. On FreeBSD, a representation of the directory's contents\nwill be returned.\n\n```js\nimport { readFile } from 'fs';\n\n// macOS, Linux, and Windows\nreadFile('<directory>', (err, data) => {\n  // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n});\n\n//  FreeBSD\nreadFile('<directory>', (err, data) => {\n  // => null, <data>\n});\n```\n\nIt is possible to abort an ongoing request using an `AbortSignal`. If a\nrequest is aborted the callback is called with an `AbortError`:\n\n```js\nimport { readFile } from 'fs';\n\nconst controller = new AbortController();\nconst signal = controller.signal;\nreadFile(fileInfo[0].name, { signal }, (err, buf) => {\n  // ...\n});\n// When you want to abort the request\ncontroller.abort();\n```\n\nThe `fs.readFile()` function buffers the entire file. To minimize memory costs,\nwhen possible prefer streaming via `fs.createReadStream()`.\n\nAborting an ongoing request does not abort individual operating\nsystem requests but rather the internal buffering `fs.readFile` performs.",
        "kind": "query",
        "start": 220,
        "length": 281,
        "text": "function readFile(path: fs.PathOrFileDescriptor, options: ({\n    encoding?: null | undefined;\n    flag?: string | undefined;\n} & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\nnamespace readFile",
        "offset": 10,
        "line": 13
      }
    ],
    "staticQuickInfos": [
      { "text": "(alias) namespace ts\nimport ts", "docs": "", "start": 39, "length": 2, "line": 2, "character": 7, "targetString": "ts" },
      { "text": "const defaultCompilerOptions: ts.CompilerOptions", "docs": "", "start": 68, "length": 22, "line": 4, "character": 6, "targetString": "defaultCompilerOptions" },
      { "text": "(alias) namespace ts\nimport ts", "docs": "", "start": 93, "length": 2, "line": 4, "character": 31, "targetString": "ts" },
      { "text": "function ts.getDefaultCompilerOptions(): ts.CompilerOptions", "docs": "", "start": 96, "length": 25, "line": 4, "character": 34, "targetString": "getDefaultCompilerOptions" },
      { "text": "const defaultCompilerOptions: ts.CompilerOptions", "docs": "", "start": 136, "length": 22, "line": 7, "character": 0, "targetString": "defaultCompilerOptions" },
      { "text": "(property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined", "docs": "", "start": 159, "length": 16, "line": 7, "character": 23, "targetString": "moduleResolution" },
      {
        "text": "(alias) module \"fs\"\nimport fs",
        "docs": "The `fs` module enables interacting with the file system in a\nway modeled on standard POSIX functions.\n\nTo use the promise-based APIs:\n\n```js\nimport * as fs from 'fs/promises';\n```\n\nTo use the callback and sync APIs:\n\n```js\nimport * as fs from 'fs';\n```\n\nAll file system operations have synchronous, callback, and promise-based\nforms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).",
        "start": 195,
        "length": 2,
        "line": 10,
        "character": 7,
        "targetString": "fs"
      },
      {
        "text": "(alias) module \"fs\"\nimport fs",
        "docs": "The `fs` module enables interacting with the file system in a\nway modeled on standard POSIX functions.\n\nTo use the promise-based APIs:\n\n```js\nimport * as fs from 'fs/promises';\n```\n\nTo use the callback and sync APIs:\n\n```js\nimport * as fs from 'fs';\n```\n\nAll file system operations have synchronous, callback, and promise-based\nforms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).",
        "start": 217,
        "length": 2,
        "line": 12,
        "character": 7,
        "targetString": "fs"
      },
      {
        "text": "function readFile(path: fs.PathOrFileDescriptor, options: ({\n    encoding?: null | undefined;\n    flag?: string | undefined;\n} & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\nnamespace readFile",
        "docs": "Asynchronously reads the entire contents of a file.\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n```\n\nThe callback is passed two arguments `(err, data)`, where `data` is the\ncontents of the file.\n\nIf no encoding is specified, then the raw buffer is returned.\n\nIf `options` is a string, then it specifies the encoding:\n\n```js\nimport { readFile } from 'fs';\n\nreadFile('/etc/passwd', 'utf8', callback);\n```\n\nWhen the path is a directory, the behavior of `fs.readFile()` and \n{@link \nreadFileSync\n}\n is platform-specific. On macOS, Linux, and Windows, an\nerror will be returned. On FreeBSD, a representation of the directory's contents\nwill be returned.\n\n```js\nimport { readFile } from 'fs';\n\n// macOS, Linux, and Windows\nreadFile('<directory>', (err, data) => {\n  // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n});\n\n//  FreeBSD\nreadFile('<directory>', (err, data) => {\n  // => null, <data>\n});\n```\n\nIt is possible to abort an ongoing request using an `AbortSignal`. If a\nrequest is aborted the callback is called with an `AbortError`:\n\n```js\nimport { readFile } from 'fs';\n\nconst controller = new AbortController();\nconst signal = controller.signal;\nreadFile(fileInfo[0].name, { signal }, (err, buf) => {\n  // ...\n});\n// When you want to abort the request\ncontroller.abort();\n```\n\nThe `fs.readFile()` function buffers the entire file. To minimize memory costs,\nwhen possible prefer streaming via `fs.createReadStream()`.\n\nAborting an ongoing request does not abort individual operating\nsystem requests but rather the internal buffering `fs.readFile` performs.",
        "start": 220,
        "length": 8,
        "line": 12,
        "character": 10,
        "targetString": "readFile"
      }
    ],
    "errors": [{ "category": 1, "code": 2554, "length": 20, "start": 220, "line": 12, "character": 10, "renderedMessage": "Expected 2-3 arguments, but got 1.", "id": "err-2554-220-20" }],
    "playgroundURL": "https://www.typescriptlang.org/play/#code/PQgEB4CcFMDNpgOwMbVAFwJ4AdoGcBeAIkQHsATaI0YAPgCh6BLAW21MnQz1FklJagA5Flx5kkJtnRCA3I2SlEeLpVgBDAK4AbdAGEB2JtoQB5aUyU8C3AHQBzaOgAicLboNtjZi1YAUAJTyYKChYeERkVFhAHoA-PRgAALkpMh4AFyJwKApcJmgjGru+obekObolsq2LBQ60ABK+KTamlVKwTnRPbEJyanpWQP5GYXMbBxcsDx8AsIzcox+gaAEtLx4tjDq5ABi3n4i+Oi26AAeMgFB2dHxtylpBQCCeJgoABb8ZJp42pigHbkHjoD5oaCIKowUCKSEQ9A8UiwUDqXjeWy3KIAAxxACs8JjIqx2JxQABvQHQXYHEygAC+vH4giEiy60SBNOgR2ATmQwGw6jweAA7uQhAAaUB+BCQSXkdTodQBNYbMmEqJMZHSyCQZWg-jC0Aytk9WF4VrQWzaUj2PzyxU3EKROmO7qRHFY9XhAAqYJh6m02gARupkABrUBMHgCoXQcgYYWkFGQeyaFjwnhY7Wy0D2pVYyXCsHQrF5rGRkFgr1hWHoDOgJEYP2wdHV0IASWRZCNKAoTEQ9groDwuGQmqYccloIhTbQkHUhqDmlg8EgQ5g6E0kEQcYxToindAWNIvmU5ajKOH6EkA6nYMQka4I+gY5b+FnPcU5H79mGboiHr4m2kaTKSFIct49KMvMLJ4Es+7hBBJjcry-KCiKYqSkI7SwAAHBK-qBiG4autEHrAQA6veH4CqCQ6ot+MDIOgHCYHeaBBtAHzqAAbpYa6NliMzbFS+yHAE5bqIg8bgEGkB0GSSTaP2EayfJtBIdAADK7zIGpdB0vpGwXtg2gKrAHAsAAtM+r5MMgtigKYD4sKGphaZKAAy-aaOckpSfGFH9qkwp4P5iDATKHCgMKxjaKAnGUpu267k5D57DA0AAEJac4-mUtgMB4PCCrVA2yLTrmTBMSxkCYEIPC1hmwGxYGCVzk4W47uQe7-uEgEEghYTElM5KUtSkEMnMzKssBYCucg7leT5fkotJoBBdJpChcBmlHOAjEvrVmC0AR2ZygqSoquSwGhGA6ygAA2gAojqHBjM97a5e2jRjHF0D2AGDa4POHQPkol6HcxrGSkCEBQ8dtAALrAS6JqRCEGXQNluW7aJnL7QjrGnZK525pdyoPWqQ3hPdGyIDo2iSgdl0MDT9KkdiOLAe2XAmaQQpMEGtIsSiQajVJDYDqQP6UgAjpoJygL8suS1izzi5wWlMPYiABlijmHuoeMK0rF7qJrdbxpVyABsGoYRhetuBnGMVMHRasa1Mr38JAWJ-mReKDX1w2gVw4H45N0EzXB6MRGaXC1vwLtrjYO6Gl7nAGJCycmJAgRx+ECfDjrevxTYSetHnth4KXAaF2Ee0tiY7aIBZj0AAxI7YevppKFK17rQN0qTMqSkusCU6qt00Dktjz6jnMYzkVEzpgpCaDFUlcKLFujZVMCmyowGVynth75wBfAeR7O+mgQlbHtEm8JoKBgwly6rpW4KQtVaDN5aUA3okwsH7KwJgAAvNA6Y6h1RhALBE4oWrUXYILYWaBCpwAQFeHYoCBygD4qiB+tgJBUjrM0XYWlrxUhYIEA2wFM5VHwZLJQ9gZb4MPorFQuZSDvjIFwC+fNpJMD4uQTQQMTwIFKgOYCbwVDQEEJwk4PAlxcFBsWD8-Y6zbiBhPVcstiGaXLCDCykAWBbGyA8NQBRYCv2YmVPatEPhjGEgABQVB8UwkBOSuHEJIaQHBJQnjBgUPw1MQ6RAhF+H8cQxgMzagAH2VtJOA-Y4wN0iLAMy9hYk4Nlkk1+ag0nkAyVBAAZKAZ6PF4TPVAegbRthGEWxMMqJJ8T4oFJSS2bqkpnb23DGMbMYwAByFBoAACktK2B9mQZ65xUCnlAG0xmF1FRjCyp-BAU8CEy3IAEMYPFdlSgANQAGYGzVMgNaXYeAAjAV7vgAUqBxpiRMJY5IMoCiWIeOaLczy6wqGAL8yAqA8A8nOOoNgJgwUjU4FsfEQA",
    "tags": [
      { "name": "defs", "line": 7, "annotation": "" },
      { "name": "defs", "line": 11, "annotation": "" },
      { "name": "docs", "line": 16, "annotation": "Asynchronously reads the entire contents of a file." },
      { "name": "defs", "line": 62, "annotation": "function readFile(path: fs.PathOrFileDescriptor, options: ({" },
      { "name": "errs", "line": 67, "annotation": "" }
    ]
  },
  "annotated": {
    "code": "/// <reference types=\"node\" />\n\nimport ts from 'typescript';\n\nconst defaultCompilerOptions = ts.getDefaultCompilerOptions();\n//                                ^?\n// @docs: ‹void›\n//\n// @defs: function ts.getDefaultCompilerOptions(): ts.CompilerOptions\n//\n\ndefaultCompilerOptions.moduleResolution;\n//                     ^?\n// @docs: ‹void›\n//\n// @defs: (property) ts.CompilerOptions.moduleResolution?: ts.ModuleResolutionKind | undefined\n//\n\nimport fs from 'fs';\n\n(() => fs.readFile('test.txt'));\n//        ^?\n// @docs: Asynchronously reads the entire contents of a file.\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', (err, data) => {\n//          if (err) throw err;\n//          console.log(data);\n//        });\n//        ```\n//        The callback is passed two arguments `(err, data)`, where `data` is the\n//        contents of the file.\n//        If no encoding is specified, then the raw buffer is returned.\n//        If `options` is a string, then it specifies the encoding:\n//        ```js\n//        import { readFile } from 'fs';\n//        readFile('/etc/passwd', 'utf8', callback);\n//        ```\n//        When the path is a directory, the behavior of `fs.readFile()` and <br/>{@link <br/>readFileSync<br/>}<br/> is platform-specific. On macOS, Linux, and Windows, an\n//        error will be returned. On FreeBSD, a representation of the directory's contents\n//        will be returned.\n//        ```js\n//        import { readFile } from 'fs';\n//        // macOS, Linux, and Windows\n//        readFile('<directory>', (err, data) => {\n//          // => [Error: EISDIR: illegal operation on a directory, read <directory>]\n//        });\n//        //  FreeBSD\n//        readFile('<directory>', (err, data) => {\n//          // => null, <data>\n//        });\n//        ```\n//        It is possible to abort an ongoing request using an `AbortSignal`. If a\n//        request is aborted the callback is called with an `AbortError`:\n//        ```js\n//        import { readFile } from 'fs';\n//        const controller = new AbortController();\n//        const signal = controller.signal;\n//        readFile(fileInfo[0].name, { signal }, (err, buf) => {\n//          // ...\n//        });\n//        // When you want to abort the request\n//        controller.abort();\n//        ```\n//        The `fs.readFile()` function buffers the entire file. To minimize memory costs,\n//        when possible prefer streaming via `fs.createReadStream()`.\n//        Aborting an ongoing request does not abort individual operating\n//        system requests but rather the internal buffering `fs.readFile` performs.\n//\n// @defs: function readFile(path: fs.PathOrFileDescriptor, options: ({\n//            encoding?: null | undefined;\n//            flag?: string | undefined;\n//        } & EventEmitter.Abortable) | null | undefined, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void (+3 overloads)\n//        namespace readFile\n//\n// @errs: [Error: 2554]: Expected 2-3 arguments, but got 1.\n//\n\n// @source test/sources/examples/imports.js"
  }
}
```