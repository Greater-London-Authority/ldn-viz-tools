import type { Feature } from 'geojson';
import { writable } from 'svelte/store';

type MousedOver = {
	layer: undefined | { id: string };
	feature: Feature;
};
export const mousedOverObject = writable<MousedOver | undefined>();

export const onMouseOverTooltipHandler = (ev: any) => {
	mousedOverObject.set({ feature: ev.object, layer: { id: ev.layer.id } });
};

/**
 * Svelte action that closes any open tooltip when the cursor leaves the element.
 *
 * Deck.gl supports an `onHover` event, but has no equivalent to a onmouseout
 * event. Usually, when the cursor moves off a feature, it moves either onto a
 * different feature or a part of the map canvas that is not covered by a
 * feature; in this case it fires an `onHover` event with no feature, so we
 * know to clear `mousedOverObject`.
 *
 * However, if the map feature extends beyond the edge of the map canvas, the
 * cursor can move off the feature, and out of the map, wihtout triggering
 * another onHover event. This results in map tooltip staying open and
 * following the cursor around the page. The solution is to attach this action
 * to the `div` containing the map.
 */
export const closeTooltipOnLeave = (node: HTMLElement) => {
	const closeTooltip = () => mousedOverObject.set(undefined);

	node.addEventListener('pointerleave', closeTooltip);

	return {
		destroy() {
			node.removeEventListener('pointerleave', closeTooltip);
		}
	};
};
