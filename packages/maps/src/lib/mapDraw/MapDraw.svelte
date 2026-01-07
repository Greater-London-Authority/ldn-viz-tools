<script lang="ts">
	import type { MapLibreStore } from '$lib/map/types';
	import { getContext, onDestroy } from 'svelte';
	import { TerraDraw, type GeoJSONStoreFeatures } from 'terra-draw';
	import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
	import MapDrawControls from './MapDrawControls.svelte';
	import { MapDraw, Modes } from './MapDrawState.svelte';

	type Mode =
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
		 * The modes/tools available for selection.
		 **/
		modes?: Mode[];

		/**
		 * Function to be called when user clicks 'Done' button.
		 */
		onDone?: (_args: any) => any;


		/**
		 * Function to be called when user clicks 'Edit' button.
		 */
		onStart?: () => any;

		/**
		 * Function to be called when user clicks 'Cancel' button.
		 */
		onCancel?: () => any;


		/**
		 * If [true, false], then Geojson upload only is enabled.
		 * If [false, true], then the drawn shape can be downloaded as a GeoJSON file.
		 * If [true, true], then upload and download are enabled
		 */
		uploadDownload?: [boolean, boolean];

		/**
		 * Externally uploaded features
		 **/
		features?: GeoJSONStoreFeatures[];
	}

	let {
		modes = ['polygon'],
		onDone = (_features: GeoJSONStoreFeatures[]) => null,
		uploadDownload = [true, true],
		features: externalFeatures = [],
		onStart = () => null,
		onCancel = () => null
	}: Props = $props();

	const mapStore: MapLibreStore = getContext('mapStore');

	let drawModes = new Modes();
	let mapDraw = new MapDraw();

	let terraDraw: TerraDraw | undefined = $state(undefined);
	let adapter: any = $state();

	const createTerraDraw = (mapStore: unknown) => {
		if (terraDraw) {
			// setup has already occurred
			return;
		}

		if (mapStore) {
			adapter = mapStore && new TerraDrawMapLibreGLAdapter({ map: mapStore });

			drawModes.enabled = modes;

			terraDraw = new TerraDraw({
				adapter,
				modes: drawModes.modes
			});

			terraDraw.start();

			terraDraw.on('finish', () => {
				if (mapDraw.controlMode.current === 'edit') {
					drawModes.mode.selected = 'select';
					terraDraw!.setMode('select');
				}
			});

			terraDraw.on('change', () => {
				mapDraw.features.current = terraDraw!.getSnapshot();
			});
		}
	};

	$effect(() => createTerraDraw($mapStore));

	$effect(() => {
		mapDraw.features.saved = externalFeatures;
		terraDraw?.clear();
		terraDraw?.addFeatures(externalFeatures);
		mapDraw.controlMode.current = 'default';
	});

	/**
	 * If we don't tidy up, then re-creating MapDraw component will fail as its map layers will already exist
	 */
	onDestroy(() => {
		if (adapter) {
			adapter?.unregister();
		}

		if (terraDraw) {
			terraDraw?.clear();
		}
	});
</script>

{#if terraDraw}
	<MapDrawControls {terraDraw} {uploadDownload} {onStart} {onCancel} {onDone} {drawModes} {mapDraw} />
{/if}
