<script>
	/**
	 * The `<MapPopupMarker>` component encapsulates the standardised map
	 * marker styling and behaviour.
	 * @component
	 */

	import MapPopupFlyToFeature from './MapPopupFlyToFeature.svelte';
	import MapPopupPlacement from './MapPopupPlacement.svelte';
	import MapPopupStyledContainer from './MapPopupStyledContainer.svelte';

	/**
	 * Method to layout the popup. Either 'center' or 'follow'.
	 */
	export let placement = 'center';
</script>

<MapPopupFlyToFeature>
	<MapPopupPlacement {placement}>
		<MapPopupStyledContainer {...$$restProps}>
			<slot />
		</MapPopupStyledContainer>
	</MapPopupPlacement>
</MapPopupFlyToFeature>
