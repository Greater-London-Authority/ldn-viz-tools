import { type Writable, writable } from 'svelte/store';
import type { Feature } from 'geojson';

export const clickedFeature: Writable<Feature  | undefined> = writable();
export const clickedLayer = writable("");
export const onClickPopoverHandler = (ev: { object: any; layer: { id: any } }) => {
	clickedFeature.set(ev.object);
	clickedLayer.set(ev.layer.id);
};
