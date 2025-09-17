<script lang="ts">
	import { getContext, onDestroy } from 'svelte';

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
	import type { TerraDrawBaseAdapter } from 'terra-draw/dist/common/base.adapter';

	import type { Feature } from 'geojson';
	import { currentTheme, tokenNameToValue } from '@ldn-viz/ui';
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
	 * GeoJSON features that have been drawn (continuously updates).
	 */
	export let features: Feature[]; // can't control externally yet

	/**
	 * GeoJSON features that have been drawn (updates on Save or Clear).
	 */
	export let savedFeatures: Feature[];

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
	let adapter: TerraDrawBaseAdapter;

	const createTerraDraw = () => {
		if ($mapStore) {
			const modes = [...enabledModes.map((modeName) => modeMapping[modeName]), selectMode];

			adapter = new TerraDrawMapLibreGLAdapter({ map: $mapStore });

			draw = new TerraDraw({
				adapter,
				modes
			});

			draw.start();

			if (savedFeatures.length > 0) {
				draw.addFeatures(savedFeatures);
			}

			// once a user has finished creating a shape, reset to select tool
			draw.on('finish', (id: string, context: { action: string; mode: string }) => {
				if (context.action === 'draw') {
					currentMode = 'select';
				}
			});

			// continuously update features
			draw.on('change', () => {
				features = draw.getSnapshot();
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

	onDestroy(() => {
		// if we don't tidy up, then re-creating MapDraw component will fail as its map layers will already exist
		if (draw) {
			draw.clear();
		}
		if (adapter) {
			adapter.unregister();
		}
	});
</script>

<MapDrawControls
	{enabledModes}
	{features}
	bind:savedFeatures
	bind:currentMode
	{onDone}
	terraDraw={draw}
/>
