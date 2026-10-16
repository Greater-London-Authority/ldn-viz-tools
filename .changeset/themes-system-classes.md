---
'@ldn-viz/themes': major
---

CHANGED: every class the specification names (typesets, roles, usage aliases, flow, emphasis, elevation, grid and focus styles) is now generated as plain CSS in `system.css`, and the Tailwind preset no longer adds them. Tailwind apps import `index.css` as well as the preset. A new `reset.css` (imported first by `index.css`) ports Tailwind's preflight at zero specificity. Unclassed markup (Markdown, CMS output) gets content styles inside `typeset-longform` and `typeset-product`; `.not-prose` becomes `.not-typeset`. Responsive and state variants of system classes (`md:mt-flow-loose`) are no longer available. See `MIGRATION.md`.
