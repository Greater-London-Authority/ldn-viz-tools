<script context="module">
	import MapControlLocationSearch from './MapControlLocationSearch.svelte';

	export const meta = {
		title: 'Maps/MapControlLocationSearch',
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

	import MapControlGroup, { MapControlGroupPositions } from '../mapControlGroup/MapControlGroup.svelte';

	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';
	import type {
		GeolocationCoords,
		GeolocationNamed,
		OnGeolocationSearchResult,
		OnGeolocationSearchError,
		Geolocation
	} from './types';

	const adapter = new MapGeocoderAdapterMapBox(
		'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
	);

	const onSearchError: OnGeolocationSearchError = (err) => {
		console.error(err);
	};
</script>

<Template let:args>
	<Geocoder {...args} />
</Template>

<Story name="Location Search">
	<MapApp>
		<Map
			options={{
				style: os_light_vts,
				transformRequest: appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP')
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch {adapter} {onSearchError} />
			</MapControlGroup>
		</Map>
	</MapApp>
</Story>
