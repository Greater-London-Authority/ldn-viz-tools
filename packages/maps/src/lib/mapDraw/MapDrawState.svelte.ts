import { theme } from '@ldn-viz/ui';
import {
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
import type { HexColorStyling } from './types';

// TODO: check these tokens
const themeStyle = $state({
	fillColor: theme.tokenNameToValue('ui.primary', theme.currentTheme) as HexColorStyling,
	fillOpacity: 0.5,
	outlineColor: theme.tokenNameToValue('ui.primary', theme.currentTheme) as HexColorStyling,
	outlineWidth: 1
});

type TerraDrawModes = (typeof modeMapping)[keyof typeof modeMapping][];

const selectMode = new TerraDrawSelectMode({
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
			'ui.primary',
			theme.currentTheme
		) as HexColorStyling,
		selectedPolygonFillOpacity: 0.5,
		selectedPolygonOutlineColor: theme.tokenNameToValue(
			'ui.primary',
			theme.currentTheme
		) as HexColorStyling,
		selectedPolygonOutlineWidth: 1
	}
});

const modeMapping = {
	circle: new TerraDrawCircleMode({
		styles: themeStyle
	}),
	freehand: new TerraDrawFreehandMode({
		styles: themeStyle
	}),
	linestring: new TerraDrawLineStringMode({
		styles: themeStyle as any
	}),
	point: new TerraDrawPointMode({
		styles: themeStyle as any
	}),
	polygon: new TerraDrawPolygonMode({
		styles: themeStyle
	}),
	rectangle: new TerraDrawRectangleMode({
		styles: themeStyle
	}),
	sector: new TerraDrawSectorMode({
		styles: themeStyle
	}),

	select: selectMode, // Defined Above

	render: new TerraDrawRenderMode({
		modeName: 'render',
		styles: themeStyle as any
	})
};

class Modes {
	/**
	 * List of the drawing tools that are enabled.
	 */
	#enabled: string[] = $state([]);
	set enabled(enabled) {
		this.#enabled = enabled;
		this.options = enabled;
	}
	get enabled() {
		return this.#enabled;
	}

	/**
	 * List of the drawing tools that are enabled, in the order they will be displayed in the shelf of tools.
	 */

	options: string[] = $state([]);

	/**
	 * Re-order options so selected drawing tool is listed first.
	 */
	reorderOptions(selectedMode: string) {
		this.options = [selectedMode, ...this.enabled.filter((option) => option !== selectedMode)];
	}

	/**
	 * List of TerraDraw modes (the enabled drawing modes, plus select and render modes).
	 */
	#modes: TerraDrawModes = $derived([
		...this.enabled.map((modeName) => modeMapping[modeName as keyof typeof modeMapping]),
		modeMapping['select'],
		modeMapping['render']
	]);
	mode = $state({ selected: '', previous: '' });

	get modes() {
		return this.#modes;
	}
}

export const drawModes = new Modes();

class MapDraw {
	controlMode: { current: 'default' | 'edit' | 'upload' } = $state({ current: 'default' });
	features: {
		/**
		 * This reflects the current state of the features as they are being edited.
		 * It will either be persisted as `saved` (if the user presses the 'Save' button),
		 * or reset from `previous` (if the user presses the 'Cancel' button to discard their changes).
		 */
		current: GeoJSONStoreFeatures[];

		/**
		 * These are the saved features, updated when the user presses 'Save'.
		 */
		saved: GeoJSONStoreFeatures[];

		/**
		 * This is a copy of the features created when entering Edit mode.
		 * Like a temporary cache, so that any changes made can be reverted if the user clicks 'Cancel'
		 */
		previous: string;
	} = $state({
		current: [],
		saved: [],
		previous: ''
	});
}

export const mapDraw = new MapDraw();
