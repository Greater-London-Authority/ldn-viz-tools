<script context="module">
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	/* This is an example `ScatterPlot` chart using the default plot styles via `glaPlot` function. */

	export const meta = {
		title: 'Charts/Examples/ScatterPlot'
	};
</script>

<script lang="ts">
	import { currentThemeMode } from '@ldn-viz/ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { penguins } from '../../data/demoData';
	import { Plot, glaPlot } from '../observablePlotFragments/glaPlot';

	$: globalDefaultsMarks = [
		Plot.gridX(),
		Plot.gridY(),
		Plot.ruleY([0]),
		Plot.ruleX([0]),
		Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }), // instead of defaultPoint
		Plot.axisX(),
		Plot.axisY({ label: 'culmen_depth_mm' }),
		Plot.tip(penguins, Plot.pointerX({ x: 'culmen_length_mm', y: 'culmen_depth_mm' }))
	];

	$: globalDefaultsSpec = glaPlot(penguins, $currentThemeMode, globalDefaultsMarks);
</script>

<Template let:args>
	<ObservablePlot
		{...args}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		spec={{ ...globalDefaultsSpec }}
		data={penguins}
	/>
</Template>

<Story name="Default" source />
