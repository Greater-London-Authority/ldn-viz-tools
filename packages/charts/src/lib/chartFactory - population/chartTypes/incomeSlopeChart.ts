import { Plot } from '@ldn-viz/charts';
import { theme } from '@ldn-viz/ui';
import { format } from 'd3-format';
import type { ChartDataRow, ChartOptions, ColorChoice } from '../chartOptions';
import { getAxisTypeAndTickFormat, getZeroYLine, makeTooltip } from '../utils';

const thresholds = ['10', '50', '90'];

export const incomeSlopeChart = (
	options: ChartOptions,
	data: ChartDataRow[],
	colorChoice: ColorChoice
) => ({
	x: {
		label: null,
		insetLeft: options.insetLeft ?? 80,
		insetRight: options.insetRight ?? 120, // need space for labels to right of plot

		...getAxisTypeAndTickFormat(options.timeperiod_type),
		ticks: 5
	},

	y: {
		label: null,
		domain: options.yDomain,
		includeZero: options.includeZero
	},

	color: {
		legend: true,
		type: 'ordinal' as const,
		domain: ['London', 'Rest of UK'],
		range: [theme.tokenNameToValue('data.primary'), theme.tokenNameToValue('data.context')]
	},

	marks: [
		Plot.gridY(),

		Plot.axisY({
			tickFormat: (d: number) => '£' + format(options.ytickformat ?? '2r')(d)
		}),

		...getZeroYLine(options),

		// sloped line
		Plot.line(data, {
			x: 'xd',
			z: 'b',
			y: 'y',

			stroke: theme.tokenNameToValue('data.context'),
			strokeDasharray: '4,4',
			title: makeTooltip(options),
			tip: 'xy'
		}),

		// vertical lines
		Plot.line(data, {
			x: 'xd',
			z: 'xd',
			y: 'y',

			stroke: 'xd'
		}),

		Plot.dot(
			data.filter((d) => thresholds.includes(d.b)),
			{
				x: 'xd',
				y: 'y',
				stroke: 'xd',
				strokeWidth: 2,
				fill: 'white',
				fillOpacity: 1,
				r: 5
			}
		),

		Plot.text(
			data.filter((d) => thresholds.includes(d.b) && d.xd === 'London'),
			{
				x: 'xd',
				y: 'y',
				text: (d) => (d.b === '50' ? 'Median' : d.b + 'th Percentile'),
				fill: 'xd',
				textAnchor: 'end',
				dx: -10
			}
		),

		Plot.text(
			data.filter((d) => thresholds.includes(d.b) && d.xd !== 'London'),
			{
				x: 'xd',
				y: 'y',
				text: (d) => (d.b === '50' ? 'Median' : d.b + 'th Percentile'),
				fill: 'xd',
				textAnchor: 'start',
				dx: 10
			}
		)
	]
});
