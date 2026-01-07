<script>
	import MapMarkerPlacement from './MapMarkerPlacement.svelte';
</script>

<MapMarkerPlacement placement="follow">
	<div
		class="w-fit border border-color-ui-border-secondary bg-color-container-level-0 p-4 text-color-text-primary shadow"
	>
		Following mouse.
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
