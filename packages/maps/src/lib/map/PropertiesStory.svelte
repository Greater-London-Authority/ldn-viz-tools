<script lang="ts">
	import Map from './Map.svelte';
	import type { MapLibre, MapLibreMouseLikeEvent, MapLibrePoint } from './types';
	import { appendOSKeyToUrl } from './util';

	const initialLayerIds = ['Click a point on the map to list the vector layer IDs'];

	let clickedLayerIDs: string[] = $state(initialLayerIds);
	let map: null | MapLibre = null;

	const updateClickedLayers = (event: MapLibreMouseLikeEvent) => {
		if (map) {
			const ids = queryVectorLayerIDs(event.point);
			clickedLayerIDs = removeDuplicateIds(ids);
		}
	};

	const queryVectorLayerIDs = (point: MapLibrePoint): string[] => {
		if (!map) {
			return initialLayerIds;
		}

		return map.queryRenderedFeatures(point).map((f) => f.layer.id);
	};

	const removeDuplicateIds = (array: string[]): string[] => [...new Set(array)];

	const registerClickHandler = (newMap: MapLibre) => {
		map = newMap;
		newMap.getCanvas().style.cursor = 'pointer';
		newMap.on('click', updateClickedLayers);
	};

	const unregisterClickHandler = (oldMap: MapLibre) => {
		oldMap.off('click', updateClickedLayers);
		map = null;
	};
</script>

<div class="h-[100dvh] w-[100dvw]">
	<Map
		whenMapLoads={registerClickHandler}
		whenMapUnloads={unregisterClickHandler}
		options={{
			transformRequest: appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP')
		}}
	>
		<ul
			class="bg-color-container-level-0 text-color-text-primary absolute left-0 top-0 z-10 m-2 p-2 text-sm"
		>
			{#each clickedLayerIDs as id (id)}
				<li>{id}</li>
			{/each}
		</ul>
	</Map>
</div>
