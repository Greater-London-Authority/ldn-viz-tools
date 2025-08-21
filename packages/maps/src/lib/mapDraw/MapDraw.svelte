<script lang="ts">
	import { getContext } from 'svelte';

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

	import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';

	import type { Feature } from 'geojson';
	import type { MapLibreStore } from '../map/types';
	import MapDrawControls from './MapDrawControls.svelte';

	const mapStore: MapLibreStore = getContext('mapStore');

	/**
	The modes/tools available for selection.
	 **/
	export let enabledModes = [
		'point',
		'polygon',
		'linestring',
		'freehand',
		'circle',
		'rectangle',
		'sector'
	];

	/**
	 * The currently active mode.
	 */
	export let currentMode: string;

	/**
	 * GeoJSON features that have been drawn.
	 */
	export let features: Feature[]; // can't control externally yet

	/**
	 * Function to be called when user clicks 'Done' button.
	 */
	export let onDone = (_features: Feature[]) => null;

	const modeMapping = {
		circle: TerraDrawCircleMode,
		freehand: TerraDrawFreehandMode,
		linestring: TerraDrawLineStringMode,
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
			},

			sector: {
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
				adapter: new TerraDrawMapLibreGLAdapter({ map: $mapStore }),
				modes
			});

			draw.on('change', () => {
				features = draw.getSnapshot();
			});

			draw.start();
			//	draw.setMode('rectangle');
		}
	};
	$: createTerraDraw($mapStore, enabledModes);

	const setMode = (newMode: string) => {
		if (!draw) return;

		if (newMode) {
			draw.setMode(newMode);
		} else {
			draw.setMode('select');
		}
	};

	$: setMode(currentMode);
</script>

<MapDrawControls {enabledModes} {features} bind:currentMode {onDone} terraDraw={draw} />
