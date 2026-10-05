<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Chart from './Chart.svelte';
	import type { ChartDataRow } from './chartOptions';

	/**
	 * The `Chart` component renders a chart from a `data` array and a set of `options`.
	 * It picks a chart generator based on `options.chartType`, and renders the result in an [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation).
	 *
	 * In this example, the data is fetched from the State of London API and passed in as the `data` prop.
	 */

	const fetchPayGapData = async (): Promise<ChartDataRow[]> => {
		const res = await fetch(
			'https://apps.london.gov.uk/api/tables/state_of_london/chart_data?dataset=eq.pay_gap_gender'
		);
		const rows: ChartDataRow[] = await res.json();
		// Dates arrive as 'YYYY/MM/DD' strings; convert them to `Date`s for the date x-axis
		return rows
			.map((d) => ({ ...d, xd: new Date((d.xd as string).replace(/\//g, '-')) }))
			.sort((a, b) => (a.xd as Date).getTime() - (b.xd as Date).getTime());
	};

	const { Story } = defineMeta({
		title: 'Charts/Components/Chart',
		component: Chart,
		tags: ['autodocs'],
		args: {
			title: 'Gender pay gap',
			subTitle:
				"Percentage difference between median hourly earnings of men and women, expressed as a percentage of men's earnings",
			byline: 'GLA City Intelligence',
			source:
				'Office for National Statistics, <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024">ASHE</a>',
			note: 'Core LLO Indicator',

			dataset: 'pay_gap_gender',
			options: {
				chartType: 'line',
				type: 'date',
				ytickformat: '.0%',
				tooltipFormatValue: '.1%',

				timeperiod_type: 'Annual',
				includeZero: true,
				insetRight: 60,
				insetLeft: 40,
				xDomain: [new Date('1995-01-01'), new Date('2025-01-01')]
			},
			columnMapping: {
				xd: 'date',
				b: 'geography',
				y: 'value',
				z2: 'category_secondary'
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		{#await fetchPayGapData()}
			<p>Loading data…</p>
		{:then data}
			<Chart {...args} {data} />
		{:catch}
			<p>Chart data could not be loaded.</p>
		{/await}
	{/snippet}
</Story>
