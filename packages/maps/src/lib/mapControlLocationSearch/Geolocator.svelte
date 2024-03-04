<script lang='ts'>
	import { Button, Spinner } from '@ldn-viz/ui';
	import TargetIcon from './TargetIcon.svelte';
		import type { GeocoderAdapter } from './GeocoderAdapter'
	import type { MapControlLocationUpdate } from './types'

	export let onLocationFound: MapControlLocationUpdate = undefined;
	export let onLocationNotFound: MapControlLocationUpdate = undefined;

	let isSearching = false;

	const isGeolocatorAvailable = () => {
		return 'geolocation' in navigator;
	};

	const startSearch = () => {
		if (!isGeolocatorAvailable()) {
			return;
		}

		isSearching = true;
		navigator.geolocation.getCurrentPosition(apiFoundLocation, apiNotFoundLocation);
	};

	const apiFoundLocation = (result: ) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
		isSearching = false;

		const coords = extractCoords(result);
		if (!coords) {
			return;
		}

		if (onLocationFound) {
			onLocationFound({ center: coords });
		}
	};

	const apiNotFoundLocation = (err) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
		isSearching = false;

		if (err.code === err.PERMISSION_DENIED) {
			logError("Insufficient permissions to access user's location.");
		} else if (err.code === err.TIMEOUT) {
			logError('User location search timed out.');
		} else {
			logError('User location unavailable.');
		}

		if (onLocationNotFound) {
			onLocationNotFound(err);
		}
	};

	const logError = (...msg) => {
		console.error(`[Geolocator]`, ...msg);
	};

	const extractCoords = (result) => {
		const lng = result?.coords?.longitude;
		const lat = result?.coords?.latitude;

		if (!isValidCoords(lng, lat)) {
			logError('Invalid location provided by browser', result);
			return null;
		}

		return [lng, lat];
	};

	const isValidCoords = (lng, lat) => {
		// 0,0 is a valid coordinate (null island)
		// But, actually, it's not because maps are limited to Greater London area!
		// But there might be a case for no limit so better safe than sorry.
		return (lng || lng === 0) && (lat || lat === 0);
	};
</script>

{#if isGeolocatorAvailable()}
	<div class="pointer-events-auto">
		<Button
			variant="square"
			emphasis="secondary"
			title="Find my location"
			role="search"
			aria-label="My location"
			on:click={startSearch}
		>
			{#if isSearching}
				<Spinner
					title="Searching for location..."
					alt="Spinning wheel indicating that location search is in progress"
					class="w-8 h-8 p-0.5 stroke-[12]"
				/>
			{:else}
				<TargetIcon class="w-8 h-8 p-0.5" />
			{/if}
		</Button>
	</div>
{/if}
