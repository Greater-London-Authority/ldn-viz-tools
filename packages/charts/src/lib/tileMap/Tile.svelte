<script lang="ts">
	import ObservablePlotInner from '../observablePlot/ObservablePlotInner.svelte';

	/**
	 * Data for this specific tile.
	 */
	export let data;

	/**
	 * Contextual data that can be used as a comparison in each tile.
	 */
	export let contextData;

	/**
	 * Function which receives the `data` and `contextData` as arguments, and returns an Observable Plot spec.
	 */
	export let specFn;

	/**
	 * Label to be displayed at the top of each tile.
	 */
	export let label = '';

	/**
	 * Function that will be called (passing the geography id as an argument) when the user clicks on a tile.
	 */
	export let onClick = () => undefined;
</script>

<div style="margin-top: auto;" class="overflow-y-auto mb-0 ml-2 mr-2" on:click={onClick}>
	<h3 class="text-lg font-bold">{label}</h3>
	<ObservablePlotInner {data} spec={specFn(data, contextData)} />
</div>
