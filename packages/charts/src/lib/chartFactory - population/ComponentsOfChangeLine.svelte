<script lang="ts">
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import componentsOfChangeData from '$lib/data/ComponentsOfChangeChartData.json' with { type: 'json' };

	interface ChartDataRow {
		dataset: string;
		xd: string;
		b: string;
		y: number;
	}

	type Props = {
		dataset: string;
		title: string;
		subtitle?: string;
		byline?: string;
		source?: string;
	};

	let { dataset, title, subtitle, byline, source }: Props = $props();

	const formatThousands = format(',.0f');

	const variants = ['Low', 'Central', 'High'];

	// Filter data for this dataset
	$: filteredData = (componentsOfChangeData as ChartDataRow[])
		.filter((row) => row.dataset === dataset)
		.map((row) => ({
			year: parseInt(row.xd.substring(0, 4)),
			yearDate: new Date(row.xd),
			variant: row.b,
			value: row.y / 1000 // Convert to thousands
		}))
		.sort((a, b) => a.year - b.year);

	let spec = $derived({
		x: { type: 'utc', insetLeft: 72, insetRight: 24 },
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
			Plot.gridX({ interval: '5 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '5 years' }),
			Plot.axisY({ label: 'Value (thousands)', tickFormat: (d) => `${formatThousands(d)}k` }),
			Plot.ruleY([0]),
			Plot.line(filteredData, { x: 'yearDate', y: 'value', stroke: 'variant', z: 'variant' }),
			Plot.ruleX(filteredData, Plot.pointerX({ x: 'yearDate' })),
			Plot.point(filteredData, Plot.pointer({ x: 'yearDate', y: 'value', stroke: 'variant', z: 'variant' })),
			Plot.tip(
				filteredData,
				Plot.pointer({
					x: 'yearDate',
					y: 'value',
					z: 'variant',
					channels: {
						variant: 'variant',
						year: { value: 'year', label: 'Year' },
						value: { value: 'value', label: 'Value (thousands)' }
					},
					format: {
						variant: true,
						year: true,
						value: (d) => `${formatThousands(d)}k`
					}
				})
			)
		]
	});
</script>

<ObservablePlot
	data={filteredData}
	{spec}
	{title}
	subTitle={subtitle}
	{byline}
	{source}
	note="Shows three projection variants based on low, central and high trend assumptions about migration and natural change"
	alt="Line chart showing {dataset} components for London, with low, central and high trend lines"
/>

