<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { ChartContainer } from '@ldn-viz/charts';
	import { Card, Metric, theme } from '@ldn-viz/ui';
	import Donut from './Donut.svelte';

	/**
	 * The `Donut` is a D3 chart component that displays categorical data as slices (or arcs) within a ring, representing proportions of a total (100%).
	 *
	 * `size` sets the largest size to draw: `sm`, `md` or `lg`. A container narrower than that size needs steps the donut down, so it never shrinks its text or disappears.
	 */

	const { Story } = defineMeta({
		title: 'Charts/Components/D3 Charts/Donut Chart',
		component: Donut,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['sm', 'md', 'lg']
			}
		}
	});

	const fruitSales = [
		{ label: 'Apples', value: 12000 },
		{ label: 'Bananas', value: 8000 },
		{ label: 'Oranges', value: 6000 }
	];

	let fruitColors: Record<string, string> = {
		Apples: theme.tokenNameToValue('data.primary'),
		Bananas: theme.tokenNameToValue('data.secondary'),
		Oranges: theme.tokenNameToValue('data.tertiary')
	};

	let highlightColors: Record<string, string> = {
		Apples: theme.tokenNameToValue('data.primary'),
		Bananas: theme.tokenNameToValue('data.context'),
		Oranges: theme.tokenNameToValue('data.context')
	};
</script>

<Story name="Default">
	{#snippet template(args)}
		<ChartContainer
			title="Fruit sales"
			subtitle="Proportion of all fruit sold in last 12 months"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
			chartHeight="h-auto"
			data={fruitSales}
		>
			<Donut size={args.size} data={fruitSales} colorMapping={fruitColors}></Donut>
		</ChartContainer>
	{/snippet}
</Story>

<!--
The three sizes. `sm` is a ring with no labels, legend or tooltip. `md` puts the legend below the ring. `lg` adds labels on the ring where they fit, and puts the legend beside the ring when there is room.
-->
<Story name="Sizes" asChild>
	<div class="flex flex-col gap-8">
		<Donut data={fruitSales} colorMapping={fruitColors} size="sm" />
		<Donut data={fruitSales} colorMapping={fruitColors} size="md" />
		<Donut data={fruitSales} colorMapping={fruitColors} size="lg" />
	</div>
</Story>

<!--
Drag the bottom-right corner to resize the container. Below 320px the donut steps down to `md`, and below 200px to `sm`.
-->
<Story name="Responsive" asChild>
	<div class="w-[480px] max-w-full resize-x overflow-auto border border-color-border-wash p-4">
		<Donut data={fruitSales} colorMapping={fruitColors} />
	</div>
</Story>

<!--
At `sm`, the donut sits beside a metric. The svg's accessible name carries the values, because there is no legend.
-->
<Story name="Beside a metric" asChild>
	<div class="max-w-sm">
		<Card title="Apple sales">
			<div class="flex items-center justify-between gap-4">
				<Metric
					label="Total sold, last 12 months"
					value={26000}
					formatString=",.0f"
					translation="(42.4%)"
				/>
				<Donut data={fruitSales} colorMapping={highlightColors} size="sm" />
			</div>
		</Card>
	</div>
</Story>

<!--
At `md`, two donuts fit side by side in a 2-up layout.
-->
<Story name="Two up" asChild>
	<div class="grid max-w-3xl grid-cols-2 gap-4">
		<Card title="Fruit sales" subtitle="Last 12 months">
			<Donut data={fruitSales} colorMapping={fruitColors} size="md" />
		</Card>
		<Card title="Fruit sales" subtitle="Previous 12 months">
			<Donut
				data={[
					{ label: 'Apples', value: 9000 },
					{ label: 'Bananas', value: 9500 },
					{ label: 'Oranges', value: 4000 }
				]}
				colorMapping={fruitColors}
				size="md"
			/>
		</Card>
	</div>
</Story>

<!--
To save space, the table can be hidden, in which case a separate color legend is displayed.
-->
<Story name="Hide table">
	{#snippet template(args)}
		<ChartContainer
			title="Fruit sales"
			subtitle="Proportion of all fruit sold in last 12 months"
			description="This is a detailed description of the chart for screen reader and sighted users to better understand what the chart is showing them."
			alt="Simple description of type of chart"
			chartHeight="h-auto"
			data={fruitSales}
		>
			<Donut size={args.size} data={fruitSales} colorMapping={fruitColors} hideTable></Donut>
		</ChartContainer>
	{/snippet}
</Story>
