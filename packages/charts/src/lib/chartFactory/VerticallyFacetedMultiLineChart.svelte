<script lang="ts">
	import { ChartContainer, ObservablePlotInner } from '@ldn-viz/charts';
	import { NonIdealState } from '@ldn-viz/ui';

	import { chartOptions } from '$lib/components/charts/chartOptions';
	import { getColorScale, loadChartData, type ChartDataRow } from '$lib/components/charts/utils';
	import { getColumnMapping } from '$lib/utils';
	import { chartFns } from './chartTypes';
	import { getDescription } from './descriptions';

	type ChartProps = {
		title: string;
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

	let facetVals = $derived(
		options.facetOrder ?? [
			...new Set(data.map((d) => d.z2).filter((v): v is string => typeof v === 'string'))
		]
	);

	const colorChoice = $derived(getColorScale(data));

	let width = $state(0);

	let spec = $derived.by(() => (facetVal: string) => {
		const filteredData = data.filter((d) => d.z2 === facetVal);

		const chartFn = chartFns[options.chartType];

		let baseSpec = chartFn(options, filteredData, colorChoice, width);

		return baseSpec ? { ...baseSpec, title: facetVal } : baseSpec;
	});

	let columnMapping = $derived(getColumnMapping(dataset));
	let description = $derived(
		getDescription(options, data, colorChoice) + '' //` The chart has separate facets for ${joinUnique(data.map((d) => d.z2))}.`
	);
</script>

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
