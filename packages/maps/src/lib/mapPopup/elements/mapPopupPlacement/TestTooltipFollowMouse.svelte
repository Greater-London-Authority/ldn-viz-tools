<script>
	import MapPopupPlacement from './MapPopupPlacement.svelte';
</script>

<MapPopupPlacement placement="follow">
	<div class="bg-core-grey-900 p-4 w-fit text-white">Following mouse.</div>
</MapPopupPlacement>

<style>
	:global(.maplibregl-popup > *) {
		pointer-events: none;
		border-radius: 0;
		margin: 0;
		padding: 0;
	}

	:global(.maplibregl-popup-tip) {
		display: none;
	}
</style>
