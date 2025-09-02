import { describe, test, expect } from 'vitest';
import MapCursor from './MapCursor.js';

describe('MapCursor.js', () => {
	function MockMap() {
		const calls = [];

		this.on = (eventType, handler) => {
			calls.push({ function: 'on', eventType, handler });
		};

		this.off = (eventType, handler) => {
			calls.push({ function: 'off', eventType, handler });
		};

		return [this, calls];
	}

	test('Registers and unregisters a handler', () => {
		const [map, calls] = new MockMap();
		const mapCursor = new MapCursor(map);

		const eventType = 'enterFeature';
		const layerId = 'layer-id';
		const handler = () => {};

		mapCursor.on(eventType, layerId, handler);
		mapCursor.off(eventType, layerId, handler);

		expect(calls.length).toEqual(6);

		expect(calls[0].function).toEqual('on');
		expect(calls[1].function).toEqual('on');
		expect(calls[2].function).toEqual('on');

		expect(calls[3].function).toEqual('off');
		expect(calls[4].function).toEqual('off');
		expect(calls[5].function).toEqual('off');
	});

	test('Registers and unregisters a layer', () => {
		const [map, calls] = new MockMap();
		const mapCursor = new MapCursor(map);

		const eventType = 'enterFeature';
		const layerId = 'layer-id';
		const handler = () => {};

		mapCursor.on(eventType, layerId, handler);
		mapCursor.offLayer(layerId);

		expect(calls.length).toEqual(6);

		expect(calls[0].function).toEqual('on');
		expect(calls[1].function).toEqual('on');
		expect(calls[2].function).toEqual('on');

		expect(calls[3].function).toEqual('off');
		expect(calls[4].function).toEqual('off');
		expect(calls[5].function).toEqual('off');
	});
});
