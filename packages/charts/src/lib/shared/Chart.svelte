<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	export let padding;

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

			<slot {...markOptions} />
		</Svg>
	</LayerCake>
</ChartContainer>
