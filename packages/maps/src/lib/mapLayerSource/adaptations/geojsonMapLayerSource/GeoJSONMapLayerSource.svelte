<script lang="ts">
	/**
	 * The `<MapLayerSourceGeoJSON>` component is a specialised
	 * `<MapLayerSource>` for local or remote GeoJSON data.
	 *
	 * If `url` is set, result of a data fetch will be passed to the
	 * `onLoad` function, otherwise the value of `initialData` will be passed.
	 * @component
	 */

	import { getContext, onMount } from 'svelte';
	import { type Writable, writable } from 'svelte/store';
	import MapLayerSource from '../../MapLayerSource.svelte';

	const mapStore = getContext('mapStore');

	interface Props {
		/**
		 * A unique ID to reference the source in the map. Provided to slotted
		 * component as context via the key `mapLayerSourceId`.
		 */
		id: any;
		/**
		 * URL to fetch the GeoJSON from.
		 */
		url?: string;
		/**
		 * Initial GeoJSON data. It will be overwritten by the results of a fetch
		 * via the provided url (if a url is provided).
		 */
		initialData?: any;

		/**
		 * Applies any transformations to the GeoJSON before it's added to the map.
		 */
		transform?: any;
		/**
		 * Called when the source is added to the map. The raw geojson can be
		 * accessed within this callback.  The function accepts an object with the
		 * following fields:
		 * - **id**: ID of the layer source.
		 * - **spec**: MapLibre specification used to initialise the layer.
		 * - **geojson**: transformed GeoJSON data.
		 */
		onLoad?: any;
		/**
		 * Called when the source is removed from the map. The function accepts an
		 * object with the following fields:
		 * - **id**: ID of the layer source.
		 * - **spec**: MapLibre specification used to initialise the layer.
		 */
		onUnload?: any;
		/**
		 * Called when there is an error fetching the data or passing it to the map.
		 * The function accepts an error followed by an object with the following
		 * fields:
		 * - **id**: ID of the layer source.
		 * - **spec**: MapLibre specification used to initialise the layer.
		 */
		onError?: any;
		children?: import('svelte').Snippet;
	}

	let {
		id,
		url = '',
		initialData = {
			type: 'FeatureCollection',
			features: []
		},
		transform = (geojson) => geojson,
		onLoad = null,
		onUnload = null,
		onError = null,
		children
	}: Props = $props();

	const dataStore = writable(initialData);
	let loaded = false;

	/*
	onMount( () => {
		if (!$dataStore && initialData.features.length > 0){
			$dataStore = initialData;
		}
	})
	 */

	$effect(() => {
		$dataStore = initialData;
	});

	const internalLoad = (ctx) => {
		loaded = true;

		if (!url) {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

	$effect(() => {
		updateData($dataStore);
	});
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
	{@render children?.()}
</MapLayerSource>
