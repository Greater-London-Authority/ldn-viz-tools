<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import AxisX from '../shared/AxisX.svelte';
	import AxisY from '../shared/AxisY.svelte';
	import Scatter from '../shared/Scatter.svelte';

	export let data: { [key: string]: any }[];
	export let title: string | null = null;
	export let subTitle: string | null = null;
	export let alt: string | null = null;
	export let footer = false;
	export let exportBtns = false;
	export let x = 'x';
	export let y = 'y';
	export let xDomain: any[] = [0, null];
	export let yDomain: any[] = [0, null];
	export let yScale: ((x: any) => number | undefined) | undefined = undefined;

	export let xAxis: { [key: string]: any } = { display: true };
	export let yAxis: { [key: string]: any } = { display: true };
	export let markOptions: { [key: string]: any } = {};

	// all other layercake props accepted with ...$$restProps rtm
	let padding = { left: 50, bottom: 0 };
</script>

<ChartContainer {data} {title} {subTitle} {alt} {footer} {exportBtns} {...$$restProps}>
	<LayerCake
		{data}
		{x}
		{y}
		{yScale}
		{xDomain}
		{yDomain}
		{padding}
		{...$$restProps}
		let:aspectRatio
		let:containerHeight
		let:containerWidth
		let:height
		let:width
		let:element
	>
		<Svg>
			<!--	<slot {aspectRatio} {containerHeight} {containerWidth} {height} {width} {element} />  -->

			{#if xAxis.display != false}
				<AxisX {...xAxis} />
			{/if}
			{#if yAxis.display != false}
				<AxisY {...yAxis} />
			{/if}
			<Scatter {...markOptions} />
		</Svg>
	</LayerCake>
</ChartContainer>
