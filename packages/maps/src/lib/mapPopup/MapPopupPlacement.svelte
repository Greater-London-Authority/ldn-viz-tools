<script>
	/**
	 * The `<MapPopupPlacement>` component determines how to place a popup
	 * relative to its associated feature.
	 * @component
	 */

	import PlacementCenterOnFeature from './PlacementCenterOnFeature.svelte';
	import PlacementFollowMouse from './PlacementFollowMouse.svelte';

	/**
	 * Method to layout the popup. Either 'center' or 'follow'.
	 */
	export let placement = 'center'; // 'center' | 'follow'

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
