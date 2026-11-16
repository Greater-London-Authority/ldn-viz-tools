<script lang="ts">
	import { getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';
	import type { MapGeoJSONFeature, Popup } from 'maplibre-gl';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const feature: MapGeoJSONFeature = getContext('mapMarkerFeature');
	const maplibrePopup: Popup = getContext('mapMarkerMaplibrePopup');

	if (feature.geometry) {
		const point = pointOnFeature(feature);
		maplibrePopup.setLngLat(point.geometry.coordinates as [number, number]);
	}
</script>

{@render children?.()}
