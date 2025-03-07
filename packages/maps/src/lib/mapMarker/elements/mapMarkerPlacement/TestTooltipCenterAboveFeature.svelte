<script>
	import MapMarkerPlacement from './MapMarkerPlacement.svelte';
</script>

<MapMarkerPlacement placement="center">
	<div
		class="bg-color-container-level-1 p-4 w-fit text-color-text-primary shadow border border-color-ui-border-secondary"
	>
		Centered above feature.
	</div>
</MapMarkerPlacement>

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
