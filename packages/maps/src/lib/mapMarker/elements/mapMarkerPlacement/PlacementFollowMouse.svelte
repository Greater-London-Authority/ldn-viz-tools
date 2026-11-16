<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { MapGeoJSONFeature, MapLayerMouseEvent, Popup } from 'maplibre-gl';
	import type { MapLibreStore } from '../../../map/types';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');
	const feature: MapGeoJSONFeature = getContext('mapMarkerFeature');
	const maplibrePopup: Popup = getContext('mapMarkerMaplibrePopup');

	const updatePosition = (event: MapLayerMouseEvent) => {
		maplibrePopup.setLngLat(event.lngLat);
	};

	if (feature.geometry) {
		$mapStore!.on('mousemove', feature.layer.id, updatePosition);
	}

	onDestroy(() => {
		$mapStore?.off('mousemove', feature.layer.id, updatePosition);
	});
</script>

{@render children?.()}
