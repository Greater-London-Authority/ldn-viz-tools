import { type Writable, writable } from 'svelte/store';
import type { Feature } from 'geojson';

export const clickedFeature: Writable<Feature | undefined> = writable();
export const clickedLayer = writable('');
// The parameter type accepts deck.gl's `PickingInfo`, so the handler can be a layer's `onClick`.
// Deck.gl calls `onClick` only for a picked layer, so `layer` is not null.
export const onClickPopoverHandler = (ev: { object?: Feature; layer: { id: string } | null }) => {
	clickedFeature.set(ev.object);
	clickedLayer.set(ev.layer!.id);
};
