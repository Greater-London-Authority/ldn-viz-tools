<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	let map = null;
</script>

<Meta
	title="Maps/MapControlFullscreen"
	component={MapControlFullscreen}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlFullscreen {...args} />
</Template>

<Story name="Fullscreen Button">
	<MapApp>
		<div class="text-white space-y-4 m-2">
			<p>
				The fullscreen button is usually positioned in the bottom left corner above the refresh page
				button. If this page is embedded then clicking the button takes the user to the map page
				else the <a
					class="underline"
					href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API">Fullscreen API</a
				> is envoked.
			</p>
		</div>

		<Map
			whenMapLoads={(m) => (map = m)}
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen {map} />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
