<script lang="ts">
	import { getContext } from 'svelte';

	import { MapLibreGL as lib } from 'maplibre-gl';
	import {
		TerraDraw,
		TerraDrawCircleMode,
		TerraDrawFreehandMode,
		TerraDrawLineStringMode,
		TerraDrawPointMode,
		TerraDrawPolygonMode,
		TerraDrawRectangleMode,
		TerraDrawSectorMode,
		TerraDrawSelectMode
	} from 'terra-draw';

  import {TerraDrawMapLibreGLAdapter} from 'terra-draw-maplibre-gl-adapter';

	import type { MapStore } from '../map/Map.svelte';
	import MapDrawControls from './MapDrawControls.svelte';

	const mapStore: MapStore = getContext('mapStore');

	export let enabledModes = ['rectangle'];
	export let features; // can't control externally yet
	export let currentMode;

	const modeMapping = {
		circle: TerraDrawCircleMode,
		freehand: TerraDrawFreehandMode,
		line: TerraDrawLineStringMode,
		point: TerraDrawPointMode,
		polygon: TerraDrawPolygonMode,
		rectangle: TerraDrawRectangleMode,
		sector: TerraDrawSectorMode,

		select: TerraDrawSelectMode
	};

	$: console.log($mapStore);

	const selectMode = new TerraDrawSelectMode({
		// Allow manual deselection of features
		allowManualDeselection: true, // allows users to deselect by clicking on the map

		// Enable editing tools by Feature
		flags: {
			point: {
				feature: {
					draggable: true
				}
			},

			polygon: {
				feature: {
					draggable: true,
					coordinates: {
						midpoints: true,
						draggable: true,
						deletable: true
					}
				}
			},

			linestring: {
				feature: {
					draggable: true,
					coordinates: {
						midpoints: true,
						draggable: true,
						deletable: true
					}
				}
			},

			freehand: {
				feature: {
					draggable: true,
					coordinates: {
						midpoints: true,
						draggable: true,
						deletable: true
					}
				}
			},

			circle: {
				feature: {
					deletable: true,
					draggable: true,
					coordinates: {
						midpoints: true,
						draggable: true,
						deletable: true
					}
				}
			},

			rectangle: {
				feature: {
					draggable: true,
					coordinates: {
						midpoints: true,
						draggable: true,
						deletable: true
					}
				}
			}
		}
	});

	let draw: TerraDraw;
	const createTerraDraw = () => {
		if ($mapStore) {
			const modes = [...enabledModes.map((modeName) => new modeMapping[modeName]()), selectMode];

			draw = new TerraDraw({
				adapter: new TerraDrawMapLibreGLAdapter({ map: $mapStore, lib }),
				modes
			});

			draw.on('change', () => {
				features = draw.getSnapshot();
				console.log('UPDATED TO:', features);
			});

			draw.start();
			//	draw.setMode('rectangle');
		}
	};
	$: createTerraDraw($mapStore, enabledModes);

	const setMode = (newMode) => {
		if (!draw) return;

		if (newMode === 'CLEAR') {
			draw.clear();
			features = draw.getSnapshot();
		} else if (newMode) {
			draw.setMode(newMode);
		} else {
			draw.setMode('select');
		}
	};

	$: setMode(currentMode);
</script>

<MapDrawControls {enabledModes} bind:currentMode />
