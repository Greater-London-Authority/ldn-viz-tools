<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlGeocoder from './MapControlGeocoder.svelte';

	/**
	 * The `<MapControlGeocoder>` component wraps the UI package's `<Geocoder>`
	 * component for use with MapLibre maps. It sources location suggestions from
	 * a `GeocoderAdapter`, and when a suggestion is selected it places a marker on
	 * the map (via `setFeature`) and flies to it. Clearing the search box removes
	 * the marker (via `clearFeature`).
	 *
	 * It reads the `mapStore` context, so it must be rendered inside a `<Map>`.
	 * It is usually positioned using a `<MapControlGroup>`.
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlGeocoder',
		component: MapControlGeocoder,
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

	import type {
		GeocoderAdapter,
		Geolocation,
		GeolocationSearchError,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';
	import { MapGeocoderAdapterMapBox } from './MapGeocoderAdapterMapBox';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	const adapterMapBox = new MapGeocoderAdapterMapBox(
		'pk.eyJ1IjoiZ2xhLWdpcyIsImEiOiJjanBvNGh1bncwOTkzNDNueWt5MGU1ZGtiIn0.XFxLdq2dXttcXSXTiREPTA'
	);

	// An adapter that always rejects, used to exercise the `onSearchError` path.
	const adapterError: GeocoderAdapter = {
		search: () => Promise.reject(new Error('Simulated geocoder search failure')),
		attribution: () => undefined
	};

	const onSearchError: OnGeolocationSearchError = (err: GeolocationSearchError) => {
		console.error(err);
	};

	const onLocationSelected = (location: Geolocation) => {
		console.log('Location selected:', location);
	};
</script>

<!--
The default geocoder used on its own (rather than via `MapControlLocationSearch`).
Type at least three characters to see suggestions; selecting one drops a marker and
flies to the location, and the clear button removes it again.
-->
<Story name="Default">
	{#snippet template(args)}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlGeocoder
						adapter={adapterMapBox}
						{onSearchError}
						{onLocationSelected}
						{...args}
					/>
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This story uses an adapter whose `search` always rejects, so entering a query
triggers the `onSearchError` handler (which is logged to the browser console).
-->
<Story name="Search error">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlGeocoder adapter={adapterError} {onSearchError} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This story caps the number of suggestions shown in the dropdown as 2
(rather than the default of 5) using the`maxSuggestions` prop.
-->
<Story name="maxSuggestions">
	{#snippet template()}
		<div class="h-[100dvh] w-[100dvw]">
			<Map
				options={{
					transformRequest
				}}
			>
				<MapControlGroup position="TopLeft">
					<MapControlGeocoder adapter={adapterMapBox} {onSearchError} maxSuggestions={2} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
