<script>
	/**
	 * The `<MapPopupMarker>` component is a wrapping container for use
	 * within tooltip and marker components. It encapsulates the standardised map
	 * marker styling and behaviour.
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
</script>

<MapPopupFlyToFeature>
	<MapPopupPlacement {placement}>
		<MapPopupStyledContainer {noTip} {noPad}>
			<slot />
		</MapPopupStyledContainer>
	</MapPopupPlacement>
</MapPopupFlyToFeature>
