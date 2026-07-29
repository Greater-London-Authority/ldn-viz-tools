---
'@ldn-viz/ui': major
---

Chrome / titling refinements:

- **BREAKING**: renamed the title-emphasis axis on `Card` / `TitleGroup` / `ChromeHeader` from `treatment` to the library-standard `emphasis`, with values `dominant`/`demoted` → `primary`/`secondary`. No alias — update call sites (`treatment="demoted"` → `emphasis="secondary"`).
- Renamed `ChromeActions` → `ChromeFooter` (positional pair with `ChromeHeader`); `ChromeActions` kept as a deprecated alias export.
- Added `ExportButtons` (moved from `@ldn-viz/charts`), composing the shared data/image download buttons. Its capture prop is `elementToCapture` (generic `HTMLElement`); `chartToCapture` kept as a deprecated alias.
- `ChromeHeader` `hint` now renders via the `Overlay` component (tooltip by default) instead of a raw `title` tooltip; added `hintType` (`tooltip`/`popover`/`modal`) and `hintTitle`.
- `ChromeFooter`'s extra-footnote snippet renamed `description` → `footnoteExtra` (deprecated alias kept).
- `TitleGroup` no longer adds a construction gap (matches Figma; line-heights carry the rhythm).

See `DEPRECATIONS.md` for the aliases scheduled for removal next major.
