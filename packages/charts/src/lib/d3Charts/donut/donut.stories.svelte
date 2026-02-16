<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { ChartContainer } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import Donut from './Donut.svelte';

	const { Story } = defineMeta({
		title: 'Charts/Components/D3 Charts/Donut Chart'
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
</script>

<Story name="Default">
	{#snippet template()}
		<ChartContainer
			title={`Proportion of all Trees by Climate Suitability`}
			note={''}
			byline=""
			source=""
			chartHeight="h-700px"
			alignMultiple
			imageDownloadButton={false}
			dataDownloadButton={false}
			data={fruitSales}
		>
			<Donut
				data={fruitSales}
				valueAccessor={(d) => d.revenue}
				labelAccessor={(d) => d.product}
				valueFormatter={(v, total) => `£${v.toLocaleString()} (${((v / total) * 100).toFixed(1)}%)`}
			></Donut>
		</ChartContainer>
	{/snippet}
</Story>
