---
title: Map examples
description: Guidance on spatial data visualisation
section: Data visualisation
navLabel: Map examples
heroImage: header-dataviz-overflow.svg
thumbnail: cta-dataviz-2.svg
---

<script>
    import ExampleBoroughChoropleth from '$lib/components/charts/exampleCharts/maps/ExampleBoroughChoropleth.svelte'
    import ExampleBoroughChoroplethDiverging from '$lib/components/charts/exampleCharts/maps/ExampleBoroughChoroplethDiverging.svelte'
    import ExampleBoroughChoroplethContinuous from '$lib/components/charts/exampleCharts/maps/ExampleBoroughChoroplethContinuous.svelte'
    import ColorRampGenerator from '$lib/components/ramp/ColorRampGenerator.svelte'
    import ExampleBoroughSymbol from '$lib/components/charts/exampleCharts/maps/ExampleBoroughSymbol.svelte'


    // get width & height of wrappers around content components
    // TODO: Code review.. is this ok to share between bindings on component wrappers
    let contentWidth = $state();
	let contentHeight = $state();

</script>

<p class="lead">We generally display spatial data using choropleth maps, but sometimes use symbol maps or grid cartograms. </p>

These examples show how we use our colour system with Observable Plot to produce simple SVG choropleth and symbol maps that can be used in interactive dashboards or static reports.

Creating choropleth maps (where regions are coloured by value) is closely linked to the topic of

For more complex interactive map examples using DeckGL and MapLibre, see [LDN Viz Tools Storybook](https://greater-london-authority.github.io/ldn-viz-tools/?path=/docs/maps-introduction--documentation).

## Choropleth Maps

### Sequential (stepped) color

Values for each London borough are visualised in (5) discrete colour steps along a sequential color ramp. This is helpful if you are communicating broader groups.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ExampleBoroughChoropleth containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

### Sequential (continuous) color

Values for each London borough are mapped along a continuous sequential color ramp. This shows a more nuanced view of the values and difference between each region.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ExampleBoroughChoroplethContinuous containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

### Diverging (stepped) color

Values for each London borough are binned into (10) discrete colour steps along a diverging color ramp. An additional discrete grey step is added in the middle for values of zero change.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ExampleBoroughChoroplethDiverging containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

### Need your own colour scale?

You can generate your own stepped colour scales using our colour tokens, with this tool:

<ColorRampGenerator title='Generate a colour ramp' colorRight='blue' type='Sequential' breaks={5} />

## Symbol Maps

Choropleth maps (above) tend to distort data perception, because larger geographic areas dominate the map. A good alternative to choropleth maps are symbol maps, where we scale symbols located at the area's centroid.

### Borough Symbol Map

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ExampleBoroughSymbol containerWidth={contentWidth} containerHeight={contentHeight} />
</div>
