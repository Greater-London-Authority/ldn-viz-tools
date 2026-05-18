---
title: Colour
description: Carefully considered colours for data visualisation
section: Data visualisation
navLabel: Colour
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
    
    let chartColors = $derived(getTokenByConcept('chart'));
    
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

Balancing the requirements of accessibility, personal perception, system preferences, cultural association and branding is difficult to get right.

### Keep in mind these principles when using colour

- Colours should be easily differentiated by as many people, in as many environments as possible.

- Colours should have appropriate levels of contrast with the background. The smaller the element, the higher the contrast required.

- Use a single colour that highlights your key data, and grey for secondary contextual data.

- Only use a second or third categorical colour if direct comparison of data is required.

- Don’t use more than 2 or 3 categorical colours. Consider labelling, line styling or small multiples instead.

- Keep colour meaning consistent across all charts that are likely to be read in the same context.

- Use colour to connect information across different charts and editorial.

- Some colours have overriding cultural, political or contextual meaning. Try and reserve those if you’ll need them later in your presentation. E.g. Red = Bad, Failing or Hot, Green = Good, improving or Environment, Blue = cold, etc...

## Practice

### Categorical colours

Categorical (or qualitative) colours are used to identify and differentiate data that has no particular order or value. For example, a set of London boroughs, industry types or groups of people.

Categorical colours should be as visually differentiable as possible, and maintain a high level of contrast with their background.

#### Our categorical colours

We developed our categorical colour palettes by carefully balancing the requirements of GLA brand recognition, colour differentiation and contrast.

Switching between our light and dark categorical palettes is easy, because they have a consistent colour naming scheme (`categorical-blue, red, green, etc`).

<div class="not-prose">
<SwatchGrid tokenData={dataTokens.categorical} title="Categorical Palette"/>
</div>

These categorical colours pass differentiation tests for all but small lines, but don't use them all in a single chart.

#### Considering contrast ratios in your colour choices

When selecting colours directly from the categorical palette, choose as few as possible, and prioritise colours with higher contrast ratios (4.5:1+).

Colour differentiation is harder when elements are smaller, as there is physically less colour to see.

Using high contrast and easily differentiable colours are particularly important when producing line charts. For bar charts and other larger graphical elements, you can lower your contrast a bit.

> As with large text, for graphical objects such as charts and graphs a contrast ratio of 3:1 should be sufficient

<cite>WCAG Guidelines</cite>

[Read more on WCAG Guidelines](https://wcag.com/resource/ui-quick-tips-for-designers/)

<ColorStackedBar />

### Semantic data colours

We've created semantic tokens to simplify and standardise the use of our colours.

<div class="not-prose">
<SwatchGrid tokenData={themeColors} title="Semantic Colour Tokens"/>
</div>

#### Prioritisation

We recommend you consistently use `color-data-primary, secondary and tertiary` in your charts, unless you have a specific reason for choosing a different set.

These colours are easily differentiated, and have an equivalent set in dark mode.

<ColorMultipleLine />

For charts where you want to show "other" or "context" data, use `color-data-primary` and `color-data-context`.

<ColorDualLine />

#### Demographics

When representing sex in your demography data, use `color-data-male` and `color-data-female`. The Purple and Green is a tribute to the Suffragette flag (and a great idea we borrowed from the Telegraph style guide).

#### Opinion

If you are visualising diverging data (like opinion research) or want to explicitly show if something is good or bad, then use `color-data-good`, and `color-data-bad`.

We've chosen blue and red to represent good and bad, to avoid the common red/green colour differentiation issue.

It's also useful to have a couple of neutral grey's for "neither" and "don't know". Here you can use `color-data-neutral-0` and `color-data-neutral-1`.

#### Missing data

Sometimes you need to show missing (or filtered out) data. Here you can use `color-data-empty`.

### Chart styling

To ensure consistency and correct contrast across all charts, use the following tokens to define your chart's `background, axis, grids and labels`.

<div class="not-prose">
<SwatchGrid tokenData={chartColors} title="Chart Colour Tokens"/>
</div>

### Quantitative colour scales

A quantitative colour scale is a continuous (smooth or stepped) gradient of colour that is mapped to a sequential set of values. These colour scales can be single-hued (e.g. light to dark blue), or multi-hued (e.g. red, to yellow, to blue).

These quantitative colour scales are commonly used to encode data on a (choropleth) map, or the value of points on a scatterplot.

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

<ColorRampGenerator title='Interactive Example' colorRight='blue' type='Sequential' breaks={5} />

#### Diverging

A diverging colour scale works in the same way as the single “direction” sequential scale above, but it "diverges" in two directions, typically negative and positive.

Typically we use 2 diverging, single hue, stepped gradients, but a diverging colour scale can also be a continuous gradient of colour.

<div bind:clientWidth={contentWidth} bind:clientHeight={contentHeight}>
    <ColorDivergingBoroughMap containerWidth={contentWidth} containerHeight={contentHeight} />
</div>

Our default diverging scale, is red (negative) to blue (positive). This is to avoid any red/green perception issues, and is a simple augmentation of our default (positive) blue ramp.

<ColorRampGenerator title='Interactive Example' colorLeft='red' colorRight='blue' type='Diverging' paletteStart={300} paletteEnd={800} includeGrey={true} breaks={5} />

With diverging scales, you may want to add a central neutral grey step between the positive/negative steps to indicate values that are truly zero. Zero values could get binned into the lowest positive step of a scale giving a false impression of that bin.

**Note:** You should avoid mapping uneven ranges of values to apparently even ranges of colour contrast.

For example, if the range of your data is **not** evenly distributed on either side of zero (e.g. -50 to +100), then that should be reflected in the scale and the legend.

<!-- TODO: Show misleading diverging ramp with values (bad) -->

<!-- TODO: Show correct diverging ramp with values (good) -->

#### Diverging opinion

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

**Note**: If you have more complex ramp generation needs, see the 'further reading' section (below) for tools like chroma.js.

---

## Further reading

- [https://wcag.com/resource/ui-quick-tips-for-designers/](https://wcag.com/resource/ui-quick-tips-for-designers/)
- [Viz Palette - Categorical Color Tool](https://projects.susielu.com/viz-palette)
- [https://blog.datawrapper.de/which-color-scale-to-use-in-data-vis/](https://blog.datawrapper.de/which-color-scale-to-use-in-data-vis/)
- [https://blog.datawrapper.de/divergingbars/](https://blog.datawrapper.de/divergingbars/)
- [https://blog.datawrapper.de/interpolation-for-color-scales-and-maps/](https://blog.datawrapper.de/interpolation-for-color-scales-and-maps/)
- [https://www.vis4.net/blog/mastering-multi-hued-color-scales/](https://www.vis4.net/blog/mastering-multi-hued-color-scales/)
- [https://gka.github.io/palettes/](https://gka.github.io/palettes/)
- [https://gka.github.io/chroma.js/#chroma-scale](https://gka.github.io/chroma.js/#chroma-scale)
- [Introduction to the viridis color maps](https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html)
- [https://bjoernkw.github.io/hexrgb/](https://bjoernkw.github.io/hexrgb/)
