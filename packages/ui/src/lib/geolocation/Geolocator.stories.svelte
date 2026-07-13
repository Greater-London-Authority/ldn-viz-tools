<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Geolocator from './Geolocator.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Geolocator',
		component: Geolocator,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	import type { Geolocation, OnGeolocationSearchError, OnGeolocationSearchResult } from './types';

	const onLocationFound: OnGeolocationSearchResult = (location: Geolocation) => {
		console.log('location found', location);
	};

	const onSearchError: OnGeolocationSearchError = (err) => {
		console.error(err);
	};

	// For the "Error modal" story we grab the component instance so we can drive
	// its exported `startSearch`, and mock the browser Geolocation API so it
	// rejects with a permission-denied error instead of prompting the user.
	let geolocator: any = $state();

	const simulateError = () => {
		try {
			(navigator.geolocation as any).getCurrentPosition = (_success: any, error: any) => {
				error({
					code: 1,
					PERMISSION_DENIED: 1,
					POSITION_UNAVAILABLE: 2,
					TIMEOUT: 3,
					message: 'User denied Geolocation'
				});
			};
		} catch (e) {
			console.error('Could not mock navigator.geolocation', e);
		}
		geolocator?.startSearch();
	};
</script>

<!--
The resting state showing the `TargetIcon` "Find my location" button. 
Clicking it invokes	the real browser Geolocation API.-->
<Story name="Default (idle)">
	{#snippet template()}
		<div class="m-6 space-y-6">
			<Geolocator {onLocationFound} {onSearchError} />
		</div>
	{/snippet}
</Story>

<!--
Binding `isSearching` to `true` shows the `LoadingIndicator` state while a location lookup is in progress.
-->
<Story name="Searching">
	{#snippet template()}
		<div class="m-6 space-y-6">
			<Geolocator {onLocationFound} {onSearchError} isSearching={true} />
		</div>
	{/snippet}
</Story>

<!--
With `allowClearButton` enabled and `showClearButton` set to `true`,
the search button is replaced by a clear (X) button. 
licking it clears the location and reverts to the idle button.
-->
<Story name="Clear button">
	{#snippet template()}
		<div class="m-6 space-y-6">
			<Geolocator
				{onLocationFound}
				{onSearchError}
				allowClearButton={true}
				showClearButton={true}
			/>
		</div>
	{/snippet}
</Story>

<!--
When the Geolocation API reports permission-denied or a timeout, an error `<Modal>` is shown.
This story mocks the browser API to reject, then triggers a search.
-->
<Story name="Error modal">
	{#snippet template()}
		<div class="m-6 space-y-6">
			<p></p>
			<p>Press "Simulate permission denied" to open the error modal.</p>
			<button
				type="button"
				class="rounded border border-color-border px-3 py-1 text-color-text"
				onclick={simulateError}
			>
				Simulate permission denied
			</button>
			<Geolocator bind:this={geolocator} {onLocationFound} {onSearchError} />
		</div>
	{/snippet}
</Story>
