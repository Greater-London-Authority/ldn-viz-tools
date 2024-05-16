<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	export const meta = {
		title: 'Charts/ObservablePlotFragments',
		component: ObservablePlot
	};
</script>

<script lang="ts">
	import * as Plot from '@observablehq/plot';
	import { format } from 'd3-format';

	import { ldnColors, theme } from '@ldn-viz/utils';

	import {
		defaultAnnotationText,
		defaultArea,
		defaultColor,
		defaultDashedLine,
		defaultDot,
		defaultLine,
		defaultRule,
		defaultSize,
		defaultStyle,
		defaultXAxis,
		defaultYAxis,
		preprocessOptions
	} from './observablePlotFragments';

	import {
		areaPlotData,
		areaPlotPointsToLabel,
		educationLabelOffsets,
		education_data,
		lineChartData
	} from './demo_data';
</script>

<Template let:args>
	<ObservablePlot {...args} />
</Template>

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
				...defaultYAxis,
				domain: [0, 1.6e4],
				percent: false,
				ticks: 5
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
					...defaultDashedLine,
					x: 'Date',
					y: 'Count',
					z: 'Age',
					stroke: 'Age',
					sort: { x: null, reverse: false },
					filter: (d) => d.Type === 'Completions'
				}),

				// 19-24
				Plot.lineY(education_data, {
					...defaultDashedLine,
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
				})
			]
		}}
		data={education_data}
	/>
</Story>
