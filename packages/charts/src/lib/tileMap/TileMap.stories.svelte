<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	import TileMap from './TileMap.svelte';

	export const meta = {
		title: 'Charts/TileMap',
		component: TileMap
	};
</script>

<script lang="ts">
	import * as Plot from '@observablehq/plot';

	import { exampleData, exampleTimeSeries, LDNSqrBoroughsGrid } from './exampleData';

	const barSpec = (rawData) => {
		const datum = rawData[0];
		const data = [
			{ type: 'A', value: datum.ValueA },
			{ type: 'B', value: datum.ValueB }
		];

		return {
			x: {
				label: ''
			},
			y: {
				label: ''
			},
			marks: [
				Plot.ruleY([0]),
				Plot.barY(data, {
					x: 'type',
					y: 'value',
					fill: 'type'
				}),
				Plot.axisX({ ticks: [] }),
				Plot.axisY({ ticks: [] })
			]
		};
	};

	const lineChartSpec = (data) => {
		console.log(data);
		return {
			x: {
				label: ''
			},
			y: {
				grid: true,
				domain: [0, 3300],
				label: ''
			},
			marks: [
				Plot.ruleY([0]),
				Plot.lineY(data, {
					x: 'year',
					y: 'value'
				}),
				Plot.dot(data, {
					x: 'year',
					y: 'value'
				}),
				Plot.axisX({ ticks: [] }),
				Plot.axisY({ ticks: [] })
			]
		};
	};

	import { max } from 'd3-array';
	console.log(max(exampleTimeSeries.map((d) => d.value)));

	let selectedBoroughId = '';
</script>

<Story name="Default" source>
	<TileMap
		layout={LDNSqrBoroughsGrid}
		data={exampleData}
		specFn={barSpec}
		idFieldLayout="GSS_CODE"
		idFieldData="GSS_CODE"
		title="TileMap bar chart"
		subTitle="A tile map showing a bar chart for each borough"
	/>
</Story>

<Story name="Time series" source>
	<TileMap
		layout={LDNSqrBoroughsGrid}
		data={exampleTimeSeries}
		specFn={lineChartSpec}
		idFieldLayout="GSS_CODE"
		idFieldData="gss_code"
		title="TileMap line chart"
		subTitle="A tile map showing a time series as a line-chart for each borough"
	/>
</Story>

<Story name="Click handler on tile" source>
	{#if selectedBoroughId}
		<p>
			Selected borough id: {selectedBoroughId}
		</p>
	{:else}
		<p>Click on tile to select a borough.</p>
	{/if}

	<TileMap
		layout={LDNSqrBoroughsGrid}
		data={exampleTimeSeries}
		specFn={lineChartSpec}
		idFieldLayout="GSS_CODE"
		idFieldData="gss_code"
		title="TileMap line chart"
		subTitle="A tile map showing a time series as a line-chart for each borough"
		onClick={(id) => (selectedBoroughId = id)}
	/>
</Story>
