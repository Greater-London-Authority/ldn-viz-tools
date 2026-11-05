import { beforeEach, describe, expect, test, vi } from 'vitest';
import { GLIDE_ANIMATION_OPTIONS } from '../themes/animations';

const { initMapLayer, setFeature, clearFeature } = await import('./map-layer');

type MockMarker = {
	setLngLat: ReturnType<typeof vi.fn>;
	addTo: ReturnType<typeof vi.fn>;
	remove: ReturnType<typeof vi.fn>;
};

const markerInstances: MockMarker[] = [];

vi.mock('maplibre-gl', () => {
	return {
		default: {
			Marker: vi.fn().mockImplementation(function () {
				const instance: MockMarker = {
					setLngLat: vi.fn(),
					addTo: vi.fn(),
					remove: vi.fn()
				};
				instance.setLngLat.mockReturnValue(instance);
				instance.addTo.mockReturnValue(instance);
				markerInstances.push(instance);
				return instance;
			})
		}
	};
});

const SOURCE_ID = 'gla/context/location-search';

const createMockMap = () => {
	const layers = new Map<string, unknown>();
	const sources = new Map<string, { setData: ReturnType<typeof vi.fn> }>();

	return {
		getLayer: vi.fn((id: string) => layers.get(id)),
		addLayer: vi.fn((layer: { id: string }) => layers.set(layer.id, layer)),
		removeLayer: vi.fn((id: string) => layers.delete(id)),
		getSource: vi.fn((id: string) => sources.get(id)),
		addSource: vi.fn((id: string) => sources.set(id, { setData: vi.fn() })),
		removeSource: vi.fn((id: string) => sources.delete(id)),
		flyTo: vi.fn(),
		fitBounds: vi.fn()
	};
};

describe('initMapLayer', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('is a no-op when passed a falsy map', () => {
		expect(() => initMapLayer(undefined as any)).not.toThrow();
	});

	test('removes any pre-existing layer/source with the same ids before re-adding them', () => {
		const map = createMockMap();

		initMapLayer(map as any);
		expect(map.removeLayer).not.toHaveBeenCalled();
		expect(map.removeSource).not.toHaveBeenCalled();
		expect(map.addSource).toHaveBeenCalledTimes(1);
		expect(map.addLayer).toHaveBeenCalledTimes(1);

		initMapLayer(map as any);
		expect(map.removeLayer).toHaveBeenCalledTimes(1);
		expect(map.removeSource).toHaveBeenCalledTimes(1);
		expect(map.addSource).toHaveBeenCalledTimes(2);
		expect(map.addLayer).toHaveBeenCalledTimes(2);
	});
});

describe('setFeature', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		markerInstances.length = 0;
	});

	test('is a no-op when passed a falsy map', () => {
		expect(() => setFeature('ref-noop', undefined as any, { center: [0, 0] } as any)).not.toThrow();
	});

	test('builds a Point feature and flies to coords when there are no bounds', () => {
		const map = createMockMap();
		initMapLayer(map as any);
		const source = map.getSource(SOURCE_ID)!;

		setFeature('ref-point', map as any, { center: [-0.1, 51.5] } as any);

		expect(source.setData).toHaveBeenCalledWith({
			type: 'FeatureCollection',
			features: [
				{ type: 'Feature', geometry: { type: 'Point', coordinates: [-0.1, 51.5] }, properties: {} }
			]
		});
		expect(map.flyTo).toHaveBeenCalledWith(
			expect.objectContaining({ ...GLIDE_ANIMATION_OPTIONS, center: [-0.1, 51.5] })
		);
		expect(map.fitBounds).not.toHaveBeenCalled();
	});

	test('builds a Polygon feature and fits to bounds when bounds are present', () => {
		const map = createMockMap();
		initMapLayer(map as any);
		const source = map.getSource(SOURCE_ID)!;
		const bounds = [-0.2, 51.4, 0.0, 51.6] as [number, number, number, number];

		setFeature('ref-bounds', map as any, { center: [-0.1, 51.5], bounds } as any);

		expect(source.setData).toHaveBeenCalledWith({
			type: 'FeatureCollection',
			features: [
				{ type: 'Feature', geometry: { type: 'Polygon', coordinates: [bounds] }, properties: {} }
			]
		});
		expect(map.fitBounds).toHaveBeenCalledWith(
			bounds,
			expect.objectContaining(GLIDE_ANIMATION_OPTIONS)
		);
		expect(map.flyTo).not.toHaveBeenCalled();
	});

	test('removes the previous marker before adding a new one for the same ref', () => {
		const map = createMockMap();
		initMapLayer(map as any);

		setFeature('ref-repeat', map as any, { center: [-0.1, 51.5] } as any);
		expect(markerInstances).toHaveLength(1);
		const firstMarker = markerInstances[0];

		setFeature('ref-repeat', map as any, { center: [0.2, 51.6] } as any);
		expect(markerInstances).toHaveLength(2);

		expect(firstMarker.remove).toHaveBeenCalledTimes(1);
	});
});

describe('clearFeature', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		markerInstances.length = 0;
	});

	test('is a no-op when passed a falsy map', () => {
		expect(() => clearFeature('ref-noop', undefined as any)).not.toThrow();
	});

	test('removes the marker for ref and resets the source to an empty FeatureCollection', () => {
		const map = createMockMap();
		initMapLayer(map as any);
		const source = map.getSource(SOURCE_ID)!;

		setFeature('ref-clear', map as any, { center: [-0.1, 51.5] } as any);
		const marker = markerInstances[0];

		clearFeature('ref-clear', map as any);

		expect(marker.remove).toHaveBeenCalledTimes(1);
		expect(source.setData).toHaveBeenLastCalledWith({ type: 'FeatureCollection', features: [] });
	});
});
