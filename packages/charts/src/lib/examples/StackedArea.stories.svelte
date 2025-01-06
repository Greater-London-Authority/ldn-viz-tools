<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/* This is an example `StackedArea` chart using default plot styles, through a spec created by the `glaPlot` function. */

	export const meta = {
		title: 'Charts/Examples/StackedArea'
		// component: ObservablePlot
	};
</script>

<script lang="ts">
	import { Select, Switch } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { writable } from 'svelte/store';
	import { visitorColors, visitorTypes, visitors, visitorsData } from '../../data/demoData';
	import { Plot, glaPlot } from '../observablePlotFragments/glaPlot';

	let showProportion = writable<boolean>(false);
	let selectedVisitor = 'London';
	$: selectedView = $showProportion ? 'visitor_proportion' : 'visitor_count';
	$: selectedViewName = selectedView.split('_')[1];

	$: options = {
		size: { marginTop: 40 },
		color: {
			range: visitorColors,
			label: 'Visitor type',
			domain: visitorTypes
		},
		xScale: {
			insetLeft: 50,
			label: 'month'
		}
	};

	$: marks = [
		Plot.gridY(),
		Plot.areaY(visitorsData, {
			x: (d) => new Date(d.date),
			sort: 'date',
			y: selectedView,
			fill: 'subregion',
			opacity: 1,
			channels: {
				[$showProportion ? 'Visitor proportion' : 'Visitor count']: (d) =>
					d[selectedView]?.toFixed(2)
			},
			tip: {
				format: {
					y: false,
					z: false
				}
			},
			order: selectedVisitor ? (d: any) => d.subregion !== selectedVisitor : null
		}),
		Plot.axisY({
			label: $showProportion ? 'proportion' : 'count',
			tickFormat: $showProportion ? '%' : null
		}),
		Plot.ruleY([0])
	];

	$: spec = glaPlot(visitorsData, marks, options);
</script>

<Template let:args>
	<ObservablePlot
		{...args}
		title="Visitor {selectedViewName} over time for Acton Lane, South Acton on Wednesday AM from 2022 to 2024"
		subTitle="Shows {selectedViewName} over time, split by visitor type. The area of each colour corresponds to the {selectedViewName} for that visitor type."
		spec={{ ...spec }}
		data={visitorsData}
	>
		<div slot="controls" class="space-y-4 mb-8">
			<div class="w-64">
				<Select
					items={visitors}
					label="Select a focus visitor type"
					bind:justValue={selectedVisitor}
				/>
			</div>
			<Switch label="Show actual count/proportion" labelOn="left" checked={showProportion} />
		</div>
	</ObservablePlot>
</Template>

<Story name="Default" args={{ spec }} source />
