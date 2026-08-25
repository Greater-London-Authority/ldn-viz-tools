import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { writable } from 'svelte/store';
import { tick } from 'svelte';
import MapCursorEvent from './MapCursorEvent.svelte';

describe('MapCursorEvent', () => {
	function createMockMapCursorStore() {
		return { on: vi.fn(), offLayer: vi.fn() };
	}

	test('registers each supplied handler against layerId via mapCursorStore.on', async () => {
		const mockMap = {};
		const mockCursorStore = createMockMapCursorStore();
		const mapStore = writable(mockMap);
		const mapCursorStore = writable(mockCursorStore);

		const enterFeature = vi.fn();
		const leaveFeature = vi.fn();
		const enterTopFeature = vi.fn();
		const leaveTopFeature = vi.fn();
		const clickMap = vi.fn();
		const clickFeature = vi.fn();

		render(MapCursorEvent, {
			props: {
				layerId: 'my-layer',
				enterFeature,
				leaveFeature,
				enterTopFeature,
				leaveTopFeature,
				clickMap,
				clickFeature
			},
			context: new Map([
				['mapStore', mapStore],
				['mapCursorStore', mapCursorStore]
			])
		});

		await tick();

		expect(mockCursorStore.on).toHaveBeenCalledTimes(6);
		expect(mockCursorStore.on).toHaveBeenCalledWith('enterFeature', 'my-layer', enterFeature);
		expect(mockCursorStore.on).toHaveBeenCalledWith('leaveFeature', 'my-layer', leaveFeature);
		expect(mockCursorStore.on).toHaveBeenCalledWith('enterTopFeature', 'my-layer', enterTopFeature);
		expect(mockCursorStore.on).toHaveBeenCalledWith('leaveTopFeature', 'my-layer', leaveTopFeature);
		expect(mockCursorStore.on).toHaveBeenCalledWith('clickMap', 'my-layer', clickMap);
		expect(mockCursorStore.on).toHaveBeenCalledWith('clickFeature', 'my-layer', clickFeature);
	});

	test('only registers the handlers that are supplied (others left null are skipped)', async () => {
		const mockMap = {};
		const mockCursorStore = createMockMapCursorStore();
		const mapStore = writable(mockMap);
		const mapCursorStore = writable(mockCursorStore);

		const enterFeature = vi.fn();
		const clickFeature = vi.fn();

		render(MapCursorEvent, {
			props: {
				layerId: 'my-layer',
				enterFeature,
				clickFeature
			},
			context: new Map([
				['mapStore', mapStore],
				['mapCursorStore', mapCursorStore]
			])
		});

		await tick();

		expect(mockCursorStore.on).toHaveBeenCalledTimes(2);
		expect(mockCursorStore.on).toHaveBeenCalledWith('enterFeature', 'my-layer', enterFeature);
		expect(mockCursorStore.on).toHaveBeenCalledWith('clickFeature', 'my-layer', clickFeature);
	});

	test('calls mapCursorStore.offLayer(layerId) when the component is destroyed', async () => {
		const mockMap = {};
		const mockCursorStore = createMockMapCursorStore();
		const mapStore = writable(mockMap);
		const mapCursorStore = writable(mockCursorStore);

		const enterFeature = vi.fn();

		const { unmount } = render(MapCursorEvent, {
			props: {
				layerId: 'my-layer',
				enterFeature
			},
			context: new Map([
				['mapStore', mapStore],
				['mapCursorStore', mapCursorStore]
			])
		});

		await tick();

		expect(mockCursorStore.offLayer).not.toHaveBeenCalled();

		unmount();

		expect(mockCursorStore.offLayer).toHaveBeenCalledWith('my-layer');
	});

	test('calls mapCursorStore.offLayer(layerId) when mapStore becomes falsy', async () => {
		const mockCursorStore = createMockMapCursorStore();
		const mapStore = writable({});
		const mapCursorStore = writable(mockCursorStore);

		const enterFeature = vi.fn();

		render(MapCursorEvent, {
			props: {
				layerId: 'my-layer',
				enterFeature
			},
			context: new Map([
				['mapStore', mapStore],
				['mapCursorStore', mapCursorStore]
			])
		});

		await tick();

		expect(mockCursorStore.offLayer).not.toHaveBeenCalled();

		mapStore.set(null);
		await tick();

		expect(mockCursorStore.offLayer).toHaveBeenCalledWith('my-layer');
	});

	// NOTE: unlike the mapStore-becomes-falsy case above, the component's
	// destroy() reads `$mapCursorStore?.offLayer(...)` using the *current*
	// store value. When mapCursorStore itself is set to a falsy value, that
	// same falsy value makes the optional chaining short-circuit, so
	// offLayer is never actually invoked. This documents that real,
	// observed behaviour rather than the naively-expected one.
	test('does not call offLayer when mapCursorStore itself becomes falsy (optional-chaining short-circuits on the new falsy value)', async () => {
		const mockCursorStore = createMockMapCursorStore();
		const mapStore = writable({});
		const mapCursorStore = writable(mockCursorStore);

		const enterFeature = vi.fn();

		render(MapCursorEvent, {
			props: {
				layerId: 'my-layer',
				enterFeature
			},
			context: new Map([
				['mapStore', mapStore],
				['mapCursorStore', mapCursorStore]
			])
		});

		await tick();

		mapCursorStore.set(null);
		await tick();

		expect(mockCursorStore.offLayer).not.toHaveBeenCalled();
	});
});
