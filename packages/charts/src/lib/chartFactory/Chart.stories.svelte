<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import { getColorRamp } from '@ldn-viz/utils';

	import Chart from './Chart.svelte';
	import type { ChartDataRow, ChartOptions } from './chartOptions';

	/**
	 * The `Chart` component renders a chart from a `data` array and a set of `options`.
	 * It picks a chart generator based on `options.chartType`, and renders the result in an [ObservablePlot](./?path=/docs/charts-components-observableplot--documentation).
	 *
	 * In these examples, the data is fetched from the State of London API and passed in as the `data` prop.
	 */

	const fetchChartData = async (dataset: string): Promise<ChartDataRow[]> => {
		const res = await fetch(
			`https://apps.london.gov.uk/api/tables/state_of_london/chart_data?dataset=eq.${dataset}`
		);
		const rows: ChartDataRow[] = await res.json();

		// Dates arrive as 'YYYY/MM/DD' strings; convert them to `Date`s for date x-axes.
		// Other values of `xd` (e.g. '2019-20' or category names) are left as strings.
		const isDateString = (v: unknown) => typeof v === 'string' && /^\d{4}\/\d{2}\/\d{2}$/.test(v);
		if (!rows.every((d) => isDateString(d.xd))) {
			return rows;
		}

		return rows
			.map((d) => ({ ...d, xd: new Date((d.xd as string).replace(/\//g, '-')) }))
			.sort((a, b) => (a.xd as Date).getTime() - (b.xd as Date).getTime());
	};

	const lineOptions: ChartOptions = {
		chartType: 'line',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 60,
		insetLeft: 40,
		xDomain: [new Date('1995-01-01'), new Date('2025-01-01')]
	};

	const barChartHorizontalOptions: ChartOptions = {
		chartType: 'barChartHorizontal',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order:
			'Transport and storage|Human health and \nsocial work|Construction|Accommodation \nand food services|Arts and \nentertainment|Real estate \nactivities|Wholesale and retail|Financial and \ninsurance activities|Manufacturing|Administrative and \nsupport service activities|Professional and \ntechnical activities|Education|Information and \ncommunication',
		timeperiod_type: 'Annual',
		includeZero: true,
		insetRight: 5,
		marginLeft: 180
	};

	const barChartHorizontalGroupedOptions: ChartOptions = {
		chartType: 'barChartHorizontalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 1],
		x_order:
			'Average job quality indicator|Desired contract|Not on zero hours contract|Satisfactory hours|No unpaid overtime|Not in low pay|Positive employee involvement|Positive career progression',
		timeperiod_type: 'Multi-year period',
		includeZero: true
	};

	const barChartVerticalOptions: ChartOptions = {
		chartType: 'barChartVertical',
		type: 'character',
		ytickformat: '.0%',

		x_order: null,
		timeperiod_type: 'Financial Year',
		includeZero: true,
		xScaleType: 'band',
		yDomain: [0, 0.4]
	};

	const barChartVerticalGroupedOptions: ChartOptions = {
		chartType: 'barChartVerticalGrouped',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		yDomain: [0, 0.6],
		x_order: null,
		timeperiod_type: 'Annual',
		includeZero: true
	};

	const barChartStackedOptions: ChartOptions = {
		chartType: 'barChartStacked',
		type: 'character',
		ytickformat: '.0%',
		xScaleType: 'band',
		x_order: null,
		timeperiod_type: '12-month period',
		facetOrder: ['London', 'UK'],
		includeZero: true,
		yDomain: [0, 0.15],
		height: 300
	};

	const barChartStackedTimeseriesOptions: ChartOptions = {
		chartType: 'barChartStackedTimeseries',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: '12-month period',
		includeZero: true,
		xInterval: 'quarter',
		insetRight: 20,
		insetLeft: 40,
		yDomain: [0, 0.12]
	};

	const histogramOptions: ChartOptions = {
		chartType: 'histogram',
		xAxisLabel: 'Vacancy Rate',
		faceted: true,
		type: 'date',
		ytickformat: null,
		x_order: null,
		timeperiod_type: 'Annual',
		insetLeft: 40,
		yDomain: [0, 120],
		xDomain: [0, 0.5555555820465088]
	};

	const incomeSlopeOptions: ChartOptions = {
		chartType: 'incomeSlope',
		type: 'character',
		ytickformat: ',.2r',
		tooltipFormatValue: '$,.0f',
		x_order: null,
		timeperiod_type: 'Quarter',
		includeZero: true,
		yDomain: [0, 2000],
		xDomain: ['London', 'Rest of UK']
	};

	const slopeChartOptions: ChartOptions = {
		chartType: 'slopeChart',
		type: 'character',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: '<keep>',
		timeperiod_type: 'Annual',
		includeZero: true
	};

	const lineChartWithLineStylesOptions: ChartOptions = {
		chartType: 'lineChartWithLineStyles',
		type: 'date',
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,
		timeperiod_type: 'Academic Year',
		includeZero: true,
		insetRight: 45,

		extraMarks: ({ Plot }) =>
			Plot.text(
				[
					{ x: '2007-08', y: 0.38, text: 'Year 6' },
					{ x: '2007-08', y: 0.26, text: 'Reception' }
				],
				{
					x: 'x',
					y: 'y',
					text: 'text',
					textAnchor: 'start'
				}
			),

		yDomain: [0, 0.5]
	};

	const boroughChoroplethOptions: ChartOptions = {
		chartType: 'boroughChoropleth',
		type: 'character',
		timeperiod_type: null,
		ytickformat: '.0%',
		tooltipFormatValue: '.1%',

		x_order: null,

		colorScale: {
			range: getColorRamp({
				count: 7,
				colors: [
					theme.tokenNameToValue('palette.blue.200'),
					theme.tokenNameToValue('palette.blue.500'),
					theme.tokenNameToValue('palette.blue.900')
				],
				even: true
			}),
			domain: [0.5, 0.53, 0.56, 0.59, 0.62, 0.65]
		}
	};

	// The cast is needed because `chartType` is deliberately not one of the supported types
	const invalidOptions = { ...lineOptions, chartType: 'notAChartType' } as unknown as ChartOptions;

	const invalidChartData: ChartDataRow[] = [
		{ xd: new Date('2023-01-01'), b: 'London', y: 0.11 },
		{ xd: new Date('2024-01-01'), b: 'London', y: 0.1 }
	];

	const { Story } = defineMeta({
		title: 'Charts/Components/Chart',
		component: Chart,
		tags: ['autodocs'],
		render: chartTemplate,
		args: {
			title: 'Gender pay gap',
			subTitle:
				"Percentage difference between median hourly earnings of men and women, expressed as a percentage of men's earnings",
			byline: 'GLA City Intelligence',
			source:
				'Office for National Statistics, <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2024">ASHE</a>',
			note: 'Core LLO Indicator',

			dataset: 'pay_gap_gender',
			options: lineOptions,
			columnMapping: {
				xd: 'date',
				b: 'geography',
				y: 'value',
				z2: 'category_secondary'
			}
		}
	});
</script>

<!-- Fetches the data for `args.dataset`, unless `data` is supplied directly as an arg. -->
{#snippet chartTemplate(args: any)}
	{#if args.data}
		<Chart {...args} />
	{:else}
		{#await fetchChartData(args.dataset)}
			<p>Loading data…</p>
		{:then data}
			<Chart {...args} {data} />
		{:catch}
			<p>Chart data could not be loaded.</p>
		{/await}
	{/if}
{/snippet}

<!-- A line chart (`chartType: 'line'`), with a label at the end of each line. -->
<Story name="Default" />

<!-- `chartType: 'lineChartWithLineStyles'` draws each value of `z2` with a different line style. This example also uses `extraMarks` to label the line styles. -->
<Story
	name="Line Chart With Line Styles"
	args={{
		title: 'Prevalence of obesity in children',
		subTitle:
			'Percentage of children in Reception and Year 6 that are overweight or obese in London and England, 2007/08 to 2024/25',
		source:
			'<a href="https://fingertips.phe.org.uk/profile/obesity-physical-activity-nutrition">Public health profiles</a>, OHID',
		note: 'Based on National Child Measurement Programme data',
		dataset: 'yr6_obesity',
		options: lineChartWithLineStylesOptions
	}}
/>

<!-- `chartType: 'barChartHorizontal'`; `x_order` sets the order of the bars, and `marginLeft` makes space for the long category labels. -->
<Story
	name="Horizontal Bar Chart"
	args={{
		title: 'Change in economic output by industry',
		subTitle: 'Percentage change in real GVA by industry in London 2019–2023',
		source: 'GLA Economics based on ONS – UK regional GVA and GDP data.',
		note: 'The following smaller industries have been excluded for simplification purposes; Primary sector and utilities, Public administration and defence, Other service activities, and Activities of households',
		dataset: 'gva_composition',
		options: barChartHorizontalOptions
	}}
/>

<!-- `chartType: 'barChartHorizontalGrouped'` draws a group of bars (one for each value of `b`) for each value of `xd`. -->
<Story
	name="Horizontal Grouped Bar Chart"
	args={{
		title: 'Job quality',
		subTitle: 'Average job quality indicator and components, percent share of employees, 2024',
		source: 'ONS Labour Force Survey and GLA Economics',
		note: undefined,
		dataset: 'jq_score',
		options: barChartHorizontalGroupedOptions
	}}
/>

<!-- `chartType: 'barChartVertical'` -->
<Story
	name="Vertical Bar Chart"
	args={{
		title: 'Unfair treatment',
		subTitle:
			'Proportion of Londoners treated unfairly in the last 12 months because of one or several protected characteristics or because of their social class',
		source:
			'<a href="https://data.london.gov.uk/dataset/survey-of-londoners-2021-22">GLA Survey of Londoners</a>',
		note: 'The Survey of London was last carried out in 2021/22.',
		dataset: 'unfair',
		options: barChartVerticalOptions
	}}
/>

<!-- `chartType: 'barChartVerticalGrouped'` draws a group of bars (one for each value of `b`) for each value of `xd`. -->
<Story
	name="Vertical Grouped Bar Chart"
	args={{
		title: 'High streets and town centres with increased visitor footfall',
		subTitle:
			'Percentage of high streets and town centres that saw an increase in footfall on the previous year, 2024-2025.',
		source: 'Aggregated and anonymised data by BT, via the High Streets Data Service',
		note: undefined,
		dataset: 'increased_footfall',
		options: barChartVerticalGroupedOptions
	}}
/>

<!-- `chartType: 'barChartStacked'` stacks the values of `b` within each bar, and facets by `z2` (ordered by `facetOrder`). -->
<Story
	name="Stacked Bar Chart"
	args={{
		title: 'Food security',
		subTitle: 'Percentage of households with low or very low levels of food security',
		source:
			'<a href="https://www.gov.uk/government/collections/family-resources-survey--2">DWP Family Resources Survey</a>',
		note: 'Low: Considered food insecure; quality, variety or desirability of good is reduced but quantity not substantially disrupted. Very Low: Considered food insecure; normal eating patterns disrupted and food intake reduced.',
		dataset: 'food_sec',
		options: barChartStackedOptions
	}}
/>

<!-- `chartType: 'barChartStackedTimeseries'` stacks the values of `b` in a bar for each date; `xInterval` sets the width of each bar. -->
<Story
	name="Stacked Bar Chart Timeseries"
	args={{
		title: 'Involuntary worklessness',
		subTitle: 'Share of 16-64 unemployed or inactive and would like to work',
		source: 'ONS Labour Force Survey',
		note: undefined,
		dataset: 'extended_unemployment',
		options: barChartStackedTimeseriesOptions
	}}
/>

<!-- `chartType: 'histogram'` bins the values of `y`; with `faceted: true`, there is a separate facet for each value of `b`. -->
<Story
	name="Histogram"
	args={{
		title: 'Vacancy rates for London high streets and town centres, 2025',
		subTitle: 'Distribution of vacancy rates for London high streets and town centres.',
		source: 'Data by LDC/Green Street, via the High Streets Data Service',
		note: undefined,
		dataset: 'vacancy_rate',
		options: histogramOptions
	}}
/>

<!-- `chartType: 'slopeChart'` -->
<Story
	name="Slope Chart"
	args={{
		title: 'Access to public open spaces',
		subTitle:
			'Percentage of residential addresses in London that fall within an Area of Deficiency in access to Public Open Space (AoDPOS)',
		source: 'Greenspace Information for Greater London CIC (GiGL)',
		note: undefined,
		dataset: 'aodpos',
		options: slopeChartOptions
	}}
/>

<!-- `chartType: 'incomeSlope'` -->
<Story
	name="Income Slope Chart"
	args={{
		title: 'Household income inequality',
		subTitle:
			'90:10 ratio of weekly equivalised household income after housing costs, London and the UK (2021/22 to 2023/24 average)',
		source: 'GLA analysis of DWP HBAI data',
		note: 'Incomes presented in 2023/24 prices',
		dataset: 'income_inequality',
		options: incomeSlopeOptions
	}}
/>

<!-- `chartType: 'boroughChoropleth'` joins the rows to the borough boundaries by matching `xd` to the borough name, and colours each borough by `y`. -->
<Story
	name="Borough Choropleth"
	args={{
		title: 'Adults classified as overweight or obese',
		subTitle:
			'Proportion of adults (aged 18+) with body mass index greater or equal to 25 kg/m<sup>2</sup> (using adjusted self-reported height and weight) by London borough, 2023/24',
		source:
			'<a href="https://fingertips.phe.org.uk/profile/obesity-physical-activity-nutrition/">Public health profiles</a>, OHID',
		note: 'Based on Active Lives Adult Survey, Sport England',
		dataset: 'overweight_percentage',
		options: boroughChoroplethOptions
	}}
/>

<!-- If `options.chartType` does not match a supported chart type, the chart is replaced by a message naming the unrecognised type (and an error is logged to the console). The message is shown even when `data` is present. -->
<Story name="Invalid Chart Type" args={{ options: invalidOptions, data: invalidChartData }} />
