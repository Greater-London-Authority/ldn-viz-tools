<script>
	import { getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';

	const feature = getContext('mapPopupFeature');
	const mapTooltip = getContext('mapPopupTooltip');
	const mapMarker = getContext('mapPopupMarker');

	if (feature.geometry) {
		const point = pointOnFeature(feature);
		mapTooltip?.setLngLat(point.geometry.coordinates);
		mapMarker?.setLngLat(point.geometry.coordinates);
	}
</script>

<slot />
