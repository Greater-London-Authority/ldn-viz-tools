<script lang="ts">
	export let data: { [key: string]: any };
	export let xKey: string = 'x';
	export let yKey: string = 'y';
	export let xScale: any;
	export let yScale: any;

	$: console.log(xScale(data.value));
</script>

<div
	class="tooltip"
	style="position: absolute;
      top: {yScale(data[yKey])}px;
      left: {xScale(data[xKey])}px"
>
	<h1>{data[xKey]}</h1>
	<p>{data[yKey]}</p>
</div>

<style>
	.tooltip {
		@apply p-2 bg-white rounded-sm shadow-sm shadow-core-grey-500;
		@apply transition-all ease-in duration-300 pointer-events-none;
	}

	h1 {
		font-weight: 700;
		margin-bottom: 0.25rem;
	}
</style>
