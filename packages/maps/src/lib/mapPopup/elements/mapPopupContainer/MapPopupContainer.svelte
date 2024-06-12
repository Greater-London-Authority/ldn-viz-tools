<script>
	/**
	 * The `<MapPopupContainer>` component is a wrapping container for use
	 * within tooltip and marker components. It encapsulates the standardised map
	 * styling and behaviour for popups.
	 * @component
	 */

	import MapPopupFlyToFeature from '../mapPopupFlyToFeature/MapPopupFlyToFeature.svelte';
	import MapPopupPlacement from '../mapPopupPlacement/MapPopupPlacement.svelte';
	import MapPopupStyledContainer from '../mapPopupStyledContainer/MapPopupStyledContainer.svelte';

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

<MapPopupFlyToFeature disabled={!flyToFeature}>
	<MapPopupPlacement {placement}>
		<MapPopupStyledContainer {noTip} {noPad}>
			<slot />
		</MapPopupStyledContainer>
	</MapPopupPlacement>
</MapPopupFlyToFeature>
