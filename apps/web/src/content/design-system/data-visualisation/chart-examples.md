---
title: Chart examples
description: Using our design system to produce clear, understandable and accessible charts
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
    import ExampleStackedBar from '$lib/components/charts/exampleCharts/bars/ExampleStackedBar.svelte'
    import ExampleSlope from '$lib/components/charts/exampleCharts/slopes/ExampleSlope.svelte'
    import ExampleHistogram from '$lib/components/charts/exampleCharts/histograms/ExampleHistogram.svelte'
    import ExampleScatterplot from '$lib/components/charts/exampleCharts/scatterplots/ExampleScatterplot.svelte'
    import ExampleFacetedScatterplot from '$lib/components/charts/exampleCharts/scatterplots/ExampleFacetedScatterplot.svelte'
    import ExampleCentreTextTreemap from '$lib/components/charts/exampleCharts/treemaps/ExampleCentreTextTreemap.svelte'
    import ExampleTopLeftTextTreemapSimple from '$lib/components/charts/exampleCharts/treemaps/ExampleTopLeftTextTreemapSimple.svelte'
    import ExampleTopLeftTextTreemapVariable from '$lib/components/charts/exampleCharts/treemaps/ExampleTopLeftTextTreemapVariable.svelte'

</script>

<p class="lead">A consistent approach to data presentation ensures that our work is recognisable and easily understood across multiple products and outputs. </p>

These examples are a starting point for producing a range of charts that are clear, understandable and accessible.

You can find Observable Plot code snippets for these examples on our [LDN Viz Tools Storybook](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/charts-examples-line-charts--documentation).

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

### Horizontal Stacked Bar

<ExampleStackedBar />

## Histograms

Histograms are visually similar to column charts, but are designed to show the distribution of continuous values that fall within particular ranges (or bins). As the values are continuous, remove gaps (inset) and keep stroke width minimal.

### Histogram

<ExampleHistogram />

## Slope Charts

Slope charts are good for comparing rates of change and ranking between two points in time.

### Slope chart

<ExampleSlope />

## Scatterplots

Scatterplots are great for showing the relationship between two variables (on the x & y axis). Further dimensions can be encoded through the colour, scale and symbology of the data point.

### Scatterplot

<ExampleScatterplot />

### Faceted Scatterplot

<ExampleFacetedScatterplot />

## Treemaps

Treemaps are used for hierarchical data that have a part-to-whole relationship.

### Centred Text

We prefer treemaps with centred text as they work best across different screen sizes. These are ideal for more infographic-type treemaps.

<ExampleCentreTextTreemap />

However, for treemaps with more text density, it may be preferable to use treemaps with text aligned to the top left. There are two examples, one with one text mark which is simple to reproduce. The second has variable text positioning dependent on other visible text, to ensure the first line of text is always in the same position.

### Top Left Text - Simple

<ExampleTopLeftTextTreemapSimple />

### Top Left Text - Variable Text Position

<ExampleTopLeftTextTreemapVariable />
