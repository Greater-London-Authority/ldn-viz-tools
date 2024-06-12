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

	/**
	 * ID of the target layer. Defaults to using the value of the `mapLayerId`
	 * context if it exists.
	 */
	export let layerId = ctxLayerId;

	/**
	 * Called when the mouse cursor enters a feature. This will be called
	 * separately for each feature in the layer.
	 */
	export let enterFeature: MaybeMapCursorFeatureHandler = null;

	/**
	 * Called when the mouse cursor leaves a feature. This will be called
	 * separately for each feature in the layer.
	 */
	export let leaveFeature: MaybeMapCursorFeatureHandler = null;

	/**
	 * Called when the mouse cursor enters a feature and the feature is ordered
	 * above all others.
	 */
	export let enterTopFeature: MaybeMapCursorFeatureHandler = null;

	/**
	 * Called when the mouse cursor leaves a feature the top feature.
	 */
	export let leaveTopFeature: MaybeMapCursorFeatureHandler = null;

	/**
	 * Called when any part of the map is clicked.
	 */
	export let clickMap: MaybeMapCursorFeatureHandler = null;

	/**
	 * Called when a feature is clicked.
	 */
	export let clickFeature: MaybeMapCursorFeatureHandler = null;

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

	$: if ($mapStore && $mapCursorStore) {
		create();
	} else {
		destroy();
	}
</script>

<slot />
