<script lang="ts">
	/**
	 * The `<MapMarkerContainer>` component is a wrapping container for use
	 * within markers components. It encapsulates the standardised map
	 * styling and behaviour.
	 * @component
	 */

	import MapMarkerFlyToFeature from '../mapMarkerFlyToFeature/MapMarkerFlyToFeature.svelte';
	import MapMarkerPlacement from '../mapMarkerPlacement/MapMarkerPlacement.svelte';
	import MapMarkerStyledContainer from '../mapMarkerStyledContainer/MapMarkerStyledContainer.svelte';

	interface Props {
		/**
		 * Method used to position the popup. Options are 'center', 'follow', or 'none'.
		 */
		placement?: string;
		/**
		 * If `true`, then a styled tip/arrow is not drawn at the bottom of the container.
		 */
		noTip?: boolean;
		/**
		 * If `true`, then the standard container padding is not applied.
		 */
		noPad?: boolean;
		/**
		 * If `true`, then the map will fly to the feature after the component is mounted.
		 */
		flyToFeature?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		placement = 'center',
		noTip = false,
		noPad = false,
		flyToFeature = false,
		children
	}: Props = $props();
</script>

<MapMarkerFlyToFeature disabled={!flyToFeature}>
	<MapMarkerPlacement {placement}>
		<MapMarkerStyledContainer {noTip} {noPad}>
			{@render children?.()}
		</MapMarkerStyledContainer>
	</MapMarkerPlacement>
</MapMarkerFlyToFeature>
