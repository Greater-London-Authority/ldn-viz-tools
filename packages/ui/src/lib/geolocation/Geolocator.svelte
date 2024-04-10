<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Spinner } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import TargetIcon from './TargetIcon.svelte';

	import type {
		GeolocationCoords,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from './types';

	export let onLocationFound: OnGeolocationSearchResult | undefined;
	export let onSearchError: OnGeolocationSearchError | undefined;
	export let showClearButton = false;

	let searchPermitted = false;
	let allowsPermPrompt = false;
	let isSearching = false;

	const isGeolocatorAvailable = () => {
		return 'geolocation' in navigator;
	};

	const updatePermission = (state: string) => {
		searchPermitted = state === 'granted';
		allowsPermPrompt = state === 'prompt';
	};

	const handleClick = () => {
		if (!isGeolocatorAvailable() || (!searchPermitted && !allowsPermPrompt)) {
			return;
		}

		if (showClearButton) {
			showClearButton = false;
			return;
		}

		startSearch();
	};

	const startSearch = () => {
		isSearching = true;
		doSearch();
	};

	const doSearch = () => {
		navigator.geolocation.getCurrentPosition(
			apiFoundLocation, //
			apiNotFoundLocation
		);
	};

	const apiFoundLocation = (result: GeolocationPosition) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
		isSearching = false;
		showClearButton = true;

		const coords: null | GeolocationCoords = extractCoords(result);
		if (!coords) {
			return;
		}

		if (onLocationFound) {
			onLocationFound({ center: coords });
		}
	};

	const apiNotFoundLocation = (err: GeolocationPositionError) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
		isSearching = false;

		if (err.code === err.PERMISSION_DENIED) {
			logError("Insufficient permissions to access user's location.");
			if (navigator.userAgent.includes('Firefox/')) {
				updatePermission('denied');
			}
		} else if (err.code === err.TIMEOUT) {
			logError('User location search timed out.');
		} else {
			logError('User location unavailable.');
		}

		if (onSearchError) {
			onSearchError(err);
		}
	};

	const logError = (...msg: string[]) => {
		console.error(`[Geolocator]`, ...msg);
	};

	const extractCoords = (result: GeolocationPosition): null | GeolocationCoords => {
		const lng = result?.coords?.longitude;
		const lat = result?.coords?.latitude;

		if (!isValidCoords(lng, lat)) {
			logError(
				'Invalid location provided by browser', //
				JSON.stringify(result, null, 2)
			);
			return null;
		}

		return [lng, lat];
	};

	const isValidCoords = (lng: number, lat: number): boolean => {
		// 0,0 is a valid coordinate (null island)
		// But, actually, it's not because maps are limited to Greater London area!
		// But there might be a case for no limit so better safe than sorry.
		return (!!lng || lng === 0) && (!!lat || lat === 0);
	};

	onMount(() => {
		navigator.permissions //
			.query({ name: 'geolocation' }) //
			.then((perm) => {
				updatePermission(perm.state);

				// Works in Chromium (Chrome, Edge, Vivaldi, etc) but not Firefox.
				// No reliable workaround found for Firefox yet.
				perm.onchange = () => updatePermission(perm.state);
			});
	});
</script>

<div class="pointer-events-auto w-10 h-10">
	{#if !searchPermitted && !allowsPermPrompt}
		<div class="!bg-core-grey-800 w-10 h-10 p-1">
			<TargetIcon
				disabled
				class="w-8 h-8 p-0.5 stroke-core-grey-400"
				title="Please enable browser geolocation permissions"
			/>
		</div>
	{:else if isSearching}
		<div class="!bg-core-grey-800 w-10 h-10 p-1">
			<Spinner
				title="Searching for location..."
				alt="Spinning wheel indicating that location search is in progress"
				class="w-8 h-8 p-0.5 stroke-[12]"
			/>
		</div>
	{:else if showClearButton}
		<Button
			variant="square"
			emphasis="secondary"
			title="Clear location marker"
			role="search"
			aria-label="Clear location"
			class="!bg-core-grey-800"
			on:click={handleClick}
		>
			<Icon src={XMark} class="w-8 h-8 p-0.5 stroke-white" />
		</Button>
	{:else}
		<Button
			variant="square"
			emphasis="secondary"
			title="Find my location"
			role="search"
			aria-label="Find my location"
			class="!bg-core-grey-800"
			on:click={handleClick}
		>
			<TargetIcon class="w-8 h-8 p-0.5 stroke-white" />
		</Button>
	{/if}
</div>
