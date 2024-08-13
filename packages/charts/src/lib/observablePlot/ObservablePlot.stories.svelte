<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ObservablePlot from './ObservablePlot.svelte';

	export const meta = {
		title: 'Charts/ObservablePlot',
		component: ObservablePlot,

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

	import { currentThemeMode } from '@ldn-viz/themes/themeStore';
	import {
		getDefaultPlotStyles,
		plotTheme,
		preprocessOptions
	} from '../observablePlotFragments/observablePlotFragments';

	import {
		areaPlotData,
		areaPlotPointsToLabel,
		educationLabelOffsets,
		education_data,
		lineChartData,
		material_deprivation_data,
		penguins
	} from '../../data/demoData';

	import DemoTooltip from './DemoTooltip.svelte';
	import { addEventHandler, registerTooltip } from './ObservablePlot.svelte';
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

	$: console.log($currentThemeMode);

	let clickedValue: any | undefined = undefined;
	let clickedIndex: any | undefined = undefined;

	const tooltipStore: Writable<Position> = writable();
</script>

<Template let:args>
	<ObservablePlot
		{...args}
		{spec}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
	/>
</Template>

<Story name="Default" args={{ spec }} source />

<!-- 
	The width of the chart is contained within the wrapping chart container.
	Tailwind width classes can be used to control the width. Either fixed: ie 'w-[500px]' or responsive: ie 'w-1/2'
-->
<Story name="With Chart Width">
	<ObservablePlot spec={{ ...spec }} chartWidth="w-1/2" />
</Story>

<!-- 
	The height of the chart remains the reponsibility of the contained instance of plot. It can be set to a specific pixel value: ie 300
-->
<Story name="With Height">
	<ObservablePlot spec={{ ...spec, height: 300 }} />
</Story>

<Story name="With Aspect Ratio">
	<ObservablePlot
		spec={{
			...spec,
			height: undefined,
			aspectRatio: 0.5
		}}
	/>
</Story>

<!--
	The default tooltip allows you to display text, or a table showing the values of specific columns for the selected mark. 
	However, the appearance of these tooltips cannot be flexibly customized.
-->

<Story name="With default tooltips">
	<ObservablePlot
		spec={{
			...spec,

			marks: [
				Plot.ruleY([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.ruleX([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.dot(penguins, {
					...defaultDot,
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: registerTooltip(tooltipStore),

					/* need to expose as a channel before including in tooltip */
					channels: {
						sex: 'sex',
						culmen_length_mm: 'culmen_length_mm',
						culmen_depth_mm: 'culmen_depth_mm'
					},
					tip: {
						format: {
							sex: true,
							culmen_length_mm: (d) => `${d}mm`,
							culmen_depth_mm: (d) => `${d}mm`,
							x: undefined,
							y: undefined
						}
					}
				})
			]
		}}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		data={penguins}
	/>
</Story>

<!--
	Alternatively, you can use a custom Svelte component to render a tooltip.

	To add a custom tooltip:
	
	* create a `tooltipStore` writable store
	* add `render: addClick(tooltipStore)` to the marks that will trigger the tooltip (if the mark is not a `dot` you will also need to provide the SVG node type as the second argument to `addClick`)
	* give these marks a `fill` (otheriwse the tooltips will trigger only when the outline/stroke of the mark is moused-over)
	* provide the custom tooltip component into the named `tooltip` slot
-->
<Story name="With custom tooltips">
	<ObservablePlot
		spec={{
			...spec,
			marks: [
				Plot.ruleY([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.ruleX([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.dot(penguins, {
					...defaultDot,
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: registerTooltip(tooltipStore)
				})
			]
		}}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		data={penguins}
		{tooltipStore}
	>
		<DemoTooltip slot="tooltip" />
	</ObservablePlot>
</Story>

<!--
	Using the `addEventHandler` function we can register an event handler for events (e.g, `click`, `mouseenter`, `mouseleave`) triggered by user interaction with an SVG mark.
-->
<Story name="With custom click interaction">
	<ObservablePlot
		spec={{
			...spec,

			marks: [
				Plot.ruleY([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.ruleX([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),
				Plot.dot(penguins, {
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: addEventHandler('click', (_ev, d) => {
						clickedIndex = d.index;
						clickedValue = penguins[d.index];
					}),
					stroke: plotTheme($currentThemeMode).color.data.primary,
					r: 5,
					fill: (_d, i) => {
						return clickedIndex !== undefined && i === clickedIndex
							? plotTheme($currentThemeMode).color.data.secondary
							: 'white';
					}
				})
			]
		}}
		title="Penguin Culmens"
		subTitle="A scatterplot of depth against length"
		data={penguins}
		{tooltipStore}
	>
		<DemoTooltip slot="tooltip" />
	</ObservablePlot>

	<div>
		Selected point:
		<pre>{JSON.stringify(clickedValue, null, 2)}</pre>
	</div>
</Story>

<!-- 
	The example stories show how defaults can be over-riden to achieve chart specific styling.
	For example the tratment of the Y axis relys on an insetLeft property on the Plot.X and manipulation of the margin and Plot.axisY component
-->
<Story name="Examples / Area chart">
	<ObservablePlot
		title="After a recent decline, the proportion of Londoners achieving at least 20 minutes of active travel per day has started to increase"
		subTitle="Proportion of London residents achieving at least 20 minutes of active travel per day"
		spec={{
			y: {
				...defaultYScale,
				domain: [0, 60],
				percent: true
			},
			x: {
				...defaultXScale,
				insetLeft: 80,
				ticks: 12
			},
			style: { ...defaultStyle },

			...defaultSize,
			marginTop: 56,
			marginLeft: 0,
			marginBottom: 32,

			marks: [
				Plot.lineY(areaPlotData, {
					...defaultLine,
					x: 'Year',
					y: 'Percent'
				}),

				Plot.areaY(areaPlotData, {
					...defaultArea,
					x: 'Year',
					y: 'Percent'
				}),

				// Top part of labels (non-bold)
				Plot.text(areaPlotData, {
					...defaultAnnotationText,
					x: 'Year',
					y: 'Percent',
					text: (d) => `${d.Year}`,
					dy: +20,
					lineAnchor: 'top',
					dx: 5,
					textAnchor: 'end',
					filter: (d) => areaPlotPointsToLabel.includes(d.Year)
				}),

				// Bottom part of labels (bold)
				Plot.text(areaPlotData, {
					...defaultAnnotationText,
					x: 'Year',
					y: 'Percent',
					text: (d) => `${d.Percent * 100}%`,
					dy: +50,
					lineAnchor: 'top',
					dx: 5,
					textAnchor: 'end',
					filter: (d) => areaPlotPointsToLabel.includes(d.Year),
					fontWeight: 'bold'
				}),

				Plot.dot(areaPlotData, {
					...defaultDot,
					x: 'Year',
					y: 'Percent',
					filter: (d) => areaPlotPointsToLabel.includes(d.Year)
				}),

				Plot.ruleY([0], { stroke: plotTheme($currentThemeMode).color.chart.axis }),

				Plot.axisX({ ...defaultXAxis, tickFormat: (d) => `${d}`, ticks: 12 }),
				Plot.axisY({ ...defaultYAxis, tickFormat: (d) => `${d}%` })
			]
		}}
		data={areaPlotData}
	/>
</Story>

<Story name="Examples / Line chart">
	<ObservablePlot
		overrideClass="mt-4"
		title="London's GDP was up 7% year-on-year in Q3 2022 and down 0.1% in the most recent year to Q3 2023, but continue to outpace the UK's"
		subTitle="GDP for London and the UK, indexed to their levels in Q4 2019"
		spec={{
			y: {
				...defaultYScale,
				domain: [65, 115],
				percent: true
			},

			x: { ...defaultXScale, insetLeft: 60 },

			color: {
				...defaultColor,
				range: [
					plotTheme($currentThemeMode).color.data.primary,
					plotTheme($currentThemeMode).color.data.neutral[0]
				]
			},

			style: { ...defaultStyle },

			...defaultSize,
			marginRight: 2,
			marginLeft: 0,
			marginTop: 0,
			marginBottom: 44,
			aspectRatio: 5,

			marks: [
				Plot.ruleY([0], defaultRule),
				Plot.ruleY([1], defaultRule),

				Plot.lineY(lineChartData, {
					x: 'Quarter',
					y: 'Percent',
					z: 'GDPType',
					stroke: 'GDPType',
					strokeWidth: 2,
					sort: { x: null, reverse: false }
				}),

				// First section of label (non-bold)
				...preprocessOptions(lineChartData, {
					type: Plot.text,
					options: {
						...defaultAnnotationText,
						x: 'Quarter',
						y: 'Percent',
						text: (d) =>
							d.QuarterRev === '2019 Q4'
								? d.QuarterRev
								: `${d['GDPType'] === 'London GDP' ? 'London' : 'UK'} ${d.QuarterRev}`,

						filter: (d) => d.highlight,

						dy: (d) => d.Offset || -50,
						textAnchor: (d) => d.textAnchor || 'end',
						lineAnchor: 'bottom',
						fontSize: '15px',
						fill: 'GDPType'
					},
					optionsToEval: {
						fill: (d) => (d.QuarterRev === '2019 Q4' ? 'black' : 'GDPType')
					}
				}),

				// Second section of labels (bold)
				...preprocessOptions(lineChartData, {
					type: Plot.text,
					options: {
						...defaultAnnotationText,
						x: 'Quarter',
						y: 'Percent',
						text: (d) => `${format('0.2%')(d.Percent)}\nPre-pandemic GDP`,
						filter: (d) => d.highlight,
						dy: (d) => (d.Offset || -50) + 30,
						textAnchor: (d) => d.textAnchor || 'end',
						lineAnchor: 'bottom',
						fontSize: '15px',
						//fill: 'GDPType',
						fontWeight: 'bold'
					},
					optionsToEval: {
						fill: (d) => (d.QuarterRev === '2019 Q4' ? 'black' : 'GDPType')
					}
				}),

				Plot.text([{ Quarter: 'Q4 2019', Percent: 1 }], {
					x: 'Quarter',
					dx: -40,
					y: 'Percent',
					dy: -15,
					textAnchor: 'end',
					text: () => '(Index, 2019 Q4)',
					fontSize: '15px',
					fill: () => 'black'
				}),

				Plot.dot(lineChartData, {
					x: 'Quarter',
					y: 'Percent',
					stroke: 'GDPType',
					strokeWidth: 2,
					sort: { x: null, reverse: false },
					filter: (d) => d.highlight,
					r: 8,
					fill: 'white'
				}),

				Plot.axisX({
					...defaultXAxis,
					tickFormat: (d) => {
						const year = d.split(' ')[1];
						const q = d.split(' ')[0];
						return q === 'Q1' ? `${q}\n${year}` : q;
					},
					marginBottom: 50
				}),

				Plot.axisY({
					...defaultYAxis,
					ticks: 4,
					tickFormat: (d) => `${d}%`
				})
			]
		}}
		data={lineChartData}
	/>
</Story>

<Story name="Examples / Line chart 2">
	<ObservablePlot
		overrideClass="mt-4"
		title="In London, from 2021/22 to 2022/23, there was an uptick in under 19s and 19-24 year olds starting apprenticeship programmes"
		subTitle="Number of apprenticeship programme starts and completions in London for under 19s and 19-24 year olds between 2014/15 and 2022/23"
		spec={{
			y: {
				...defaultYScale,
				domain: [0, 1.6e4],
				percent: false
			},

			x: defaultXScale,

			color: {
				...defaultColor,
				range: [
					plotTheme($currentThemeMode).color.data.primary,
					plotTheme($currentThemeMode).color.data.secondary
				]
			},
			style: defaultStyle,

			...defaultSize,
			marginRight: 2,
			marginLeft: 0,
			marginTop: 0,
			marginBottom: 44,
			aspectRatio: 4500,

			marks: [
				Plot.ruleY([0], defaultRule),

				// <19
				Plot.lineY(education_data, {
					...defaultLine,
					x: 'Date',
					y: 'Count',
					z: 'Age',
					stroke: 'Age',
					sort: { x: null, reverse: false },
					filter: (d) => d.Type === 'Completions',
					strokeDasharray: '5,5'
				}),

				// 19-24
				Plot.lineY(education_data, {
					...defaultLine,
					x: 'Date',
					y: 'Count',
					z: 'Age',
					stroke: 'Age',
					sort: { x: null, reverse: false },
					filter: (d) => d.Type === 'Starts'
				}),

				...preprocessOptions(education_data, {
					type: Plot.text,
					options: {
						...defaultAnnotationText,
						x: 'Date',
						y: 'Count',
						text: (d) => `${d.Age} ${d.Type}\n${d.Count.toLocaleString()}`,
						dy: (d) => educationLabelOffsets[`${d.Age} ${d.Type}`],
						textAnchor: 'end',
						lineAnchor: 'bottom',
						fill: 'Age',
						filter: (d) => d.Date === '2022/23'
					}
				}),

				Plot.dot(education_data, {
					...defaultDot,
					x: 'Date',
					y: 'Count',
					filter: (d) => d.Date === '2022/23',
					stroke: 'Age'
				}),

				Plot.axisX({
					...defaultXAxis
				}),
				Plot.axisY({
					...defaultYAxis
				})
			]
		}}
		data={education_data}
	/>
</Story>

<Story name="Examples / Responsive Chart Swap">
	<div class="block lg:hidden">
		<ObservablePlot
			overrideClass="mt-4"
			title="I'm a simple chart and I get displayed on small screens"
			spec={{
				y: {
					...defaultYScale,
					domain: [0, 1.6e4],
					percent: false
				},

				x: { ...defaultXScale, ticks: 2, insetLeft: 40 },

				color: {
					...defaultColor,
					range: [
						plotTheme($currentThemeMode).color.data.primary,
						plotTheme($currentThemeMode).color.data.secondary
					]
				},
				style: defaultStyle,

				...defaultSize,
				marginRight: 2,
				marginLeft: 0,
				marginTop: 8,
				marginBottom: 44,
				aspectRatio: 2500,

				marks: [
					Plot.ruleY([0], defaultRule),

					// <19
					Plot.lineY(education_data, {
						...defaultLine,
						x: 'Date',
						y: 'Count',
						z: 'Age',
						stroke: 'Age',
						sort: { x: null, reverse: false },
						filter: (d) => d.Type === 'Completions',
						strokeDasharray: '5,5'
					}),

					// 19-24
					Plot.lineY(education_data, {
						...defaultLine,
						x: 'Date',
						y: 'Count',
						z: 'Age',
						stroke: 'Age',
						sort: { x: null, reverse: false },
						filter: (d) => d.Type === 'Starts'
					}),

					Plot.dot(education_data, {
						...defaultDot,
						x: 'Date',
						y: 'Count',
						filter: (d) => d.Date === '2022/23',
						stroke: 'Age'
					}),

					Plot.axisX({
						...defaultXAxis,
						interval: 'year' // this isn't correct but has the effect of clearing the axis
					}),
					Plot.axisY({
						...defaultYAxis
					})
				]
			}}
			data={education_data}
		/>
	</div>

	<div class="hidden lg:block">
		<ObservablePlot
			overrideClass="mt-4"
			title="I'm a more complex densly labled chart and I get displayed on wider screens"
			spec={{
				y: {
					...defaultYScale,
					domain: [0, 1.6e4],
					percent: false
				},

				x: defaultXScale,

				color: {
					...defaultColor,
					range: [
						plotTheme($currentThemeMode).color.data.primary,
						plotTheme($currentThemeMode).color.data.secondary
					]
				},
				style: defaultStyle,

				...defaultSize,
				marginRight: 2,
				marginLeft: 0,
				marginTop: 0,
				marginBottom: 44,
				aspectRatio: 4500,

				marks: [
					Plot.ruleY([0], defaultRule),

					// <19
					Plot.lineY(education_data, {
						...defaultLine,
						x: 'Date',
						y: 'Count',
						z: 'Age',
						stroke: 'Age',
						sort: { x: null, reverse: false },
						filter: (d) => d.Type === 'Completions',
						strokeDasharray: '5,5'
					}),

					// 19-24
					Plot.lineY(education_data, {
						...defaultLine,
						x: 'Date',
						y: 'Count',
						z: 'Age',
						stroke: 'Age',
						sort: { x: null, reverse: false },
						filter: (d) => d.Type === 'Starts'
					}),

					...preprocessOptions(education_data, {
						type: Plot.text,
						options: {
							...defaultAnnotationText,
							x: 'Date',
							y: 'Count',
							text: (d) => `${d.Age} ${d.Type}\n${d.Count.toLocaleString()}`,
							dy: (d) => educationLabelOffsets[`${d.Age} ${d.Type}`],
							textAnchor: 'end',
							lineAnchor: 'bottom',
							fill: 'Age',
							filter: (d) => d.Date === '2022/23'
						}
					}),

					Plot.dot(education_data, {
						...defaultDot,
						x: 'Date',
						y: 'Count',
						filter: (d) => d.Date === '2022/23',
						stroke: 'Age'
					}),

					Plot.axisX({
						...defaultXAxis
					}),
					Plot.axisY({
						...defaultYAxis
					})
				]
			}}
			data={education_data}
		/>
	</div>
</Story>

<Story name="Examples / mbBar">
	<ObservablePlot
		title="Material deprivation is consistently more prevalent among London's pensioners than elsewhere in the UK"
		subTitle="Percentage of pensioners in material deprivation by region (2020/21-2022/23)"
		alt="Bar chart of levels of material deprivation amongst pensioners in UK regions. Bars show that material deprivation is consistently more prevalent among London's pensioners than elsewhere in the UK. For example Inner London is 20% compared to West Midlands 9%, and Northern Ireland 4%."
		spec={{
			...mbBarSpec
		}}
		footer={{
			byline: 'GLA City Intelligence',
			source: 'London Datastore',
			note: 'Data for illustrative purpose only',
			exportBtns: true
		}}
	/>
</Story>
