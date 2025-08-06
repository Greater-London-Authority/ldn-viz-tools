<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	/** These are example `ScatterPlot` charts using default plot styles.
	 *
	 * By default, charts (and their inner details) are hidden from screen readers to improve the accessibility experience. Instead, it's crtitical we use a descriptive `title`, `subTitle`, `alt`, `chartDescription` and surrounding document text, so all users understand what the chart shows and gain the same insight. We should also link to the data where possible.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Example Charts/ScatterPlot',
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import penguins from '../../data/demoPenguins.json';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { getDefaultPlotStyles } from '../observablePlotFragments/observablePlotFragments';
	import { Plot } from '../observablePlotFragments/plot';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let scatterPlotSpec = $derived({
		x: { insetLeft: 100, domain: [30, 65] },
		y: { domain: [7, 23] },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'bill_length_mm', labelArrow: true }),
			Plot.axisY({ label: 'bill_depth_mm', labelArrow: true }),
			Plot.dot(penguins, {
				x: 'bill_length',
				y: 'bill_depth',
				fill: 'species',
				tip: true
			})
		]
	});

	const { defaultTip } = $derived(getDefaultPlotStyles()); // import defaultTip to apply to tip styling

	let facetedScatterPlotSpec = $derived({
		fy: true, // set fy to true or object to ensure defaultSizeFacet is applied
		marginTop: 60,
		marginRight: 120,
		x: { insetLeft: 50, insetRight: 20, domain: [30, 65] }, // adjust xscale inset to feel good with grid lines
		y: { domain: [7, 24] },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'bill_length_mm', labelArrow: true }),
			Plot.axisY({ label: 'bill_depth_mm', labelArrow: true }),
			Plot.dot(penguins, {
				x: 'bill_length',
				y: 'bill_depth',
				fx: 'sex',
				fy: 'island',
				fill: 'species',
				tip: { ...defaultTip } // apply default styling
			})
		]
	});
</script>

<!-- 
```html
<script lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import penguins from '../../data/demoPenguins.json';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../observablePlotFragments/plot';

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let scatterPlotSpec = $derived({
		x: { insetLeft: 100, domain: [30, 65] },
		y: { domain: [7, 23] },
		color: {
			legend: true,
			range: [
				currentTheme.color.data.primary,
				currentTheme.color.data.secondary,
				currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'bill_length_mm', labelArrow: true }),
			Plot.axisY({ label: 'bill_depth_mm', labelArrow: true }),
			Plot.dot(penguins, {
				x: 'bill_length',
				y: 'bill_depth',
				fill: 'species',
				tip: true
			})
		]
	});
</script>

<ObservablePlot
    spec={scatterPlotSpec}
    data={penguins}
    title="Adelie penguins have shortest bill length, but similar depth to Chinstraps"
    subTitle="Penguin data from the islands of Biscoe, Dream and Torgensen"
    alt="Scatter plot chart of Penguin data"
    byline="GLA City Intelligence"
    source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
    note="Data for demonstration only"
    chartDescription="The scatter plot chart shows bill length against bill depth for Adelie, Chinstrap and Gentoo penguins. Adelie penguins have the shortest bill length between 30 and 45 millimetres but have a similar bill depth to Chinstrap penguins between 15 and 25 millimetres. Chinstrap and Gentoo penguins have bill lengths between 40 and 60 millimetres. However, Gentoo penguin bills are shorter than Chinstraps, between 10 and 20 millimetres."
/>

```

-->

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			spec={scatterPlotSpec}
			data={penguins}
			title="Adelie penguins have shortest bill length, but similar depth to Chinstraps"
			subTitle="Penguin data from the islands of Biscoe, Dream and Torgensen"
			alt="Scatter plot chart of Penguin data"
			byline="GLA City Intelligence"
			source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
			note="Data for demonstration only"
			chartDescription="The scatter plot chart shows bill length against bill depth for Adelie, Chinstrap and Gentoo penguins. Adelie penguins have the shortest bill length between 30 and 45 millimetres but have a similar bill depth to Chinstrap penguins between 15 and 25 millimetres. Chinstrap and Gentoo penguins have bill lengths between 40 and 60 millimetres. However, Gentoo penguin bills are shorter than Chinstraps, between 10 and 20 millimetres."
		/>
	{/snippet}
</Story>

<!-- 
```html
    <script lang="ts">
        import { theme as currentThemeObj } from '@ldn-viz/ui';
        import penguins from '../../data/demoPenguins.json';
        import ObservablePlot from '../observablePlot/ObservablePlot.svelte';
        import { getDefaultPlotStyles } from '../observablePlotFragments/observablePlotFragments';
        import { Plot } from '../observablePlotFragments/plot';

        let currentTheme = $derived(currentThemeObj.currentTheme);

        let scatterPlotSpec = $derived({
            x: { insetLeft: 100, domain: [30, 65] },
            y: { domain: [7, 23] },
            color: {
                legend: true,
                range: [
                    currentTheme.color.data.primary,
                    currentTheme.color.data.secondary,
                    currentTheme.color.data.tertiary
                ]
            },
            marks: [
                Plot.gridX(),
                Plot.gridY(),
                Plot.axisX({ label: 'bill_length_mm', labelArrow: true }),
                Plot.axisY({ label: 'bill_depth_mm', labelArrow: true }),
                Plot.dot(penguins, {
                    x: 'bill_length',
                    y: 'bill_depth',
                    fill: 'species',
                    tip: true
                })
            ]
        });

        const { defaultTip } = $derived(getDefaultPlotStyles()); // import defaultTip to apply to tip styling

        let facetedScatterPlotSpec = $derived({
            fy: true, // set fy to true or object to ensure defaultSizeFacet is applied
            marginTop: 60,
            marginRight: 120,
            x: { insetLeft: 50, insetRight: 20, domain: [30, 65] }, // adjust xscale inset to feel good with grid lines
            y: { domain: [7, 24] },
            color: {
                legend: true,
                range: [
                    currentTheme.color.data.primary,
                    currentTheme.color.data.secondary,
                    currentTheme.color.data.tertiary
                ]
            },
            marks: [
                Plot.gridX(),
                Plot.gridY(),
                Plot.axisX({ label: 'bill_length_mm', labelArrow: true }),
                Plot.axisY({ label: 'bill_depth_mm', labelArrow: true }),
                Plot.dot(penguins, {
                    x: 'bill_length',
                    y: 'bill_depth',
                    fx: 'sex',
                    fy: 'island',
                    fill: 'species',
                    tip: { ...defaultTip } // apply default styling
                })
            ]
        });
    </script>

    <ObservablePlot
        spec={facetedScatterPlotSpec}
        data={penguins}
        title="Adelie penguins live on all islands, and have a shorter bill length than other species"
        subTitle="Penguin data from the islands of Biscoe, Dream and Torgensen"
        alt="Faceted scatter plot chart of Penguin data"
        byline="GLA City Intelligence"
        source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
        note="Data for demonstration only"
        chartDescription="The faceted scatter plot chart shows bill length (mm) against bill depth (mm) for Adelie, Chinstrap and Gentoo penguins, split by sex and island. Adelie penguins are present across all three islands: Biscoe, Dream and Torgersen. Chinstrap penguins have only been recorded on Dream island and Gentoo penguins have only been recorded on Biscoe island. Adelie penguins have shorter bill lengths than Chinstrap and Gentoo penguins. Male Adelie penguins have bill lengths ranging from 34.6 to 46, compared to female Adelie penguins who have bill lengths ranging from 32.1 to 42.2. Adelie and Chinstrap penguins have similar bill depths from approximately 17 to 21.2 for male penguins and approximately 15.5 to 19.4 for female penguins. Gentoo penguins have the shallowest bills from 14.1 to 17.3 for males and 13.3 to 17.5 for females. There are a few Adelie and Gentoo penguins whose sex is undefined but their bill length and bill depth follow a similar pattern to female and male penguins of each species."
    />
```
-->

<Story name="Faceted scatter plot">
	{#snippet template()}
		<ObservablePlot
			spec={facetedScatterPlotSpec}
			data={penguins}
			title="Adelie penguins live on all islands, and have a shorter bill length than other species"
			subTitle="Penguin data from the islands of Biscoe, Dream and Torgensen"
			alt="Faceted scatter plot chart of Penguin data"
			byline="GLA City Intelligence"
			source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
			note="Data for demonstration only"
			chartDescription="The faceted scatter plot chart shows bill length (mm) against bill depth (mm) for Adelie, Chinstrap and Gentoo penguins, split by sex and island. Adelie penguins are present across all three islands: Biscoe, Dream and Torgersen. Chinstrap penguins have only been recorded on Dream island and Gentoo penguins have only been recorded on Biscoe island. Adelie penguins have shorter bill lengths than Chinstrap and Gentoo penguins. Male Adelie penguins have bill lengths ranging from 34.6 to 46, compared to female Adelie penguins who have bill lengths ranging from 32.1 to 42.2. Adelie and Chinstrap penguins have similar bill depths from approximately 17 to 21.2 for male penguins and approximately 15.5 to 19.4 for female penguins. Gentoo penguins have the shallowest bills from 14.1 to 17.3 for males and 13.3 to 17.5 for females. There are a few Adelie and Gentoo penguins whose sex is undefined but their bill length and bill depth follow a similar pattern to female and male penguins of each species."
		/>
	{/snippet}
</Story>
