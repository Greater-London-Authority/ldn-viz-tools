<script lang="ts">
	/**
	 * The `<Geolocator>` component uses the Geolocation API to identify the
	 * users current location.
	 *
	 * Note that user settings and browser implementations of the Geolocation API
	 * mean only simple usage is cross-platform. The problem mostly affects
	 * the querying of, and listening for changes in, permissions.
	 *
	 * @component
	 */

	import { Button, Modal } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import LoadingIndicator from '../loadingIndicator/LoadingIndicator.svelte';
	import TargetIcon from './TargetIcon.svelte';
	import type {
		GeolocationCoords,
		OnGeolocationSearchError,
		OnGeolocationSearchResult
	} from './types';

	interface Props {
		/**
		 * Called when a location is found.
		 */
		onLocationFound: OnGeolocationSearchResult | undefined;
		/**
		 * Called when a location could not be found.
		 */
		onSearchError: OnGeolocationSearchError | undefined;
		/**
		 * The last found location. This will be reset to `null` each time a new search
		 * is started.
		 */
		location?: GeolocationCoords[2] | null;
		/**
		 * Bind to be reactively informed when searching is in progress.
		 */
		isSearching?: boolean;
		/**
		 * If `true`, the search button will be replaced by a clear button.
		 */
		allowClearButton?: boolean;
		/**
		 * Bind to be reactively informed when the clear button is being shown.
		 */
		showClearButton?: boolean;
	}

	let {
		onLocationFound,
		onSearchError,
		location = $bindable(null),
		isSearching = $bindable(false),
		allowClearButton = false,
		showClearButton = $bindable(false)
	}: Props = $props();

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

	let errorMessage = $state('');
	let errorModalOpen = $derived(!!errorMessage);

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

<div class="pointer-events-auto h-10 w-10" aria-live="polite" aria-busy={isSearching}>
	{#if isSearching}
		<div class="h-10 w-10 p-1">
			<LoadingIndicator title="Searching for location..." class="h-8 w-8 stroke-[12] p-0.5" />
		</div>
	{:else if showClearButton}
		<Button
			variant="square"
			emphasis="muted"
			title="Clear location"
			role="search"
			aria-label="Clear location"
			onclick={clearSearch}
			class="dark:border-color-border dark:border"
		>
			<Icon src={XMark} class="p-0.25 h-8 w-8" />
		</Button>
	{:else}
		<Button
			variant="square"
			emphasis="muted"
			title={errorMessage ? errorMessage : 'Find my location'}
			role="search"
			aria-label={errorMessage ? errorMessage : 'Find my location'}
			onclick={startSearch}
			class="dark:border-color-border dark:border"
		>
			<TargetIcon title={errorMessage ? errorMessage : 'Find my location'} class="h-8 w-8 p-0.5" />
		</Button>
	{/if}
</div>

{#if errorMessage}
	<Modal bind:open={errorModalOpen}>
		{#snippet title()}
			Unable to find location.
		{/snippet}

		{#snippet description()}
			{errorMessage}
		{/snippet}
	</Modal>
{/if}
