<script>
	import MapPopupTooltip from './elements/mapPopupTooltip/MapPopupTooltip.svelte';
</script>

<MapPopupTooltip>Tooltip content.</MapPopupTooltip>

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
