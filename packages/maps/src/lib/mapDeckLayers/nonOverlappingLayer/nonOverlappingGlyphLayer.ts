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
};

/** The type of props provided as an argument to a renderGlyphs() function. */
export type GlyphRenderProps<DataT> = {
	id: string;
	data: NonOverlappingRow<DataT>[];

	/** Returns the shifted (non-overlapping) position of a feature. */
	getPosition: (row: NonOverlappingRow<DataT>) => [number, number];

	/** Returns the original datum for a feature. */
	getDatum: (row: NonOverlappingRow<DataT>) => DataT;

	/** The radius (in meters) that glyphs were spaced for; glyphs should be drawn no larger than this, or they may overlap. */
	radius: number;

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

	/** Glyphs are treated as circles of this radius (in meters) when moving them apart. */
	glyphRadius?: number;

	/** If `true`, then draw a line from each moved glyph back to its original position. */
	showLeaderLines?: boolean;

	/** Color of the leader line.  */
	leaderLineColor?: Color;

	/** Width of the leader line, in pixels. */
	leaderLineWidth?: number;

	/** Radius of the marker drawn at the original position of each moved glyph, in meters. */
	leaderLineEndRadius?: number;

	/** Read by @deck.gl/mapbox off the top-level layer and applied to the whole sublayer tree.
	 * Declared here because it is not one of deck's own layer props. */
	beforeId?: string;
};

export type NonOverlappingGlyphLayerProps<DataT = any> = NonOverlappingGlyphLayerOwnProps<DataT> &
	CompositeLayerProps;

const defaultProps: DefaultProps<NonOverlappingGlyphLayerProps> = {
	data: { type: 'array', value: [], compare: 1 },

	renderGlyphs: { type: 'function', value: () => null, compare: false },

	// Assumes GeoJSON point features; pass `getPosition` for any other shape.
	getPosition: {
		type: 'accessor',
		value: (d: any) => (d as Feature<Point>).geometry.coordinates
	},

	glyphRadius: { type: 'number', value: 10, min: 0 },

	showLeaderLines: true,
	leaderLineColor: { type: 'color', value: [128, 128, 128] },
	leaderLineWidth: { type: 'number', value: 1, min: 0 },
	leaderLineEndRadius: { type: 'number', value: 1.5, min: 0 }
};

const computeLayout = <DataT>(
	data: DataT[],
	positionOf: (d: DataT, i: number) => Position,
	project: (xyz: number[]) => number[],
	unproject: (xyz: number[]) => number[],
	pixelsPerMeter: number,
	glyphRadius: number
): NonOverlappingRow<DataT>[] => {
	const originalPositions = data.map(positionOf);

	// reposition() works in screen space, and mutates the nodes it is given
	const nodes = originalPositions.map((position, i) => {
		const [x, y] = project(position);
		return { id: i, x, y, hasMoved: false };
	});

	reposition(nodes, pixelsPerMeter, glyphRadius);

	return nodes.map((node, i) => ({
		datum: data[i],
		originalPosition: originalPositions[i],
		shiftedPosition: unproject([node.x, node.y]),
		hasMoved: node.hasMoved
	}));
};

/**
 * NonOverlappingGlyphLayer is a composite layer that moves glyphs apart so that they do not
 * overlap, and renders them using the layer(s) returned by the `renderGlyphs()` prop.
 * Glyphs that have moved are optinally joined to their original position by a leader line.
 *
 * Positions are computed once, at the zoom level of the first viewport, and then stay fixed
 * in geographic space (so glyphs sized in meters remain non-overlapping at any zoom).
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
		haveAdjustedPositions: boolean;
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

	updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
		if (changeFlags.dataChanged === 'init') {
			// skip - we'll get called again in a moment for a viewport change
			return;
		}

		const shouldUpdate =
			changeFlags.dataChanged ||
			props.glyphRadius !== oldProps.glyphRadius ||
			(changeFlags.viewportChanged && !this.state.haveAdjustedPositions);

		if (!shouldUpdate) return;

		const { viewport } = this.context;
		const data = (props.data ?? []) as DataT[];

		const rows = computeLayout(
			data,
			(d, i) => this.positionOf(d, i, data),
			(xyz) => viewport.project(xyz),
			(xyz) => viewport.unproject(xyz),
			1 / viewport.metersPerPixel,
			props.glyphRadius
		);

		this.setState({ rows, haveAdjustedPositions: true });
	}

	renderLayers() {
		const rows = this.state.rows ?? [];
		const {
			renderGlyphs,
			glyphRadius,
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
						radiusUnits: 'meters',
						getRadius: leaderLineEndRadius,
						getPosition: (row: NonOverlappingRow<DataT>) => row.originalPosition,
						getFillColor: leaderLineColor
					})
				),

			renderGlyphs(
				this.getSubLayerProps({
					id: 'glyphs',
					data: glyphRows,
					radius: glyphRadius,
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
