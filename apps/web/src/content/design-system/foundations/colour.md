---
title: Colour
description: Contrast and differentiation
section: Foundations
navLabel: Colour
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'
    import ChartTokenTable from '$lib/components/tables/colorTokenTables/ChartTokenTable.svelte'
    import DataTokenTable from '$lib/components/tables/colorTokenTables/DataTokenTable.svelte'
    import MultipleLine from '$lib/components/charts/exampleCharts/lineCharts/MultipleLine.svelte'
    import tokens from '@ldn-viz/themes/docs/tokens/color.json';
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'

    let chartTokenData = $derived(
		Object.values(tokens.theme[theme.currentMode ? theme.currentMode : 'light'].color.chart)
	);

    let dataTokenData = $derived(
		Object.values(tokens.theme[theme.currentMode ? theme.currentMode : 'light'].color.data)
	);

    const allowed = ["primary", "secondary", "tertiary"];

    const dataTokens = $derived(dataTokenData.reduce(
    (acc, item) => {
        if (item.name.includes("color-data-categorical")) {
        acc.categorical.push(item);
        } else if (allowed.some(key => item.name.includes(key))) {
        acc.thematic.push(item); // primary/secondary/etc.
        } else {
        acc.others.push(item);
        }
        return acc;
    },
    { categorical: [], thematic: [], others: [] }
    ));
</script>

<div class="not-prose">
<SwatchGrid tokenData={chartTokenData} title="Colors for chart elements"/>
<SwatchGrid tokenData={dataTokens.thematic} title="Colors for data" />
<SwatchGrid tokenData={dataTokens.categorical} title="Colors for categorical data"/>
<SwatchGrid tokenData={dataTokens.others} title="Colors for other data elements"/>
</div>

<MultipleLine />

Sed bibendum ex id congue egestas. Nam enim justo, ultrices et scelerisque quis, vehicula a sem.

<ChartTokenTable title="Chart color tokens" />

<DataTokenTable title="Data color tokens" />

 <!-- <iframe
  src="https://greater-london-authority.github.io/ldn-viz-tools/iframe.html?globals=&args=&id=charts-example-charts-linechart--multiple-lines-inc-custom-tool-tips&viewMode=story"
  width="100%"
  height="700"
></iframe> -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac aliquet mi. Nullam quis nisl erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque imperdiet est quis fermentum aliquet. Nunc porta risus et tellus convallis gravida. Phasellus in condimentum nibh. Sed bibendum ex id congue egestas. Nam enim justo, ultrices et scelerisque quis, vehicula a sem. Aliquam sed porttitor odio, non pulvinar sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

<Callout size="sm">
    {#snippet body()}
        Nam enim justo, ultrices et scelerisque quis, vehicula a sem. Aliquam sed porttitor odio, non pulvinar sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    {/snippet}
</Callout>

Mauris in interdum metus. In maximus consequat dictum. In hac habitasse platea dictumst. Aenean in lacus purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla sollicitudin massa a massa bibendum, eu consequat nunc consequat. Sed tempus eros sed magna ornare tempor. Phasellus venenatis venenatis tortor sollicitudin ultrices. Maecenas molestie magna vitae mauris dignissim, et pharetra orci volutpat. In euismod ullamcorper nunc, id ultrices ligula eleifend eget. Fusce consectetur sem tortor, eu vestibulum lorem iaculis ut.

<Callout size="sm" status="positive">
    {#snippet body()}
        <div class="body-sm pb-2 not-prose"><p>Nam enim justo, ultrices et scelerisque quis, vehicula a sem. Aliquam sed porttitor odio, non pulvinar sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p></div>
    {/snippet}
</Callout>
