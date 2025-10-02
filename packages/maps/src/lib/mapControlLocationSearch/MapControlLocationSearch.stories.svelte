<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlLocationSearch from './MapControlLocationSearch.svelte';

	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlLocationSearch',
		component: MapControlLocationSearch,
		tags: ['autodocs'],

		parameters: {
			layout: 'fullscreen'
		}
	});
</script>

<script lang="ts">
	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import type { GeolocationSearchError, OnGeolocationSearchError } from '@ldn-viz/ui';
	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';
	import { MapGeocoderAdapterOSPlaces } from './MapGeocoderAdapterOSPlaces';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	const adapterMapBox = new MapGeocoderAdapterMapBox(
		'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
	);

	const adapterOSPlaces = new MapGeocoderAdapterOSPlaces('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	const onSearchError: OnGeolocationSearchError = (err: GeolocationSearchError) => {
		console.error(err);
	};
</script>

<Story name="Location Search">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlLocationSearch adapter={adapterOSPlaces} {onSearchError} {...args} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Location Search - custom placeholder">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlLocationSearch
						adapter={adapterOSPlaces}
						{onSearchError}
						placeholder="Type here to search for a place"
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<Story name="Hidden Geolocator">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlLocationSearch adapter={adapterOSPlaces} {onSearchError} hideGeolocator />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This story shows how you can provide callback functions to be called when the user selects a location from the search results, or clears the selection.
-->
<Story name="Location Search - callback functions">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlLocationSearch
						adapter={adapterOSPlaces}
						{onSearchError}
						onSearchClear={() => console.log('Cleared search')}
						onLocationFound={(location) => console.log('Location selected:', location)}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
