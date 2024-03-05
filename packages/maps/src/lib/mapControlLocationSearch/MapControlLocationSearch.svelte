<script lang="ts">
	import MapControlGeocoder from './MapControlGeocoder.svelte';
	import MapControlGeolocator from './MapControlGeolocator.svelte';
	import type { GeocoderAdapter } from './GeocoderAdapter';
	import type { OnSearchResult, OnSearchError } from './types';

	export let adapter: GeocoderAdapter;
	export let onLocationFound: OnSearchResult = undefined;
	export let onLocationNotFound: OnSearchError = undefined;
</script>

<div class="flex" {...$$restProps}>
	<MapControlGeocoder
		{adapter}
		{onLocationFound}
		inputClasses="max-w-[calc(100dvw-2.5rem-1.5rem-1.5rem)]"
	/>
	<MapControlGeolocator {onLocationFound} {onLocationNotFound} />
</div>
