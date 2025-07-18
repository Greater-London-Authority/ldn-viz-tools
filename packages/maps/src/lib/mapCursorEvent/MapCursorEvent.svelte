<script lang="ts">
	/**
	 * The `<MapCursorEvent>` component exposes the map cursor capability, for a
	 * specific map layer, as a Svelte component. It's designed to be slotted
	 * into a `<MapLayer>` component where the `layerId` property is auto
	 * populated by `mapLayerId` context.
	 *
	 * However, this component maybe slotted anywhere within `<Map>` providing
	 * a layer ID is passed and guards are put in place so the layer is added to
	 * MapLibre before this component is initialised.
	 *
	 * Cursor movement events in order they are called when a mouse movement occurs:
	 * 1. `leaveFeature`
	 * 2. `leaveTopFeature`
	 * 3. `enterFeature`
	 * 4. `enterTopFeature`
	 *
	 * Click or touch events in order they are called per click:
	 * 1. `clickMap`
	 * 2. `clickFeature`
	 *
	 * @component
	 */

	import { getContext, onDestroy } from 'svelte';
	import type { MapStore, MapCursorStore, MapCursorFeatureHandler } from '../map';

	type MaybeMapCursorFeatureHandler = null | MapCursorFeatureHandler;

	const mapStore: MapStore = getContext('mapStore');
	const mapCursorStore: MapCursorStore = getContext('mapCursorStore');
	const ctxLayerId: undefined | string = getContext('mapLayerId');

	interface Props {
		/**
		 * ID of the target layer. Defaults to using the value of the `mapLayerId`
		 * context if it exists.
		 */
		layerId?: any;
		/**
		 * Called when the mouse cursor enters a feature. This will be called
		 * separately for each feature in the layer.
		 */
		enterFeature?: MaybeMapCursorFeatureHandler;
		/**
		 * Called when the mouse cursor leaves a feature. This will be called
		 * separately for each feature in the layer.
		 */
		leaveFeature?: MaybeMapCursorFeatureHandler;
		/**
		 * Called when the mouse cursor enters a feature and the feature is ordered
		 * above all others.
		 */
		enterTopFeature?: MaybeMapCursorFeatureHandler;
		/**
		 * Called when the mouse cursor leaves a feature the top feature.
		 */
		leaveTopFeature?: MaybeMapCursorFeatureHandler;
		/**
		 * Called when any part of the map is clicked.
		 */
		clickMap?: MaybeMapCursorFeatureHandler;
		/**
		 * Called when a feature is clicked.
		 */
		clickFeature?: MaybeMapCursorFeatureHandler;
		children?: import('svelte').Snippet;
	}

	let {
		layerId = ctxLayerId,
		enterFeature = null,
		leaveFeature = null,
		enterTopFeature = null,
		leaveTopFeature = null,
		clickMap = null,
		clickFeature = null,
		children
	}: Props = $props();

	const create = () => {
		if (!$mapCursorStore) {
			return;
		}

		if (enterFeature) {
			$mapCursorStore.on('enterFeature', layerId, enterFeature);
		}

		if (leaveFeature) {
			$mapCursorStore.on('leaveFeature', layerId, leaveFeature);
		}

		if (enterTopFeature) {
			$mapCursorStore.on('enterTopFeature', layerId, enterTopFeature);
		}

		if (leaveTopFeature) {
			$mapCursorStore.on('leaveTopFeature', layerId, leaveTopFeature);
		}

		if (clickMap) {
			$mapCursorStore.on('clickMap', layerId, clickMap);
		}

		if (clickFeature) {
			$mapCursorStore.on('clickFeature', layerId, clickFeature);
		}
	};

	const destroy = () => {
		$mapCursorStore?.offLayer(layerId);
	};

	onDestroy(destroy);

	$effect(() => {
		if ($mapStore && $mapCursorStore) {
			create();
		} else {
			destroy();
		}
	});
</script>

{@render children?.()}
