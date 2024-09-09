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

	import { exampleData, LDNSqrBoroughsGrid } from '$lib/tileMap/exampleData';

	const barSpec = (datum) => {
		const data = [
			{ type: 'A', value: datum.ValueA },
			{ type: 'B', value: datum.ValueB }
		];

		return {
			y: {
				grid: true,
				percent: true
			},
			marks: [
				Plot.ruleY([0]),
				Plot.barY(data, {
					x: 'type',
					y: 'value',
					fill: 'type'
				})
			]
		};
	};
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
