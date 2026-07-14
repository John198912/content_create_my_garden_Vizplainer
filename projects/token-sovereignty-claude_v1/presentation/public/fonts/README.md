# Project-local fonts

Put licensed `.woff2` files here, declare them in `src/styles/fonts.css`, and
record their paths plus SHA-256 hashes in `fonts.manifest.json` before running
the production gate. Draft system fallbacks are intentionally not accepted by
`npm run check:production`.
