<script lang="ts">
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';

	type Props = {
		title: string;
		subtitle?: string;
		byline?: string;
		source?: string;
	};

	let { title, subtitle, byline, source }: Props = $props();

	const formatMillions = format('.2f');

	// Historical data points (2011–2022) are the same across all variants
	const historicalYears = [
		{ year: 2011, value: 8.17 },
		{ year: 2012, value: 8.32 },
		{ year: 2017, value: 8.78 },
		{ year: 2022, value: 8.87 }
	];

	const variants = ['5-year trend', '10-year trend', '15-year trend'];

	const historicalData = variants.flatMap((variant) =>
		historicalYears.map((d) => ({ ...d, variant }))
	);

	const projectedData = [
		{ year: 2027, variant: '5-year trend', value: 9.03 },
		{ year: 2032, variant: '5-year trend', value: 9.08 },
		{ year: 2037, variant: '5-year trend', value: 9.16 },
		{ year: 2042, variant: '5-year trend', value: 9.23 },
		{ year: 2047, variant: '5-year trend', value: 9.27 },
		{ year: 2027, variant: '10-year trend', value: 9.17 },
		{ year: 2032, variant: '10-year trend', value: 9.36 },
		{ year: 2037, variant: '10-year trend', value: 9.55 },
		{ year: 2042, variant: '10-year trend', value: 9.72 },
		{ year: 2047, variant: '10-year trend', value: 9.85 },
		{ year: 2027, variant: '15-year trend', value: 9.26 },
		{ year: 2032, variant: '15-year trend', value: 9.53 },
		{ year: 2037, variant: '15-year trend', value: 9.79 },
		{ year: 2042, variant: '15-year trend', value: 10.02 },
		{ year: 2047, variant: '15-year trend', value: 10.2 }
	];

	const rawData = [...historicalData, ...projectedData];

	const projectionStartDate = new Date('2026-01-01');
	const projectionEndDate = new Date('2048-01-01');

	const chartData = rawData.map((row) => ({
		...row,
		yearDate: new Date(`${row.year}-01-01`)
	}));

	let spec = $derived({
		x: { type: 'utc', insetLeft: 72, insetRight: 24, domain: [new Date('2011-01-01'), new Date('2048-01-01')] },
		y: { domain: [7.9, 10.5] },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
			]
		},
		marks: [
			Plot.rect([{}], {
				x1: projectionStartDate,
				x2: projectionEndDate,
				y1: 7.9,
				y2: 10.5,
				fill: '#e8edf2',
				opacity: 0.6
			}),
			Plot.text([{}], {
				x: projectionStartDate,
				y: 10.4,
				text: () => 'Projected →',
				textAnchor: 'start',
				dx: 4,
				fontSize: 11,
				fill: '#6b7280'
			}),
			Plot.ruleX([projectionStartDate], { stroke: '#94a3b8', strokeDasharray: '4,3' }),
			Plot.gridX({ interval: '5 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '5 years' }),
			Plot.axisY({ label: 'Population (millions)', tickFormat: (d) => `${formatMillions(d)}m` }),
			Plot.line(chartData, { x: 'yearDate', y: 'value', stroke: 'variant', z: 'variant' }),
			Plot.ruleX(chartData, Plot.pointerX({ x: 'yearDate' })),
			Plot.point(chartData, Plot.pointer({ x: 'yearDate', y: 'value', stroke: 'variant', z: 'variant' })),
			Plot.tip(
				chartData,
				Plot.pointer({
					x: 'yearDate',
					y: 'value',
					z: 'variant',
					channels: {
						variant: 'variant',
						year: { value: 'year', label: 'Year' },
						value: { value: 'value', label: 'Population (millions)' }
					},
					format: {
						variant: true,
						year: true,
						value: (d) => `${formatMillions(d)}m`
					}
				})
			)
		]
	});
</script>

<ObservablePlot
	data={chartData}
	spec={spec}
	{title}
	subTitle={subtitle}
	{byline}
	source={source ?? 'Dummy data - replace with projection dataset'}
	note="Placeholder chart for projection chapter"
	alt="Line chart showing projected London population for 5-year, 10-year and 15-year trend variants"
/>
