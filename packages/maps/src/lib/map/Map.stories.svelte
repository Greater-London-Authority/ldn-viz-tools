<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import * as greyStyle from '../themes/os_greyscale.json';
	import * as darkGreyMutedStyle from '../themes/os_dark_grey_muted_buildings.json';
	import * as darkStyle from '../themes/os_dark.json';

	import MapApp from './MapApp.svelte';
	import Map, { appendOSKeyToUrl } from './Map.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	let clickedLayerIDs = ['Click a point on the map to list the vector layer IDs'];
	let map = null;

	const updateClickedLayers = (event) => {
		if (map) {
			clickedLayerIDs = queryVectorLayerIDs(event.point);
			clickedLayerIDs = removeDuplicates(clickedLayerIDs);
		}
	};

	const queryVectorLayerIDs = (point) => {
		return map.queryRenderedFeatures(point).map((f) => f.layer.id);
	};
	const removeDuplicates = (array) => [...new Set(array)];

	const whenMapLoads = (newMap) => {
		map = newMap;
		newMap.getCanvas().style.cursor = 'pointer';
		newMap.on('click', updateClickedLayers);
	};

	const whenMapUnloads = (oldMap) => {
		oldMap.getCanvas().style.cursor = '';
		oldMap.off('click', updateClickedLayers);
		map = null;
	};
</script>

<Meta
	title="Maps/Map"
	component={Map}
	parameters={{
		layout: 'full'
	}}
/>

<Template let:args>
	<MapApp>
		<Map {...args}>I'm a map!</Map>
	</MapApp>
</Template>

<Story name="Light OS Basemap">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</MapApp>
</Story>

<Story name="Greyscale OS Basemap">
	<MapApp>
		<Map
			options={{
				style: greyStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</MapApp>
</Story>

<Story name="Dark Grey, muted buildings">
	<MapApp>
		<div class="text-white space-y-4 m-2">
			<p>This was created by Mike Brondbjerg based on the OS greyscale theme.</p>
		</div>

		<Map
			options={{
				style: darkGreyMutedStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</MapApp>
</Story>

<Story name="Dark OS Basemap">
	<MapApp>
		<Map
			options={{
				style: darkStyle,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		/>
	</MapApp>
</Story>

<Story name="Properties">
	<MapApp>
		<Map
			{whenMapLoads}
			{whenMapUnloads}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<ul class="absolute top-0 left-0 z-10 bg-core-grey-800/[0.8] text-white text-sm m-2 p-2">
				{#each clickedLayerIDs as id (id)}
					<li>{id}</li>
				{/each}
			</ul>
		</Map>
	</MapApp>
</Story>
