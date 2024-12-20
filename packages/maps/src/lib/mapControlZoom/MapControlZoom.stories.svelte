<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';
	import MapApp from '../map/MapApp.svelte';
	import * as os_light_vts from '../themes/os_light_vts.json';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';
</script>

<Meta
	title="Maps/MapControls/MapControlZoom"
	component={MapControlZoom}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Template let:args>
	<MapControlZoom {...args} />
</Template>

<!--
The zoom buttons are usually positioned in the top left corner under the location search.
They enable [zoomin](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomin) and
[zoomout](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomout) by one zoom level per click.
-->
<Story name="Zoom Buttons">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlZoom />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
