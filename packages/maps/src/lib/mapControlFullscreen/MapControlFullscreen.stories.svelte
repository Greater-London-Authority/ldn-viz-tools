<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';
	import MapApp from '../map/MapApp.svelte';

	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';
	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
	let map = null;
</script>

<Meta
	title="Maps/MapControls/MapControlFullscreen"
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
		<div class="text-color-text-primary space-y-4 m-2">
			<p>
				The fullscreen button is usually positioned in the bottom left corner above the refresh page
				button.
			</p>

			<p>
				If this page is embedded then clicking the button takes the user to the map page else the <a
					class="underline"
					href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API">Fullscreen API</a
				> is invoked. The button icon will change depending on the mode.
			</p>
		</div>

		<Map
			whenMapLoads={(m) => (map = m)}
			options={{
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen {map} />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
