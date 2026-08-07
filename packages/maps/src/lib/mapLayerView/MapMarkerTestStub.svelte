<script lang="ts">
	/**
	 * Test-only stub standing in for `MapMarker.svelte`, used via `vi.mock` in
	 * `MapLayerView.svelte.test.ts` so those tests can assert on `MapLayerView`
	 * rendering a marker without depending on `MapMarker`'s real internals
	 * (which need `mapCursorStore` context, MapLibre popups, etc.). Not part of
	 * the public component API - it's a mock target only.
	 */
	interface Props {
		layerId?: any;
		tooltip?: any;
		popup?: any;
	}

	let { layerId = undefined, tooltip = null, popup = null }: Props = $props();
</script>

<div
	data-testid="map-marker-stub"
	data-layer-id={layerId}
	data-has-tooltip={!!tooltip}
	data-has-popup={!!popup}
></div>
