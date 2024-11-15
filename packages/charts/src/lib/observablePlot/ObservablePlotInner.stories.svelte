<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ObservablePlotInner from './ObservablePlotInner.svelte';

	export const meta = {
		title: 'Charts/ObservablePlotInner',
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
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';
	import { format } from 'd3-format';

	import { currentThemeMode, Select } from '@ldn-viz/ui';
	import {
		getDefaultPlotStyles,
		plotTheme,
		preprocessOptions
	} from '../observablePlotFragments/observablePlotFragments';

	import {
		areaPlotData,
		areaPlotPointsToLabel,
		education_data,
		educationLabelOffsets,
		lineChartData,
		material_deprivation_data,
		penguins
	} from '../../data/demoData';

	import DemoTooltip from './DemoTooltip.svelte';
	import { addEventHandler, registerTooltip } from './ObservablePlotInner.svelte';
	import type { Position } from './types';

	$: ({
		defaultArea,
		defaultColor,
		defaultDot,
		defaultGridX,
		defaultGridY,
		defaultSize,
		defaultStyle,
		defaultTip,
		defaultLine,
		defaultXAxis,
		defaultXScale,
		defaultYAxis,
		defaultYScale,
		defaultRule,
		defaultAnnotationText
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

	$: mbBarSpec = {
		y: {
			...defaultYScale,
			label: ''
		},

		x: {
			...defaultXScale,
			domain: [0, 20],
			insetLeft: 0 // adjusting to fit y axis labels of this chart
		},

		color: {
			...defaultColor,
			range: [
				plotTheme($currentThemeMode).color.data.primary,
				plotTheme($currentThemeMode).color.data.context
			]
		},

		style: {
			...defaultStyle
		},

		...defaultSize,
		marginLeft: 200,
		marginRight: 60,

		marks: [
			// grid marks
			Plot.gridX({ ...defaultGridX, ticks: 5 }),

			Plot.barX(material_deprivation_data, {
				x: 'Pensioners',
				y: 'Region',
				fill: 'Area',
				sort: { y: 'x', reverse: true }
			}),

			Plot.textX(material_deprivation_data, {
				x: 'Pensioners',
				y: 'Region',
				fill: 'Area',
				dx: 4,
				textAnchor: 'start',
				text: (d) => `${d.Pensioners}%`,
				sort: { y: 'x', reverse: true }
			}),

			// // axis x
			Plot.axisX({
				...defaultXAxis,
				label: 'Percentage of Pensioners',
				tickFormat: (d) => `${d}%`,
				ticks: 5
			}),

			// 0 baseline
			Plot.ruleX([0], { ...defaultRule }), // Q: Should we always place a 0 baseline in the default chart (if range is not starting at 0, it won't be shown anyway)

			// data tool tip - last to display
			Plot.tip(
				material_deprivation_data,
				Plot.pointerY({
					...defaultTip,
					x: 'Pensioners',
					y: 'Region',
					title: (d) => [d.Region, `${d.Pensioners}%`].join('\n')
				})
			)
		]
	};

	let clickedValue: any | undefined = undefined;
	let clickedIndex: any | undefined = undefined;

	const tooltipStore: Writable<Position> = writable();
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
