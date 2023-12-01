<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlGroup, { MapControlGroupPositions } from './MapControlGroup.svelte';
	import MapControlPan from '../mapControlPan/MapControlPan.svelte';
	import MapControlRefresh from '../mapControlRefresh/MapControlRefresh.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	let map = null;
</script>

<Meta
	title="Maps/MapControlGroup"
	component={MapControlGroup}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlGroup {...args} />
</Template>

<Story name="Positioning">
	<MapApp>
		<Map
			whenMapLoads={(m) => (map = m)}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			{#each Object.keys(MapControlGroupPositions) as position}
				<MapControlGroup {position}>
					<p class="bg-core-grey-800 p-2 text-white">{position}</p>
				</MapControlGroup>
			{/each}

			<div
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.8] text-white text-center text-sm p-4 space-y-4"
			>
				<p>
					Group and position map controls using
					<code>{'<MapControlGroup position="...">'}</code>.
				</p>

				<p>The available positions are shown around the edges of this map.</p>
			</div>
		</Map>
	</MapApp>
</Story>

<Story name="Standard Layout">
	<MapApp>
		<Map
			whenMapLoads={(m) => (map = m)}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<div
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.8] text-white text-sm p-4"
			>
				<p class="text-center p-2">
					The controls shown on the left are standard for every map. Those on the right are context
					dependent. On small devices most map controls will hide themselves.
				</p>
			</div>

			<MapControlGroup position="TopLeft">
				<MapControlZoom {map} />
			</MapControlGroup>

			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen {map} />
				<MapControlRefresh />
			</MapControlGroup>

			<MapControlGroup position="TopRight">
				<p class="bg-core-grey-800 p-2 text-white text-center">
					Bespoke controls<br />E.g. Drawing
				</p>
			</MapControlGroup>

			<MapControlGroup position="BottomRight">
				<MapControlPan {map} />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
