<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { getContext, onDestroy } from 'svelte';
	import { TerraDraw, type GeoJSONStoreFeatures } from 'terra-draw';
	import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
	import MapDrawControls from './MapDrawControls.svelte';
	import { drawModes, mapDraw } from './MapDrawState.svelte';

	type Modes =
		| 'circle'
		| 'freehand'
		| 'linestring'
		| 'point'
		| 'polygon'
		| 'rectangle'
		| 'sector'
		| 'select';

	interface Props {
		/**
		The modes/tools available for selection.
	 	**/
		modes?: Modes[];

		/**
		 * Function to be called when user clicks 'Done' button.
		 */
		onDone?: (_args: any) => any;

		/**
		 * If [true, false], then Geojson upload only is enabled.
		 * If [false, true], then the drawn shape can be downloaded as a GeoJSON file.
		 * If [true, true], then upload and download are enabled
		 */
		uploadDownload?: [boolean, boolean];
	}

	let {
		modes = ['polygon'],
		onDone = (_features: GeoJSONStoreFeatures[]) => null,
		uploadDownload = [true, true]
	}: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');

	const adapter = $derived.by(
		() => $mapStore && new TerraDrawMapLibreGLAdapter({ map: $mapStore })
	);

	drawModes.enabled = modes;

	const terraDraw = $derived.by(() => {
		if (adapter) {
			const td = new TerraDraw({
				adapter,
				modes: drawModes.modes
			});

			td.on('finish', () => {
				if (mapDraw.controlMode.current === 'edit') {
					drawModes.mode.selected = 'select';
					td.setMode('select');
				}
			});

			td.on('change', () => {
				mapDraw.features.current = td.getSnapshot();
			});

			td.start();

			return td;
		}
		return undefined;
	});

	onDestroy(() => {
		/**
		 * If we don't tidy up, then re-creating MapDraw component will fail as its map layers will already exist
		 */
		adapter?.unregister();
		terraDraw?.clear();
		terraDraw?.stop();
	});
</script>

{#if terraDraw}
	<MapDrawControls {terraDraw} {uploadDownload} {onDone} />
{/if}
