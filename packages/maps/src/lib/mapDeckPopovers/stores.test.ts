import { describe, test, expect } from 'vitest';
import { get } from 'svelte/store';
import { clickedFeature, clickedLayer, onClickPopoverHandler } from './stores';

describe('mapDeckPopovers stores', () => {
	test('clickedFeature and clickedLayer are undefined/empty before any handler has fired', () => {
		expect(get(clickedFeature)).toBeUndefined();
		expect(get(clickedLayer)).toEqual('');
	});

	test('onClickPopoverHandler sets clickedFeature and clickedLayer from the event', () => {
		const feature = {
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [0, 0] },
			properties: {}
		};
		const ev = { object: feature, layer: { id: 'my-layer' } };

		onClickPopoverHandler(ev);

		expect(get(clickedFeature)).toBe(feature);
		expect(get(clickedLayer)).toEqual('my-layer');
	});
});
