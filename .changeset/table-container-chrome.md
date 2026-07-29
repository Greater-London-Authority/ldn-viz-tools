---
'@ldn-viz/tables': minor
---

`TableContainer` now shares the same chrome structure as `ChartContainer`:

- Built from `ChromeHeader` + `ChromeFooter` (from `@ldn-viz/ui`) instead of the legacy charts `Title`/`SubTitle`/`Footer`. Surfaceless (no border/padding/shadow); compose inside a `Card` for a surface. Existing snippets (`table`, `beforeTable`, `numRowsControlSlot`, `paginationControls`) are unchanged.
- Titles now resolve correctly standalone (the root carries the `product` type context).
- Added `hint` (via `Overlay`), `eyebrow`, and `emphasis` (`primary`/`secondary`) for the primary-slot rule.
- Accessibility: `alt` plus a new optional `description` (string or snippet), exposed to both screen readers (`aria-describedby`) and sighted users (a "View description" modal).
- `subtitle` replaces `subTitle` (deprecated alias kept).
- Dropped the `@ldn-viz/charts` dependency — export buttons now come from `@ldn-viz/ui` (`ExportButtons`).

See `DEPRECATIONS.md`.
