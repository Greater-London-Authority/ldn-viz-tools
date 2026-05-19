---
title: Quantitative colour
description: Data values mapped to colour gradients
section: Data visualisation
navLabel: Quantitative colour
---

<script>
    import { onMount } from 'svelte';
	import { Callout, theme, ColorLegend, Select, Checkbox } from '@ldn-viz/ui'
    import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'
    import ColorStackedBar from '$lib/components/charts/exampleCharts/bars/ColorStackedBar.svelte'
    import ColorMultipleLine from '$lib/components/charts/exampleCharts/lines/ColorMultipleLine.svelte'
    import ColorDualLine from '$lib/components/charts/exampleCharts/lines/ColorDualLine.svelte'
    import ColorBoroughMap from '$lib/components/charts/exampleCharts/maps/ColorBoroughMap.svelte'
    import ColorDivergingBoroughMap from '$lib/components/charts/exampleCharts/maps/ColorDivergingBoroughMap.svelte'
    import ColorRampGenerator from '$lib/components/ramp/ColorRampGenerator.svelte'
    import ColorStackedBarLikert from '$lib/components/charts/exampleCharts/bars/ColorStackedBarLikert.svelte'
    import {getColorRamp, tokenNameToValue} from '@ldn-viz/utils'
    import { hsl } from 'd3';
    import { scaleSequential } from 'd3-scale';
	import { interpolateViridis	} from 'd3-scale-chromatic';

    // check if mounted, for DOM (Canvas) dependent components (ColorLegend)
    let mounted = $derived(false);

	onMount(() => {
		mounted = true;
	});

    // get width & height of wrappers around content components
    // TODO: Code review.. is this ok to share between bindings on component wrappers
    let contentWidth = $state();
	let contentHeight = $state();
    

    // functions

     const getTokenByConcept = (startKey = null, obj= tokens.mode[theme.currentMode ?? 'light']) => {
        // Determine the starting point
        let start = obj;
        if (startKey) {
            if (!(startKey in obj)) return []; // key not found
            start = obj[startKey];
        }

        // Recursive search
        const results = [];

        function recurse(current) {
            if (!current || typeof current !== 'object') return;

            if ('value' in current) results.push(current);

            for (const k in current) {
            if (typeof current[k] === 'object') {
                recurse(current[k]);
            }
            }
        }

        recurse(start);

        results.sort((a, b) => {
            const nameA = a.name?.toString().toLowerCase() || '';
            const nameB = b.name?.toString().toLowerCase() || '';
            return nameA.localeCompare(nameB);
        });

        return results;
    }

    const hexToToken = (hexArr = []) => {
        return hexArr.map((hex) => ({name:'', description:'', type:'', value: hex}));
    }

    // based on D3 scale chromatic: https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js
    const ramp = (range) => {
        var n = range.length;
        return function(t) {
            return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
        };
    }

    // ------ 

    let dataTokens = $derived(
        Object.fromEntries(
            Object.entries(
                tokens.mode[theme.currentMode ?? 'light'].data
            ).map(([key, value]) => [
                key,
                { ...value }
            ])
        )
	);

    let themeColorsOrdered = [
            'color-data-primary', 
            'color-data-secondary',
            'color-data-tertiary',
            'color-data-context',
            'color-data-positive',
            'color-data-negative',
            'color-data-male',
            'color-data-female',
            'color-data-empty',
            'color-data-neutral-0',
            'color-data-neutral-1'
        ]

    let themeColors = $derived(getTokenByConcept('data').filter(token => themeColorsOrdered.includes(token.name)).sort((a, b) => themeColorsOrdered.indexOf(a.name) - themeColorsOrdered.indexOf(b.name)));
    

    let chartColorsOrdered = [
            'color-chart-background', 
            'color-chart-axis', 
            'color-chart-grid', 
            'color-chart-label', 
            'color-chart-label-muted' 
        ]

    let chartColors = $derived(getTokenByConcept('chart').filter(token => chartColorsOrdered.includes(token.name)).sort((a, b) => chartColorsOrdered.indexOf(a.name) - chartColorsOrdered.indexOf(b.name)));
    
    
    // blue 5 ramp definition
    let ldnBlue5Ramp = $derived(ramp(getColorRamp({ colors: [
        theme.tokenNameToValue('palette.blue.200'), 
        theme.tokenNameToValue('palette.blue.500'),
        theme.tokenNameToValue('palette.blue.900')
        ],count:5, even:true})))

    // LDN Blue Interpolator 
    const interpolateLDNBlue5 = (t) => {
        return ldnBlue5Ramp(t);
    }

    // let ldnBlue10Tokens = $derived(hexToToken(ldnBlue10Hex))

    let ldnBlue100Ramp = $derived(ramp(getColorRamp({ colors: [
        theme.tokenNameToValue('palette.blue.200'), 
        theme.tokenNameToValue('palette.blue.500'),
        theme.tokenNameToValue('palette.blue.900')
        ],count:100, even:true})))

    // LDN Blue Interpolator 
    const interpolateLDNBlue = (t) => {
        return ldnBlue100Ramp(t);
    }

    // bad "angry" rainbow ramp
    const interpolateAngryRainbow = (t) => {
        return hsl(
            t * 360,
            1,
            0.5
        )
    } 

    

    // angry rainbow scale from HSL interpolator
    let angryRainbowScale = scaleSequential([0, 100], interpolateAngryRainbow);

    // viridis scale from d3 viridis
    let viridisScale = scaleSequential([0, 100], interpolateViridis);

    // ldn blue scale (100)
    let ldnBlueScale = scaleSequential([0, 100], interpolateLDNBlue);

    // ldn blue scale (100)
    let ldnBlue5Scale = scaleSequential([0, 100], interpolateLDNBlue5);


</script>

## Principles

A quantitative colour scale is a continuous gradient of colour mapped to a sequential set of values.

- Quantitative colour scales are commonly used to encode values on a (choropleth) map or the data points on a chart.

- A sequential scale is a gradient of colour that runs in one direction.

- A diverging scale "diverges" in two directions, typically negative and positive.

- The higher the contrast with the background, the higher the value is assumed to be by the reader.

- Colour scales should be perceptually even, so a reader can infer the correct value from the colour.

## Practice

### Quantitative colour scales

A quantitative colour scale is a continuous (smooth or stepped) gradient of colour that is mapped to a sequential set of values. These colour scales can be single-hued (e.g. light to dark blue), or multi-hued (e.g. red, to yellow, to blue).

These quantitative colour scales are commonly used to encode data on a (choropleth) map, or the value of data points on a chart.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ColorBoroughMap containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

#### Sequential

A sequential colour scale is a gradient of colour (continuous or stepped) that runs in one direction. For example, on a light background, a gradient from light to dark blue, might be mapped to values that run from 1 to 100.

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={ldnBlueScale} ticks=5 marginTop=0 marginBottom=24 height=56 width={contentWidth}/>
{/if}
</div>

Typically, the higher the contrast with the background, the higher the value is assumed to be by the reader. On a light background, a domain of 1 to 100 would be mapped from light to dark blue. The darker blue having the higher contrast and so the higher value. The opposite is true in dark mode.

<ColorRampGenerator title='Generate a colour ramp' colorRight='blue' type='Sequential' breaks={5} />

#### Diverging

A diverging colour scale works in the same way as the single “direction” sequential scale above, but it "diverges" in two directions, typically negative and positive.

Typically we use 2 diverging, single hue, stepped gradients, but a diverging colour scale can also be a continuous gradient of colour.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ColorDivergingBoroughMap containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

Our default diverging scale, is red (negative) to blue (positive). This is to avoid any red/green perception issues, and is a simple augmentation of our default (positive) blue ramp.

<!-- <ColorRampGenerator title='Generate a colour ramp' colorLeft='red' colorRight='blue' type='Diverging' paletteStart={300} paletteEnd={800} includeGrey={true} breaks={5} /> -->

With diverging scales, you may want to add a central neutral grey step between the positive/negative steps to indicate values that are truly zero. Zero values could get binned into the lowest positive step of a scale giving a false impression of that bin.

**Note:** You should avoid mapping uneven ranges of values to apparently even ranges of colour contrast.

For example, if the range of your data is **not** evenly distributed on either side of zero (e.g. -50 to +100), then that should be reflected in the scale and the legend.

<!-- TODO: Show misleading diverging ramp with values (bad) -->

<!-- TODO: Show correct diverging ramp with values (good) -->

#### Survey Data

Another use for a diverging colour scale is for visualising opinion.

Likert scale survey questions divide opinion into Agree - Neutral - Disagree, or Negative - Neutral - Positive. This is ideal to data to visualise with a diverging colour scale.

<ColorStackedBarLikert />

Once again datawrapper have written [a useful blog post about diverging bars](https://blog.datawrapper.de/divergingbars/), and how to position/scale your segments for clarity & comparison.

#### Interpolation

Interpolation is how the values in your data get mapped to the colours in your scale.

The simplest (and most instinctive) type of interpolation is “linear” interpolation. This is simply mapping the lowest value to the first colour, the highest value to the last colour, and interpolating linearly between both.

<!-- **TODO**: Show simple linear scale 0 - 100 -->

However, it’s not always the best interpolation to use, particularly if you have extreme outliers and uneven distribution of values in your data.

Editorial judgement is needed here in the choice of your interpolation… what aspect of the data are you trying to show? What insight are your readers trying to glean from the map or chart?

Your mapping or visualisation tool of choice will usually allow you to choose a different interpolation to apply to your colour scale. Most readers will assume a simple linear interpolation, so your choice may distort their interpretation. For that reason, it’s important your choice is clearly communicated to the user.

Lisa Charlotte Muth from Datawrapper has written another [brilliant article exploring different interpolations](https://blog.datawrapper.de/interpolation-for-color-scales-and-maps/). This quote from that article is a perfect summing up of the issue.

> All maps are wrong, but some are useful

<cite>Lisa Charlotte Muth (after George Box)</cite>

#### Perceptually even

It’s important that colour scales are perceptually even. This means that a reader can infer the correct value from the colour without being misled by particularly bright or dark patches.

While multi-hued scales can help users differentiate between steps on a scale, perceptual unevenness can be an issue. This is because a scale may pass through hues that could be perceived as brighter (like yellow), and depending on your colour space, can create odd colour artefacts.

**Don't use this**

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={angryRainbowScale} ticks=0 marginTop=0 marginBottom=0 height=32 width={contentWidth}/>
{/if}
</div>

If you do need multi-hued colour scales, it’s best practice to [use well established perceptually even ramps like the Viridis ramps](https://d3js.org/d3-scale-chromatic/sequential#interpolateViridis).

**Use this**

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={viridisScale} ticks=0 marginTop=0 marginBottom=0 height=32 width={contentWidth}/>
{/if}
</div>

**Note**: If you have more complex ramp generation needs, see the 'further reading' section (below) and use tools like [gka.github.io/palettes](https://gka.github.io/palettes/) and the [obumbratta.com/colour](https://obumbratta.com/colour).

When using the [Obumbratta.com Colour Ramp Tool](https://obumbratta.com/colour), you can match our internal ramp methodology with these settings: _Correct Lightness: **On**, Intelligent Interpolation: **Off**, Maintain Input Colours: **Off**, Colour Space: **BEZ LAB**_.

---

## Further reading

- [https://obumbratta.com/colour](https://obumbratta.com/colour)
- [https://gka.github.io/palettes/](https://gka.github.io/palettes/)
- [https://gka.github.io/chroma.js/#chroma-scale](https://gka.github.io/chroma.js/#chroma-scale)
- [https://blog.datawrapper.de/divergingbars/](https://blog.datawrapper.de/divergingbars/)
- [https://blog.datawrapper.de/interpolation-for-color-scales-and-maps/](https://blog.datawrapper.de/interpolation-for-color-scales-and-maps/)
- [https://www.vis4.net/blog/mastering-multi-hued-color-scales/](https://www.vis4.net/blog/mastering-multi-hued-color-scales/)
- [Introduction to the viridis color maps](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html)
