import { writable } from 'svelte/store';
import type { Feature } from 'geojson';

// TODO: if popover is open, and correspoding layer if closed

export const clickedFeature = writable();
export const clickedLayer = writable();
export const onClickPopoverHandler = (ev: { object: any; layer: { id: any } }) => {
	clickedFeature.set(ev.object);
	clickedLayer.set(ev.layer.id);
};

type MousedOver = {
	layer: undefined | { id: string };
	feature: Feature;
};
export const mousedOverObject = writable<MousedOver | undefined>();

export const onMouseOverTooltipHandler = (ev: any) => {
	mousedOverObject.set({ feature: ev.object, layer: { id: ev.layer.id } });
};
