<script>
	import { getContext, onDestroy } from 'svelte';

	const mapStore = getContext('mapStore');
	const feature = getContext('mapMarkerFeature');
	const maplibrePopup = getContext('mapMarkerMaplibrePopup');

	const updatePosition = (event) => {
		maplibrePopup.setLngLat(event.lngLat);
	};

	if (feature.geometry) {
		$mapStore.on('mousemove', feature.layer.id, updatePosition);
	}

	onDestroy(() => {
		$mapStore?.off('mousemove', feature.layer.id, updatePosition);
	});
</script>

<slot />
