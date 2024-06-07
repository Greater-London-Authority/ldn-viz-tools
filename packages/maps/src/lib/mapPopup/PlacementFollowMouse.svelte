<script>
	import { getContext, onDestroy } from 'svelte';

	const mapStore = getContext('mapStore');
	const feature = getContext('feature');
	const mapTooltip = getContext('mapTooltip');
	const mapMarker = getContext('mapMarker');

	const updatePosition = (event) => {
		mapTooltip?.setLngLat(event.lngLat);
		mapMarker?.setLngLat(event.lngLat);
	};

	if (feature.geometry) {
		$mapStore.on('mousemove', feature.layer.id, updatePosition);
	}

	onDestroy(() => {
		$mapStore?.off('mousemove', feature.layer.id, updatePosition);
	});
</script>

<slot />
