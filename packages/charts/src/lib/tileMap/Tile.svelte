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
</script>

<div style="overflow-y: auto; margin-bottom: 0;margin-top: auto">
	<h3 class="text-lg font-bold">{label}</h3>
	<ObservablePlotInner {data} spec={specFn(data, contextData)} />
</div>
