import { describe, test, expect } from 'vitest';
import HandlerCollection from './HandlerCollection.js';

describe('HandlerCollection.js', () => {
	const entry1 = {
		layerId: 'layer-id-1',
		handler: () => null
	};

	const entry2 = {
		layerId: 'layer-id-2',
		handler: () => null
	};

	const entry3 = {
		layerId: 'layer-id-3',
		handler: () => null
	};

	test('Adds a handler', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterTopFeature', entry1.layerId, entry1.handler);

		const eventEntries = handlers.entries.enterTopFeature;
		expect(eventEntries.length).toEqual(1);
		expect(eventEntries[0].layerId).toEqual(entry1.layerId);
		expect(eventEntries[0].handler).toEqual(entry1.handler);

		expect(handlers.layerIds.length).toEqual(1);
		expect(handlers.layerIds[0]).toEqual(entry1.layerId);
	});

	test('Removes a handler', () => {
		const handlers = new HandlerCollection();

		handlers.entries.enterTopFeature.push(entry1);
		handlers.layerIds.push(entry1.layerId);
		handlers.remove('enterTopFeature', entry1.layerId, entry1.handler);

		expect(handlers.entries.enterTopFeature.length).toEqual(0);
		expect(handlers.layerIds.length).toEqual(0);
	});

	test('Removes the correct handler', () => {
		const handlers = new HandlerCollection();

		handlers.entries.enterTopFeature.push(entry1, entry2, entry3);
		handlers.layerIds.push(entry1.layerId, entry2.layerId, entry3.layerId);

		handlers.remove('enterTopFeature', entry2.layerId, entry2.handler);

		expect(handlers.entries.enterTopFeature.length).toEqual(2);
		expect(handlers.layerIds.length).toEqual(2);
	});

	test('Clears all handlers', () => {
		const handlers = new HandlerCollection();

		handlers.entries.enterTopFeature.push(entry1, entry2, entry3);
		handlers.layerIds.push(entry1.layerId, entry2.layerId, entry3.layerId);

		handlers.clear();

		for (const eventType in handlers.entries) {
			expect(handlers.entries[eventType].length).toEqual(0);
		}
		expect(handlers.layerIds.length).toEqual(0);
	});
});
