<script>
	import MapMarkerPlacement from './MapMarkerPlacement.svelte';
</script>

<MapMarkerPlacement placement="center">
	<div class="w-fit border border-color-border-muted bg-color-container p-4 text-color-text shadow">
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
