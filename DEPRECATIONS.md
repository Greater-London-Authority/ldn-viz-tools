# Pending deprecations

APIs kept working via aliases for one release, to be removed in the next major.
When you remove one, delete its row here and add a changeset describing the breaking change.

Format: deprecated API · package(s) · replacement · deprecated since · remove in.

| Deprecated API | Package | Replacement | Since | Remove in |
|---|---|---|---|---|
| `subTitle` prop | @ldn-viz/charts (`ChartContainer`), @ldn-viz/tables (`TableContainer`) | `subtitle` | 2026-07-29 | next major |
| `chartDescription` prop | @ldn-viz/charts (`ChartContainer`) | `description` | 2026-07-29 | next major |
| `description` snippet | @ldn-viz/ui (`ChromeFooter`) | `footnoteExtra` | 2026-07-29 | next major |
| `chartToCapture` prop | @ldn-viz/ui (`ExportButtons`) | `elementToCapture` | 2026-07-29 | next major |
| `ChromeActions` (export) | @ldn-viz/ui | `ChromeFooter` | 2026-07-29 | next major |
| `ExportBtns` (export) | @ldn-viz/charts | `ExportButtons` (@ldn-viz/ui) | 2026-07-29 | next major |
| `Footer` component | @ldn-viz/charts | `ChromeFooter` (@ldn-viz/ui) | 2026-07-29 | next major |
| `Title` / `SubTitle` components | @ldn-viz/charts | `ChromeHeader` (`title` / `subtitle` props) | 2026-07-29 | next major |

## Notes

- **`ObservablePlot.chartDescription` is intentionally not deprecated** — it remains the high-level
  convenience prop and is forwarded to `ChartContainer`'s `description`.
- **`treatment` → `emphasis` was a hard rename (no alias)** on `Card` / `TitleGroup` / `ChromeHeader`
  (`dominant`/`demoted` → `primary`/`secondary`). It is already breaking, so it belongs in a
  changeset rather than this ledger.
