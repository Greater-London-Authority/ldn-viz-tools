<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlFullscreen from '../mapControlFullscreen/MapControlFullscreen.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
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
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="BottomLeft">
				<MapControlFullscreen />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
