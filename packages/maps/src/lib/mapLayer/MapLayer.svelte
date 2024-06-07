<script>
	/**
	 * The `<MapLayer>` component is slotted within a `<MapSource>` component to
	 * specify how to present data on the map.
	 *
	 * `<MapLayer>` can be used directly or wrapped by a decorator or adapter
	 * component to create bespoke and reusable presentation layers.
	 * @component
	 */

	import { onDestroy, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import MapPopup from '../mapPopup/MapPopup.svelte';

	const mapStore = getContext('mapStore');
	const mapSourceId = getContext('mapSourceId');
	const mapSourceLoaded = getContext('mapSourceLoaded');

	/**
	 * A unique ID to reference the layer in the map. Provided to slotted
	 * component as context via the key 'mapLayerId'.
	 */
	export let id;

	/**
	 * The ID of the layer to insert this layer before. If no ID is provided this
	 * layer will be inserted above all existing layers.
	 */
	export let beforeId = undefined;

	/**
	 * A MapLibre layer specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/layers/).
	 * Provided to slotted component as context via the key 'mapLayerSpec'.
	 */
	export let spec;

	/**
	 * Component to render as a tooltip on mouse over.
	 */
	export let tooltip = null;

	/**
	 * Component to render as a popup/marker on mouse click.
	 */
	export let marker = null;

	/**
	 * Called when the layer is added to the map.
	 */
	export let onLoad = null;

	/**
	 * Called when the layer is removed from the map.
	 */
	export let onUnload = null;

	const loaded = writable(false);

	let safeSpec = structuredClone(spec);
	safeSpec.id = id;
	safeSpec.source = mapSourceId;
	Object.freeze(safeSpec);

	setContext('mapLayerId', id);
	setContext('mapLayerSpec', safeSpec);
	setContext('mapLayerLoaded', loaded);

	const doLoad = () => {
		loaded.set(false);
		removeLayer();

		$mapStore.addLayer(safeSpec, beforeId);
		loaded.set(true);
		onLoad && onLoad({ id, spec: safeSpec });
	};

	const doUnload = () => {
		loaded.set(false);
		removeLayer();
		onUnload && onUnload({ id, spec: safeSpec });
	};

	const removeLayer = () => {
		if ($mapStore?.getLayer(id)) {
			$mapStore.removeLayer(id);
		}
	};

	onDestroy(doUnload);

	$: if ($mapSourceLoaded) {
		doLoad();
	}

	$: if ($loaded && !$mapSourceLoaded) {
		doUnload();
	}
</script>

{#if $loaded}
	{#if tooltip || marker}
		<MapPopup layerId={id} {tooltip} {marker} />
	{/if}
	<slot />
{/if}
