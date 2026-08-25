import { describe, test, expect, vi } from 'vitest';
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

	// A second mock, richer than the call-counting `MockMap` above: it actually
	// stores the registered handlers so tests can trigger them, and returns
	// queued `queryRenderedFeatures` results to drive the enter/leave/click
	// feature-diffing logic (the part of this module the call-counting mock
	// above cannot exercise).
	function makeFeature(layerId, id, properties = {}) {
		return { layer: { id: layerId }, id, properties };
	}

	function MockEventMap(queryResults = []) {
		const handlers = {};
		let callIndex = -1;

		this.on = (eventType, handler) => {
			handlers[eventType] = handler;
		};

		this.off = (eventType) => {
			delete handlers[eventType];
		};

		this.trigger = (eventType, event = { point: { x: 0, y: 0 } }) => {
			return handlers[eventType](event);
		};

		this.queryRenderedFeatures = () => {
			callIndex++;
			return queryResults[callIndex] ?? [];
		};
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

	test('fires enterFeature and enterTopFeature for a newly seen feature on mousemove', () => {
		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA]]);
		const mapCursor = new MapCursor(map);

		const enterFeature = vi.fn();
		const enterTopFeature = vi.fn();
		mapCursor.on('enterFeature', 'layer-a', enterFeature);
		mapCursor.on('enterTopFeature', 'layer-a', enterTopFeature);

		map.trigger('mousemove');

		expect(enterFeature).toHaveBeenCalledTimes(1);
		expect(enterFeature.mock.calls[0][1].feature).toBe(featureA);
		expect(enterTopFeature).toHaveBeenCalledTimes(1);
		expect(enterTopFeature.mock.calls[0][1].feature).toBe(featureA);
	});

	test('fires leaveFeature and leaveTopFeature when a feature is no longer under the cursor', () => {
		vi.useFakeTimers();

		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA], []]);
		const mapCursor = new MapCursor(map);

		const leaveFeature = vi.fn();
		const leaveTopFeature = vi.fn();
		mapCursor.on('enterFeature', 'layer-a', () => {});
		mapCursor.on('leaveFeature', 'layer-a', leaveFeature);
		mapCursor.on('leaveTopFeature', 'layer-a', leaveTopFeature);

		map.trigger('mousemove');
		vi.advanceTimersByTime(20);
		map.trigger('mousemove');

		expect(leaveFeature).toHaveBeenCalledTimes(1);
		expect(leaveFeature.mock.calls[0][1].feature).toBe(featureA);
		expect(leaveTopFeature).toHaveBeenCalledTimes(1);
		expect(leaveTopFeature.mock.calls[0][1].feature).toBe(featureA);

		vi.useRealTimers();
	});

	test('fires leaveTopFeature for the old top feature before enterTopFeature for the new one', () => {
		vi.useFakeTimers();

		const featureA = makeFeature('layer-a', 'a');
		const featureB = makeFeature('layer-b', 'b');
		const map = new MockEventMap([[featureA], [featureB]]);
		const mapCursor = new MapCursor(map);

		const order = [];
		mapCursor.on('leaveTopFeature', 'layer-a', () => order.push('leave-a'));
		mapCursor.on('enterTopFeature', 'layer-b', () => order.push('enter-b'));

		map.trigger('mousemove');
		vi.advanceTimersByTime(20);
		map.trigger('mousemove');

		expect(order).toEqual(['leave-a', 'enter-b']);

		vi.useRealTimers();
	});

	test('does not re-fire enterTopFeature/leaveTopFeature when the same feature persists across moves', () => {
		vi.useFakeTimers();

		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA], [featureA]]);
		const mapCursor = new MapCursor(map);

		const enterTopFeature = vi.fn();
		const leaveTopFeature = vi.fn();
		mapCursor.on('enterTopFeature', 'layer-a', enterTopFeature);
		mapCursor.on('leaveTopFeature', 'layer-a', leaveTopFeature);

		map.trigger('mousemove');
		vi.advanceTimersByTime(20);
		map.trigger('mousemove');

		expect(enterTopFeature).toHaveBeenCalledTimes(1);
		expect(leaveTopFeature).not.toHaveBeenCalled();

		vi.useRealTimers();
	});

	test('onClickMap fires clickMap handlers before clickFeature for the current top feature', () => {
		vi.useFakeTimers();

		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA]]);
		const mapCursor = new MapCursor(map);

		const order = [];
		mapCursor.on('enterTopFeature', 'layer-a', () => {});
		mapCursor.on('clickMap', 'layer-a', () => order.push('clickMap'));
		mapCursor.on('clickFeature', 'layer-a', () => order.push('clickFeature'));

		map.trigger('mousemove');
		vi.advanceTimersByTime(20);
		map.trigger('click');

		expect(order).toEqual(['clickMap', 'clickFeature']);

		vi.useRealTimers();
	});

	test('onClickMap does not fire clickFeature when there is no active feature', () => {
		const map = new MockEventMap([[]]);
		const mapCursor = new MapCursor(map);

		const clickFeature = vi.fn();
		mapCursor.on('clickMap', 'layer-a', () => {});
		mapCursor.on('clickFeature', 'layer-a', clickFeature);

		map.trigger('click');

		expect(clickFeature).not.toHaveBeenCalled();
	});

	test('activeFeatures() and topFeature() reflect the most recent mousemove result', () => {
		vi.useFakeTimers();

		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA], []]);
		const mapCursor = new MapCursor(map);
		mapCursor.on('enterFeature', 'layer-a', () => {});

		expect(mapCursor.topFeature()).toBeNull();
		expect(mapCursor.activeFeatures()).toEqual([]);

		map.trigger('mousemove');

		expect(mapCursor.topFeature()).toBe(featureA);
		expect(mapCursor.activeFeatures()).toEqual([featureA]);

		vi.advanceTimersByTime(20);
		map.trigger('mousemove');

		expect(mapCursor.topFeature()).toBeNull();
		expect(mapCursor.activeFeatures()).toEqual([]);

		vi.useRealTimers();
	});

	test('ignores a nested mousemove call while one is already being handled', () => {
		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA], [featureA]]);
		const mapCursor = new MapCursor(map);

		const enterFeature = vi.fn();
		mapCursor.on('enterFeature', 'layer-a', () => {
			enterFeature();
			// Re-entrant call: isHandlingMove is still true at this point, so
			// this nested mousemove must be ignored.
			map.trigger('mousemove');
		});

		map.trigger('mousemove');

		expect(enterFeature).toHaveBeenCalledTimes(1);
	});

	test('ignores a nested click call while one is already being handled', () => {
		const map = new MockEventMap([[]]);
		const mapCursor = new MapCursor(map);

		const clickMap = vi.fn();
		mapCursor.on('clickMap', 'layer-a', () => {
			clickMap();
			// Re-entrant call: isHandlingClick is still true at this point, so
			// this nested click must be ignored.
			map.trigger('click');
		});

		map.trigger('click');

		expect(clickMap).toHaveBeenCalledTimes(1);
	});

	test('destroy() clears handlers and nulls the map reference so later events are ignored', () => {
		const featureA = makeFeature('layer-a', 'a');
		const map = new MockEventMap([[featureA]]);
		const mapCursor = new MapCursor(map);

		const enterFeature = vi.fn();
		mapCursor.on('enterFeature', 'layer-a', enterFeature);

		mapCursor.destroy();
		map.trigger('mousemove');

		expect(enterFeature).not.toHaveBeenCalled();
	});
});
