import type {
	Accessor,
	Color,
	CompositeLayerProps,
	DefaultProps,
	Layer,
	LayersList,
	UpdateParameters
} from '@deck.gl/core';
import { CompositeLayer } from '@deck.gl/core';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Feature, Point, Position } from 'geojson';

import { reposition } from './movePoints';

/** One row per feature, carrying both its original and its shifted position. */
export type NonOverlappingRow<DataT> = {
	datum: DataT;
	originalPosition: Position;
	shiftedPosition: Position;
	hasMoved: boolean;

	/** The radius (in `radiusUnits`) that the glyph was spaced for. */
	radius: number;
};

/** The type of props provided as an argument to a renderGlyphs() function. */
export type GlyphRenderProps<DataT> = {
	id: string;
	data: NonOverlappingRow<DataT>[];

	/** Returns the shifted (non-overlapping) position of a feature. */
	getPosition: (row: NonOverlappingRow<DataT>) => [number, number];

	/** Returns the original datum for a feature. */
	getDatum: (row: NonOverlappingRow<DataT>) => DataT;

	/** Returns the radius that a glyph was spaced for; glyphs should be drawn no larger than this, or they may overlap. */
	getRadius: (row: NonOverlappingRow<DataT>) => number;

	/** The units of the radius returned by `getRadius`. */
	radiusUnits: 'meters' | 'pixels';

	updateTriggers?: Record<string, unknown>;

	/** Everything CompositeLayer.getSubLayerProps injects: pickable, opacity, extensions, ... */
	[prop: string]: unknown;
};

/** The type of a renderGlyphs() function, which receives props as an argument and returns the Layer(s) that draw the glyphs. */
export type GlyphRenderer<DataT = any> = (
	props: GlyphRenderProps<DataT>
) => Layer | LayersList | null;

export type NonOverlappingGlyphLayerOwnProps<DataT = any> = {
	data?: DataT[] | null;

	/**
	 * A function that receives options/props as an argument, and returns a Deck.gl Layer (or list of layers) that will be used to render the glyphs at their shifted positions.
	 */
	renderGlyphs: GlyphRenderer<DataT>;

	/** GeoJSON coordinates, i.e. `number[]` rather than deck's narrower `Position` tuple. */
	getPosition?: Accessor<DataT, Position>;

	/**
	 * Glyphs are treated as circles of this radius (in `radiusUnits`) when moving them apart.
	 * Either a constant, or a function returning the radius of each glyph. When passing a function,
	 * use `updateTriggers.getGlyphRadius` to indicate when the radii should be re-calculated.
	 */
	getGlyphRadius?: Accessor<DataT, number>;

	/**
	 * The units of `getGlyphRadius` and `leaderLineEndRadius`.
	 *
	 * With `'meters'`, positions are computed once and stay fixed in geographic space.
	 * With `'pixels'`, positions are re-computed whenever the zoom level crosses a multiple of
	 * `zoomStep`. They are computed for the zoom level at the bottom of that range, so glyphs
	 * that stay the same size on screen only move further apart as the map is zoomed in.
	 */
	radiusUnits?: 'meters' | 'pixels';

	/**
	 * With `radiusUnits: 'pixels'`, the zoom interval at which positions are re-computed.
	 * For example, `0.5` re-computes them as the zoom level crosses 12, 12.5, 13, 13.5, ...
	 * Smaller steps keep glyphs closer together, at the cost of re-computing more often.
	 * Values below `MIN_ZOOM_STEP` (0.01) are treated as `MIN_ZOOM_STEP`.
	 */
	zoomStep?: number;

	/**
	 * The maximum number of iterations used to move glyphs apart.
	 * This can be increased if you are prepared to spend longer to better separate densely overlapping glyphs.
	 */
	maxIterations?: number;

	/** If `true`, then draw a line from each moved glyph back to its original position. */
	showLeaderLines?: boolean;

	/** Color of the leader line.  */
	leaderLineColor?: Color;

	/** Width of the leader line, in pixels. */
	leaderLineWidth?: number;

	/** Radius of the marker drawn at the original position of each moved glyph, in `radiusUnits`. */
	leaderLineEndRadius?: number;

	/** Read by @deck.gl/mapbox off the top-level layer and applied to the whole sublayer tree.
	 * Declared here because it is not one of deck's own layer props. */
	beforeId?: string;
};

export type NonOverlappingGlyphLayerProps<DataT = any> = NonOverlappingGlyphLayerOwnProps<DataT> &
	CompositeLayerProps;

/**
 * The smallest `zoomStep` that is used (this is to avoid division-by-zero errors).
 */
export const MIN_ZOOM_STEP = 0.01;

const defaultProps: DefaultProps<NonOverlappingGlyphLayerProps> = {
	data: { type: 'array', value: [], compare: 1 },

	renderGlyphs: { type: 'function', value: () => null, compare: false },

	// Assumes GeoJSON point features; pass `getPosition` for any other shape.
	getPosition: {
		type: 'accessor',
		value: (d: any) => (d as Feature<Point>).geometry.coordinates
	},

	getGlyphRadius: { type: 'accessor', value: 10 },
	radiusUnits: 'meters',
	zoomStep: { type: 'number', value: 1, min: MIN_ZOOM_STEP },
	maxIterations: { type: 'number', value: 40, min: 0 },

	showLeaderLines: true,
	leaderLineColor: { type: 'color', value: [128, 128, 128] },
	leaderLineWidth: { type: 'number', value: 1, min: 0 },
	leaderLineEndRadius: { type: 'number', value: 1.5, min: 0 }
};

const computeLayout = <DataT>(
	data: DataT[],
	positionOf: (d: DataT, i: number) => Position,
	radiusOf: (d: DataT, i: number) => number,
	project: (xyz: number[]) => number[],
	unproject: (xyz: number[]) => number[],
	pixelsPerUnit: number,
	maxIterations: number
): NonOverlappingRow<DataT>[] => {
	const originalPositions = data.map(positionOf);
	const radii = data.map(radiusOf);

	// reposition() works in screen space, and mutates the nodes it is given
	const nodes = originalPositions.map((position, i) => {
		const [x, y] = project(position);
		return { id: i, x, y, radius: radii[i] * pixelsPerUnit, hasMoved: false };
	});

	reposition(nodes, maxIterations);

	return nodes.map((node, i) => ({
		datum: data[i],
		originalPosition: originalPositions[i],
		shiftedPosition: unproject([node.x, node.y]),
		hasMoved: node.hasMoved,
		radius: radii[i]
	}));
};

/**
 * NonOverlappingGlyphLayer is a composite layer that moves glyphs apart so that they do not
 * overlap, and renders them using the layer(s) returned by the `renderGlyphs()` prop.
 * Glyphs that have moved are optionally joined to their original position by a leader line.
 *
 * With `radiusUnits: 'meters'` (the default), positions are computed once, at the zoom level of
 * the first viewport, and then stay fixed in geographic space (so glyphs sized in meters remain
 * non-overlapping at any zoom). With `radiusUnits: 'pixels'`, positions are re-computed whenever
 * the zoom level crosses a multiple of `zoomStep`.
 *
 * Picking a glyph returns the original datum.
 */
export class NonOverlappingGlyphLayer<DataT = Feature<Point>> extends CompositeLayer<
	Required<NonOverlappingGlyphLayerOwnProps<DataT>>
> {
	static layerName = 'NonOverlappingGlyphLayer';
	static defaultProps = defaultProps;

	declare state: {
		rows: NonOverlappingRow<DataT>[];
		/** Zoom level (a multiple of `zoomStep`) the current positions were computed for. */
		zoom: number;
	};

	// override this so viewport changes trigger call to updateState
	shouldUpdateState(params: UpdateParameters<this>) {
		if (params.changeFlags.viewportChanged) {
			return true;
		}
		return super.shouldUpdateState(params);
	}

	/** Resolve `getPosition`, which may be either a constant or a function. */
	private positionOf(datum: DataT, index: number, data: DataT[]): Position {
		const { getPosition } = this.props;
		return typeof getPosition === 'function'
			? getPosition(datum, { index, data, target: [] })
			: getPosition;
	}

	/** Resolve `getGlyphRadius`, which may be either a constant or a function. */
	private radiusOf(datum: DataT, index: number, data: DataT[]): number {
		const { getGlyphRadius } = this.props;
		return typeof getGlyphRadius === 'function'
			? getGlyphRadius(datum, { index, data, target: [] })
			: getGlyphRadius;
	}

	updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
		const { viewport } = this.context;
		const inPixels = props.radiusUnits === 'pixels';

		const zoomStep = Math.max(props.zoomStep, MIN_ZOOM_STEP);
		const zoom = Math.floor(viewport.zoom / zoomStep) * zoomStep;

		// As for deck's own accessors, a change to a function-valued `getGlyphRadius` is only noticed
		// via updateTriggers; a change to a constant is noticed directly.
		const updateTriggersChanged = changeFlags.updateTriggersChanged;
		const radiusChanged =
			(typeof props.getGlyphRadius !== 'function' &&
				props.getGlyphRadius !== oldProps.getGlyphRadius) ||
			(updateTriggersChanged &&
				(updateTriggersChanged.all || updateTriggersChanged.getGlyphRadius));

		// Pixel distances between glyphs only change with zoom, not when panning
		const shouldUpdate =
			changeFlags.dataChanged ||
			radiusChanged ||
			props.radiusUnits !== oldProps.radiusUnits ||
			props.zoomStep !== oldProps.zoomStep ||
			props.maxIterations !== oldProps.maxIterations ||
			(inPixels && zoom !== this.state.zoom);

		if (!shouldUpdate) return;

		const data = (props.data ?? []) as DataT[];

		const rows = computeLayout(
			data,
			(d, i) => this.positionOf(d, i, data),
			(d, i) => this.radiusOf(d, i, data),
			(xyz) => viewport.project(xyz),
			(xyz) => viewport.unproject(xyz),
			// Positions are projected at the current (fractional) zoom, where distances are
			// 2^(viewport.zoom - zoom) times larger than at the zoom we lay out for
			inPixels ? Math.pow(2, viewport.zoom - zoom) : 1 / viewport.metersPerPixel,
			props.maxIterations
		);

		this.setState({ rows, zoom });
	}

	renderLayers() {
		const rows = this.state.rows ?? [];
		const {
			renderGlyphs,
			radiusUnits,
			showLeaderLines,
			leaderLineColor,
			leaderLineWidth,
			leaderLineEndRadius
		} = this.props;

		// Wrapping each row means picking resolves back to the original datum.
		const glyphRows = rows.map((row, i) => this.getSubLayerRow(row, row.datum, i));
		const movedRows = glyphRows.filter((row) => row.hasMoved);

		return [
			showLeaderLines &&
				new LineLayer<NonOverlappingRow<DataT>>(
					this.getSubLayerProps({
						id: 'leader-lines',
						data: movedRows,
						pickable: false,
						getWidth: leaderLineWidth,
						getSourcePosition: (row: NonOverlappingRow<DataT>) => row.shiftedPosition,
						getTargetPosition: (row: NonOverlappingRow<DataT>) => row.originalPosition,
						getColor: leaderLineColor
					})
				),

			showLeaderLines &&
				new ScatterplotLayer<NonOverlappingRow<DataT>>(
					this.getSubLayerProps({
						id: 'original-positions',
						data: movedRows,
						pickable: false,
						radiusUnits,
						getRadius: leaderLineEndRadius,
						getPosition: (row: NonOverlappingRow<DataT>) => row.originalPosition,
						getFillColor: leaderLineColor
					})
				),

			renderGlyphs(
				this.getSubLayerProps({
					id: 'glyphs',
					data: glyphRows,
					radiusUnits,
					getRadius: (row: NonOverlappingRow<DataT>) => row.radius,
					getPosition: (row: NonOverlappingRow<DataT>) => row.shiftedPosition as [number, number],
					getDatum: (row: NonOverlappingRow<DataT>) => row.datum
				}) as GlyphRenderProps<DataT>
			)
		]
			.flat()
			.filter(Boolean);
	}
}

export default NonOverlappingGlyphLayer;
