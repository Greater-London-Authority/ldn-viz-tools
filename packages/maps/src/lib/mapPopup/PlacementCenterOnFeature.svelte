<script>
	import { getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';

	const feature = getContext('feature');
	const mapTooltip = getContext('mapTooltip');
	const mapMarker = getContext('mapMarker');

	if (feature.geometry) {
		const point = pointOnFeature(feature);
		mapTooltip?.setLngLat(point.geometry.coordinates);
		mapMarker?.setLngLat(point.geometry.coordinates);
	}
</script>

<slot />
