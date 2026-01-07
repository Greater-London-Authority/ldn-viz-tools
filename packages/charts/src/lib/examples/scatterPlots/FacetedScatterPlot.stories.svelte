<script module lang="ts">
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { penguins } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { getDefaultPlotStyles } from '../../observablePlotFragments/observablePlotFragments';
	import { Plot } from '../../observablePlotFragments/plot';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Scatter Plot'
	});

	const { defaultTip } = $derived(getDefaultPlotStyles());

	let spec = $derived({
		marginTop: 60,
		marginRight: 120,
		x: { insetLeft: 50, insetRight: 20, domain: [30, 65] }, // adjust xscale inset to feel good with grid lines
		y: { domain: [7, 24] },
		facet: { data: penguins, x: 'sex', y: 'island' },
		fx: { domain: ['MALE', 'FEMALE', ''] }, //Set order of facets
		color: {
			legend: true,
			range: [
				theme.currentTheme.color.data.primary,
				theme.currentTheme.color.data.secondary,
				theme.currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'culmen_length_mm', labelArrow: true }),
			Plot.axisY({ label: 'culmen_depth_mm', labelArrow: true }),
			Plot.dot(penguins, {
				x: 'culmen_length_mm',
				y: 'culmen_depth_mm',
				fill: 'species',
				tip: { ...defaultTip } // apply default styling
			})
			// As alternative to spreading the defaultTip you could supply a tip mark
			// Plot.tip(penguins, Plot.pointer({ x: 'culmen_length_mm', y: 'culmen_depth_mm' })) // apply default styling
		]
	});
</script>

<Story name="Faceted">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={penguins}
			title="Adelie penguins live on all islands, and have a shorter culmen length than other species"
			subTitle="Penguin data from the islands of Biscoe, Dream and Torgersen"
			alt="Faceted scatter plot chart of Penguin data"
			byline="GLA City Intelligence"
			source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
			note="Data for demonstration only"
			chartDescription="The faceted scatter plot chart shows culmen length (mm) against culmen depth (mm) for Adelie, Chinstrap and Gentoo penguins, split by sex and island. Adelie penguins are present across all three islands: Biscoe, Dream and Torgersen. Chinstrap penguins have only been recorded on Dream island and Gentoo penguins have only been recorded on Biscoe island. Adelie penguins have shorter bill lengths than Chinstrap and Gentoo penguins. Male Adelie penguins have bill lengths ranging from 34.6 to 46, compared to female Adelie penguins who have bill lengths ranging from 32.1 to 42.2. Adelie and Chinstrap penguins have similar bill depths from approximately 17 to 21.2 for male penguins and approximately 15.5 to 19.4 for female penguins. Gentoo penguins have the shallowest bills from 14.1 to 17.3 for males and 13.3 to 17.5 for females. There are a few Adelie and Gentoo penguins whose sex is undefined but their bill length and bill depth follow a similar pattern to female and male penguins of each species."
		/>
	{/snippet}
</Story>
