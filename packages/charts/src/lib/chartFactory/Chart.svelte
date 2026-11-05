<script lang="ts">
	import { ColorLegend, NonIdealState, theme } from '@ldn-viz/ui';
	import { scaleThreshold } from 'd3-scale';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import ObservablePlot from '../observablePlot/ObservablePlot.svelte';

	import { chartFns } from './chartTypes/index';

	import type { Snippet } from 'svelte';
	import type { ChartDataRow, ChartGenerator, ChartOptions } from './chartOptions';
	import { getDescription } from './descriptions';
	import { getColorScale } from './utils';

	type ChartProps = {
		/**
		 * Title that is displayed in large text above the plot.
		 */
		title: string;

		/**
		 * Subtitle that is displayed below the title, but above the plot.
		 */
		subTitle?: string;

		/**
		 * What appears in the footer:
		 *
		 * * `byline` (string) - statement of who created the visualization
		 * * `source` (string) - statement of where the data came from
		 * * `note` (string) - any additional footnotes
		 */
		source?: string;
		byline?: string;
		note?: string;

		/**
		 * Data being visualized (as an array of objects); also used by the data download button.
		 */
		data: ChartDataRow[];

		/**
		 * Identifier for the dataset. Used as the `id` attribute of the chart and as the file name for downloaded data or image files.
		 */
		dataset: string;

		/**
		 * An optional object defining a mapping from the names of attributes in the `data` prop to the names of columns in the downloaded file.
		 */
		columnMapping?: Record<string, string>;

		/**
		 * Options that determine the chart type, the structure of the data, and how the chart is styled.
		 */
		options: ChartOptions;

		/**
		 * Snippet rendering controls (e.g. inputs for filtering the data), passed through to the `ChartContainer`.
		 */
		controls?: Snippet;

		/**
		 * Data Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'CSV' or 'JSON' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'CSV', or 'JSON'
		 *
		 */
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];

		/**
		 * Image Download Button in the footer
		 *
		 * Defaults to true which allows user to select download in either 'PNG' or 'SVG' format.
		 * Set to false to hide completely.
		 * Supply a custom list of formats as an array of strings. Current options either 'PNG', or 'SVG'
		 *
		 */
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

	let colorChoice = $derived.by(() => {
		const themeSpecificColor =
			theme.currentMode === 'light' ? options?.colorScaleLight : options?.colorScaleDark;
		return themeSpecificColor ?? options?.colorScale ?? getColorScale(data);
	});

	let chartFn = $derived.by((): ChartGenerator | undefined => {
		const fn = chartFns[options.chartType];
		if (!fn) {
			console.error('No chart generator function found for chart of type:', options.chartType);
		}
		return fn;
	});

	let spec = $derived.by(() => {
		// wait until the container has been measured, rather than building a spec for zero width
		if (!chartFn || width === 0) return null;

		const sortedData = ['line', 'lineChartWithLineStyles', 'lineChartWithForecast'].includes(
			options.chartType
		)
			? sortByField(data, 'xd')
			: data;
		return chartFn(options, sortedData, colorChoice, width); // N.B. width is only used by line chart
	});

	let description = $derived(getDescription(options, data, colorChoice));

	let colorScale = $derived(
		options.chartType === 'choropleth'
			? scaleThreshold()
					.domain(options.colorScale?.domain ?? [0])
					.range(
						theme.currentMode === 'light'
							? (options.colorScaleLight?.range ?? options.colorScale?.range ?? [0])
							: (options.colorScaleDark?.range ?? options.colorScale?.range ?? [0])
					)
			: undefined
	);
</script>

{#if chartFn && data.length > 0}
	<div class="w-full py-8" bind:clientWidth={width}>
		{#snippet plotControls()}
			{@render controls?.()}
			{#if options.chartType === 'choropleth'}
				<div class="w-80">
					<ColorLegend color={colorScale} tickFormat={options.ytickformat} />
				</div>
			{/if}
		{/snippet}

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
			controls={plotControls}
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
		{#if !chartFn}
			<NonIdealState>
				{#snippet title()}Chart could not be displayed{/snippet}
				Unknown chart type "{options.chartType}".
			</NonIdealState>
		{:else}
			<NonIdealState>Data is loading.</NonIdealState>
		{/if}
	</ChartContainer>
{/if}
