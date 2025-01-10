<script>
	/**
	 * The `<MapLayerSourceGeoJSON>` component is a specialised
	 * `<MapLayerSource>` for local or remote GeoJSON data. The GeoJSON data is
	 * available and updatable by binding on the `dataStore` property.
	 *
	 * If `url` is set, result of a data fetch will be passed to the
	 * `onLoad` function, otherwise the value of `initialData` will be passed.
	 * @component
	 */

	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import MapLayerSource from '../../MapLayerSource.svelte';

	const mapStore = getContext('mapStore');

	/**
	 * A unique ID to reference the source in the map. Provided to slotted
	 * component as context via the key `mapLayerSourceId`.
	 */
	export let id;

	/**
	 * URL to fetch the GeoJSON from.
	 */
	export let url = '';

	/**
	 * Initial GeoJSON data. It will be overwritten by the results of a fetch
	 * via the provided url (if a url is provided).
	 */
	export let initialData = {
		type: 'FeatureCollection',
		features: []
	};

	/**
	 * A store holding the mapped GeoJSON data. The store is updated when updated
	 * via a remote source. The store is two-way so data pushed into the store
	 * is applied to the map.
	 */
	export const dataStore = writable(initialData);

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
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
	export let onUnload = null;

	/**
	 * Called when there is an error fetching the data or passing it to the map.
	 * The function accepts an error followed by an object with the following
	 * fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
	export let onError = null;

	let loaded = false;

	const internalLoad = (ctx) => {
		loaded = true;

		if (!url) {
			onLoad && onLoad({ ...ctx, geojson: initialData });
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
				dataStore.set(geojson);
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
		loaded = false;
		dataStore.set(null);

		if (onUnload) {
			onUnload(ctx);
		}
	};

	const updateData = (geojson) => {
		if (!loaded) {
			return;
		}

		$mapStore.getSource(id).setData(geojson);
	};

	$: updateData($dataStore);
</script>

<MapLayerSource
	{id}
	spec={{
		type: 'geojson',
		data: initialData
	}}
	onLoad={internalLoad}
	onUnload={internalUnload}
>
	<slot />
</MapLayerSource>
