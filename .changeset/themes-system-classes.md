---
'@ldn-viz/themes': major
---

CHANGED: every class the specification names (typesets, roles, usage aliases, flow, emphasis, elevation, grid and focus styles) is now generated as plain CSS in `system.css`, and the Tailwind preset no longer adds them. The preset is generated and only maps Tailwind's theme onto the custom properties; the `.form-*` classes are plain CSS in `system.css`, and `@tailwindcss/forms` is no longer a dependency. Tailwind apps import `index.css` as well as the preset. A new `reset.css` (imported first by `index.css`) ports Tailwind's preflight at zero specificity. Unclassed markup (Markdown, CMS output) gets content styles inside `typeset-longform` and `typeset-product`; `.not-prose` becomes `.not-typeset`. Responsive and state variants of system classes (`md:mt-flow-loose`) are no longer available. See `MIGRATION.md`.
