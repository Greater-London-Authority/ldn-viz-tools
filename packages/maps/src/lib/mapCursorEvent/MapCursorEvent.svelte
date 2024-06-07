<script lang="ts">
	/**
	 * The `<MapCursorEvent>` component exposes the map cursor capability, for a
	 * specific map layer, as a Svelte component. It is designed to be slotted
	 * into a `<MapLyer>`.
	 *
	 * Order of cursor movement calls:
	 * 1. _leaveFeature_ (any features left)
	 * 2. _enterFeature_ (any new features entered)
	 * 3. _leaveTopFeature_
	 * 4. _enterTopFeature_
	 *
	 * Order of click/touch calls:
	 * 1. _clickMap_
	 * 2. _clickFeature_
	 * @component
	 */

	import { getContext, onDestroy } from 'svelte';
	import type { MapStore, MapCursorStore, MapCursorFeatureHandler } from '../map';

	type MaybeMapCursorFeatureHandler = null | MapCursorFeatureHandler;

	const mapStore: MapStore = getContext('mapStore');
	const mapCursorStore: MapCursorStore = getContext('mapCursorStore');
	const ctxLayerId: undefined | string = getContext('mapLayerId');

	/**
	 * ID of the target layer. Defaults to using the value of 'mapLayerId'
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
	 * Called when the any part of the map is clicked.
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
