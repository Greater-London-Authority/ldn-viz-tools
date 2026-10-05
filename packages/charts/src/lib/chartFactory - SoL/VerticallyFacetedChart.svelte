<script lang="ts">
	import { ChartContainer, ObservablePlotInner } from '@ldn-viz/charts';
	import { NonIdealState } from '@ldn-viz/ui';

	import { chartOptions } from '$lib/components/charts/chartOptions';
	import { chartFns } from './chartTypes/index';

	import { getColorScale, loadChartData, type ChartDataRow } from '$lib/components/charts/utils';
	import { getColumnMapping } from '$lib/utils';
	import { getDescription, joinUnique } from './descriptions';

	type ChartProps = {
		title: string;

		/**
		 * N.B. this prop name is lowercase as all YAML keys are converted to lowercase by our pipeline
		 */
		subtitle?: string;
		source?: string;
		byline?: string;
		lloindicator?: string;
		note?: string;

		dataset: string;
	};

	let { title, subtitle, source, byline, dataset, lloindicator, note }: ChartProps = $props();

	let lloLabel = $derived(
		lloindicator === 'core'
			? 'Core LLO Indicator'
			: lloindicator
				? 'Supplementary LLO Indicator'
				: undefined
	);

	let combinedNote = $derived([lloLabel, note].filter(Boolean).join(' | '));

	let options = $derived(chartOptions[dataset]);

	// fetch data
	let data = $state<ChartDataRow[]>([]);
	$effect(() => {
		let cancelled = false;
		loadChartData(dataset, options).then((newData) => {
			if (!cancelled) {
				data = newData;
			}
		});
		return () => {
			cancelled = true;
		};
	});

	let facetVals = $derived(options.facetOrder ?? [...new Set(data.map((d) => d.b))]);

	let width = $state(0);

	let colorChoice = $derived(getColorScale(data));

	let spec = $derived.by(() => (facetVal: string) => {
		const filteredDate = data.filter((d) => d.b === facetVal);

		// filter the colors, so each facet only includes legend for corresponding color
		const colorChoiceFacet =
			colorChoice.domain && colorChoice.range
				? {
						domain: [facetVal],
						range: [colorChoice.range[colorChoice.domain.indexOf(facetVal)] ?? colorChoice.range[0]]
					}
				: {};

		const chartFn = chartFns[options.chartType];
		return chartFn(options, filteredDate, colorChoiceFacet, width);
	});

	let columnMapping = $derived(getColumnMapping(dataset));
	let description = $derived(
		getDescription(options, data, colorChoice) +
			(data.map((d) => d.z2).some((d) => !!d)
				? ` The chart has separate facets for ${joinUnique(data.map((d) => d.z2))}.`
				: '')
	);
</script>

<!--
<pre>{JSON.stringify(options, null, 2)}</pre>
-->

{#if spec && data.length > 0}
	<div class="w-full py-typography-spacing-3xl" bind:clientWidth={width}>
		<ChartContainer
			{data}
			{title}
			subTitle={subtitle}
			{source}
			{byline}
			note={combinedNote}
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
		subTitle={subtitle}
		{source}
		{byline}
		{note}
		id={dataset}
		{columnMapping}
		filename={dataset}
	>
		<NonIdealState>Data is loading.</NonIdealState>
	</ChartContainer>
{/if}
