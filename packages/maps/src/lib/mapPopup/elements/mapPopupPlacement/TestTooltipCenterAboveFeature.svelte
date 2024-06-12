<script>
	import MapPopupPlacement from './MapPopupPlacement.svelte';
</script>

<MapPopupPlacement placement="center">
	<div class="bg-core-grey-800 p-4 w-fit text-white text-center">
		Centered above feature centre point.
	</div>
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
