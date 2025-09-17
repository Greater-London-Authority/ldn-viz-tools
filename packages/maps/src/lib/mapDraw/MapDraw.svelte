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
	//import type { HexColorStyling } from 'terra-draw';

	import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';

	import type { Feature } from 'geojson';
	import { currentTheme, tokenNameToValue } from '../../../../ui/dist/theme/themeStore';
	import type { MapLibreStore } from '../map/types';
	import MapDrawControls from './MapDrawControls.svelte';

	const mapStore: MapLibreStore = getContext('mapStore');

	/**
	The modes/tools available for selection.
	 **/
	export let enabledModes = ['polygon'];

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

	const lightThemeStyle = {
		fillColor: tokenNameToValue('ui.primary', $currentTheme), // as HexColorStyling,
		fillOpacity: 0.5,
		outlineColor: tokenNameToValue('ui.primary', $currentTheme),
		outlineWidth: 1
	};

	const modeMapping = {
		circle: new TerraDrawCircleMode({
			styles: lightThemeStyle
		}),
		freehand: new TerraDrawFreehandMode({
			styles: lightThemeStyle
		}),
		linestring: new TerraDrawLineStringMode({
			styles: lightThemeStyle
		}),
		point: new TerraDrawPointMode({
			styles: lightThemeStyle
		}),
		polygon: new TerraDrawPolygonMode({
			styles: lightThemeStyle
		}),
		rectangle: new TerraDrawRectangleMode({
			styles: lightThemeStyle
		}),
		sector: new TerraDrawSectorMode({
			styles: lightThemeStyle
		}),

		select: new TerraDrawSelectMode()
	};

	$: console.log($mapStore);

	const selectMode = new TerraDrawSelectMode({
		// Allow manual deselection of features
		allowManualDeselection: true, // allows users to deselect by clicking on the map

		// we override the default key bindings so that features are deleted with Backspace rather than Delete
		keyEvents: {
			deselect: 'Escape',
			delete: 'Backspace',
			rotate: ['Control', 'r'],
			scale: ['Control', 's']
		},

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
			const modes = [...enabledModes.map((modeName) => modeMapping[modeName]), selectMode];

			draw = new TerraDraw({
				adapter: new TerraDrawMapLibreGLAdapter({ map: $mapStore }),
				modes
			});

      draw.start();


      // once a user has finished creating a shape, reset to select tool
      draw.on("finish", (id: string, context: { action: string, mode: string }) => {
       if (context.action === 'draw') {
          currentMode = 'select';
        }
      });

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
