<script lang="ts">
	import { ChartContainer } from '@ldn-viz/charts';
	import { ColorLegend, NonIdealState } from '@ldn-viz/ui';
	import rewind from '@turf/rewind';
	import { format } from 'd3-format';
	import { geoCentroid, geoMercator, geoPath } from 'd3-geo';

	import type { Feature, FeatureCollection } from 'geojson';

	import boroughs from './boroughs_simplified.json' with { type: 'json' };

	type ChoroplethPlotProps = {
		title: string;
		subtitle: string;
		source: string;
		byline: string;
		note?: string;
		alt?: string;

		areaNameField: string;
		valueField: string;

		data: Data;
		colorScale: any;
		ytickformat: string;
		ytickformatValue: string;
		id: string;

		columnMapping?: undefined | { [oldName: string]: string };
	};

	let {
		title,
		subtitle,
		source,
		byline,
		note,
		alt,

		areaNameField = 'xd',
		valueField = 'y',

		data,
		colorScale,
		ytickformat,
		ytickformatValue,
		id,
		columnMapping
	}: ChoroplethPlotProps = $props();
</script>

<ChartContainer
	{data}
	{title}
	subTitle={subtitle}
	{source}
	{byline}
	{note}
	dataDownloadButton={true}
	imageDownloadButton
	chartHeight="h-fit"
	{id}
	{columnMapping}
	filename={id}
	{alt}
>
	<!--
	<NonIdealState>
		{#snippet icon()}{/snippet}

		{#snippet title()}
			Data not yet available.
		{/snippet}

		The data for this chart will be added in a future update.
	</NonIdealState>
-->
	<svg width="100%" viewBox="0 0 690 170" role="img" xmlns="http://www.w3.org/2000/svg" style="">
		<rect
			x="0"
			y="0"
			width="680"
			height="160"
			rx="0"
			class="fill-color-surface-neutral-muted stroke-color-border-muted text-color-text-muted"
			style="fill: rgb(240, 241, 242); stroke: rgb(214, 216, 218);"
		/>
		<text
			x="340"
			y="66"
			text-anchor="middle"
			font-size="18px"
			font-weight="bold"
			class="fill-color-text-muted"
			style={'fill: rgb(95, 102, 107); font-family: Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"'}
			>Data not yet available.</text
		>
		<text
			x="340"
			y="94"
			text-anchor="middle"
			class="fill-color-text-muted"
			style={'fill: rgb(95, 102, 107); font-family: Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;"'}
			>The data for this chart will be added in a future update.</text
		>
	</svg>
</ChartContainer>
