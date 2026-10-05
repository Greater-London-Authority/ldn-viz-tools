<script lang="ts">
	import { ChartContainer, ObservablePlotInner } from '@ldn-viz/charts';
	import { NonIdealState, theme } from '@ldn-viz/ui';

	import { type ChartDataRow, type ChartOptions } from './chartOptions';
	import { chartFns } from './chartTypes';
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
	};

	let { title, subTitle, source, byline, dataset, data, note, columnMapping, options }: ChartProps =
		$props();

	let facetVals = $derived(
		options.facetOrder ?? [
			...new Set(data.map((d) => d.z2).filter((v): v is string => typeof v === 'string'))
		]
	);

	let colorChoice = $derived.by(() => {
		const themeSpecificColor =
			theme.currentMode === 'light' ? options?.colorScaleLight : options?.colorScaleDark;
		return themeSpecificColor ?? options?.colorScale ?? getColorScale(data);
	});

	let width = $state(0);

	let chartFn = $derived.by(() => {
		const fn = chartFns[options.chartType];
		if (!fn) {
			console.error('No chart generator function found for chart of type:', options.chartType);
		}
		return fn;
	});

	let spec = $derived.by(() => {
		if (!chartFn) return null;

		return (facetVal: string) => {
			const filteredData = data.filter((d) => d.z2 === facetVal);

			let baseSpec = chartFn(options, filteredData, colorChoice, width);

			return baseSpec ? { ...baseSpec, title: facetVal } : baseSpec;
		};
	});

	let description = $derived(
		getDescription(options, data, colorChoice) + '' //` The chart has separate facets for ${joinUnique(data.map((d) => d.z2))}.`
	);
</script>

{#if spec && data.length > 0}
	<div class="py-typography-spacing-3xl w-full" bind:clientWidth={width}>
		<ChartContainer
			{data}
			{title}
			subtitle={subTitle}
			{source}
			{byline}
			{note}
			dataDownloadButton={true}
			imageDownloadButton
			chartHeight="h-fit"
			id={dataset}
			{columnMapping}
			alt={description}
		>
			{#each facetVals as facetVal}
				<ObservablePlotInner id={`${dataset}-${facetVal}`} {data} spec={spec(facetVal)} />
			{/each}
		</ChartContainer>
	</div>
{:else}
	<ChartContainer
		{data}
		{title}
		subtitle={subTitle}
		{source}
		{byline}
		{note}
		id={dataset}
		{columnMapping}
		filename={dataset}
	>
		{#if !spec}
			<NonIdealState>
				{#snippet title()}Chart could not be displayed{/snippet}
				Unknown chart type "{options.chartType}".
			</NonIdealState>
		{:else}
			<NonIdealState>Data is loading.</NonIdealState>
		{/if}
	</ChartContainer>
{/if}
