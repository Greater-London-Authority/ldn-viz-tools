<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { ChartContainer } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import Donut from './Donut.svelte';
	import DonutLegend from './DonutLegend.svelte';

	/**
	 * The `Donut` chart component is D3 based donut plot that adds additional information such as a title, subtitle, and description.
	 *
	 *
	 * **Note**: note note note.
	 *
	 * **Alternatives**: normally the [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation) or other plot component would be used rather than using `ChartContainer` directly.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Components/D3 Charts/Donut Chart',
		component: Donut,
		tags: ['autodocs']
	});

	const fruitSales = [
		{ product: 'Apples', revenue: 12000 },
		{ product: 'Bananas', revenue: 8000 },
		{ product: 'Oranges', revenue: 6000 }
	];

	let fruitColors = {
		Apples: theme.currentTheme.color.palette.orange[300],
		Bananas: theme.currentTheme.color.palette.orange[500],
		Oranges: theme.currentTheme.color.palette.orange[700]
	};

	const labelAccessor = (d) => d.product;
	const valueAccessor = (d) => d.revenue;
	const colorAccessor = (d) => fruitColors[d.product];
</script>

<Story name="Default">
	{#snippet template(args)}
		<ChartContainer
			{...args}
			title={`Proportion of all Fruit Sales`}
			chartDescription="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
			chartHeight="h-200px"
			data={fruitSales}
		>
			<Donut
				data={fruitSales}
				{labelAccessor}
				{valueAccessor}
				{colorAccessor}
				valueFormatter={(v, total) => `£${v.toLocaleString()} (${((v / total) * 100).toFixed(1)}%)`}
			></Donut>

			<DonutLegend
				data={fruitSales}
				{labelAccessor}
				{valueAccessor}
				{colorAccessor}
				order={Object.keys(fruitColors)}
			/>
		</ChartContainer>
	{/snippet}
</Story>
