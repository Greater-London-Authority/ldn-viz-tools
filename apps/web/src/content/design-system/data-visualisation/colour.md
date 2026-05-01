---
title: Colour
description: Carefully considered colours for data visualisation
section: Data visualisation
navLabel: Colour
---

<script>
	import { Callout, theme } from '@ldn-viz/ui'
    import tokens from '@ldn-viz/themes/docs/tokens/tokens.js';
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'
    import ColorStackedBar from '$lib/components/charts/exampleCharts/lineCharts/ColorStackedBar.svelte'
    import ColorMultipleLine from '$lib/components/charts/exampleCharts/lineCharts/ColorMultipleLine.svelte'
    import ColorDualLine from '$lib/components/charts/exampleCharts/lineCharts/ColorDualLine.svelte'


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
  
   
</script>

## Principles

Balancing the requirements of accessibility, personal perception, system preferences, cultural association and branding is difficult to get right.

### Keep in mind these principles when using colors:

- Colors should be easily differentiated by as many people, in as many environments as possible.

- Colors should have appropriate levels of contrast with the background. The smaller the element, the higher the contrast required.

- Use a single color that highlights your key data, and grey for secondary contextual data.

- Only use a second or third categorical color if direct comparison of data is required.

- Don’t use more than 2 or 3 categorical colors. Consider labelling, line styling or small multiples instead.

- Keep color meaning consistent across all charts that are likely to be read in the same context.

- Use color to connect information across different charts and editorial.

- Some colors have overriding cultural, political or contextual meaning. Try and reserve those if you’ll need them later in your presentation. E.g. Red = Bad, Failing or Hot, Green = Good, improving or Environment, Blue = cold, etc...

## In Practice

### Categorical Colors

Categorical (or qualitative) colors are used to identify and differentiate data that has no particular order or value. For example, a set of London boroughs, industry types or groups of people.

Categorical colors should be as visually differentiable as possible, and maintain a high level of contrast with their background.

#### Our Categorical Colors

We developed our categorical color palettes by carefully balancing the requirements of GLA brand recognition, color differentiation and contrast.

Switching between our light and dark categorical palettes is easy, because they have a consistent colour naming scheme (`categorical-blue, red, green, etc`).

<div class="not-prose">
<SwatchGrid tokenData={dataTokens.categorical} title="Categorical Palette"/>
</div>

These categorical colors pass differentiation tests for all but small lines, but don't use them all in a single chart.

#### Considering contrast ratios in your color choices

When selecting colors directly from the categorical palette, choose as few as possible, and prioritise colors with higher contrast ratios (4.5:1+).

Color differentiation is harder when elements are smaller, as there is physically less color to see.

Using high contrast and easily differentiable colors are particularly important when producing line charts. For bar charts and other larger graphical elements, you can lower your contrast a bit.

> As with large text, for graphical objects such as charts and graphs a contrast ratio of 3:1 should be sufficient

<cite>WCAG Guidelines</cite>

[Read more on WCAG Guidelines](https://wcag.com/resource/ui-quick-tips-for-designers/)

<ColorStackedBar />

### Semantic Data Colours

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

#### Diverging Opinion

If you are visualising diverging data (like opinion research) or want to explicitly show if something is good or bad, then use `color-data-good`, and `color-data-bad`.

We've chosen blue and red to represent good and bad, to avoid the common red/green colour differentiation issue.

It's also useful to have a couple of neutral grey's for "neither" and "don't know". Here you can use `color-data-neutral-0` and `color-data-neutral-1`.

#### Missing Data

Sometimes you need to show missing (or filtered out) data. Here you can use `color-data-empty`.

### Chart Colours

To ensure consistency and correct contrast across all charts, use the following tokens to define your chart's `background, axis, grids and labels`.

<div class="not-prose">
<SwatchGrid tokenData={chartColors} title="Chart Colour Tokens"/>
</div>
