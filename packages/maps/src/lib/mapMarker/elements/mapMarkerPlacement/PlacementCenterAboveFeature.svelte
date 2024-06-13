<script>
	import { getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';

	const feature = getContext('mapMarkerFeature');
	const maplibrePopup = getContext('mapMarkerMaplibrePopup');

	if (feature.geometry) {
		const point = pointOnFeature(feature);
		maplibrePopup.setLngLat(point.geometry.coordinates);
	}
</script>

<slot />
