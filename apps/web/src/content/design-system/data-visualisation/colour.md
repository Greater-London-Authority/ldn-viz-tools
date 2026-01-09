---
title: Colour
description: Careful and considered colours for data visualisation
section: Data visualisation
navLabel: Colour
---

<script>
    import {theme} from '@ldn-viz/ui'
    import SwatchGrid from '$lib/components/swatch/SwatchGrid.svelte'
    import tokens from '@ldn-viz/themes/docs/tokens/color.json';

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

Balancing the requirements of accessibility, personal perception, system preferences, cultural association and branding is difficult to get right.

## Practice

### Data Colours

<div class="not-prose">
<SwatchGrid tokenData={dataTokens.thematic} />
</div>

### Catagorical Colours

Categorical (or qualitative) colors are used to identify and differentiate data that has no particular order or value. For example, a set of London boroughs, industry types or groups of people.

Categorical colors should be as visually differentiable as possible, and maintain a high level of contrast with their background.

<div class="not-prose">
<SwatchGrid tokenData={dataTokens.categorical} />
</div>

[These colors pass differentiation tests](https://projects.susielu.com/viz-palette?colors=%5B%22#007ACC%22,%22#9E0059%22,%22#f36428%22,%22#E7135D%22,%22#460d53%22,%22#57B8A8%22,%22#FFF200%22,%22#EB001B%22,%22#41A362%22%5D&backgroundColor=%22white%22&fontColor=%22black%22&mode=%22normal%22) for all but small lines, but that doesn’t mean you should use all of them at once.

You should consider contrast with the background, the type of graphical elements you are applying color to (thin lines or large blocks) and keeping your design clean, simple and focused.

### Color Ramps
