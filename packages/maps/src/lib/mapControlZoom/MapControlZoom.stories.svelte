<script context="module">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import MapControlZoom from '../mapControlZoom/MapControlZoom.svelte';

	const OS_KEY = 'vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP';

	export const meta = {
		title: 'Maps/Components/MapControls/MapControlZoom',
		component: MapControlZoom,
		parameters: {
			layout: 'full'
		}
	};
</script>

<script>
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
</script>

<Template let:args>
	<MapControlZoom {...args} />
</Template>

<!--
The zoom buttons are usually positioned in the top left corner under the location search.
They enable [zoomin](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomin) and
[zoomout](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#zoomout) by one zoom level per click.
-->
<Story name="Zoom Buttons">
	<div class="w-[100dvw] h-[100dvh]">
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
				transformRequest: appendOSKeyToUrl(OS_KEY)
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlZoom />
			</MapControlGroup>
		</Map>
	</div>
</Story>
