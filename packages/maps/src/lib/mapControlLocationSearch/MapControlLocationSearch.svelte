<script lang="ts">
	import MapControlGeocoder from './MapControlGeocoder.svelte';
	import MapControlGeolocator from './MapControlGeolocator.svelte';
	import type {
		GeocoderAdapter,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from '@ldn-viz/ui';

	export let adapter: GeocoderAdapter;
	export let onLocationFound: OnGeolocationSearchResult;
	export let onSearchError: OnGeolocationSearchError;
</script>

<div class="flex" {...$$restProps}>
	<MapControlGeocoder
		{adapter}
		{onLocationFound}
		{onSearchError}
		inputClasses="max-w-[calc(100dvw-2.5rem-1.5rem-1.5rem)]"
	/>
	<MapControlGeolocator {onLocationFound} {onSearchError} />
</div>
