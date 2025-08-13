<script module lang="ts">
	import { theme as currentThemeObj } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import penguins from '../../../data/demoPenguins.json';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Scatter Plot Charts'
	});

	let currentTheme = $derived(currentThemeObj.currentTheme);

	let spec = $derived({
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

<Story name="Default">
	{#snippet template()}
		<ObservablePlot
			{spec}
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
