---
'@ldn-viz/themes': major
---

CHANGED: rebuild the token pipeline on the version 4 Figma export and publish named outputs through an `exports` map: `index.css`, `tokens.css`, `system.css`, `colors.js` and the Tailwind preset at `@ldn-viz/themes/tailwind`. The per-category `styles/*.css` files, `styles/js/color-tokens.js` and `ldn-theme.cjs` are removed. Several custom properties, classes and JavaScript keys are renamed, including `container` → `surface`, `--grid-spacing-*` → `--grid-*`, `flow-prose`/`flow-product` → `flow-spacious`/`flow-standard`, and the typography set and scale names. See `MIGRATION.md` for the full list.
