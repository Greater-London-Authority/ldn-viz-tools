<script>
	/**
	 * The `<MapLayerSourceGeoJSON>` component wraps the `<MapLayerSource>`
	 * component and provides a simplified interface for direct or remote
	 * GeoJSON data.
	 *
	 * The raw GeoJSON is available by binding on the `geojsonStore` property and
	 * as an argument in the `onLoad` function.
	 * @component
	 */

	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import MapLayerSource from './MapLayerSource.svelte';

	const mapStore = getContext('mapStore');

	/**
	 * A unique ID to reference the source in the map. Provided to slotted
	 * component as context via the key 'mapLayerSourceId'.
	 */
	export let id;

	/**
	 * URL to fetch the GeoJSON from.
	 */
	export let url = '';

	/**
	 * GeoJSON data. This data is used as the initial GeoJSON. It will be
	 * overwritten by the results of a fetch via the provided url (if a url
	 * is provided).
	 */
	export let data = {
		type: 'FeatureCollection',
		features: []
	};

	/**
	 * A readonly store holding the raw GeoJSON data.
	 */
	export const geojsonStore = writable(data);

	/**
	 * Applies any transformations to the GeoJSON before it's added to the map.
	 */
	export let transform = (geojson) => geojson;

	/**
	 * Called when the source is added to the map. The raw geojson can be
	 * accessed within this callback.  The function accepts an object with the
	 * following fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 * - **geojson**: transformed GeoJSON data.
	 */
	export let onLoad = null;

	/**
	 * Called when the source is removed from the map. The function accepts an
	 * object with the following fields:
	 * - id: ID of the layer source.
	 * - spec: MapLibre specification used to initialise the layer.
	 */
	export let onUnload = null;

	/**
	 * Called when there is an error fetching the data or passing it to the map.
	 * The function accepts an errors followed by an object with the following
	 * fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
	export let onError = null;

	const internalLoad = (ctx) => {
		if (!url) {
			onLoad && onLoad({ ...ctx, geojson: data });
			return;
		}

		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				if (json.error) {
					throw json.error;
				}
				return json;
			})
			.then((geojson) => {
				return transform ? transform(geojson) : geojson;
			})
			.then((geojson) => {
				$mapStore.getSource(id).setData(geojson);
				geojsonStore.set(geojson);
				return geojson;
			})
			.then((geojson) => {
				onLoad && onLoad({ ...ctx, geojson });
				return geojson;
			})
			.catch((err) => {
				if (onError) {
					onError(err, ctx);
				} else {
					console.error(err);
				}
			});
	};

	const internalUnload = (ctx) => {
		geojsonStore.set(null);
		if (onUnload) {
			onUnload(ctx);
		}
	};
</script>

<MapLayerSource
	{id}
	spec={{
		type: 'geojson',
		data
	}}
	onLoad={internalLoad}
	onUnload={internalUnload}
>
	<slot />
</MapLayerSource>
