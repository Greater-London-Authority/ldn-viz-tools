<script lang="ts">
	import { ChartContainer, ObservablePlot } from '@ldn-viz/charts';
	import { NonIdealState, theme } from '@ldn-viz/ui';

	import { chartFns } from './chartTypes/index';

	import type { Snippet } from 'svelte';
	import type { ChartDataRow, ChartOptions } from './chartOptions';
	import { getColorScale } from './utils';

	type ChartProps = {
		title: string;

		subTitle?: string;
		source?: string;
		byline?: string;
		note?: string;

		data?: ChartDataRow[];

		dataset: string;

		columnMapping?: Record<string, string>;

		options: ChartOptions;

		controls?: Snippet;
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
	};

	let {
		title,
		subTitle,
		source,
		byline,
		dataset,
		data = [],
		columnMapping,
		note,
		options,
		controls,
		dataDownloadButton,
		imageDownloadButton
	}: ChartProps = $props();

	const sortByField = (data: ChartDataRow[], fieldName: string) => {
		// sort, placing undefined vals at end
		return [...data].sort((a, b) => {
			if (a[fieldName] == null && b[fieldName] == null) return 0;
			if (a[fieldName] == null) return 1;
			if (b[fieldName] == null) return -1;
			if (a[fieldName] < b[fieldName]) return -1;
			if (a[fieldName] > b[fieldName]) return 1;
			return 0;
		});
	};

	// this is from population projection explorer
	/*
	 	const mapProjectedTrendLabels = (data: ChartDataRow[]) => data.map((row) => {
		if (row.b === '5-year trend') return { ...row, b: 'Low' };
		if (row.b === '10-year trend') return { ...row, b: 'Central' };
		if (row.b === '15-year trend') return { ...row, b: 'High' };
		return row;
	});

	const sortBySeriesThenX = (data) => sortChartData(data as ChartDataRow[], 'xd', 'b');

	 */

	let width = $state(0);

	// let colorChoice = $derived(options.colorScale ?? getColorScale(data));
	let colorChoice = $derived.by(() => {
		const themeSpecificColor =
			theme.currentMode === 'light' ? options?.colorScaleLight : options?.colorScaleDark;
		return themeSpecificColor ?? options?.colorScale ?? getColorScale(data);
	});

	let spec = $derived.by(() => {
		const chartFn = chartFns[options.chartType];

		if (!chartFn) {
			console.error('No chart generator function found for chart of type:', options.chartType);
			return {};
		}

		const sortedData = ['line', 'lineChartWithLineStyles'].includes(options.chartType)
			? sortByField(data, 'xd')
			: data;
		return chartFn(options, sortedData, colorChoice, width); // N.B. width is only used by line chart
	});

	let description = ''; // $derived(getDescription(options, data, colorChoice));

	let isMapChoropleth = $derived(
		options?.chartType === 'boroughChoropleth' || options?.chartType === 'wardChoropleth'
	);
</script>

{#if spec && data.length > 0}
	<div
		class="py-typography-spacing-3xl w-full"
		class:map-legend-rotated={isMapChoropleth}
		bind:clientWidth={width}
	>
		<ObservablePlot
			{data}
			{spec}
			{title}
			{subTitle}
			{source}
			{byline}
			{dataDownloadButton}
			{imageDownloadButton}
			{note}
			id={dataset}
			{columnMapping}
			filename={dataset}
			alt={description}
			{controls}
		/>
	</div>
{:else}
	<ChartContainer
		{data}
		{title}
		subtitle={subTitle}
		{source}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		{note}
		id={dataset}
		{columnMapping}
		filename={dataset}
		{controls}
	>
		<NonIdealState>Data is loading.</NonIdealState>
	</ChartContainer>
{/if}
