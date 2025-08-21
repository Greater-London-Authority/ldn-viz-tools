<script context="module">
	import MapControlLocationSearch from './MapControlLocationSearch.svelte';

	export const meta = {
		title: 'Maps/Components/MapControls/MapControlLocationSearch',
		component: MapControlLocationSearch,
		parameters: {
			layout: 'fullscreen'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import Map from '../map/Map.svelte';
	import { appendOSKeyToUrl } from '../map/util';

	import MapControlGroup from '../mapControlGroup/MapControlGroup.svelte';

	import type { GeolocationSearchError, OnGeolocationSearchError } from '@ldn-viz/ui';
	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';

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
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch {adapter} {onSearchError} />
			</MapControlGroup>
		</Map>
	</div>
</Story>

<Story name="Location Search - custom placeholder">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch
					{adapter}
					{onSearchError}
					placeholder="Type here to search for a place"
				/>
			</MapControlGroup>
		</Map>
	</div>
</Story>

<Story name="Hidden Geolocator">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch {adapter} {onSearchError} hideGeolocator />
			</MapControlGroup>
		</Map>
	</div>
</Story>

<!--
This story shows how you can provide callback functions to be called when the user selects a location from the search results, or clears the selection.
-->
<Story name="Location Search - callback functions">
	<div class="w-[100dvw] h-[100dvh]">
		<Map
			options={{
				transformRequest
			}}
		>
			<MapControlGroup position="TopLeft">
				<MapControlLocationSearch
					{adapter}
					{onSearchError}
					onSearchClear={() => console.log('Cleared search')}
					onLocationFound={(location) => console.log('Location selected:', location)}
				/>
			</MapControlGroup>
		</Map>
	</div>
</Story>
