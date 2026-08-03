---
title: Chart examples
description: Graphical representation for data visualization
section: Data visualisation
navLabel: Chart examples
heroImage: header-dataviz-overflow.svg
thumbnail: cta-dataviz-2.svg
---

<script>
    import ExampleSingleLine from '$lib/components/charts/exampleCharts/lines/ExampleSingleLine.svelte'
    import ExampleDualLine from '$lib/components/charts/exampleCharts/lines/ExampleDualLine.svelte'
    import ExampleMultipleLine from '$lib/components/charts/exampleCharts/lines/ExampleMultipleLine.svelte'
    import ExampleAreaLine from '$lib/components/charts/exampleCharts/lines/ExampleAreaLine.svelte'
    import ExampleColumn from '$lib/components/charts/exampleCharts/bars/ExampleColumn.svelte'
    import ExampleStackedColumn from '$lib/components/charts/exampleCharts/bars/ExampleStackedColumn.svelte'
    import ExampleFacetedColumn from '$lib/components/charts/exampleCharts/bars/ExampleFacetedColumn.svelte'
    import ExampleBar from '$lib/components/charts/exampleCharts/bars/ExampleBar.svelte'
</script>

## Line Charts

Line charts display data as points connected by lines, excellent for showing trends, patterns, and changes in values over a continuous range, most commonly time.

### Single Lines

A chart showing a single variable doesn't need a legend if well described in the title & subtitle.

<ExampleSingleLine />

### Dual Lines

<ExampleDualLine />

### Multiple Lines

<ExampleMultipleLine />

### Area Chart

<ExampleAreaLine />

## Column Charts

Column charts are vertically oriented bar charts. They always start at zero and have a solid baseline.

### Single Variable Column Chart

Similar to line charts, bar charts with a single variable don't need a legend, if well described in the title & subtitle.

Values that change over time, are shown as column charts with time running left to right on the x-axis (except on mobile, where time can run vertically (latest to oldest)).

<ExampleColumn />

### Stacked Column

Stacked columns are useful for showing how a total is composed of multiple values.

<ExampleStackedColumn />

### Faceted Column

Changes in individual values are easier to see if they are faceted into multiple charts rather individual stacked columns.

<ExampleFacetedColumn />

## Bar Charts

Bar charts are oriented horizontally. They always start at zero and have a solid baseline (on the left).

### Horizontal Bar

<ExampleBar />
