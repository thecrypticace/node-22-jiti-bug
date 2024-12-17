# Jiti Node 22.12+ / 23.x bug

Node 22.12 backported `require(esm)` support. It appears there's a bug either in Node or in Jiti that causes imported files to be handled incorrectly.

## Steps to reproduce

1. Clone this repo
2. Run `node bug.js`

## What happens

This bug reproduces under the following conditions:
- A `require(esm)` call is used
- That call fails and is caught by a `try/catch` block
- Jiti is then used to import that same file

When Jiti is used _by itself_ the bug does not happen — only in conjunction with a failed `require(esm)` call. The one in this repo fails because its importing a file without using a file extension:
```
import file from "./file";
```

If you add the file extension, the bug does not happen because the `require(esm)` call does not fail:
```
import file from "./file.js";
```
