<script>
	import * as os_light_vts from '../themes/os_light_vts.json';
	import Map, { appendOSKeyToUrl } from './Map.svelte';

	let clickedLayerIDs = ['Click a point on the map to list the vector layer IDs'];
	let map = null;

	const updateClickedLayers = (event) => {
		if (map) {
			clickedLayerIDs = removeDuplicates(queryVectorLayerIDs(event.point));
		}
	};

	const queryVectorLayerIDs = (point) => {
		return map.queryRenderedFeatures(point).map((f) => f.layer.id);
	};

	const removeDuplicates = (array) => [...new Set(array)];

	const registerClickHandler = (newMap) => {
		map = newMap;
		newMap.getCanvas().style.cursor = 'pointer';
		newMap.on('click', updateClickedLayers);
	};

	const unregisterClickHandler = (oldMap) => {
		oldMap.off('click', updateClickedLayers);
		map = null;
	};
</script>

<div class="w-[100dvw] h-[100dvh]">
	<Map
		whenMapLoads={registerClickHandler}
		whenMapUnloads={unregisterClickHandler}
		options={{
			style: os_light_vts,
			transformRequest: appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP')
		}}
	>
		<ul
			class="absolute top-0 left-0 z-10 bg-color-container-level-1 text-color-text-primary text-sm m-2 p-2"
		>
			{#each clickedLayerIDs as id (id)}
				<li>{id}</li>
			{/each}
		</ul>
	</Map>
</div>
