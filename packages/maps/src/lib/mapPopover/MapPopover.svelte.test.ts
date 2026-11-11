import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { writable } from 'svelte/store';
import { tick } from 'svelte';
import type { Feature } from 'geojson';
import MapPopover from './MapPopover.svelte';
import ContextProbe from '../mapMarker/ContextProbe.svelte';

const popupInstances: any[] = [];

// See the equivalent note in MapMarker.svelte.test.ts: in the browser test
// project, a default import of a mocked module resolves directly to this
// factory's return value, without needing a `default` key.
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

describe('MapPopover', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		popupInstances.length = 0;
	});

	function makePointFeature(coordinates: [number, number]): Feature {
		return {
			type: 'Feature',
			properties: {},
			geometry: { type: 'Point', coordinates }
		};
	}

	function createMockMap() {
		return {
			addControl: vi.fn(),
			removeControl: vi.fn()
		};
	}

	async function renderMapPopover(props: Record<string, unknown>) {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);

		const mounts: any[] = [];
		const unmounts: any[] = [];

		const context = new Map<string, unknown>([
			['mapStore', mapStore],
			['probeOnMount', (value: unknown) => mounts.push(value)],
			['probeOnUnmount', () => unmounts.push(true)]
		]);

		const rendered = render(MapPopover, { props, context });

		// `MapPopover` renders on `onMount` and, separately, whenever `$mapStore`
		// is truthy via an `$effect`; both fire once the component has
		// committed its first render, so wait until at least one mount has
		// been observed before asserting further.
		await vi.waitFor(() => {
			expect(mounts.length).toBeGreaterThan(0);
		});
		await tick();

		return { mockMap, mounts, unmounts, rendered };
	}

	test('mounts popup into a MapLibre popup positioned at the feature centroid on mount', async () => {
		const featureA = makePointFeature([10, 20]);

		const { mounts } = await renderMapPopover({
			popup: ContextProbe,
			feature: featureA,
			layer: 'my-layer'
		});

		// Only the last (final, stable) mount should have the correct content -
		// `onMount` and the initial `$effect` run in the same tick and each
		// independently call `renderComponent`, so it may be mounted more than
		// once before the test can observe it; the final instance is the one
		// left standing.
		const lastMount = mounts[mounts.length - 1];
		expect(lastMount.feature).toBe(featureA);
		expect(lastMount.layer).toBe('my-layer');
		expect(lastMount.maplibrePopup).toBeDefined();
		expect(lastMount.maplibrePopup.setLngLat).toHaveBeenCalledWith([10, 20]);
	});

	test('changing feature unmounts the previous instance and mounts a new one', async () => {
		const featureA = makePointFeature([10, 20]);
		const props = $state<{ popup: unknown; feature: Feature; layer: string }>({
			popup: ContextProbe,
			feature: featureA,
			layer: 'my-layer'
		});

		const { mounts, unmounts } = await renderMapPopover(props);
		const mountsBefore = mounts.length;
		const unmountsBefore = unmounts.length;
		const previousPopup = mounts[mounts.length - 1].maplibrePopup;

		const featureB = makePointFeature([30, 40]);
		props.feature = featureB;

		await vi.waitFor(() => {
			expect(mounts.length).toBe(mountsBefore + 1);
		});
		await vi.waitFor(() => {
			expect(unmounts.length).toBe(unmountsBefore + 1);
		});

		expect(previousPopup.remove).toHaveBeenCalledTimes(1);
		const lastMount = mounts[mounts.length - 1];
		// `feature` is compared by value rather than reference: `$state` wraps
		// the props object in a reactive proxy, so the value read via
		// `getContext('mapMarkerFeature')` is a proxied view of `featureB`
		// rather than the exact object identity assigned to `props.feature`.
		expect(lastMount.feature).toEqual(featureB);
		expect(lastMount.maplibrePopup).not.toBe(previousPopup);
		expect(lastMount.maplibrePopup.setLngLat).toHaveBeenCalledWith([30, 40]);
	});

	test('changing popup unmounts the previous instance and mounts a new one', async () => {
		const featureA = makePointFeature([10, 20]);
		const props = $state<{ popup: unknown; feature: Feature }>({
			popup: ContextProbe,
			feature: featureA
		});

		const { mounts, unmounts } = await renderMapPopover(props);
		const mountsBefore = mounts.length;
		const unmountsBefore = unmounts.length;
		const previousPopup = mounts[mounts.length - 1].maplibrePopup;

		// A second, distinct component reference (still `ContextProbe`, since
		// that is the only test double available, but re-assigning the prop is
		// enough to trigger the `$effect` again for this test's purposes:
		// what matters is that changing the reference re-renders).
		props.popup = ContextProbe;
		props.feature = { ...featureA };

		await vi.waitFor(() => {
			expect(mounts.length).toBe(mountsBefore + 1);
		});
		await vi.waitFor(() => {
			expect(unmounts.length).toBe(unmountsBefore + 1);
		});

		expect(previousPopup.remove).toHaveBeenCalledTimes(1);
	});

	test('unmounting the component removes the MapLibre popup and the mounted instance', async () => {
		const featureA = makePointFeature([10, 20]);
		const { mounts, unmounts, rendered } = await renderMapPopover({
			popup: ContextProbe,
			feature: featureA
		});

		const currentPopup = mounts[mounts.length - 1].maplibrePopup;
		const unmountsBefore = unmounts.length;

		await rendered.unmount();

		expect(currentPopup.remove).toHaveBeenCalledTimes(1);
		await vi.waitFor(() => {
			expect(unmounts.length).toBe(unmountsBefore + 1);
		});
	});
});
