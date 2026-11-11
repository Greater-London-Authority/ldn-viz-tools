<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MapControlGeolocator from './MapControlGeolocator.svelte';

	/**
	 * The `<MapControlGeolocator>` component wraps the UI package's `<Geolocator>`
	 * component for use with MapLibre maps. When the browser locates the user it
	 * places a marker on the map and flies to it (via `setFeature`), calling
	 * `onLocationFound`. Errors (e.g. denied permission) call `onSearchError`.
	 *
	 * It reads the `mapStore` context, so it must be rendered inside a `<Map>`.
	 * It is usually positioned using a [MapControlGroup](./?path=/docs/maps-components-mapcontrols-mapcontrolgroup--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Maps/Components/MapControls/MapControlGeolocator',
		component: MapControlGeolocator,
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
		GeolocationSearchError,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from '@ldn-viz/ui';

	const transformRequest = appendOSKeyToUrl('vmRzM4mAA1Ag0hkjGh1fhA2hNLEM6PYP');

	const onLocationFound: OnGeolocationSearchResult = (location) => {
		console.log('Location found:', location);
	};

	const onSearchError: OnGeolocationSearchError = (err: GeolocationSearchError) => {
		console.error(err);
	};
</script>

<!--
The geolocator used on its own (rather than via `MapControlLocationSearch`).
Clicking the button asks the browser for your location; when found, a marker is
dropped, the map flies to it, and `onLocationFound` is called.
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
					<MapControlGeolocator {onLocationFound} {onSearchError} {...args} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>

<!--
This story shows the error state. The geolocation error is raised by the
browser's Geolocation API, so to see `onSearchError` fire,
deny the location permission prompt or block location access for this page
(the error will also be logged to the console).
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
					<MapControlGeolocator {onLocationFound} {onSearchError} />
				</MapControlGroup>
			</Map>
		</div>
	{/snippet}
</Story>
