** Source Code **

```js
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

```

** Annotated Code **

```js
// @ts-check
// @errors: 7027
// @strict: true
// @allowUnreachableCode: false

/** @param {*} value @return { asserts value } */
export const asserts = (value) => { if (!value) throw new Error('Expected true'); }

() => { asserts(false); asserts; };
//                      ^?
// @defs: const asserts: (value: any) => asserts value
//        [Error: 7027]: Unreachable code detected.
//

/** @param {*} value @return { asserts never } */
export const neverAsserts = (value) => { }

() => { neverAsserts(false); neverAsserts; };
//                           ^?
// @defs: const neverAsserts: (value: any) => asserts never
//

// @source: test/twoslash/examples/assertions.js

```

** Annotation Results **

``` json
{
  "annotated": {
    "code": "// @ts-check\n// @errors: 7027\n// @strict: true\n// @allowUnreachableCode: false\n\n/** @param {*} value @return { asserts value } */\nexport const asserts = (value) => { if (!value) throw new Error('Expected true'); }\n\n() => { asserts(false); asserts; };\n//                      ^?\n// @defs: const asserts: (value: any) => asserts value\n//        [Error: 7027]: Unreachable code detected.\n//\n\n/** @param {*} value @return { asserts never } */\nexport const neverAsserts = (value) => { }\n\n() => { neverAsserts(false); neverAsserts; };\n//                           ^?\n// @defs: const neverAsserts: (value: any) => asserts never\n//\n\n// @source: test/twoslash/examples/assertions.js\n"
  },
  "twoslash": {
    "code": "// @ts-check\n\n/** @param {*} value @return { asserts value } */\nexport const asserts = (value) => { if (!value) throw new Error('Expected true'); }\n\n() => { asserts(false); asserts; };\n// @defs:\n\n/** @param {*} value @return { asserts never } */\nexport const neverAsserts = (value) => { }\n\n() => { neverAsserts(false); neverAsserts; };\n// @defs:\n\n",
    "extension": "js",
    "highlights": [],
    "queries": [
      {
        "docs": "",
        "kind": "query",
        "start": 173,
        "length": 44,
        "text": "const asserts: (value: any) => asserts value",
        "offset": 24,
        "line": 6
      },
      {
        "docs": "",
        "kind": "query",
        "start": 319,
        "length": 49,
        "text": "const neverAsserts: (value: any) => asserts never",
        "offset": 29,
        "line": 12
      }
    ],
    "staticQuickInfos": [
      {
        "text": "const asserts: (value: any) => asserts value",
        "docs": "",
        "start": 77,
        "length": 7,
        "line": 3,
        "character": 13,
        "targetString": "asserts"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 88,
        "length": 5,
        "line": 3,
        "character": 24,
        "targetString": "value"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 105,
        "length": 5,
        "line": 3,
        "character": 41,
        "targetString": "value"
      },
      {
        "text": "var Error: ErrorConstructor\nnew (message?: string | undefined) => Error",
        "docs": "",
        "start": 122,
        "length": 5,
        "line": 3,
        "character": 58,
        "targetString": "Error"
      },
      {
        "text": "const asserts: (value: any) => asserts value",
        "docs": "",
        "start": 157,
        "length": 7,
        "line": 5,
        "character": 8,
        "targetString": "asserts"
      },
      {
        "text": "const asserts: (value: any) => asserts value",
        "docs": "",
        "start": 173,
        "length": 7,
        "line": 5,
        "character": 24,
        "targetString": "asserts"
      },
      {
        "text": "const neverAsserts: (value: any) => asserts never",
        "docs": "",
        "start": 259,
        "length": 12,
        "line": 9,
        "character": 13,
        "targetString": "neverAsserts"
      },
      {
        "text": "(parameter) value: any",
        "docs": "",
        "start": 275,
        "length": 5,
        "line": 9,
        "character": 29,
        "targetString": "value"
      },
      {
        "text": "const neverAsserts: (value: any) => asserts never",
        "docs": "",
        "start": 298,
        "length": 12,
        "line": 11,
        "character": 8,
        "targetString": "neverAsserts"
      },
      {
        "text": "const neverAsserts: (value: any) => asserts never",
        "docs": "",
        "start": 319,
        "length": 12,
        "line": 11,
        "character": 29,
        "targetString": "neverAsserts"
      }
    ],
    "errors": [
      {
        "category": 1,
        "code": 7027,
        "length": 8,
        "start": 173,
        "line": 5,
        "character": 24,
        "renderedMessage": "Unreachable code detected.",
        "id": "err-7027-173-8"
      }
    ],
    "playgroundURL": "https://www.typescriptlang.org/play/#code/PTAEAEBcGcFoGMAWBTeBrAUCCyBOuB7XaALlAHYAGAJnKzHGklwEt5IzmBXZeiAQwA2gggHcAqgDtcyfkn4AjQcgDCBACbIyAMyHReWAFSGIAB365+AW1ABvQwF9QANyE8IMyF1yS7oftD6uDAubsigTobAGMgAHqZEkKDwBJJM-oF4IQC8oAAUroI8AJSg2QB8fiza+QCEhSWgkIiEoqCSyG0AovhEeQDkXfGokMjqTbg8-cUA3BEYGHmlFX4BQTB5uoL6sxnr0HMOM3ygp2fnF5cAegD8fOCa2qQLwMZmFtZ2jqFF4eCe3l8tj2WWg7WQzjwEVAURi8USyVS6Q6kNwAEFMsEwbkCmFlpVgQ4FksygTwaiMftNnpkLsUXhKaDDsdsJc2eyLrd7o9nvdoARvPAtE1kExgJBRARoIIAohgHFrKZlNBgGssiwkQA6ABW0AwQA",
    "tags": [
      {
        "name": "source",
        "line": 19,
        "annotation": "test/twoslash/examples/assertions.js"
      }
    ]
  }
}
```
