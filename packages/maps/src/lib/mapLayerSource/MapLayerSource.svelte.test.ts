import { createRawSnippet } from 'svelte';
import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { writable } from 'svelte/store';
import MapLayerSource from './MapLayerSource.svelte';

describe('MapLayerSource', () => {
	function createMockMap({ existingLayers = [], hasSource = false } = {}) {
		return {
			addSource: vi.fn(),
			removeSource: vi.fn(),
			addLayer: vi.fn(),
			removeLayer: vi.fn(),
			getSource: vi.fn(() => hasSource),
			getStyle: vi.fn(() => ({ layers: existingLayers }))
		};
	}

	function childrenSnippet(text = 'child content') {
		return createRawSnippet(() => ({
			render: () => `<span>${text}</span>`,
			setup: () => {}
		}));
	}

	test('calls addSource(id, safeSpec) once $mapStore is truthy, and renders children once loaded', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const spec = { type: 'geojson', data: { type: 'FeatureCollection', features: [] } };

		render(MapLayerSource, {
			props: { id: 'my-source', spec, children: childrenSnippet() },
			context: new Map([['mapStore', mapStore]])
		});

		await vi.waitFor(() => expect(mockMap.addSource).toHaveBeenCalledTimes(1));
		expect(mockMap.addSource).toHaveBeenCalledWith(
			'my-source',
			expect.objectContaining({ type: 'geojson' })
		);

		// Children are only rendered once the internal `loaded` store (also
		// exposed as `mapLayerSourceLoaded` context) becomes true.
		await expect.element(page.getByText('child content')).toBeInTheDocument();
	});

	test('does not call addSource and does not render children while $mapStore is falsy', async () => {
		const mapStore = writable(null);
		const spec = { type: 'geojson', data: { type: 'FeatureCollection', features: [] } };

		render(MapLayerSource, {
			props: { id: 'my-source', spec, children: childrenSnippet() },
			context: new Map([['mapStore', mapStore]])
		});

		await expect.element(page.getByText('child content')).not.toBeInTheDocument();
	});

	test('safeSpec passed to addSource is a frozen clone, unaffected by later mutation of the original spec', async () => {
		// NOTE ON `generateId`: per the source, `safeSpec = structuredClone(spec)`
		// runs *before* `spec.generateId = true`, so it is the original `spec`
		// prop (bindable, mutated in place) that ends up with `generateId: true`
		// - not `safeSpec`, the frozen clone that is actually handed to
		// `addSource`. This test documents the verified, actual behaviour of
		// the component rather than the (incorrect, w.r.t. `safeSpec`)
		// description in SUGGESTED_TESTS.md; per task instructions the
		// component source is not modified to "fix" this.
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const spec: { type: string; data: unknown; generateId?: boolean; extra?: string } = {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: [] }
		};

		render(MapLayerSource, {
			props: { id: 'my-source', spec },
			context: new Map([['mapStore', mapStore]])
		});

		await vi.waitFor(() => expect(mockMap.addSource).toHaveBeenCalledTimes(1));

		const [, safeSpec] = mockMap.addSource.mock.calls[0];
		expect(Object.isFrozen(safeSpec)).toBe(true);

		// The original (bindable) `spec` prop is mutated in place to force
		// `generateId: true`, even though the input didn't set it.
		expect(spec.generateId).toBe(true);

		// Mutate the original object passed in as `spec` after the call - the
		// spec captured by addSource must be unaffected (it was cloned before
		// the mutation, and is frozen).
		spec.extra = 'mutated-after-the-fact';
		expect(safeSpec.extra).toBeUndefined();
		expect(() => {
			safeSpec.extra = 'should not be settable';
		}).toThrow();
	});

	test('onLoad is called with { id, spec } when the source loads', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const onLoad = vi.fn();
		const spec = { type: 'geojson', data: { type: 'FeatureCollection', features: [] } };

		render(MapLayerSource, {
			props: { id: 'my-source', spec, onLoad },
			context: new Map([['mapStore', mapStore]])
		});

		await vi.waitFor(() => expect(onLoad).toHaveBeenCalledTimes(1));
		expect(onLoad).toHaveBeenCalledWith({
			id: 'my-source',
			spec: expect.objectContaining({ type: 'geojson' })
		});
	});

	test('unmounting removes layers prefixed `${id}/` before removing the source, and fires onUnload with { id, spec }', async () => {
		const existingLayers = [
			{ id: 'my-source/fill' },
			{ id: 'my-source/outline' },
			{ id: 'other-source/fill' }
		];
		const mockMap = createMockMap({ existingLayers, hasSource: true });
		const mapStore = writable(mockMap);
		const onUnload = vi.fn();
		const spec = { type: 'geojson', data: { type: 'FeatureCollection', features: [] } };

		const { unmount } = render(MapLayerSource, {
			props: { id: 'my-source', spec, onUnload },
			context: new Map([['mapStore', mapStore]])
		});

		await vi.waitFor(() => expect(mockMap.addSource).toHaveBeenCalledTimes(1));

		// Clear history from the initial load - because `getSource` is stubbed
		// to always report a pre-existing source, the very first `doLoad` also
		// exercises `removeSource`/`removeLayer`. Clearing keeps the
		// assertions below scoped to the unload triggered by unmounting.
		mockMap.removeLayer.mockClear();
		mockMap.removeSource.mockClear();

		const callOrder: string[] = [];
		mockMap.removeLayer.mockImplementation((layerId: string) =>
			callOrder.push(`removeLayer:${layerId}`)
		);
		mockMap.removeSource.mockImplementation((sourceId: string) =>
			callOrder.push(`removeSource:${sourceId}`)
		);

		// Unmounting runs onDestroy(doUnload) while $mapStore is still truthy,
		// which is the scenario where removeSource actually removes anything.
		unmount();

		expect(onUnload).toHaveBeenCalledTimes(1);
		expect(onUnload).toHaveBeenCalledWith({
			id: 'my-source',
			spec: expect.objectContaining({ type: 'geojson' })
		});

		expect(mockMap.removeLayer).toHaveBeenCalledWith('my-source/fill');
		expect(mockMap.removeLayer).toHaveBeenCalledWith('my-source/outline');
		expect(mockMap.removeLayer).not.toHaveBeenCalledWith('other-source/fill');
		expect(mockMap.removeSource).toHaveBeenCalledWith('my-source');

		// Layers must be removed before the source itself.
		expect(callOrder).toEqual([
			'removeLayer:my-source/fill',
			'removeLayer:my-source/outline',
			'removeSource:my-source'
		]);
	});
});
