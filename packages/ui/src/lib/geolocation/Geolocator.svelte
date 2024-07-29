<script lang="ts">
	/**
	 * The `<Geolocator>` component uses the Geolocation API to identify the
	 * users current location.
	 *
	 * Note that user settings and browser implementions of the Geolocation API
	 * mean only simple usage is cross platform. The problem mostly affects
	 * the querying of, and listening for changes in, permissions.
	 *
	 * @component
	 */

	import { Button, Modal, Spinner } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import TargetIcon from './TargetIcon.svelte';

	import type {
		GeolocationCoords,
		OnGeolocationSearchResult,
		OnGeolocationSearchError
	} from './types';

	/**
	 * Called when a location is found.
	 */
	export let onLocationFound: OnGeolocationSearchResult | undefined;

	/**
	 * Called when a location could not be found.
	 */
	export let onSearchError: OnGeolocationSearchError | undefined;

	/**
	 * The last found location. This will be reset to `null` each time a new search
	 * is started.
	 */
	export let location: GeolocationCoords[2] | null = null;

	/**
	 * Bind to be reactively informed when searching is in progress.
	 */
	export let isSearching = false;

	/**
	 * If `true`, the search button will be replaced by a clear button.
	 */
	export let allowClearButton = false;

	/**
	 * Bind to be reactively informed when the clear button is being shown.
	 */
	export let showClearButton = false;

	/**
	 * When bound to, allows activation of the search to be started by an
	 * external source. Behaves as if the geolocator button had been clicked.
	 */
	export const startSearch = () => {
		if (!isGeolocatorAvailable() || isSearching) {
			return;
		}

		clearSearch();
		isSearching = true;

		navigator.geolocation.getCurrentPosition(
			apiFoundLocation, //
			apiNotFoundLocation
		);
	};

	let errorMessage = '';
	let errorModalOpen;
	$: errorModalOpen?.set(!!errorMessage);

	const isGeolocatorAvailable = () => {
		return 'geolocation' in navigator;
	};

	const clearSearch = () => {
		showClearButton = false;
		location = null;
		errorMessage = '';
	};

	const apiFoundLocation = (result: GeolocationPosition) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
		isSearching = false;
		showClearButton = allowClearButton;
		location = extractCoords(result);

		if (location && onLocationFound) {
			onLocationFound({ center: location });
		}
	};

	const apiNotFoundLocation = (err: GeolocationPositionError) => {
		// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
		isSearching = false;

		if (err.code === err.PERMISSION_DENIED) {
			errorMessage =
				'Location permission denied. To use geolocation, please ensure location feature is enabled in device settings and permission granted to the browser.';
		} else if (err.code === err.TIMEOUT) {
			errorMessage =
				"Location search timed out. If you're using a mobile device, this may be due to inadequate signal.";
		} else {
			errorMessage =
				'Could not find location or location permission denied. To use geolocation, please ensure location feature is enabled in device settings and permission granted to the browser.';
		}

		logError(errorMessage);
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
</script>

<div class="pointer-events-auto w-10 h-10">
	{#if isSearching}
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
			title="Clear location"
			role="search"
			aria-label="Clear location"
			class="!bg-core-grey-800"
			on:click={clearSearch}
		>
			<Icon src={XMark} class="w-8 h-8 p-0.25 stroke-white" />
		</Button>
	{:else}
		<Button
			variant="square"
			emphasis="secondary"
			title={errorMessage ? errorMessage : 'Find my location'}
			role="search"
			aria-label={errorMessage ? errorMessage : 'Find my location'}
			class="!bg-core-grey-800"
			on:click={startSearch}
		>
			<TargetIcon
				title={errorMessage ? errorMessage : 'Find my location'}
				class="w-8 h-8 p-0.5 stroke-white"
			/>
		</Button>
	{/if}
</div>

{#if errorMessage}
	<Modal bind:isOpen={errorModalOpen} title="Unable to find location" description={errorMessage} />
{/if}
