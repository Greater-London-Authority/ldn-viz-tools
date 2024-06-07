<script>
	/**
	 * The `<MapSource>` component is slotted within a `<Map>` component to
	 * specify a data source. The slot primarily accepts one or many `<MapLayer>`
	 * instances to present the data.
	 *
	 * `<MapSource>` can be used directly or wrapped by a decorator or adapter
	 * component for specific kinds of map sources, e.g. GeoJSON.
	 * @component
	 */

	import { onDestroy, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const mapStore = getContext('mapStore');

	/**
	 * A unique ID to reference the source in the map. Provided to slotted
	 * component as context via the key 'mapSourceId'.
	 */
	export let id;

	/**
	 * A MapLibre source specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/sources/).
	 * Provided to slotted component as context via the key 'mapSourceSpec'.
	 */
	export let spec;

	/**
	 * Called when the source is added to the map.
	 */
	export let onLoad = null;

	/**
	 * Called when the source is removed from the map.
	 */
	export let onUnload = null;

	const loaded = writable(false);
	const safeSpec = Object.freeze(structuredClone(spec));

	setContext('mapSourceId', id);
	setContext('mapSourceSpec', safeSpec);
	setContext('mapSourceLoaded', loaded);

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
