import { describe, test, expect } from 'vitest';
import { get } from 'svelte/store';
import { mousedOverObject, onMouseOverTooltipHandler } from './stores';

describe('mapDeckTooltips stores', () => {
	test('mousedOverObject is undefined before any handler has fired', () => {
		expect(get(mousedOverObject)).toBeUndefined();
	});

	test('onMouseOverTooltipHandler sets mousedOverObject from the event', () => {
		const feature = {
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [0, 0] },
			properties: {}
		};
		const ev = { object: feature, layer: { id: 'my-layer' } };

		onMouseOverTooltipHandler(ev);

		expect(get(mousedOverObject)).toEqual({ feature, layer: { id: 'my-layer' } });
	});
});
