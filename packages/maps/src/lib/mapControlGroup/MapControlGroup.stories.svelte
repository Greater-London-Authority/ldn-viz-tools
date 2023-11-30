<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlGroup from './MapControlGroup.svelte';
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
		<div class="text-white space-y-4 m-2">
			<p>
				Group and position sets of map controls using the
				<code>{'<MapControlGroup position="...">'}</code>. Specific map control components are
				slotted top first.
			</p>
		</div>

		<Map
			whenMapLoads={(m) => (map = m)}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlZoom {map} />
			</MapControlGroup>

			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen {map} />
			</MapControlGroup>

			<div
				class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.9] text-white text-sm p-2"
			>
				<h1 class="text-lg font-bold text-center mb-6">Available positions</h1>
				<div
					class="grid grid-rows-3 grid-flow-col gap-6 text-center [&>p]:w-40 [&>p]:p-2 [&>p]:flex [&>p]:justify-center [&>p]:items-center"
				>
					<p class="flex-col">
						<span>TopLeft</span>
						<span class="text-core-grey-300">(default)</span>
					</p>
					<p>CenterLeft</p>
					<p>BottomLeft</p>
					<p>TopCenter</p>
					<div />
					<p>BottomCenter</p>
					<p class="flex-col">
						<span>TopRight</span>
						<span>& TopRightOffset</span>
						<span class="text-core-grey-300">(offset adds clearance for sidebar toggle)</span>
					</p>
					<p>CenterRight</p>
					<p>BottomRight</p>
				</div>
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
			<MapControlGroup position="TopLeft">
				<MapControlZoom {map} />
			</MapControlGroup>

			<div
				class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10 bg-core-grey-800/[0.9] text-white text-sm p-2"
			>
				<h1 class="text-lg font-bold text-center mb-6">Standard layout for map controls</h1>
				<div
					class="grid grid-rows-3 grid-flow-col gap-6 text-center [&>p]:w-40 [&>p]:p-2 [&>p]:flex [&>p]:justify-center [&>p]:items-center"
				>
					<p class="flex-col">
						<span>TopLeft</span>
						<span class="text-core-grey-300">(Location search)</span>
						<span class="text-core-grey-300">(Zoom buttons)</span>
					</p>
					<div />
					<p class="flex-col">
						<span>BottomLeft</span>
						<span class="text-core-grey-300">(Fullscreen button)</span>
						<span class="text-core-grey-300">(Refresh button)</span>
					</p>
					<div class="w-32" />
					<div />
					<div />
					<p class="flex-col">
						<span>TopRight</span>
						<span>& TopRightOffset</span>
						<span class="text-core-grey-300">(Map specific controls, e.g. drawing)</span>
					</p>
					<div />
					<p class="flex-col">
						<span>BottomRight</span>
						<span class="text-core-grey-300">(Pan buttons)</span>
						<span class="text-core-grey-300">(Custom logo)</span>
					</p>
				</div>
			</div>
		</Map>
	</MapApp>
</Story>
