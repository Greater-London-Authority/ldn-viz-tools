<script context="module">
	import MapControlBorough from './MapControlBorough.svelte';

	export const meta = {
		title: 'Maps/MapControls/MapControlBorough',
		component: MapControlBorough,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Template, Story } from '@storybook/addon-svelte-csf';

	import * as os_light_vts from '../themes/os_light_vts.json';
	import MapApp from '../map/MapApp.svelte';
	import Map, { appendOSKeyToUrl } from '../map/Map.svelte';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';
	import { type Writable, writable } from 'svelte/store';
	import type { Map as MaplibreglMap } from 'maplibre-gl';
	import BoroughsContextLayer from '../mapContextLayers/boroughsContextLayer/BoroughsContextLayer.svelte';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	let mapStore: Writable<MaplibreglMap> = writable();
</script>

<Template let:args>
	<MapControlBorough {...args} />
</Template>

<Story name="Zooming to borough">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest
			}}
			bind:mapStore
		>
			<MapControlGroup>
				<MapControlBorough map={$mapStore} />
			</MapControlGroup>

			<BoroughsContextLayer />
		</Map>
	</MapApp>
</Story>
