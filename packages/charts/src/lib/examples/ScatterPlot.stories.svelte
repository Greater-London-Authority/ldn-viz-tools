<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/* This is an example `ScatterPlot` chart using default plot styles, through a spec created by the `glaPlot` function. */

	export const meta = {
		title: 'Charts/Examples/ScatterPlot'
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { penguins } from '../../data/demoData';
	import { Plot } from '../observablePlotFragments/glaPlot';

	$: marks = [
		Plot.gridX(),
		Plot.gridY(),
		Plot.ruleY([0]),
		Plot.ruleX([0]),
		Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
		Plot.axisX(),
		Plot.axisY({ label: 'culmen_depth_mm' }),
		Plot.tip(penguins, Plot.pointerX({ x: 'culmen_length_mm', y: 'culmen_depth_mm' }))
	];

	$: spec = { marks };
</script>

<Template let:args>
	<ObservablePlot
		{...args}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		{spec}
		data={penguins}
	/>
</Template>

<Story name="Default" args={{ spec }} source />
