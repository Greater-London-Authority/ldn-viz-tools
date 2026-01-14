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

    let paletteTokenData = $derived(
		Object.values(tokens.theme[theme.currentMode ? theme.currentMode : 'light'].color.palette)
	);

    const paletteToken = $derived(paletteTokenData.reduce((acc, item) => {
        const parts = item.name.split('-');
        const color = parts[2];
        if (!color) return acc;
        (acc[color] ??= []).push(item);
        return acc;
        }, {})
    );

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

## Principles

Our colour system is rooted in the GLA brand palette. The GLA Brand palette consists of 12 different colors. Using these colours as 'seeds' the design system defines a set of colors that balance the requirements of GLA brand recognition, color differentiation, contrast and interoperability between light and dark themes.

### Global colour palette

The color palette consists of 10 colors, each available in 11 different tints and shades: (color-100 to color-1100).

Perceptual uniformity is maintained within each hue in the color palette. As a result, colors like blue-600 and darkPink-600 have identical contrast ratios when paired with the same color.

Colours are availible in two sets specially tuned for light or dark themed applications. [See more on theming](/design-system/foundations/accessibility)

### Accessibility and contrast

WCAG 2.1 AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. [See more on Accessibility](/design-system/foundations/accessibility)

## Practice

Colors should be referenced using token names. Hex values are provided here only for reference.
[See more on design tokens](/design-system/foundations/design-tokens)

### Global color palette

The global color palette contains the hints and shades that are used as a basis for the semantically named color tokens. In the majority of cases you should not reference this palette directly.

**Do:**

```html
<p class="text-color-text-primary">Use of a semantic class token</p>
```

**Don't:**

```html
<p class="text-color-palette-grey-900">Use of a global class token</p>
```

<div class="not-prose pb-8">
<SwatchGrid tokenData={paletteToken.grey} title="Grey" size="xs" />
<SwatchGrid tokenData={paletteToken.blue} title="Blue" size="xs" />
<SwatchGrid tokenData={paletteToken.green} title="Green" size="xs" />
<SwatchGrid tokenData={paletteToken.yellow} title="Yellow" size="xs" />
<SwatchGrid tokenData={paletteToken.orange} title="Orange" size="xs" />
<SwatchGrid tokenData={paletteToken.red} title="Red" size="xs" />
<SwatchGrid tokenData={paletteToken.pink} title="Pink" size="xs" />
<SwatchGrid tokenData={paletteToken.darkpink} title="Dark Pink" size="xs" />
<SwatchGrid tokenData={paletteToken.purple} title="Purple" size="xs" />
<SwatchGrid tokenData={paletteToken.turquoise} title="Turquoise" size="xs" />
</div>

### Semantic color reference

<div class="not-prose">
<SwatchGrid tokenData={chartTokenData} title="Colors for chart elements"/>
<SwatchGrid tokenData={dataTokens.thematic} title="Colors for data" />
<SwatchGrid tokenData={dataTokens.categorical} title="Colors for categorical data"/>
<SwatchGrid tokenData={dataTokens.others} title="Colors for other data elements"/>
</div>

<!-- <ChartTokenTable title="Chart color tokens" />

<DataTokenTable title="Data color tokens" /> -->

 <!-- <iframe
  src="https://greater-london-authority.github.io/ldn-viz-tools/iframe.html?globals=&args=&id=charts-example-charts-linechart--multiple-lines-inc-custom-tool-tips&viewMode=story"
  width="100%"
  height="700"
></iframe> -->

<!-- <MultipleLine />

Sed bibendum ex id congue egestas. Nam enim justo, ultrices et scelerisque quis, vehicula a sem.

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
</Callout> -->
