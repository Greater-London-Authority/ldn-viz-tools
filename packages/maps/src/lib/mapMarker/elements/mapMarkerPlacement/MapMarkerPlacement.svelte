<script lang="ts">
	/**
	 * The `<MapMarkerPlacement>` component is a wrapping container for use
	 * within marker components. It determines how a map marker is placed
	 * relative to its associated feature.
	 * @component
	 */

	import PlacementCenterAboveFeature from './PlacementCenterAboveFeature.svelte';
	import PlacementFollowMouse from './PlacementFollowMouse.svelte';

	interface Props {
		/**
		 * Method used to position the popup. Options are 'center', 'follow', or 'none'.
		 */
		placement?: 'center' | 'follow' | 'none';
		children?: import('svelte').Snippet;
	}

	let { placement = 'center', children }: Props = $props();
</script>

{#if placement === 'center'}
	<PlacementCenterAboveFeature>
		{@render children?.()}
	</PlacementCenterAboveFeature>
{:else if placement === 'follow'}
	<PlacementFollowMouse>
		{@render children?.()}
	</PlacementFollowMouse>
{:else}
	{@render children?.()}
{/if}
