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
</script>

<Meta
	title="Maps/MapControls/MapControlGroup"
	component={MapControlGroup}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlGroup {...args} />
</Template>

<Story name="Positioning labels">
	<MapApp>
		<Map
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
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.85] text-white text-center p-4 space-y-4"
			>
				<p>
					Group and position map controls using
					<code>{'<MapControlGroup position="...">'}</code>.
				</p>

				<p>
					The named layout positions are shown around the edges of this map. If using typescript you
					can import the <code>MapControlGroupPositions</code> enum.
				</p>
			</div>
		</Map>
	</MapApp>
</Story>

<Story name="Positioning controls">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			{#each Object.keys(MapControlGroupPositions) as position}
				{#if position != 'TopRightOffset'}
					<MapControlGroup {position}>
						<div class="text-white w-80 flex pointer-events-auto">
							<input
								type="text"
								class="grow bg-core-grey-500 placeholder-core-grey-200 p-2"
								placeholder="Placeholder for the location search"
							/>
							<button title="Find my location" class="bg-core-grey-800 w-10 h-10 text-3xl">
								◎
							</button>
						</div>
						<MapControlZoom />
					</MapControlGroup>
				{/if}
			{/each}

			<div
				class="max-w-sm absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.85] text-white text-center p-4 space-y-4"
			>
				<p>
					The alignment of elements within a <code>MapControlGroup</code> depends on its position.
				</p>
			</div>
		</Map>
	</MapApp>
</Story>

<Story name="Standard Layout">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<div
				class="max-w-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.85] text-white p-4 space-y-8"
			>
				<p class="w-52">⮜ Controls on the left are standard for every map</p>
				<p class="ml-auto w-52">Those on the right are context or map dependent ⮞</p>
				<p class="text-center">On small devices most controls will hide themselves.</p>
			</div>

			<MapControlGroup position="TopLeft">
				<div class="text-white w-80 flex pointer-events-auto">
					<input
						type="text"
						class="grow bg-core-grey-500 placeholder-core-grey-200 p-2"
						placeholder="Placeholder for the location search"
					/>
					<button title="Find my location" class="bg-core-grey-800 w-10 h-10 text-3xl"> ◎ </button>
				</div>
				<MapControlZoom />
			</MapControlGroup>

			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen />
				<MapControlRefresh />
			</MapControlGroup>

			<MapControlGroup position="TopRight">
				<p class="bg-core-grey-800 p-2 text-white text-center pointer-events-auto">
					Bespoke controls<br />E.g. Drawing
				</p>
			</MapControlGroup>

			<MapControlGroup position="BottomRight">
				<MapControlPan />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
