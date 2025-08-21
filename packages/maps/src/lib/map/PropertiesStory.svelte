<script lang="ts">
	import Map from './Map.svelte';
	import type { MapLibre, MapLibreMouseLikeEvent, MapLibrePoint } from './types';
	import { appendOSKeyToUrl } from './util';

	const initialLayerIds = ['Click a point on the map to list the vector layer IDs'];

	let clickedLayerIDs: string[] = initialLayerIds;
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

<div class="w-[100dvw] h-[100dvh]">
	<Map
		whenMapLoads={registerClickHandler}
		whenMapUnloads={unregisterClickHandler}
		options={{
			transformRequest: appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP')
		}}
	>
		<ul
			class="absolute top-0 left-0 z-10 bg-color-container-level-0 text-color-text-primary text-sm m-2 p-2"
		>
			{#each clickedLayerIDs as id (id)}
				<li>{id}</li>
			{/each}
		</ul>
	</Map>
</div>
