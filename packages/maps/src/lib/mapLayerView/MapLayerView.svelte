<script>
	/**
	 * The `<MapLayerView>` component is slotted within a `<MapLayerSource>`
	 * component, or derived version, to specify how to present data on the
	 * map.
	 *
	 * By design, `<MapLayerView>` is very simple with minimal features but
	 * extendable by wrapping the component and using patterns such as:
	 * [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern),
	 * [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern),
	 * and [Facade](https://en.wikipedia.org/wiki/Facade_pattern).
	 * @component
	 */

	import { onDestroy, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import MapMarker from '../mapMarker/MapMarker.svelte';

	const mapStore = getContext('mapStore');
	const mapSourceId = getContext('mapLayerSourceId');
	const mapSourceLoaded = getContext('mapLayerSourceLoaded');

	/**
	 * A unique ID to reference the layer in the map. Provided to slotted
	 * component as context via the key `mapLayerViewId`.
	 */
	export let id;

	/**
	 * The ID of the layer to insert this layer before. If no ID is provided this
	 * layer will be inserted above all existing layers.
	 */
	export let beforeId = undefined;

	/**
	 * A MapLibre layer specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/layers/).
	 * Provided to slotted component as context via the key `mapLayerViewSpec`.
	 */
	export let spec;

	/**
	 * Component to render as a tooltip on mouse over.
	 */
	export let tooltip = null;

	/**
	 * Component to render as a popup on mouse click.
	 */
	export let popup = null;

	/**
	 * Called when the layer is added to the map. The function accepts an
	 * object with the following fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
	export let onLoad = null;

	/**
	 * Called when the layer is removed from the map. The function accepts an
	 * object with the following fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
	export let onUnload = null;

	const loaded = writable(false);

	let safeSpec = structuredClone(spec);
	safeSpec.id = id;
	safeSpec.source = mapSourceId;
	Object.freeze(safeSpec);

	setContext('mapLayerViewId', id);
	setContext('mapLayerViewSpec', safeSpec);
	setContext('mapLayerViewLoaded', loaded);

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
	{#if tooltip || popup}
		<MapMarker layerId={id} {tooltip} {popup} />
	{/if}
	<slot />
{/if}
