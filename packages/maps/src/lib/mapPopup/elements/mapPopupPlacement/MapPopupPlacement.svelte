<script>
	/**
	 * The `<MapPopupPlacement>` component is a wrapping container for use
	 * within tooltips and markers components. It determines how a map tooltip or
	 * marker is placed relative to its associated feature.
	 * @component
	 */

	import PlacementCenterOnFeature from './PlacementCenterOnFeature.svelte';
	import PlacementFollowMouse from './PlacementFollowMouse.svelte';

	/**
	 * Method to layout and position the popup. Options are 'center', 'follow', or 'none'.
	 */
	export let placement = 'center';

	if (placement !== 'center' && placement !== 'follow' && placement !== 'none') {
		console.error(`[MapPopupPlacement] Unknown placement type '${placement}'`);
	}
</script>

{#if placement === 'center'}
	<PlacementCenterOnFeature>
		<slot />
	</PlacementCenterOnFeature>
{:else if placement === 'follow'}
	<PlacementFollowMouse>
		<slot />
	</PlacementFollowMouse>
{:else}
	<slot />
{/if}
