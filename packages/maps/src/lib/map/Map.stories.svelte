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

	const updateClickedLayers = async (event) => {
		if (map && clickedLayerIDs) {
			clickedLayerIDs = null;
			clickedLayerIDs = map.queryRenderedFeatures(event.point).map((f) => f.layer.id);
		}
	};

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
		<div class="text-white space-y-4 m-2">
			<p>
				This is our default light basemap - it's the OS's <a
					class="underline"
					href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets"
				>
					OS_VTS_3857_Light.json</a
				> stylesheet. Like all OS base maps it requires an OS access token.
			</p>

			<p>
				If you're creating a full page map, as opposed to a map integrated into a dashboard or data
				explorer, then wrap the <code>{'<Map>'}</code>,
				<code>{'<Sidebar>'}</code> and other map components within a
				<code>{'<MapApp>'}</code> component. It manages no-script messages and layout that accounts for
				different browser overlays.
			</p>
		</div>

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
		<div class="text-white space-y-4 m-2">
			<p>
				This is the greyscale basemap used on the Cool Spaces map. - it's very similar to the OS's <a
					class="underline"
					href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets"
				>
					OS_VTS_3857_Greyscale.json</a
				> stylesheet, with a few tweaks.
			</p>
		</div>

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
		<div class="text-white space-y-4 m-2">
			<p>
				This was created by the OS, inspired by Mike Brondbjerg's dark gray theme with muted
				buildings. It is <a
					class="underline"
					href="https://github.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets"
					>OS_VTS_3857_Dark.json</a
				>
			</p>
		</div>

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
		<div class="text-white space-y-4 m-2">
			<p>
				The <code>{'whenMapLoads'}</code> and <code>{'whenMapUnloads'}</code> props are functions
				called when the <code>{'<Map>'}</code> component mounts and unmounts respectively. In this example
				a simple click listener is attached to the map which prints out the layer IDs where a feature
				exists at the click location.
			</p>

			<p>
				The <code>{'options'}</code> prop allows users to override and extend the GLA default MapLibre
				options. Use it to specify a map style specification and append the OS key.
			</p>
		</div>

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
