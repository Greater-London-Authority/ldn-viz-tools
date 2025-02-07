<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ObservablePlotInner from './ObservablePlotInner.svelte';

	export const meta = {
		title: 'Charts/Components/ObservablePlotInner',
		component: ObservablePlotInner,

		argTypes: {
			// this is a module export, not a prop, so don't include it in table
			addClick: {
				table: {
					disable: true
				}
			}
		}
	};
</script>

<script lang="ts">
	import * as Plot from '@observablehq/plot';

	import { currentThemeMode } from '@ldn-viz/ui';
	import { getDefaultPlotStyles } from '../observablePlotFragments/observablePlotFragments';

	import { penguins } from '../../data/demoData';

	$: ({
		defaultDot,
		defaultGridX,
		defaultGridY,
		defaultSize,
		defaultStyle,
		defaultTip,
		defaultXAxis,
		defaultXScale,
		defaultYAxis,
		defaultYScale,
		defaultRule
	} = getDefaultPlotStyles($currentThemeMode));

	$: spec = {
		style: {
			...defaultStyle
		},

		...defaultSize,

		x: { ...defaultXScale },

		y: { ...defaultYScale },

		marks: [
			Plot.gridX({ ...defaultGridX }),
			Plot.gridY({ ...defaultGridY }),
			Plot.ruleY([0], { ...defaultRule }),
			Plot.ruleX([0], { ...defaultRule }),
			Plot.dot(penguins, { ...defaultDot, x: 'culmen_length_mm', y: 'culmen_depth_mm' }), // instead of defaultPoint
			Plot.axisX({ ...defaultXAxis }),
			Plot.axisY({ ...defaultYAxis, label: 'culmen_depth_mm' }),
			Plot.tip(
				penguins,
				Plot.pointerX({ ...defaultTip, x: 'culmen_length_mm', y: 'culmen_depth_mm' })
			)
		]
	};
</script>

<Template let:args>
	<ObservablePlotInner
		{...args}
		{spec}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
	/>
</Template>

<Story name="Default" args={{ spec }} source />
