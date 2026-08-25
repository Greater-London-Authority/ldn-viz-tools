import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { writable } from 'svelte/store';
import GeoJSONMapLayerSource from './GeoJSONMapLayerSource.svelte';

describe('GeoJSONMapLayerSource', () => {
	function createMockMap() {
		const sourceObj = { setData: vi.fn() };
		return {
			addSource: vi.fn(),
			removeSource: vi.fn(),
			removeLayer: vi.fn(),
			getSource: vi.fn(() => sourceObj),
			getStyle: vi.fn(() => ({ layers: [] })),
			sourceObj
		};
	}

	function makeContext(mockMap = createMockMap()) {
		const mapStore = writable(mockMap);
		return { context: new Map<string, unknown>([['mapStore', mapStore]]), mapStore, mockMap };
	}

	let originalFetch: typeof globalThis.fetch;

	beforeEach(() => {
		originalFetch = globalThis.fetch;
	});

	afterEach(() => {
		globalThis.fetch = originalFetch;
		vi.restoreAllMocks();
	});

	test('without a url, onLoad fires immediately with initialData (no fetch)', async () => {
		globalThis.fetch = vi.fn();
		const { context, mockMap } = makeContext();
		const onLoad = vi.fn();
		const initialData = { type: 'FeatureCollection', features: [{ id: 'a' }] };

		render(GeoJSONMapLayerSource, {
			props: { id: 'my-source', initialData, onLoad },
			context
		});

		await vi.waitFor(() => expect(onLoad).toHaveBeenCalledTimes(1));

		expect(globalThis.fetch).not.toHaveBeenCalled();
		expect(onLoad).toHaveBeenCalledWith(
			expect.objectContaining({
				id: 'my-source',
				geojson: initialData
			})
		);
		expect(mockMap.addSource).toHaveBeenCalledTimes(1);
	});

	test('with a url: fetches, applies transform, updates the data store (setData), then fires onLoad with transformed geojson', async () => {
		const rawGeojson = { type: 'FeatureCollection', features: [{ id: 1 }] };
		const transformedGeojson = { ...rawGeojson, transformed: true };
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ json: () => Promise.resolve(rawGeojson) } as Response)
		);
		const transform = vi.fn(() => transformedGeojson);

		const { context, mockMap } = makeContext();
		const onLoad = vi.fn();

		render(GeoJSONMapLayerSource, {
			props: { id: 'my-source', url: 'https://example.test/data.geojson', transform, onLoad },
			context
		});

		await vi.waitFor(() => expect(onLoad).toHaveBeenCalledTimes(1));

		expect(globalThis.fetch).toHaveBeenCalledWith('https://example.test/data.geojson');
		expect(transform).toHaveBeenCalledWith(rawGeojson);

		// The internal data store is applied to the map source via `setData`.
		expect(mockMap.sourceObj.setData).toHaveBeenCalledWith(transformedGeojson);

		expect(onLoad).toHaveBeenCalledWith(
			expect.objectContaining({
				id: 'my-source',
				geojson: transformedGeojson
			})
		);
	});

	test('a fetch response with an `error` field calls onError(err, ctx) instead of onLoad', async () => {
		globalThis.fetch = vi.fn(() =>
			Promise.resolve({ json: () => Promise.resolve({ error: 'boom' }) } as Response)
		);
		const { context } = makeContext();
		const onLoad = vi.fn();
		const onError = vi.fn();

		render(GeoJSONMapLayerSource, {
			props: { id: 'my-source', url: 'https://example.test/data.geojson', onLoad, onError },
			context
		});

		await vi.waitFor(() => expect(onError).toHaveBeenCalledTimes(1));

		expect(onLoad).not.toHaveBeenCalled();
		expect(onError).toHaveBeenCalledWith('boom', expect.objectContaining({ id: 'my-source' }));
	});

	test('a rejected fetch calls onError(err, ctx) instead of onLoad', async () => {
		const fetchError = new Error('network failure');
		globalThis.fetch = vi.fn(() => Promise.reject(fetchError));
		const { context } = makeContext();
		const onLoad = vi.fn();
		const onError = vi.fn();

		render(GeoJSONMapLayerSource, {
			props: { id: 'my-source', url: 'https://example.test/data.geojson', onLoad, onError },
			context
		});

		await vi.waitFor(() => expect(onError).toHaveBeenCalledTimes(1));

		expect(onLoad).not.toHaveBeenCalled();
		expect(onError).toHaveBeenCalledWith(fetchError, expect.objectContaining({ id: 'my-source' }));
	});

	test('when no onError is supplied, a fetch error is logged via console.error instead', async () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		const fetchError = new Error('network failure');
		globalThis.fetch = vi.fn(() => Promise.reject(fetchError));
		const { context } = makeContext();
		const onLoad = vi.fn();

		render(GeoJSONMapLayerSource, {
			props: { id: 'my-source', url: 'https://example.test/data.geojson', onLoad },
			context
		});

		await vi.waitFor(() => expect(consoleErrorSpy).toHaveBeenCalledTimes(1));

		expect(onLoad).not.toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith(fetchError);
	});
});
