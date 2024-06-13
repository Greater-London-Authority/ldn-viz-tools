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
	 * If true removes the styled tip at the bottom of the container.
	 */
	export let noTip = false;

	/**
	 * If true removes the standard container padding.
	 */
	export let noPad = false;

	/**
	 * If true flys to the feature after component is mounted.
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
