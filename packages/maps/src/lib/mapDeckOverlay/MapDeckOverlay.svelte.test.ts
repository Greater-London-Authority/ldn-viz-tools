import { MapboxOverlay } from '@deck.gl/mapbox';
import { writable } from 'svelte/store';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MapDeckOverlay from './MapDeckOverlay.svelte';

vi.mock('@deck.gl/mapbox', () => {
	return {
		MapboxOverlay: vi.fn().mockImplementation(function (this: any, options: any) {
			this.options = options;
			this.setProps = vi.fn();
		})
	};
});

describe('MapDeckOverlay', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	function createMockMap() {
		return {
			addControl: vi.fn(),
			removeControl: vi.fn()
		};
	}

	test('constructs a DeckOverlay and adds it as a control when $mapStore becomes available', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const layers = [{ id: 'layer-1' }];
		const options = { pickingRadius: 5 };

		render(MapDeckOverlay, {
			props: { layers, options },
			context: new Map([['mapStore', mapStore]])
		});

		expect(MapboxOverlay).toHaveBeenCalledTimes(1);
		expect(MapboxOverlay).toHaveBeenCalledWith({
			layers,
			interleaved: false,
			pickingRadius: 5
		});

		expect(mockMap.addControl).toHaveBeenCalledTimes(1);
		const [instance, position] = mockMap.addControl.mock.calls[0];
		expect(position).toBe('top-left');
		expect(instance).toBeInstanceOf(MapboxOverlay);
	});

	test('changing the layers prop calls setProps({ layers }) without recreating the overlay', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		const props = $state({ layers: [{ id: 'layer-1' }] });

		render(MapDeckOverlay, { props, context: new Map([['mapStore', mapStore]]) });

		expect(MapboxOverlay).toHaveBeenCalledTimes(1);
		const instance = mockMap.addControl.mock.calls[0][0];

		const newLayers = [{ id: 'layer-2' }];
		props.layers = newLayers;

		await vi.waitFor(() => {
			expect(instance.setProps).toHaveBeenCalledWith({ layers: newLayers });
		});

		expect(MapboxOverlay).toHaveBeenCalledTimes(1);
	});
});
