---
title: Dataviz Guide
description: Guiding principles for consistent presentation
---

<script>
    import {theme} from '@ldn-viz/ui'
    import DataTokenTable from '$lib/components/tables/colorTokenTables/DataTokenTable.svelte'
    import ChartAnatomy from '$lib/components/charts/chartAnatomy/ChartAnatomy.svelte'
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

    let textTokenData = $derived(
		Object.values(tokens.theme[theme.currentMode ? theme.currentMode : 'light'].color.text)
	);
</script>

## Data Visualisation Guidelines

Good data visualisation isn’t just for internal decision making, it’s crucial for helping Londoners to better understand their city.

### Colours

Balancing the requirements of accessibility, personal perception, system preferences, cultural association and branding is difficult to get right. The colours in these guidelines have been carefully selected and should be used for all data visualisations.

<div class="not-prose">
<SwatchGrid tokenData={chartTokenData} title="Colors for chart elements"/>
<SwatchGrid tokenData={dataTokens.thematic} title="Colors for data" />
<SwatchGrid tokenData={dataTokens.categorical} title="Colors for categorical data"/>
<SwatchGrid tokenData={dataTokens.others} title="Colors for other data elements"/>
</div>

<!-- <DataTokenTable title="Data color tokens" /> -->

### Typography

Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed.

For data visualisation we recommend the sans serif font Inter. Inter is a variable font family carefully crafted & designed for computer screens. Inter is available via Google Fonts under the Open Font License.

<div class="not-prose">
<SwatchGrid tokenData={textTokenData} title='Colours for typography'/>
</div>

### Chart Elements

Chart elemets should be sized and colored as the below. Further detailed information can be found in the [data visualisation section of the design system documentaion](/design-system/data-visualisation)

<div class="not-prose">
    <!-- <SwatchGrid tokenData={chartTokenData} /> -->
    <div class="w-screen max-w-[1548px]">
        <ChartAnatomy />
    </div>
</div>
