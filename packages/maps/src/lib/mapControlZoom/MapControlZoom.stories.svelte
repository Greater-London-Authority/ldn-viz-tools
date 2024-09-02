<script lang="ts">
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

<Story name="Zoom Buttons">
	<MapApp>
		<div class="text-color-text-primary space-y-4 m-2">
			<p>
				The zoom buttons are usually positioned in the top left corner under the location search.
				They enable <a
					class="underline"
					href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomin"
				>
					zoom in
				</a>
				and
				<a
					class="underline"
					href="https://maplibre.org/maplibre-gl-js/docs/API/classes/maplibregl.Map/#zoomout"
				>
					zoom out
				</a> by one zoom level per click.
			</p>
		</div>

		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup>
				<MapControlZoom />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
