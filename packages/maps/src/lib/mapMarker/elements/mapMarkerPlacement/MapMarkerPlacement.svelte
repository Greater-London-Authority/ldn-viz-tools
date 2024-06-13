<script>
	/**
	 * The `<MapMarkerPlacement>` component is a wrapping container for use
	 * within marker components. It determines how a map marker is placed
	 * relative to its associated feature.
	 * @component
	 */

	import PlacementCenterAboveFeature from './PlacementCenterAboveFeature.svelte';
	import PlacementFollowMouse from './PlacementFollowMouse.svelte';

	/**
	 * Method to layout and position the popup. Options are 'center', 'follow', or 'none'.
	 */
	export let placement = 'center';

	if (placement !== 'center' && placement !== 'follow' && placement !== 'none') {
		console.error(`[MapMarkerPlacement] Unknown placement type '${placement}'`);
	}
</script>

{#if placement === 'center'}
	<PlacementCenterAboveFeature>
		<slot />
	</PlacementCenterAboveFeature>
{:else if placement === 'follow'}
	<PlacementFollowMouse>
		<slot />
	</PlacementFollowMouse>
{:else}
	<slot />
{/if}
