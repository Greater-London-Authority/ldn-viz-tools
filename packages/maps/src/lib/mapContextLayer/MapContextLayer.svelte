<script>
	/**
	 * The `<MapDataLayer>` component combines the `<MapSource>` and
	 * `<MapLayer>` components to form a single spec driven component.
	 * @component
	 */

	import MapSource from '../mapLayer/MapSource.svelte';
	import MapLayer from '../mapLayer/MapLayer.svelte';

	/**
	 * A unique ID to reference the source in the map.
	 */
	export let id;

	/**
	 * A MapLibre source specification [MapLibre docs](https://maplibre.org/maplibre-style-spec/sources/).
	 */
	export let source;

	/**
	 * List of MapLibre layer specifications [MapLibre docs](https://maplibre.org/maplibre-style-spec/layers/).
	 */
	export let layers;

	/**
	 * Called when the source is added to the map.
	 */
	export let onSourceLoad = null; // ({ id, spec }) => {};

	/**
	 * Called when the source is removed from the map.
	 */
	export let onSourceUnload = null; // ({ id, spec }) => {};

	/**
	 * Called when the layer is added to the map.
	 */
	export let onLayerLoad = null; // ({ id, spec }) => {};

	/**
	 * Called when the layer is removed from the map.
	 */
	export let onLayerUnload = null; // ({ id, spec }) => {};
</script>

<MapSource {id} spec={source} onLoad={onSourceLoad} onUnload={onSourceUnload}>
	{#each layers as layer (layer.id)}
		<MapLayer
			id={layer.id}
			beforeId={layer.beforeId}
			spec={layer}
			onLoad={onLayerLoad}
			onUnload={onLayerUnload}
		>
			<slot />
		</MapLayer>
	{/each}
</MapSource>
