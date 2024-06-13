<script>
	/**
	 * The `<MapLayerSource>` component is slotted within a `<Map>` component to
	 * specify a data source. The slot primarily accepts one or many
	 * `<MapLayerView>` instances to present the data.
	 *
	 * `<MapLayerSource>` can be used directly or wrapped by a decorator or
	 * adapter component for specific kinds of map sources, e.g.
	 * `<MapLayerSourceGeoJSON>`.
	 * @component
	 */

	import { onDestroy, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const mapStore = getContext('mapStore');

	/**
	 * A unique ID to reference the source in the map. Provided to slotted
	 * component as context via the key 'mapLayerSourceId'.
	 */
	export let id;

	/**
	 * A MapLibre source specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/sources/).
	 * Provided to slotted component as context via the key 'mapLayerSourceSpec'.
	 */
	export let spec;

	/**
	 * Called when the source is added to the map. The function accepts an
	 * object with the following fields:
	 * - id: ID of the layer source.
	 * - spec: MapLibre specification used to initialise the layer.
	 */
	export let onLoad = null;

	/**
	 * Called when the source is removed from the map. The function accepts an
	 * object with the following fields:
	 * - id: ID of the layer source.
	 * - spec: MapLibre specification used to initialise the layer.
	 */
	export let onUnload = null;

	const loaded = writable(false);
	let safeSpec = structuredClone(spec);
	spec.generateId = true;
	Object.freeze(safeSpec);

	setContext('mapLayerSourceId', id);
	setContext('mapLayerSourceSpec', safeSpec);
	setContext('mapLayerSourceLoaded', loaded);

	const doLoad = () => {
		loaded.set(false);
		removeSource();

		$mapStore.addSource(id, safeSpec);
		loaded.set(true);
		onLoad && onLoad({ id, spec: safeSpec });
	};

	const doUnload = () => {
		loaded.set(false);
		removeSource();
		onUnload && onUnload({ id, spec: safeSpec });
	};

	const removeSource = () => {
		if ($mapStore && $mapStore.getSource(id)) {
			removeLayers();
			$mapStore.removeSource(id);
		}
	};

	const removeLayers = () => {
		for (const layer of $mapStore.getStyle().layers) {
			if (layer.id.startsWith(id + '/')) {
				$mapStore.removeLayer(layer.id);
			}
		}
	};

	onDestroy(doUnload);

	$: if ($mapStore) {
		doLoad();
	}

	$: if ($loaded && !$mapStore) {
		doUnload();
	}
</script>

{#if $loaded}
	<slot />
{/if}
