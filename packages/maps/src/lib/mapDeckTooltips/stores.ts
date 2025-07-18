import { writable } from 'svelte/store';
import type { Feature } from 'geojson';

type MousedOver = {
	layer: undefined | { id: string };
	feature: Feature;
};
export const mousedOverObject = writable<MousedOver | undefined>();

export const onMouseOverTooltipHandler = (ev: any) => {
	mousedOverObject.set({ feature: ev.object, layer: { id: ev.layer.id } });
};
