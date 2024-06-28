<script lang="ts">
	/**
	 * The `ScatterPlot` component renders a scatterplot using the [Layercake](https://layercake.graphics/) library.
	 * @component
	 */

	import { LayerCake, Svg } from 'layercake';
	import ChartContainer from '../chartContainer/ChartContainer.svelte';
	import AxisX from '../shared/AxisX.svelte';
	import AxisY from '../shared/AxisY.svelte';
	import Scatter from '../shared/Scatter.svelte';

	/**
	 * Data being visualized (as an array of objects).
	 */
	export let data: { [key: string]: any }[];

	/**
	 * Title that is displayed in large text above the plot.
	 */
	export let title = '';

	/**
	 * Subtitle that is displayed below the title, but above the plot.
	 */
	export let subTitle = '';

	/**
	 * Alt-text for the plot.
	 */
	export let alt = '';

	/**
	 * Object specifying what appears in the footer:
	 *
	 * * `byline` (string) - statement of who created the visualization
	 * * `source` (string) - statement of where the data came from
	 * * `note` (string) - any additional footnotes
	 * * `exportBtns` (boolean) - if `false`, then data/image download buttons will be hidden
	 */
	export let footer:
		| {
				byline?: string | undefined;
				source?: string | undefined;
				note?: string | undefined;
				exportBtns: boolean;
		  }
		| undefined = undefined;

	/**
	 * Name of field on data objects containing the value to be encoded on the x-axis.
	 */
	export let x = 'x';

	/**
	 * Name of field on data objects containing the value to be encoded on the y-axis.
	 */
	export let y = 'y';

	/**
	 * Domain for x-axis ([minValue, maxValue]).
	 */
	export let xDomain: any[] = [0, null];

	/**
	 * Domain for y-axis ([minValue, maxValue]).
	 */
	export let yDomain: any[] = [0, null];

	/**
	 * A D3 scale object to use as the y scale.
	 */
	export let yScale: ((x: any) => number | undefined) | undefined = undefined;

	/**
	 * Options for the x-axis.
	 */
	export let xAxis: { [key: string]: any } = { display: true };

	/**
	 * Options for the y-axis.
	 */
	export let yAxis: { [key: string]: any } = { display: true };
	export let markOptions: { [key: string]: any } = {};

	// all other layercake props accepted with ...$$restProps rtm
	let padding = { left: 50, bottom: 0 };
</script>

<ChartContainer {data} {title} {subTitle} {alt} {footer} {...$$restProps}>
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
