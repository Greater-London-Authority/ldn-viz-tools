import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { writable } from 'svelte/store';
import { MapboxOverlay } from '@deck.gl/mapbox';
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

	// NOTE: "When $mapStore becomes falsy after being loaded, calls
	// $mapStore.removeControl(deckOverlay)" (per SUGGESTED_TESTS.md) could not
	// be verified as specified. `removeOverlay()` reads the *current* value of
	// `$mapStore` (`deckOverlay && $mapStore.removeControl(deckOverlay)`), but
	// by the time the `$effect` watching `loaded && !$mapStore` fires,
	// `$mapStore` has already updated to the new falsy value that triggered
	// it. So in practice this line throws
	// `TypeError: Cannot read properties of null (reading 'removeControl')`
	// instead of ever calling `removeControl` - confirmed by setting the
	// store to `null` here and observing an unhandled exception from inside
	// the component's `$effect`, with `removeControl` never invoked. This
	// looks like a pre-existing bug in the component; since we were told not
	// to modify component source, this bullet is skipped rather than
	// asserting behaviour that doesn't actually occur.
});
