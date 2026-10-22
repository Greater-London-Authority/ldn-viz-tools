# Charts and tables

Spec section: Charts and Tables. ADRs: [0008](../../../../design-system-specification/decisions/0008-charts.md), [0007](../../../../design-system-specification/decisions/0007-tables.md).

Code is the source of truth for charts and tables. Figma versions are representative.

## Chart text and colour

A chart is on-system when its text uses product roles or the chart usage aliases, and its colours use the `data` and `chart` tokens. There is no chart typeset; charts use `typeset-product`.

| Text | Alias | Role |
| --- | --- | --- |
| Title | `.chart-title` | `title-sm` |
| Subtitle | `.chart-subtitle` | `subtitle-sm`, muted |
| Axis title, legend title | `.chart-axis-title` | `label-md`, muted |
| Data label, annotation, legend entry | `.chart-label` | `label-md` |
| Tick | `.chart-tick` | `caption-md`, muted, tabular numerals |
| Small tick | `.chart-tick-sm` | `caption-sm`, muted, tabular numerals |
| Note, source | `.chart-note` | `caption-sm` |

Category and x-axis labels sit below the baseline. Y-axis ticks sit to the left of the plot.

## ChartContainer

`ChartContainer` (`packages/charts/src/lib/chartContainer/ChartContainer.svelte`) has a header, a content slot and a footer. The header is `ChromeHeader` from `@ldn-viz/ui`: title, optional eyebrow and subtitle, and an optional hint. The hint is a slot for a tooltip, popover or modal, not a text role. The footer is `ChromeFooter`, for notes and sources.

The container sets `typeset-product chart` on its root. `.chart` is a block object for flow and a wide element for the measure (see [flow.md](flow.md) and [typography.md](typography.md)).

The legend and plot go in the slot. The container doesn't build them.

## Observable Plot defaults

`packages/charts/src/lib/observablePlotFragments/observablePlotFragments.ts` has the default styles for Plot marks. They read colours through `theme.tokenNameToValue()`:

- data marks: `data.primary`, as the default for a single series. For more series, see Data colours in [colour.md](colour.md)
- grid lines: `chart.grid`
- axis lines: `chart.axis`
- text: `chart.label`
- plot background, tooltip fill, dot fill, and the stroke between bars: `chart.surface`
- tooltip borders: `border.muted`

`ObservablePlotInner.svelte` sets `--plot-background: var(--color-chart-surface)`.

The plot's root style sets `fontSize: 'var(--caption-md-font-size, 0.875rem)'`, the role behind `.chart-tick`. Tip and annotation marks set no font size, so they inherit it. SVG text in some table cell renderers (`StackedBar`, `BarChart`, `Histogram`, `BarDivergingCell`) still sets a size in px.

```js
Plot.line(data, {
	x: 'Month',
	y: 'Value',
	stroke: theme.tokenNameToValue('data.primary')
});
```

## Tables

`TableContainer` (`packages/tables/src/lib/table/TableContainer.svelte`) sets `typeset-product` and uses `ChromeHeader` for its title group.

Table text uses the aliases `.table-title`, `.table-subtitle`, `.table-col-head`, `.table-col-head-sm` and `.table-body`. In `packages/tables`, `.table-body` is on the table and `.table-col-head` on column and group heads.

In Figma, tables are a kit of cells, rows and header rows. Cell widths are xs 64, sm 88, md 120, lg 220, xl 300, or fill. Code is authoritative.
