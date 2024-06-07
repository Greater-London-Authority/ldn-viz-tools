<script>
	/**
	 * The `<MapPopupTooltip>` component encapsulates the standardised map
	 * tooltip styling and behaviour.
	 * @component
	 */

	import MapPopupPlacement from './MapPopupPlacement.svelte';
	import MapPopupStyledContainer from './MapPopupStyledContainer.svelte';

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
