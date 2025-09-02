<script lang="ts">
	import { getContext } from 'svelte';
	import { pointOnFeature } from '@turf/turf';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const feature = getContext('mapMarkerFeature');
	const maplibrePopup = getContext('mapMarkerMaplibrePopup');

	if (feature.geometry) {
		const point = pointOnFeature(feature);
		maplibrePopup.setLngLat(point.geometry.coordinates);
	}
</script>

{@render children?.()}
