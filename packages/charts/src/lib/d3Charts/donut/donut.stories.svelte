<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { ChartContainer } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import Donut from './Donut.svelte';
	import type { DonutData } from './types';

	/**
	 * The `Donut` is a D3 chart component that displays categorical data as slices (or arcs) within a ring, representing proportions of a total (100%).
	 
	 */

	const { Story } = defineMeta({
		title: 'Charts/Components/D3 Charts/Donut Chart',
		component: Donut,
		tags: ['autodocs']
	});

	const fruitSales: DonutData[] = [
		{ label: 'Apples', value: 12000 },
		{ label: 'Bananas', value: 8000 },
		{ label: 'Oranges', value: 6000 }
	];

	let fruitColors = {
		Apples: theme.currentTheme.color.palette.orange[300],
		Bananas: theme.currentTheme.color.palette.orange[500],
		Oranges: theme.currentTheme.color.palette.orange[700]
	};
</script>

<Story name="Default">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title="Proportion of all Fruit Sales"
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
			chartHeight="h-200px"
			data={fruitSales}
		>
			<Donut data={fruitSales} colorMapping={fruitColors}></Donut>
		</ChartContainer>
	{/snippet}
</Story>
