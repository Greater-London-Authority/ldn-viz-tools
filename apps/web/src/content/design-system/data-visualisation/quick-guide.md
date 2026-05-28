---
title: Quick colour guide
description: Simple guide to using colour in data visualisation
section: Data visualisation
navLabel: Quick colour guide
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

    // diverging 5 ramp definition
    let ldnDiverging5Ramp = $derived(ramp(

        getColorRamp({ colors: [
        theme.tokenNameToValue('palette.red.900'), 
        theme.tokenNameToValue('palette.red.500'),
        theme.tokenNameToValue('palette.red.300')
        ],count:5, even:true}).concat(
        getColorRamp({ colors: [
        theme.tokenNameToValue('palette.blue.300'), 
        theme.tokenNameToValue('palette.blue.500'),
        theme.tokenNameToValue('palette.blue.900')
        ],count:5, even:true}))
        
    ))

    // LDN Blue Interpolator 
    const interpolateLDNDiverging5 = (t) => {
        return ldnDiverging5Ramp(t);
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

    // ldn blue scale (5)
    let ldnBlue5Scale = scaleSequential([0, 100], interpolateLDNBlue5);

    // ldn diverging scale (5+5)
    let ldnDiverging5Scale = scaleSequential([0, 100], interpolateLDNDiverging5);



</script>

## Principles

- Colours should be easily differentiated by as many people, in as many environments as possible.

- Colours should have appropriate levels of contrast with the background. The smaller the element, the higher the contrast required.

- Don’t use more than 2 or 3 categorical colours.

- Use a single colour that highlights your key data, and grey for secondary contextual data.

## Practice

### Categorical colours

We developed our categorical colour palettes by carefully balancing the requirements of GLA brand recognition, colour differentiation and contrast.

These categorical colours pass differentiation tests for all but small lines, but don't use them all in a single chart.

<div class="not-prose">
<SwatchGrid tokenData={dataTokens.categorical} title="Categorical palette"/>
</div>

### Semantic data colours

We've created semantic tokens to simplify and standardise the use of our colours.

<div class="not-prose">
<SwatchGrid tokenData={themeColors} title="Semantic Colour tokens"/>
</div>

We recommend you consistently use `color-data-primary, secondary and tertiary` in your charts, unless you have a specific reason for choosing a different set.

These colours are easily differentiated, and also have an equivalent set in dark mode.

<ColorMultipleLine />

For charts where you want to show "other" or "context" data, use `color-data-primary` and `color-data-context`.

<ColorDualLine />

### Quantitative colour scales

Quantitative colour scales are used to encode value using gradients of colour. For example, on a choropleth map (below).

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ColorBoroughMap containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

#### Sequential

A sequential colour scale is a continuous or stepped gradient of colour running in one direction. For example, a gradient from light to dark blue, might be mapped to values that run from 1 to 100.

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={ldnBlueScale} ticks=5 marginTop=0 marginBottom=24 height=56 width={contentWidth}/>
{/if}
</div>

We typically use up to 5 steps of blue, from light to dark (or the reverse in dark mode).

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={ldnBlue5Scale} ticks=0 marginTop=0 marginBottom=24 height=56 width={contentWidth}/>
{/if}
</div>

<!-- ldnDiverging5Scale -->

#### Diverging

A diverging colour scale is a sequential scale that "diverges" in two directions, typically negative and positive.

<div bind:clientWidth={contentWidth} >
{#if mounted}
    <ColorLegend color={ldnDiverging5Scale} ticks=0 marginTop=0 marginBottom=24 height=56 width={contentWidth}/>
{/if}
</div>

Our default diverging scale, is red (negative) to blue (positive). This is to avoid any red/green perception issues, and is a simple augmentation of our default (positive) blue ramp.

<ColorRampGenerator title='Generate a colour ramp' colorRight='blue' type='Sequential' breaks={5} />

**Note:** With diverging scales, you may want to add a central neutral grey step between the positive/negative steps to indicate values that are truly zero.

### Chart styling

To ensure consistency and correct contrast across all charts, use the following tokens to define your chart's `background, axis, grids and labels`.

<div class="not-prose">
<SwatchGrid tokenData={chartColors} title="Chart colour tokens"/>
</div>

---

## Further reading

- [A deeper dive into data visualisation color theory](/design-system/data-visualisation/colour-foundations)
- [More on color use within our wider design system](/design-system/foundations/colour)
