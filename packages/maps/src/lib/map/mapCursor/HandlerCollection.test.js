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

	test('findAll with no layerId returns all entries for that event type', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterFeature', entry1.layerId, entry1.handler);
		handlers.add('enterFeature', entry2.layerId, entry2.handler);

		const results = handlers.findAll('enterFeature');

		expect(results.length).toEqual(2);
	});

	test('findAll with a layerId filters to matching entries only', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterFeature', entry1.layerId, entry1.handler);
		handlers.add('enterFeature', entry2.layerId, entry2.handler);

		const results = handlers.findAll('enterFeature', entry1.layerId);

		expect(results.length).toEqual(1);
		expect(results[0].layerId).toEqual(entry1.layerId);
	});

	test('size() reflects the number of unique layer ids, not the total entry count', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterFeature', entry1.layerId, entry1.handler);
		handlers.add('leaveFeature', entry1.layerId, () => null);
		handlers.add('clickMap', entry2.layerId, () => null);

		expect(handlers.size()).toEqual(2);
	});

	test('add throws for an empty-string or non-string layerId', () => {
		const handlers = new HandlerCollection();

		expect(() => handlers.add('enterFeature', '', entry1.handler)).toThrow(
			/Missing layer ID or invalid type/
		);
		expect(() => handlers.add('enterFeature', 123, entry1.handler)).toThrow(
			/Missing layer ID or invalid type/
		);
	});

	test('add throws for an unknown event type', () => {
		const handlers = new HandlerCollection();

		expect(() => handlers.add('notAnEventType', entry1.layerId, entry1.handler)).toThrow(
			/Unknown event type/
		);
	});

	test('add throws for a non-function handler', () => {
		const handlers = new HandlerCollection();

		expect(() => handlers.add('enterFeature', entry1.layerId, 'not-a-function')).toThrow(
			/Missing handler or invalid type/
		);
	});

	test('adding the same eventType/layerId/handler twice does not create a duplicate entry', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterFeature', entry1.layerId, entry1.handler);
		handlers.add('enterFeature', entry1.layerId, entry1.handler);

		expect(handlers.entries.enterFeature.length).toEqual(1);
	});

	test('layerIds stays de-duplicated when the same layerId is registered under multiple event types', () => {
		const handlers = new HandlerCollection();

		handlers.add('enterFeature', entry1.layerId, entry1.handler);
		handlers.add('leaveFeature', entry1.layerId, () => null);

		expect(handlers.layerIds).toEqual([entry1.layerId]);
	});
});
