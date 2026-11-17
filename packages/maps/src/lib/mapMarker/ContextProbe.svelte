<script lang="ts">
	/**
	 * Test-only helper component (not used in production code).
	 *
	 * Used as the `tooltip`/`popup` prop in MapMarker.svelte.test.ts and
	 * MapPopover.svelte.test.ts so tests can observe what those components
	 * actually mount: it reports the `mapMarkerFeature`/`mapMarkerLayerId`/
	 * `mapMarkerLayer`/`mapMarkerMaplibrePopup`/`mapMarkerString` context
	 * values it receives (via a `probeOnMount` callback passed through
	 * ambient context) and reports when it is unmounted (via `probeOnUnmount`).
	 */
	import { getContext, onDestroy } from 'svelte';

	// This component has no props of its own, but declaring `$props()` forces
	// Svelte to compile it in runes mode (matching `MapMarker.svelte`/
	// `MapPopover.svelte` and every other component under test) rather than
	// falling back to legacy mode, which `mount`/`unmount` do not track the
	// same way.
	let _props = $props();

	const probeOnMount: ((value: unknown) => void) | undefined = getContext('probeOnMount');
	const probeOnUnmount: (() => void) | undefined = getContext('probeOnUnmount');

	probeOnMount?.({
		feature: getContext('mapMarkerFeature'),
		layerId: getContext('mapMarkerLayerId'),
		layer: getContext('mapMarkerLayer'),
		maplibrePopup: getContext('mapMarkerMaplibrePopup'),
		msgString: getContext('mapMarkerString')
	});

	onDestroy(() => {
		probeOnUnmount?.();
	});
</script>

<div data-testid="context-probe"></div>
