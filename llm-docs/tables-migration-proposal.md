# packages/tables — migration proposal (DRY RUN — no edits applied)

Same protocol as `component-migration-log.md` (function-first type mapping, rhythm-vs-construction
spacing gate, flat-corner rule), applied to all 49 non-story components in
`packages/tables/src/lib`. **Per instruction, this pass makes no file edits.** Every proposed
change below is a recommendation for review; nothing has been committed to code. Once reviewed,
edits should be applied as a normal batch (or batches) and logged in `component-migration-log.md`
as usual.

## Read first

Same source docs as every other package: `migration-type-mapping.md`, `migration-spacing-mapping.md`,
`flow.cjs`. One additional load-bearing fact specific to this package: the type map explicitly
carves out table header cells as **"defer to Table Kit (code-authoritative)"** — this package *is*
that Table Kit. That carve-out turns out to apply much more broadly than just header cells.

---

## System-level findings (read this before the per-file list)

### 1. Most of this package is legitimately deferred, not merely unreviewed

`core/renderers/Header.svelte`'s own doc comment says: *"Font size is inherited from the table."*
That's not a gap — it's the design. Table.svelte's root sets one ambient `text-sm` that every
header row, group row, and data cell inherits by default. Individually forcing `product/prose`
roles onto `ColumnGroupHeadingRow`, `ColumnHeadingRow`, `GroupHeadingRow`, `GroupRowCombined`,
`AxisRow`, `ControlRow`, `ColumnSummariesRow`, `Header.svelte`, `Scaffolding.svelte` would fight
this deliberate cascade. **Recommendation: leave the Table Kit's own font-size cascade alone**;
the one high-leverage change worth making is at the single source (see #3).

### 2. Chart/aggregate renderers draw their own type via SVG/Canvas, not Tailwind classes

`aggregateRenderers/*` (BarChart, Histogram, StackedBar) and `renderers/BarDivergingAxis`,
`renderers/PairArrowAxis`, `renderers/BarDivergingCell` all set text size via raw SVG
`font-size="12px"` / `font-size={textSize}px` attributes, not CSS classes. Same category as
`ColorLegend`'s D3-generated-content flag (`ui` package, batch 6) and `ObservablePlot`'s vendor-CSS
flag (`charts` package, batch 14) — migrating these means changing *how* type is applied (attribute
→ class, plus deciding what `textSize`/`numTicks` props should default to), not a simple class swap.
**Recommendation: dedicated follow-up pass**, out of scope for a class-only migration.

### 3. One high-leverage recommendation: Table.svelte's ambient `text-sm`

```
class="text-color-text-text w-full table-auto text-sm"
```
This single class cascades to almost every "unstyled" cell renderer in the package (`ColoredCell`,
`DateCell`, `TextCell`, `TextCellWithUncertainty`, `CategoricalTick`, `Dot`, `Tick` all render plain
text with zero type classes of their own, relying entirely on this ambient value). Migrating just
this one root class to `product body-sm` (+ `product` context) would correctly propagate to that
whole cluster of cell renderers without touching each one individually.

**Also flagging**: `text-color-text-text` looks like a typo (duplicated `-text`) — worth a look
independent of this migration, though colour is out of scope for this pass regardless.

### 4. A real bug, not a token-mapping judgment call: `text-large`

`text-large` is not a valid Tailwind class (the scale is `text-lg`, not `text-large`). It appears
live in:
- `table/menus/EncodingType.svelte` — 4×  (`<h2>` once, `<h3>` three times)
- `table/menus/FilterMenu.svelte` — 1× (`<h2>`)
- `table/menus/SortGroupsMenu.svelte` — 1× (`<h2>`)
- `table/menus/MergeMenu.svelte` — 1×, but inside dead/commented-out code (see below)

Every one of these currently renders at whatever the browser/ambient default is — the class is
silently doing nothing. This should be fixed as part of (or before) any type migration, since right
now these headings have no intentional size at all.

### 5. These popover menus have no `.product`/`.prose` context anywhere

`EncodingType`, `FilterMenu`, `SortGroupsMenu`, `ToggleColumnsMenu`, `GroupRowsMenu` render their
`h2`/`h3` popover headings and `font-bold`-only labels with zero context class in the whole
ancestor chain (up to and including the `Overlay`/`Popover` from `ui`, which itself doesn't force a
context — `Popover.Content` only sets `product body-sm` as its own default, and these `h2`/`h3`s
would inherit that ambient body-sm size were it not for the broken `text-large` override). This is
a coordinated decision, not a per-file one: recommend deciding a "popover panel heading" role (likely
`card-panel-title` for the `h2` and `card-panel-eyebrow` or `label` for the `h3` sub-labels) and
applying it consistently across all five menu files at once, rather than one at a time.

---

## Per-file findings

### `core/aggregateRenderers/` (chart-drawing renderers, all SVG/Canvas)

| File | Finding | Proposed change |
|---|---|---|
| `BarChart.svelte` | `<text font-size="12px">` — off-scale-ish, matches `chart/tick-sm` (12/400) if migrated | Deferred — see system finding #2 |
| `BoxPlot.svelte` | Pure `<canvas>` drawing, no text/CSS at all | None |
| `Dots.svelte` | Pure `<canvas>`/SVG circles, no text | None |
| `Histogram.svelte` | Two `<text font-size="12px">` bin-edge labels | Deferred — see #2 |
| `Mean.svelte` | Plain `<span>`, zero classes — inherits table's ambient default (see #3) | None directly; benefits from #3 |
| `StackedBar.svelte` | `<text font-size="12px">` labels via `theme.tokenNameToValue` colour | Deferred — see #2 |
| `Summary.svelte` | Plain `<span>`, zero classes | None directly; benefits from #3 |
| `ViolinPlot.svelte` | Pure SVG path/line drawing, no text | None |

### `core/renderers/`

| File | Finding | Proposed change |
|---|---|---|
| `BarCell.svelte` | `text-xs` on the bar-value wrapper — **diverges from the table's own ambient `text-sm`**, unlike its sibling cell renderers. `py-1`/`p-1` construction. | Flag: is the smaller size intentional (data-dense bar labels) or should it inherit like its siblings? Recommend `chart/tick-sm` (12/400, exact match) if the smaller size is deliberate; otherwise drop the override. |
| `BarDivergingAxis.svelte` | `font-size={textSize}px` (default 8, off-system), raw SVG attribute | Deferred — see #2 |
| `BarDivergingCell.svelte` | `font-size={textSize}px` (default 16), raw SVG attribute | Deferred — see #2 |
| `CategoricalTick.svelte` | Value `<div>` has zero type classes (inherits ambient). `pl-2` construction. | Benefits from #3 |
| `ColorAndLabel.svelte` | Value `<div>` unstyled (inherits ambient). `mr-1` construction. | Benefits from #3 |
| `ColoredCell.svelte` | `<span>` unstyled (inherits ambient). `p-2` construction. | Benefits from #3 |
| `DateCell.svelte` | `<span>` unstyled (inherits ambient). `p-2` construction. | Benefits from #3 |
| `Dot.svelte` | Value unstyled (inherits ambient). `pl-2` construction. **`rounded-sm`** on a 7×7px marker — ambiguous: if this is meant to read as a circular "dot" (a named genuinely-round exception), it should be `rounded-full`, not `rounded-sm` (which just softens the corners of what's otherwise a tiny square). Flag, don't guess which was intended. | Radius flag — pick `rounded-full` (if circular dot intended) or remove (if square intended) |
| `GoodOrBad.svelte` | `ragClasses`: `text-sm` (14) — matches the table's own ambient, so redundant but not wrong; could map to `product/body-sm` or `chart/label` depending on whether this reads as UI chrome or chart-adjacent. `mb-0.5`/`mr-1`/`mt-0.5` construction (icon offsets). **`rounded-full`** on the icon badge — genuinely round (circular icon badge), matches the named exception, no change needed. | Flag `text-sm` → `body-sm` or `chart/label` (ambiguous, low priority since it already matches ambient); radius is fine as-is |
| `Header.svelte` | `py-0.5 font-semibold` (header cell), `text-xs font-normal` (superscript). **Explicitly deferred per the type map's own "table header cell → Table Kit" carve-out and this file's own doc comment.** `ml-0.5` construction. | No change recommended — this is the Table Kit's own authoritative styling |
| `PairArrowAxis.svelte` | `font-size={textSize}px` (default 8), raw SVG attribute | Deferred — see #2 |
| `PairArrowCell.svelte` | No text/spacing classes at all (pure SVG marker/line) | None |
| `ProportionalSymbol.svelte` | `class="lu-renderer-circle lu-detail le-td le-td-lu-c63 le-td-lu-c63T0"` — these read as leftover classes from an unrelated table-library naming convention (possibly "LineUp", a well-known table-viz library), not our Tailwind system at all. | Flag as likely vestigial/dead classes, unrelated to this migration — worth a separate cleanup decision |
| `TextCell.svelte` | `<span>` unstyled (inherits ambient). `py-2` construction. Weight/colour set via inline `style`, not classes (out of scope regardless). | Benefits from #3 |
| `TextCellWithUncertainty.svelte` | `<span>` unstyled (inherits ambient). `p-2` construction. `text-color-text-muted`/`text-color-text` colour only. | Benefits from #3 |
| `Tick.svelte` | Value unstyled (inherits ambient). `pl-2` construction. | Benefits from #3 |

### `table/` (top level)

| File | Finding | Proposed change |
|---|---|---|
| `Table.svelte` | Root `text-color-text-text w-full table-auto text-sm` — the ambient default discussed in system finding #3. `ml-4 gap-2` (menu row) construction. `text-color-text-text` likely a typo. Style block `@apply bg-color-surface-muted` (zebra stripe) — colour, out of scope. | **Propose**: `text-sm` → `product body-sm` + `product` context on the root; flag the `text-color-text-text` typo separately (colour, not this pass's job to fix but worth noting) |
| `TableContainer.svelte` | `mb-4` between title/subtitle block and the rest — same shape as `ChartContainer`'s `mb-4` (charts batch 14, flagged item 1): genuine title→content rhythm coupling, but no `flow-table`/`flow-chart` context exists to convert to. `sr-only` fine. Style block `.table-container { @apply flex flex-col; }` — no type/spacing. | Flag — same "no flow context for this component family" gap as ChartContainer; leave as bare Tailwind pending a decision |
| `TableHeader.svelte` | `py-2` construction on the header-rows wrapper. Entirely delegates to Table-Kit header row components (deferred, see #1). | No change recommended |
| `cells/ColGroupSpacer.svelte` | No text/spacing classes (pure width spacer + marker class) | None |
| `cells/DataCell.svelte` | Pure composition (`<a>` wrapper or passthrough), no classes | None |

### `table/menus/`

| File | Finding | Proposed change |
|---|---|---|
| `EncodingType.svelte` | `text-large font-bold` ×4 (one `h2`, three `h3`) — the broken-class bug (system finding #4), no context (finding #5). | Flag: fix `text-large` bug + decide popover-heading roles (`h2` → `card-panel-title`? `h3` → `card-panel-eyebrow` or `label`?) as part of a coordinated decision across all five menu files |
| `FilterMenu.svelte` | `text-large font-bold` ×1 (`h2`). Same context gap. | Same as above |
| `GroupIcon.svelte` | Pure SVG icon, no classes | None |
| `GroupRowsMenu.svelte` | No heading classes of its own (delegates to `Overlay`/`Select`) | None directly, but part of the same "menu popover heading" family needing a coordinated decision |
| `HelpText.svelte` (table/menus — **distinct file from `ui`'s `mergeValuesControl/HelpText.svelte`**) | `text-sm font-medium text-color-text-muted` — the explicit `font-medium` (500) conflicts with `body-sm`'s own weight (400); could instead read as `eyebrow` (14/500, muted colour, which would actually fit the existing weight+colour combination better than body-sm). | Flag ambiguous: `body-sm` (drop the weight override) vs. `eyebrow` (keep 500, matches current rendering exactly) |
| `MergeMenu.svelte` | Entire component is commented out / dead code. The dead code contains the same `text-large font-bold` bug plus `ml-0.5` on a `GroupIcon`. | No live code to migrate; flag for whoever restores this component to fix `text-large` at the same time |
| `SortGroupsMenu.svelte` | `text-large font-bold` ×1 (`h2`). `flex flex-col gap-2` — vertical stack of distinct fixed `<Select>` fields inside one closed popover (same "fixed short sequence in a closed widget" shape as FileUpload/LoginForm) → construction, not rhythm. | Same heading fix/decision as EncodingType/FilterMenu; `gap-2` construction, no change |
| `ToggleColumnsMenu.svelte` | `<h2 class="font-bold">` — no size at all (same "weight-only, no map entry" shape as several earlier flagged cases, e.g. AppShell/Modal-before-resolution). | Flag: needs the same coordinated popover-heading decision as the `text-large` files |

### `table/paginationControls/`

| File | Finding | Proposed change |
|---|---|---|
| `NumRowsControls.svelte` | `mb-4` around a single `<Select>` — construction (nothing to stack against). | No change |
| `PaginationControls.svelte` | Root `text-sm text-color-text-muted` — the "Showing X to Y of Z entries" pagination summary text. Clean function match: `product/body-sm` (exact size, no resize). `w-12 border` on the page-number input — dimension/border, out of scope. | **Propose**: `text-sm` → `body-sm` + `product` context on the root div. This one is NOT ambiguous like the Table-Kit-deferred cases — it's page-level chrome around the table, not header/cell content, so the Table-Kit carve-out doesn't apply here. |

### `table/rows/` (and `groupRows/`, `headerRows/`)

All of these are Table-Kit-internal row/scaffolding components. None carry their own type-role
classes beyond `font-bold`/`text-center` weight-only styling on group-heading labels, which is the
same deferred pattern as `Header.svelte` (system finding #1). Spacing is exclusively `was-td`/`was-tr`
marker classes (not Tailwind) plus inline `style:width` — nothing in the rhythm-vs-construction gate
applies. Listed for completeness; **no changes recommended for any file in this group**:

- `rows/DataRow.svelte`, `rows/RowRenderer.svelte`, `rows/Scaffolding.svelte` — pure logic/layout, no type classes.
- `rows/groupRows/Group.svelte`, `GroupSummaryRow.svelte` — pure composition.
- `rows/groupRows/GroupHeadingRow.svelte`, `GroupRowCombined.svelte` — `ml-0.5` construction (icon offset); group-name label unstyled (deferred). `GroupRowCombined` also has `text-color-text-muted` (colour only) on ancestor-path labels.
- `rows/groupRows/GroupSizeBar.svelte` — no type/spacing classes (pure `style:` positioning).
- `rows/headerRows/AxisRow.svelte`, `ColumnSummariesRow.svelte` — pure delegation, no classes of their own.
- `rows/headerRows/ColumnGroupHeadingRow.svelte` — `text-center font-bold` on the group label (deferred, weight-only, inherits ambient size).
- `rows/headerRows/ColumnGroupHeadingRuleRow.svelte` — only a border-rule div, no type/spacing.
- `rows/headerRows/ColumnHeadingRow.svelte` — `font-bold` on the group-size-label heading (deferred); delegates individual column headers to `Header.svelte` (already covered above).
- `rows/headerRows/ControlRow.svelte` — `ml-0.5` construction (icon offset).

---

## Radius summary

| File | Class | Verdict |
|---|---|---|
| `core/renderers/Dot.svelte` | `rounded-sm` on a 7×7px marker | **Flagged** — ambiguous between "should be `rounded-full` (circular dot)" and "should have no radius (square marker)". Not a clear pass under the flat-corner rule as currently written. |
| `core/renderers/GoodOrBad.svelte` | `rounded-full` on the icon badge | **Fine as-is** — genuinely round icon badge, matches the named exception. |

No other `rounded-*` found anywhere in the package.

---

## Summary — what a real batch would need to decide

**Low-risk, high-confidence proposals** (would recommend applying largely as-is):
1. `Table.svelte`: `text-sm` → `product body-sm` (cascades to ~7 cell renderers for free).
2. `PaginationControls.svelte`: `text-sm` → `body-sm` + `product`.
3. Fix the `text-large` typo (→ `text-lg`, or better, a proper role once #4 below is decided) in `EncodingType.svelte`, `FilterMenu.svelte`, `SortGroupsMenu.svelte`.

**Needs a coordinated design decision before any edit:**
4. Popover-panel heading roles (`h2`/`h3`) across `EncodingType`, `FilterMenu`, `SortGroupsMenu`, `ToggleColumnsMenu`, `GroupRowsMenu` — five files, one decision.
5. `table/menus/HelpText.svelte` — `body-sm` vs. `eyebrow`.
6. `BarCell.svelte`'s `text-xs` divergence from the table's ambient size — intentional or drop?
7. `Dot.svelte`'s `rounded-sm` — `rounded-full` or remove?

**Deferred, out of scope for a class-only pass:**
8. All SVG/Canvas-drawn chart type in `aggregateRenderers/*` and the axis/diverging-cell renderers — needs a pass that also decides how to class SVG-generated text (same shape as the `ColorLegend` and `ObservablePlot` flags in the other two packages).
9. The entire Table-Kit row/header/scaffolding cluster (~20 files) — deliberately inherits from `Table.svelte`'s ambient size per the type map's own carve-out; recommend leaving alone.

**Not migration-related, flagged only:**
10. `ProportionalSymbol.svelte`'s `lu-renderer-*`/`le-td-*` classes — likely vestigial, unrelated library naming.
11. `MergeMenu.svelte` — entirely dead/commented-out code; flag for whoever restores it.
12. `Table.svelte`'s `text-color-text-text` — likely a typo, colour/out of scope for this pass regardless.
