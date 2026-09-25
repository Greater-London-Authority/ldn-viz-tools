import type { LayerContext, MapViewState, ViewStateChangeParameters } from '@deck.gl/core';

/**
 * Asks whatever controls the view to move it to `position` (`[longitude, latitude]`) at `zoom`.
 *
 * The request is made through the Deck `onViewStateChange` prop. `MapDeckOverlay` handles this by
 * moving the MapLibre map, as the map (rather than deck) controls the view.
 */
export const zoomTo = (context: LayerContext, position: [number, number], zoom: number) => {
	const { viewport, deck } = context;
	const [longitude, latitude] = position;
	const onViewStateChange = deck?.props.onViewStateChange as
		| ((params: ViewStateChangeParameters<MapViewState>) => unknown)
		| undefined;
	onViewStateChange?.({
		viewId: viewport.id,
		viewState: { longitude, latitude, zoom },
		interactionState: {}
	});
};
