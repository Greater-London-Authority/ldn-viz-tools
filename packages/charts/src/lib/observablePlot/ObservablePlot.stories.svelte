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

<script>
	import { writable } from 'svelte/store';

	import * as Plot from '@observablehq/plot';
	import { format } from 'd3-format';

	import { ldnColors, theme } from '@ldn-viz/utils';
	import { penguins } from './exampleData';

	import {
		defaultAnnotationText,
		defaultArea,
		defaultColor,
		defaultDot,
		defaultLine,
		defaultRule,
		defaultSize,
		defaultStyle,
		defaultXAxis,
		defaultYAxis,
		preprocessOptions
	} from '../observablePlotFragments/observablePlotFragments';

	import {
		areaPlotData,
		areaPlotPointsToLabel,
		educationLabelOffsets,
		education_data,
		lineChartData
	} from './demo_data';

	import DemoTooltip from './DemoTooltip.svelte';
	import { addClick } from './ObservablePlot.svelte';

	const spec = {
		style: {
			fontFamily: 'Roboto',
			fontSize: '12pt',
			color: '#666666'
		},

		grid: true,
		marginBottom: 50,
		// aspectRatio: 1,

		x: {
			labelAnchor: 'center',
			labelArrow: 'none',
			label: 'Culmen length/mm'
		},

		y: {
			insetTop: 20,
			labelArrow: 'none'
		},

		marks: [
			Plot.ruleY([0], { stroke: '#666666' }),
			Plot.ruleX([0], { stroke: '#666666' }),
			Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' })
		]
	};

	const tooltipStore = writable();
</script>

<Template let:args>
	<ObservablePlot {...args} {spec} />
</Template>

<Story name="Default" args={{ spec }} />

<Story
	name="With Title"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins
	}}
/>

<Story
	name="With Footer"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins,
		footer: { source: 'This is the source', note: 'This is a note', exportBtns: true }
	}}
/>
<!--
<Story
	name="With responsive width"
	args={{
		spec,
		title: 'Penguin Culmens',
		subTitle: 'A scatterplot of depth against length',
		data: penguins
	}}
/> -->

<!--
	The default tooltip allows you to display text, or a table showing the values of specific columns for the selected mark. 
	However, the appearance of these tooltips cannot be flexibly customized.
-->

<Story name="With default tooltips">
	<ObservablePlot
		spec={{
			style: {
				fontFamily: 'Roboto',
				fontSize: '12pt',
				color: '#666666'
			},

			grid: true,
			marginBottom: 50,

			x: {
				labelAnchor: 'center',
				labelArrow: 'none',
				label: 'Culmen length/mm'
			},

			y: {
				insetTop: 20,
				labelArrow: 'none'
			},

			marks: [
				Plot.ruleY([0], { stroke: '#666666' }),
				Plot.ruleX([0], { stroke: '#666666' }),
				Plot.dot(penguins, {
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: addClick(tooltipStore),
					stroke: 'black',
					fill: 'white',

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
			style: {
				fontFamily: 'Roboto',
				fontSize: '12pt',
				color: '#666666'
			},

			grid: true,
			marginBottom: 50,

			x: {
				labelAnchor: 'center',
				labelArrow: 'none',
				label: 'Culmen length/mm'
			},

			y: {
				insetTop: 20,
				labelArrow: 'none'
			},

			marks: [
				Plot.ruleY([0], { stroke: '#666666' }),
				Plot.ruleX([0], { stroke: '#666666' }),
				Plot.dot(penguins, {
					x: 'culmen_length_mm',
					y: 'culmen_depth_mm',
					render: addClick(tooltipStore),
					stroke: 'black',
					fill: 'white'
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

<Story name="Area chart">
	<ObservablePlot
		title="After a recent decline, the proportion of Londoners achieving at least 20 minutes of active travel per day has started to increase"
		subTitle="Proportion of London residents achieving at least 20 minutes of active travel per day"
		spec={{
			y: {
				...defaultYAxis,
				domain: [0, 60],
				percent: true,
				ticks: 4,
				grid: true,
				tickFormat: (d) => `${d}%`
			},
			x: {
				...defaultXAxis,
				tickFormat: (d) => `${d}`
			},
			style: { ...defaultStyle },

			...defaultSize,

			marks: [
				Plot.lineY(areaPlotData, {
					...defaultLine,
					x: 'Year',
					y: 'Percent'
				}),

				Plot.areaY(areaPlotData, {
					x: 'Year',
					y: 'Percent',
					...defaultArea
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

				Plot.ruleY([0], { stroke: theme.light.axis })
			]
		}}
		data={areaPlotData}
	/>
</Story>

<Story name="Line chart">
	<ObservablePlot
		title="London's GDP was up 7% year-on-year in Q3 2022 and down 0.1% in the most recent year to Q3 2023, but continue to outpace the UK's"
		subTitle="GDP for London and the UK, indexed to their levels in Q4 2019"
		spec={{
			y: {
				...defaultYAxis,
				domain: [65, 115],
				percent: true,
				ticks: 4,
				tickFormat: (d) => `${d}%`
			},

			x: { ...defaultXAxis },

			color: {
				...defaultColor,
				range: [theme.light.primary, theme.light.neutral]
			},

			style: { ...defaultStyle },

			...defaultSize,
			marginRight: 2,

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
					text: (d) => '(Index, 2019 Q4)',
					fontSize: '15px',
					fill: (d) => 'black'
				}),

				Plot.dot(lineChartData, {
					x: 'Quarter',
					y: 'Percent',
					z: 'GDPType',
					stroke: 'GDPType',
					strokeWidth: 2,
					sort: { x: null, reverse: false },
					filter: (d) => d.highlight,
					r: 8,
					fill: 'white'
				}),

				Plot.axisX({
					tickFormat: (d) => {
						const year = d.split(' ')[1];
						const q = d.split(' ')[0];
						return q === 'Q1' ? `${q}\n${year}` : q;
					},
					marginBottom: 50
				})
			]
		}}
		data={lineChartData}
	/>
</Story>

<Story name="Line chart 2">
	<ObservablePlot
		title="In London, from 2021/22 to 2022/23, there was an uptick in under 19s and 19-24 year olds starting apprenticeship programmes"
		subTitle="Number of apprenticeship programme starts and completions in London for under 19s and 19-24 year olds between 2014/15 and 2022/23"
		spec={{
			y: {
				domain: [0, 1.6e4],
				percent: false
				// ticks: 5
			},

			x: defaultXAxis,

			color: {
				...defaultColor,
				range: [ldnColors.core.blue[500], ldnColors.core.darkPink[500]]
			},
			style: defaultStyle,

			...defaultSize,
			marginRight: 200,

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

				Plot.axisY({
					...defaultYAxis
				})
			]
		}}
		data={education_data}
	/>
</Story>
