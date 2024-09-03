<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

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

<!--
The fullscreen button is usually positioned in the bottom left corner above the refresh page button.

If this page is embedded then clicking the button takes the user to the map page else the
[Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) is invoked.
The button icon will change depending on the mode.
-->
<Story name="Fullscreen Button">
	<div class="w-[100dvw] h-[100dvh]">
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
	</div>
</Story>
