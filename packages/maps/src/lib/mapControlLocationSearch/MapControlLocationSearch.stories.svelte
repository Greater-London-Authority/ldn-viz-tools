<script context="module">
	import MapControlLocationSearch from './MapControlLocationSearch.svelte';

	export const meta = {
		title: 'Maps/MapControls/MapControlLocationSearch',
		component: MapControlLocationSearch,
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

	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';
	import type { OnGeolocationSearchError, GeolocationSearchError } from '@ldn-viz/ui';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');
	const adapter = new MapGeocoderAdapterMapBox(
		'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
	);

	const onSearchError: OnGeolocationSearchError = (err: GeolocationSearchError) => {
		console.error(err);
	};
</script>

<Template let:args>
	<MapControlLocationSearch {...args} />
</Template>

<Story name="Location Search">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch {adapter} {onSearchError} />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>

<Story name="Hidden Geolocator">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch {adapter} {onSearchError} hideGeolocator />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
