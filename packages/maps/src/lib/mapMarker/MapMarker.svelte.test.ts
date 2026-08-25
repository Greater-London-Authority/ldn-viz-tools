import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { writable } from 'svelte/store';
import { tick } from 'svelte';
import MapMarker from './MapMarker.svelte';
import ContextProbe from './ContextProbe.svelte';

const popupInstances: any[] = [];

// Note: in the browser test project, `import maplibre_gl from 'maplibre-gl'`
// resolves the default import directly to this factory's return value (there
// is no `default`-unwrapping the way there is for the plain-node "server"
// project used by e.g. map-layer.test.ts) - so the mocked members are
// returned at the top level here, not nested under a `default` key.
vi.mock('maplibre-gl', () => {
	return {
		Popup: vi.fn().mockImplementation(function () {
			const instance = {
				setDOMContent: vi.fn(),
				setLngLat: vi.fn(),
				addTo: vi.fn(),
				remove: vi.fn()
			};
			instance.setDOMContent.mockReturnValue(instance);
			instance.setLngLat.mockReturnValue(instance);
			instance.addTo.mockReturnValue(instance);
			popupInstances.push(instance);
			return instance;
		})
	};
});

describe('MapMarker', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		popupInstances.length = 0;
	});

	function makeFeature(layerId: string, id?: string | number, properties: any = {}) {
		return { layer: { id: layerId }, id, properties };
	}

	function createMockMap() {
		const canvas = { style: { cursor: '' } };
		return {
			getCanvas: vi.fn(() => canvas),
			addControl: vi.fn(),
			removeControl: vi.fn()
		};
	}

	// A rich mock of `mapCursorStore`: real `MapCursor`/`MapCursorEvent` glue is
	// not under test here, only that `MapMarker`'s own handlers behave
	// correctly once invoked. So this mock simply records whichever handler
	// each event type is registered with (via `.on`), letting the tests call
	// `enterTopFeature`/`leaveTopFeature`/`clickFeature`/`clickMap` directly to
	// simulate MapCursor firing them.
	function createMockMapCursorStore() {
		const handlers: Record<string, (...args: any[]) => void> = {};
		const store = {
			on: vi.fn((eventType: string, _layerId: string, handler: (...args: any[]) => void) => {
				handlers[eventType] = handler;
			}),
			offLayer: vi.fn()
		};
		return { store, handlers };
	}

	async function renderMapMarker(props: Record<string, unknown>) {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const { store: mapCursorStoreValue, handlers } = createMockMapCursorStore();
		const mapCursorStore = writable(mapCursorStoreValue);

		const mounts: any[] = [];
		const unmounts: any[] = [];

		const context = new Map<string, unknown>([
			['mapStore', mapStore],
			['mapCursorStore', mapCursorStore],
			['probeOnMount', (value: unknown) => mounts.push(value)],
			['probeOnUnmount', () => unmounts.push(true)]
		]);

		render(MapMarker, { props, context });

		// Wait until `MapCursorEvent`'s `$effect` (which requires both
		// `$mapStore` and `$mapCursorStore` to be truthy) has run and
		// registered the handlers via `mapCursorStore.on(...)`.
		await vi.waitFor(() => {
			expect(handlers.clickMap).toBeDefined();
		});

		return { mockMap, mapStore, handlers, mounts, unmounts };
	}

	test("enterTopFeature with a popup configured sets the cursor to 'pointer'", async () => {
		const { mockMap, handlers } = await renderMapMarker({
			layerId: 'layer-a',
			popup: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });

		expect(mockMap.getCanvas().style.cursor).toBe('pointer');
	});

	test("enterTopFeature with only a tooltip configured sets the cursor to 'default'", async () => {
		const { mockMap, handlers } = await renderMapMarker({
			layerId: 'layer-a',
			tooltip: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });

		expect(mockMap.getCanvas().style.cursor).toBe('default');
	});

	test('hovering the same feature twice in a row does not re-mount the tooltip', async () => {
		const { handlers, mounts } = await renderMapMarker({
			layerId: 'layer-a',
			tooltip: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });
		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });

		expect(mounts.length).toBe(1);
	});

	test('leaveTopFeature resets the cursor and unmounts the tooltip', async () => {
		const { mockMap, handlers, mounts, unmounts } = await renderMapMarker({
			layerId: 'layer-a',
			tooltip: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });
		expect(mounts.length).toBe(1);

		// Give Svelte a chance to fully commit the tooltip's mount before
		// tearing it down again - unmounting in the very same tick it was
		// mounted in is not reliably observed by `onDestroy`.
		await tick();

		handlers.leaveTopFeature();

		expect(mockMap.getCanvas().style.cursor).toBe('');
		expect(mounts[0].maplibrePopup.remove).toHaveBeenCalledTimes(1);
		await vi.waitFor(() => {
			expect(unmounts.length).toBe(1);
		});
	});

	test('clickFeature mounts the popup with mapMarkerFeature/mapMarkerLayerId/mapMarkerMaplibrePopup in context; clicking the same feature again does not remount', async () => {
		const { handlers, mounts } = await renderMapMarker({ layerId: 'layer-a', popup: ContextProbe });
		const featureA = makeFeature('layer-a', 'a');

		handlers.clickFeature({ lngLat: [1, 2] }, { feature: featureA });

		expect(mounts.length).toBe(1);
		expect(mounts[0].feature).toBe(featureA);
		expect(mounts[0].layerId).toBe('layer-a');
		expect(mounts[0].maplibrePopup).toBeDefined();
		expect(mounts[0].maplibrePopup.setLngLat).toHaveBeenCalledWith([1, 2]);

		handlers.clickFeature({ lngLat: [1, 2] }, { feature: featureA });

		expect(mounts.length).toBe(1);
	});

	test('clickMap with a feature different from the current popup removes the popup', async () => {
		const { handlers, mounts, unmounts } = await renderMapMarker({
			layerId: 'layer-a',
			popup: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');
		const featureB = makeFeature('layer-a', 'b');

		handlers.clickFeature({ lngLat: [0, 0] }, { feature: featureA });
		expect(mounts.length).toBe(1);

		await tick();

		handlers.clickMap({ lngLat: [0, 0] }, { features: [featureB] });

		expect(mounts[0].maplibrePopup.remove).toHaveBeenCalledTimes(1);
		await vi.waitFor(() => {
			expect(unmounts.length).toBe(1);
		});
	});

	test('clickMap with the same feature as the current popup does not remove the popup', async () => {
		const { handlers, mounts, unmounts } = await renderMapMarker({
			layerId: 'layer-a',
			popup: ContextProbe
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.clickFeature({ lngLat: [0, 0] }, { feature: featureA });
		expect(mounts.length).toBe(1);

		handlers.clickMap({ lngLat: [0, 0] }, { features: [featureA] });

		expect(unmounts.length).toBe(0);
	});

	test('noCursorStyle suppresses all cursor style changes', async () => {
		const { mockMap, handlers } = await renderMapMarker({
			layerId: 'layer-a',
			popup: ContextProbe,
			noCursorStyle: true
		});
		const featureA = makeFeature('layer-a', 'a');

		handlers.enterTopFeature({ lngLat: [0, 0] }, { feature: featureA });

		expect(mockMap.getCanvas).not.toHaveBeenCalled();

		handlers.leaveTopFeature();

		expect(mockMap.getCanvas).not.toHaveBeenCalled();
	});

	test('featuresEqual matches on cluster_id when neither id nor objectid are present (clustered points)', async () => {
		const { handlers, mounts } = await renderMapMarker({ layerId: 'layer-a', popup: ContextProbe });

		const clusterA = { layer: { id: 'layer-a' }, properties: { cluster_id: 42 } };
		// A distinct feature object (as MapLibre would hand back on a second
		// query) that shares the same layer + cluster_id but has neither `id`
		// nor `properties.objectid` set.
		const clusterASameId = { layer: { id: 'layer-a' }, properties: { cluster_id: 42 } };

		handlers.clickFeature({ lngLat: [0, 0] }, { feature: clusterA });
		expect(mounts.length).toBe(1);

		handlers.clickFeature({ lngLat: [0, 0] }, { feature: clusterASameId });
		expect(mounts.length).toBe(1);

		const clusterB = { layer: { id: 'layer-a' }, properties: { cluster_id: 43 } };
		handlers.clickFeature({ lngLat: [0, 0] }, { feature: clusterB });
		expect(mounts.length).toBe(2);
	});
});
