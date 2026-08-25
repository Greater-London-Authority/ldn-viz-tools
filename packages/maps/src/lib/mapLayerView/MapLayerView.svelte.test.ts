import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { writable } from 'svelte/store';
import MapLayerView from './MapLayerView.svelte';

// `MapMarker.svelte`'s real internals need a `mapCursorStore` context, real
// MapLibre popups, and never render distinguishable static DOM (it only
// creates a popup on hover/click). Mocking it with a recognizable stub lets
// us assert on *whether* `MapLayerView` renders a marker, without coupling
// to `MapMarker`'s own implementation (which is covered by its own tests).
vi.mock('../mapMarker/MapMarker.svelte', async () => {
	const stub = await import('./MapMarkerTestStub.svelte');
	return stub;
});

describe('MapLayerView', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	function createMockMap() {
		return {
			addLayer: vi.fn(),
			removeLayer: vi.fn(),
			getLayer: vi.fn(() => false)
		};
	}

	function makeContext({
		mapStoreValue = createMockMap(),
		sourceId = 'my-source',
		sourceLoaded = false
	} = {}) {
		const mapStore = writable(mapStoreValue);
		const mapLayerSourceLoaded = writable(sourceLoaded);
		const context = new Map<string, unknown>([
			['mapStore', mapStore],
			['mapLayerSourceId', sourceId],
			['mapLayerSourceLoaded', mapLayerSourceLoaded]
		]);
		return { mapStore, mapLayerSourceLoaded, context, mockMap: mapStoreValue };
	}

	test('does not call addLayer while mapLayerSourceLoaded is false', async () => {
		const mockMap = createMockMap();
		const { context } = makeContext({ mapStoreValue: mockMap, sourceLoaded: false });

		render(MapLayerView, {
			props: { id: 'my-layer', spec: { type: 'fill' } },
			context
		});

		expect(mockMap.addLayer).not.toHaveBeenCalled();
	});

	test('calls addLayer(safeSpec, beforeId) once mapLayerSourceLoaded becomes true, with safeSpec.id/source from props/context', async () => {
		const mockMap = createMockMap();
		const { context, mapLayerSourceLoaded } = makeContext({
			mapStoreValue: mockMap,
			sourceId: 'my-source',
			sourceLoaded: false
		});

		render(MapLayerView, {
			props: {
				id: 'my-layer',
				spec: { type: 'fill', paint: { 'fill-color': 'red' } },
				beforeId: 'above-layer'
			},
			context
		});

		expect(mockMap.addLayer).not.toHaveBeenCalled();

		mapLayerSourceLoaded.set(true);

		await vi.waitFor(() => expect(mockMap.addLayer).toHaveBeenCalledTimes(1));

		const [safeSpec, beforeId] = mockMap.addLayer.mock.calls[0];
		expect(beforeId).toBe('above-layer');
		expect(safeSpec.id).toBe('my-layer');
		expect(safeSpec.source).toBe('my-source');
		expect(safeSpec.type).toBe('fill');
		expect(Object.isFrozen(safeSpec)).toBe(true);
	});

	test('does not render a MapMarker when neither tooltip nor popup is supplied', async () => {
		const { context } = makeContext({ sourceLoaded: true });

		render(MapLayerView, {
			props: { id: 'my-layer', spec: { type: 'fill' } },
			context
		});

		await expect.element(page.getByTestId('map-marker-stub')).not.toBeInTheDocument();
	});

	test('renders a MapMarker when a tooltip is supplied', async () => {
		const { context } = makeContext({ sourceLoaded: true });
		const tooltip = { component: 'fake-tooltip' };

		render(MapLayerView, {
			props: { id: 'my-layer', spec: { type: 'fill' }, tooltip },
			context
		});

		const marker = page.getByTestId('map-marker-stub');
		await expect.element(marker).toBeInTheDocument();
		await expect.element(marker).toHaveAttribute('data-has-tooltip', 'true');
		await expect.element(marker).toHaveAttribute('data-has-popup', 'false');
		await expect.element(marker).toHaveAttribute('data-layer-id', 'my-layer');
	});

	test('renders a MapMarker when a popup is supplied', async () => {
		const { context } = makeContext({ sourceLoaded: true });
		const popup = { component: 'fake-popup' };

		render(MapLayerView, {
			props: { id: 'my-layer', spec: { type: 'fill' }, popup },
			context
		});

		const marker = page.getByTestId('map-marker-stub');
		await expect.element(marker).toBeInTheDocument();
		await expect.element(marker).toHaveAttribute('data-has-tooltip', 'false');
		await expect.element(marker).toHaveAttribute('data-has-popup', 'true');
	});
});
