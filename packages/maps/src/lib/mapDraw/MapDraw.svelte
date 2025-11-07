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
		TerraDrawRenderMode,
		TerraDrawSectorMode,
		TerraDrawSelectMode,
		type GeoJSONStoreFeatures
	} from 'terra-draw';
	//import type { HexColorStyling } from 'terra-draw';

	import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';

	import { theme } from '@ldn-viz/ui';
	import type { Feature } from 'geojson';
	import type { MapLibreStore } from '../map/types';
	import MapDrawControls from './MapDrawControls.svelte';

	const mapStore: MapLibreStore = getContext('mapStore');

	export type HexColor = `#${string}`;

	export type HexColorStyling = HexColor | ((feature: GeoJSONStoreFeatures) => HexColor);

	interface Props {
		/**
	The modes/tools available for selection.
	 **/
		enabledModes?: any;
		/**
		 * The currently active mode.
		 */
		currentMode: string;
		/**
		 * GeoJSON features that have been drawn (continuously updates).
		 */
		features?: Feature[]; // can't control externally yet
		/**
		 * GeoJSON features that have been drawn (updates on Save or Clear).
		 */
		savedFeatures: Feature[];
		/**
		 * Function to be called when user clicks 'Done' button.
		 */
		onDone?: any;
	}

	let {
		enabledModes = ['polygon'],
		currentMode = $bindable(), // default to initially selecting first enabled
		features = $bindable(),
		savedFeatures = $bindable(),
		onDone = (_features: Feature[]) => null
	}: Props = $props();

	const lightThemeStyle = {
		fillColor: theme.tokenNameToValue('ui.primary', theme.currentTheme) as HexColorStyling,
		fillOpacity: 0.5,
		outlineColor: theme.tokenNameToValue('ui.primary', theme.currentTheme) as HexColorStyling,
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
			styles: lightThemeStyle as any
		}),
		point: new TerraDrawPointMode({
			styles: lightThemeStyle as any
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
		},

		styles: {
			selectedPolygonColor: theme.tokenNameToValue(
				'action.primary.focus',
				theme.currentTheme
			) as HexColorStyling,
			selectedPolygonFillOpacity: 0.5,
			selectedPolygonOutlineColor: theme.tokenNameToValue(
				'action.primary',
				theme.currentTheme
			) as HexColorStyling,
			selectedPolygonOutlineWidth: 1
		}
	});

	const renderMode = new TerraDrawRenderMode({
		modeName: 'render',
		styles: lightThemeStyle as any
	});

	let draw: TerraDraw | undefined = $state();
	let adapter: any; //TerraDrawBaseAdapter;

	const createTerraDraw = (mapStore: unknown, enabledModes: any) => {
		if (draw) {
			// setup has already occured
			return;
		}

		if (mapStore) {
			const modes = [
				...enabledModes.map((modeName: keyof typeof modeMapping) => modeMapping[modeName]),
				selectMode,
				renderMode
			];

			adapter = new TerraDrawMapLibreGLAdapter({ map: mapStore });

			draw = new TerraDraw({
				adapter,
				modes
			});

			draw.start();

			if (savedFeatures.length > 0) {
				draw.addFeatures(savedFeatures as any);
			}

			// once a user has finished creating a shape, reset to select tool
			draw.on('finish', (context: any) => {
				if (context.action === 'draw') {
					currentMode = 'select';
				}
			});

			// continuously update features
			draw.on('change', () => {
				features = draw!.getSnapshot();
			});
		}
	};

	$effect(() => {
		createTerraDraw($mapStore, enabledModes);
	});

	const setMode = (newMode?: string) => {
		if (!draw) return;

		if (newMode) {
			draw.setMode(newMode);
		} else {
			draw.setMode('select');
		}
	};

	$effect(() => setMode(currentMode));

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
