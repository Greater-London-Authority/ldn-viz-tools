<script>
	/**
	 * The `<MapMarkerContainer>` component is a wrapping container for use
	 * within markers components. It encapsulates the standardised map
	 * styling and behaviour.
	 * @component
	 */

	import MapMarkerFlyToFeature from '../mapMarkerFlyToFeature/MapMarkerFlyToFeature.svelte';
	import MapMarkerPlacement from '../mapMarkerPlacement/MapMarkerPlacement.svelte';
	import MapMarkerStyledContainer from '../mapMarkerStyledContainer/MapMarkerStyledContainer.svelte';

	/**
	 * Method to layout and position the popup. Options are 'center', 'follow', or 'none'.
	 */
	export let placement = 'center';

	/**
	 * If `true`, then a styled tip/arrow is not drawn at the bottom of the container.
	 */
	export let noTip = false;

	/**
	 * If `true`, then the standard container padding is not applied.
	 */
	export let noPad = false;

	/**
	 * If `true`, then the map will fly to the feature after the component is mounted.
	 */
	export let flyToFeature = false;
</script>

<MapMarkerFlyToFeature disabled={!flyToFeature}>
	<MapMarkerPlacement {placement}>
		<MapMarkerStyledContainer {noTip} {noPad}>
			<slot />
		</MapMarkerStyledContainer>
	</MapMarkerPlacement>
</MapMarkerFlyToFeature>
