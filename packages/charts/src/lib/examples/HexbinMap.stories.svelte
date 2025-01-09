<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/* This is an example `HexbinMap` chart using default plot styles, through a spec created by the `glaPlot` function. */

	export const meta = {
		title: 'Charts/Examples/HexbinMap'
	};
</script>

<script lang="ts">
	import { Input } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import * as d3 from 'd3';
	import { boroughsGeoFromTopo } from '../../data/boroughsGeoFromTopo';
	import { mapVisitorMap } from '../../data/demoData';
	import * as hexbinData from '../../data/hexbinData';
	import { Plot } from '../observablePlotFragments/glaPlot';

	// console.log(hexbinData.length, 'length');
	let binWidth = '20';

	$: options = {
		marginTop: 40,
		color: {
			type: 'quantile',
			range: ['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'],
			label: `England & Wales proportion`,
			legend: true,
			tickFormat: '.2%'
		},
		x: {
			axis: null
		},
		projection: {
			type: 'mercator',
			domain: boroughsGeoFromTopo
		}
	};

	const formatPercentage = d3.format('.2%');

	$: marks = [
		Plot.geo(boroughsGeoFromTopo, { strokeOpacity: 0.5 }),
		Plot.dot(
			hexbinData,
			Plot.hexbin(
				{
					r: 'count',
					fill: 'mean', // mean proportion across number of highstreets in bin
					title: (bin: any) => {
						// Custom tooltip content
						const proportion = formatPercentage(
							d3.mean(bin, (d) => mapVisitorMap.get(d.properties['highstreet_id'])) as number
						);
						const frequency = bin.length;

						return `England & Wales proportion: ${proportion}\nNumber of high streets: ${frequency}`;
					}
				},
				Plot.centroid({
					fill: (d) => mapVisitorMap.get(d.properties['highstreet_id']) as number,
					fillOpacity: 1,
					tip: {},
					binWidth
				})
			)
		)
	];
	$: spec = { ...options, marks };
</script>

<Template let:args>
	<ObservablePlot {...args} {spec} title="Hexbin map" data={hexbinData}>
		<div slot="controls" class="w-40 mb-4">
			<Input
				type="range"
				label={`Bin width: ${binWidth}`}
				placeholder="20"
				bind:value={binWidth}
				min="0"
				max="40"
				step="1"
			/>
		</div>
	</ObservablePlot>
</Template>

<!--
```
$: options = {
		marginTop: 40,
		color: {
			type: 'quantile',
			range: ['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c'],
			label: `England & Wales proportion`,
			legend: true,
			tickFormat: '.2%'
		},
		x: {
			axis: null
		},
		projection: {
			type: 'mercator',
			domain: boroughsGeoFromTopo
		}
	};

	$: marks = [
		Plot.geo(boroughsGeoFromTopo, { strokeOpacity: 0.5 }),
		Plot.dot(
			hexbinData,
			Plot.hexbin(
				{
					r: 'count',
					fill: 'mean', // mean proportion across number of highstreets in bin
					title: (bin: any) => {
						// Custom tooltip content
						const proportion = formatPercentage(
							d3.mean(bin, (d) => mapVisitorMap.get(d.properties['highstreet_id'])) as number
						);
						const frequency = bin.length;

						return `England & Wales proportion: ${proportion}\nNumber of high streets: ${frequency}`;
					}
				},
				Plot.centroid({
					fill: (d) => mapVisitorMap.get(d.properties['highstreet_id']) as number,
					fillOpacity: 1,
					tip: {},
					binWidth
				})
			)
		)
	];

	$: spec = { ...options, marks };
```
-->

<Story name="Default" args={{ spec }} source />
