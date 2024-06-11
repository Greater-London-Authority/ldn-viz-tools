<script>
	/**
	 * The `<MapPopupTooltip>` component encapsulates the standardised map
	 * tooltip styling and behaviour.
	 * @component
	 */

	import MapPopupPlacement from '../mapPopupPlacement/MapPopupPlacement.svelte';
	import MapPopupStyledContainer from '../mapPopupStyledContainer/MapPopupStyledContainer.svelte';

	/**
	 * Method to layout the popup. Either 'center' or 'follow'.
	 */
	export let placement = 'center';
</script>

<MapPopupPlacement {placement}>
	<MapPopupStyledContainer {...$$restProps}>
		<slot />
	</MapPopupStyledContainer>
</MapPopupPlacement>
