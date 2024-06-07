<script lang="ts">
	/**
	 * The `<ClusterExpansionHandler>` component adds cluster layer expansion
	 * capability on mouse click. It must only be used with cluster layers and
	 * slotted into a `<MapLyer>`.
	 * @component
	 */

	import { getContext } from 'svelte';
	import { GLIDE_ANIMATION_OPTIONS } from '@ldn-viz/maps';
	import MapCursorEvent from './MapCursorEvent.svelte';
	import type { MapStore, MapLibre, MapCursorFeatureHandler } from '../map';
	import maplibre_gl from 'maplibre-gl';

	const mapStore: MapStore = getContext('mapStore');
	const ctxLayerId: undefined | string = getContext('mapLayerId');

	interface ExpandClusterEventFeature {
		layer: {
			id: string;
			source: string;
		};
		properties: {
			cluster_id: string;
		};
		geometry: {
			coordinates: [number, number];
		};
	}

	const getMap = () => $mapStore as MapLibre;
	const getGeoJSONSource = (id: string) => getMap().getSource(id) as maplibre_gl.GeoJSONSource;

	/**
	 * ID of the target layer. Defaults to using the value of 'mapLayerId'
	 * context if it exists.
	 */
	export let layerId = ctxLayerId;

	const enterTopFeature: MapCursorFeatureHandler = () => {
		getMap().getCanvas().style.cursor = 'pointer';
	};

	const leaveTopFeature: MapCursorFeatureHandler = () => {
		getMap().getCanvas().style.cursor = '';
	};

	const clickFeature: MapCursorFeatureHandler = (event, { feature }) => {
		const f = feature as ExpandClusterEventFeature;
		const clusterId = parseInt(f.properties.cluster_id);

		getGeoJSONSource(f.layer.source)
			.getClusterExpansionZoom(clusterId)
			.then((zoom: number) =>
				getMap().easeTo({
					...GLIDE_ANIMATION_OPTIONS,
					center: f.geometry.coordinates,
					zoom
				})
			);
	};
</script>

<MapCursorEvent {layerId} {clickFeature} {enterTopFeature} {leaveTopFeature}>
	<slot />
</MapCursorEvent>
