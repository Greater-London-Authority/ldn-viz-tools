---
'@ldn-viz/charts': minor
---

`ChartContainer` now composes the shared chrome primitives and gains a clearer, consolidated API:

- Built from `ChromeHeader` + `ChromeFooter` (from `@ldn-viz/ui`) — surfaceless (no border/padding/shadow) with an 8px `product/default` rhythm; compose inside a `Card` for a surface, allowing multiple charts per card via the primary-slot rule.
- Added `eyebrow` and `emphasis` (`primary`/`secondary`) so a chart title can demote when a `Card` owns the primary title.
- Accessibility: `alt` (short text alternative) plus a single optional `description` (string or snippet) that is exposed to both screen readers (`aria-describedby`) and sighted users (a "View description" modal).
- `subtitle` replaces `subTitle`, and `description` replaces `chartDescription` — both old names kept as deprecated aliases.
- `Footer`, `Title` and `SubTitle` are deprecated (compose `ChromeFooter` / `ChromeHeader` instead); `ExportBtns` moved to `@ldn-viz/ui` as `ExportButtons` and is re-exported here as a deprecated alias.

`ObservablePlot` is unchanged for consumers (still accepts `chartDescription`). See `DEPRECATIONS.md`.
