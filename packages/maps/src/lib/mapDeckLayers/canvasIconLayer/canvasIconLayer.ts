import type { Color, CompositeLayerProps, DefaultProps, UpdateParameters } from '@deck.gl/core';
import { CompositeLayer } from '@deck.gl/core';
import type { IconLayerProps } from '@deck.gl/layers';
import { IconLayer } from '@deck.gl/layers';

/**
 * The icon descriptor returned to IconLayer's `getIcon`.
 *
 * If `getIcon` returns an object rather than a string, then the IconLayer will autopack icons.
 * It will deduplicate based on the `id`.
 *
 * https://deck.gl/docs/api-reference/layers/icon-layer#geticon *
 */
export type CanvasIconDef = {
	id: string;
	url: string;
	width: number;
	height: number;
	anchorX: number;
	anchorY: number;
	mask: boolean;
};

/**
 * Draws one icon. The canvas is `iconSize` pixels square (also available as `ctx.canvas.width`).
 * It is called once per distinct key, with the first datum that produced that key.
 */
export type CanvasIconPaint<DataT> = (ctx: CanvasRenderingContext2D, datum: DataT) => void;

/** Maps a datum to the key that identifies its icon. Data with the same key share an icon. */
export type CanvasIconKey<DataT> = string | ((datum: DataT) => string);

export type CanvasIconLayerOwnProps<DataT> = {
	/**
	 * Draws the icon for a key. If it changes, change `updateTriggers.paint` to redraw the icons.
	 */
	paint: CanvasIconPaint<DataT>;

	/**
	 * A constant, or a function of a datum, giving the key of the icon to draw for it.
	 * Like other accessors, changes are only noticed when `updateTriggers.getIconKey` changes.
	 */
	getIconKey: CanvasIconKey<DataT>;

	/**
	 * Width and height of the canvas each icon is drawn on, in pixels.
	 * Icons are drawn at this size and scaled by `getSize`.
	 * This should be set to a sufficiently large value for the icons to appear crisp.
	 */
	iconSize: number;

	/** If `true`, only the icon's alpha channel is used, and it is tinted by `getColor`. */
	mask: boolean;
};

export type CanvasIconLayerProps<DataT = unknown> = CanvasIconLayerOwnProps<DataT> &
	Omit<IconLayerProps<DataT>, 'iconAtlas' | 'iconMapping' | 'getIcon'> &
	CompositeLayerProps;

/** Default for `iconSize`. */
export const ICON_PX = 128;

export const rgba = (c: Color) => `rgba(${c[0]},${c[1]},${c[2]},${(c[3] ?? 255) / 255})`;

// Props forwarded unchanged to the IconLayer sublayer.
const FORWARDED_PROPS = [
	'sizeScale',
	'sizeUnits',
	'sizeBasis',
	'sizeMinPixels',
	'sizeMaxPixels',
	'billboard',
	'alphaCutoff',
	'getPosition',
	'getColor',
	'getSize',
	'getAngle',
	'getPixelOffset',
	'onIconError',
	'textureParameters'
] as const;

// IconLayer's defaults, except for the props this layer sets itself.
const iconLayerDefaultProps: Record<string, unknown> = { ...IconLayer.defaultProps };
for (const name of ['iconAtlas', 'iconMapping', 'getIcon']) delete iconLayerDefaultProps[name];

const defaultProps: DefaultProps<CanvasIconLayerProps> = {
	...(iconLayerDefaultProps as DefaultProps<CanvasIconLayerProps>),
	paint: { type: 'function', value: () => {}, compare: false },
	getIconKey: { type: 'accessor', value: 'icon' },
	iconSize: { type: 'number', value: ICON_PX, min: 1 },
	mask: false
};

/**
 * CanvasIconLayer is a composite layer that dynamically draws icons to represent features.
 *
 * The `paint` function draws an icon on an HTML Canvas.
 *
 * Each datum is mapped to a key by `getIconKey`, and `paint` is called once per distinct key.
 *
 * The generated icons are rendered by an IconLayer.
 *
 * All other IconLayer props (e.g. `getPosition`, `getColor`, `getSize`) are passed through.
 */
export class CanvasIconLayer<DataT = any> extends CompositeLayer<
	Required<CanvasIconLayerOwnProps<DataT>> &
		Omit<IconLayerProps<DataT>, 'iconAtlas' | 'iconMapping' | 'getIcon'>
> {
	static layerName = 'CanvasIconLayer';
	static defaultProps = defaultProps;

	declare state: {
		/** Icons drawn so far, by key. */
		icons: Map<string, CanvasIconDef>;

		/**
		 * Incremented whenever existing icons become stale. IconLayer never refetches an id it
		 * has already packed, so this is included in icon ids to force it to use the new artwork.
		 */
		version: number;
	};

	initializeState() {
		this.state = { icons: new Map(), version: 0 };
	}

	updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
		// As for accessors, a new `paint` function is only noticed when `updateTriggers.paint`
		// changes, so that an inline function doesn't cause every icon to be redrawn.
		const triggers = changeFlags.updateTriggersChanged;
		const stale =
			(triggers && (triggers.all || triggers.paint)) ||
			props.iconSize !== oldProps.iconSize ||
			props.mask !== oldProps.mask;

		if (stale) {
			this.setState({ icons: new Map(), version: this.state.version + 1 });
		}
	}

	private keyOf(datum: DataT): string {
		const { getIconKey } = this.props;
		return typeof getIconKey === 'function' ? getIconKey(datum) : getIconKey;
	}

	private iconFor(datum: DataT): CanvasIconDef {
		const key = this.keyOf(datum);
		const { icons, version } = this.state;

		const hit = icons.get(key);
		if (hit) return hit;

		const { paint, iconSize, mask } = this.props;

		// Layers only render in the browser, but may be constructed during SSR.
		const canvas = typeof document === 'undefined' ? null : document.createElement('canvas');
		let url = '';

		if (canvas) {
			canvas.width = iconSize;
			canvas.height = iconSize;
			paint(canvas.getContext('2d')!, datum);
			url = canvas.toDataURL();
		}

		const icon: CanvasIconDef = {
			id: `${version}:${key}`,
			url,
			width: iconSize,
			height: iconSize,
			anchorX: iconSize / 2,
			anchorY: iconSize / 2,
			mask
		};

		if (canvas) icons.set(key, icon);
		return icon;
	}

	renderLayers() {
		const { data, getIconKey, updateTriggers } = this.props;
		const forwarded = Object.fromEntries(FORWARDED_PROPS.map((name) => [name, this.props[name]]));

		return new IconLayer<DataT>(
			this.getSubLayerProps({
				id: 'icons',
				...forwarded,
				data,
				getIcon: (d: DataT) => this.iconFor(d),
				updateTriggers: {
					...updateTriggers,
					getIcon: [
						this.state.version,
						typeof getIconKey === 'function' ? updateTriggers?.getIconKey : getIconKey
					]
				}
			})
		);
	}
}

export default CanvasIconLayer;
