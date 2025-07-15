<script lang="ts">
	/**
	 * The `<MapLayerSource>` component is slotted within a `<Map>` component to
	 * specify a data source. The slot primarily accepts one or many
	 * `<MapLayerView>` instances to present the data.
	 *
	 * By design, `<MapLayerSource>` is very simple with minimal features but
	 * extendable by wrapping the component and using patterns such as:
	 * [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern),
	 * [Decorator](https://en.wikipedia.org/wiki/Decorator_pattern),
	 * and [Facade](https://en.wikipedia.org/wiki/Facade_pattern). E.g.
	 * `<GeoJSONMapLayerSource>`.
	 * @component
	 */

	import { onDestroy, getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const mapStore = getContext('mapStore');

	

	

	

	
	interface Props {
		/**
	 * A unique ID to reference the source in the map. Provided to slotted
	 * component as context via the key `mapLayerSourceId`.
	 */
		id: any;
		/**
	 * A MapLibre source specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/sources/).
	 * Provided to slotted component as context via the key `mapLayerSourceSpec`.
	 */
		spec: any;
		/**
	 * Called when the source is added to the map. The function accepts an
	 * object with the following fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
		onLoad?: any;
		/**
	 * Called when the source is removed from the map. The function accepts an
	 * object with the following fields:
	 * - **id**: ID of the layer source.
	 * - **spec**: MapLibre specification used to initialise the layer.
	 */
		onUnload?: any;
		children?: import('svelte').Snippet;
	}

	let {
		id,
		spec = $bindable(),
		onLoad = null,
		onUnload = null,
		children
	}: Props = $props();

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

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		onLoad && onLoad({ id, spec: safeSpec });
	};

	const doUnload = () => {
		loaded.set(false);
		removeSource();

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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

	$effect(() => {
		if ($mapStore) {
			doLoad();
		}
	});

	$effect(() => {
		if ($loaded && !$mapStore) {
			doUnload();
		}
	});
</script>

{#if $loaded}
	{@render children?.()}
{/if}
