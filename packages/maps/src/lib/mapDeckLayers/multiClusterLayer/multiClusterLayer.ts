import type { Color, CompositeLayerProps, DefaultProps, UpdateParameters } from '@deck.gl/core';
import { CompositeLayer } from '@deck.gl/core';
import type { Feature, Point, Position } from 'geojson';
import Supercluster, { type AnyProps } from 'supercluster';

import { isCluster } from '../clusterLayer/clusterLayer';
import {
	circleClusters,
	circlePoints,
	clusterRadiusRamp,
	pointRadiusRamp,
	type CircleClusterStyle,
	type CirclePointStyle
} from '../clusterLayer/renderers/defaultRenderers';
import type { ClusterRenderProps, PointRenderProps } from '../clusterLayer/types';
import {
	NonOverlappingGlyphLayer,
	type GlyphRenderProps,
	type NonOverlappingRow
} from '../nonOverlappingLayer/nonOverlappingGlyphLayer';

/**
 * A cluster (or lone point) containing points of a single type.
 * This is `info.object` when a glyph is picked.
 */
export type ClusterByTypeGlyph<DataT> = {
	/** The type shared by every point in the glyph, as returned by `getKey`. */
	key: string;
	position: [number, number];
	count: number;
	points: DataT[];

	/** Radius of the glyph (including its stroke), in pixels. */
	radius: number;
};

export type MultiClusterLayerOwnProps<DataT = any> = {
	data?: DataT[] | null;

	/** The type each point is clustered by, e.g. `(d) => d.properties.event_type`. */
	getKey: (d: DataT) => string;

	/** Circle color for each type. Types not listed here are drawn in grey. */
	colors?: Record<string, Color>;

	/** Returns the position of a point. Assumes GeoJSON point features by default. */
	getPosition?: (d: DataT) => Position;

	/** The radius (in pixels) within which points of the same type are grouped into a cluster. */
	clusterRadius?: number;

	/** The maximum zoom level at which points are clustered. */
	clusterMaxZoom?: number;

	/**
	 * The zoom interval at which the non-overlapping layout is re-computed. For example, `0.5`
	 * re-computes it as the zoom level crosses 12, 12.5, 13, 13.5, ...
	 * Clusters themselves are only re-computed at integer zoom levels.
	 */
	zoomStep?: number;

	/** Read by @deck.gl/mapbox off the top-level layer and applied to the whole sublayer tree.
	 * Declared here because it is not one of deck's own layer props. */
	beforeId?: string;
};

export type MultiClusterLayerProps<DataT = any> = MultiClusterLayerOwnProps<DataT> &
	CompositeLayerProps;

// this covers the full range of longitudes (-180 degrees to 180 degrees),
// and truncates the latitude at approximately the value that makes the projected map square
// (85 degrees north or south).
const WORLD_BOUNDS: [number, number, number, number] = [-180, -85, 180, 85];

const DEFAULT_COLOR: Color = [128, 128, 128];

// Shared by the renderers and by the radius calculations used to space the glyphs apart
const CLUSTER_STYLE: CircleClusterStyle = {
	minRadius: 8,
	maxRadius: 20,
	radiusScale: 1.5,
	strokeColor: [255, 255, 255],
	strokeWidth: 1.5
};
const POINT_STYLE: CirclePointStyle<AnyProps> = {
	strokeColor: [255, 255, 255],
	strokeWidth: 1.5
};

// The stroke is centred on the edge of the circle, so half of it lies outside the radius
const clusterRadiusOf = (count: number) =>
	clusterRadiusRamp(CLUSTER_STYLE)(count) + CLUSTER_STYLE.strokeWidth! / 2;
const pointRadiusOf = (zoom: number) =>
	pointRadiusRamp(POINT_STYLE)(zoom) + POINT_STYLE.strokeWidth! / 2;

const defaultProps: DefaultProps<MultiClusterLayerProps> = {
	data: { type: 'array', value: [], compare: 1 },
	getKey: { type: 'function', value: () => '', compare: false },
	colors: { type: 'object', value: {}, compare: 1 },
	getPosition: {
		type: 'function',
		value: (d: any) => (d as Feature<Point>).geometry.coordinates,
		compare: false
	},
	clusterRadius: { type: 'number', value: 60, min: 1 },
	clusterMaxZoom: { type: 'number', value: 16, min: 0 },
	zoomStep: { type: 'number', value: 1, min: 0 }
};

type GlyphRow<DataT> = NonOverlappingRow<ClusterByTypeGlyph<DataT>>;

/**
 * Draws the glyphs using the same renderers as ClusterLayer: `circleClusters()` for clusters
 * (called once per type, as it draws every cluster in a single color) and `circlePoints()` for
 * lone points.
 */
const renderGlyphs =
	<DataT>(zoom: number, getKey: (d: DataT) => string, colors: Record<string, Color>) =>
	({
		getRadius,
		radiusUnits,
		getDatum,
		data,
		...props
	}: GlyphRenderProps<ClusterByTypeGlyph<DataT>>) => {
		const clusterRows: Record<string, GlyphRow<DataT>[]> = {};
		const pointRows: GlyphRow<DataT>[] = [];
		for (const row of data) {
			const glyph = getDatum(row);
			if (glyph.count > 1) (clusterRows[glyph.key] ??= []).push(row);
			else pointRows.push(row);
		}

		// The rows have already been wrapped by NonOverlappingGlyphLayer (so picking resolves to
		// the glyph), and the circle renderers do not derive rows of their own.
		const makeRow = <R extends object>(row: R) => row;

		const clusterLayers = Object.entries(clusterRows).map(([key, rows]) =>
			circleClusters<DataT & AnyProps>({ ...CLUSTER_STYLE, color: colors[key] ?? DEFAULT_COLOR })({
				...props,
				id: `${props.id}-clusters-${key}`,
				data: rows,
				zoom,
				getPosition: (row: GlyphRow<DataT>) => row.shiftedPosition as [number, number],
				getPointCount: (row: GlyphRow<DataT>) => getDatum(row).count,
				getLeaves: (row: GlyphRow<DataT>) => getDatum(row).points,
				makeRow
			} as unknown as ClusterRenderProps<DataT & AnyProps>)
		);

		const pointLayer = circlePoints<DataT & AnyProps>({
			...POINT_STYLE,
			getColor: (d) => colors[getKey(d)] ?? DEFAULT_COLOR
		})({
			...props,
			id: `${props.id}-points`,
			data: pointRows,
			zoom,
			getPosition: (row: GlyphRow<DataT>) => row.shiftedPosition as [number, number],
			getDatum: (row: GlyphRow<DataT>) => getDatum(row).points[0],
			makeRow
		} as unknown as PointRenderProps<DataT & AnyProps>);

		return [...clusterLayers, pointLayer];
	};

/**
 * MultiClusterLayer is a composite layer that clusters the points of each type (as returned by
 * `getKey`) separately, using supercluster, so every cluster contains points of only one type.
 *
 * The clusters (and lone points) of every type are passed to a single NonOverlappingGlyphLayer,
 * which moves them apart so that they do not overlap.
 *
 * The clusters are re-calculated whenever the map crosses an integer zoom level, and the
 * non-overlapping layout whenever it crosses a multiple of `zoomStep`.
 *
 * Picking a glyph returns a `ClusterByTypeGlyph`.
 */
export class MultiClusterLayer<DataT = Feature<Point>> extends CompositeLayer<
	Required<MultiClusterLayerOwnProps<DataT>>
> {
	static layerName = 'MultiClusterLayer';
	static defaultProps = defaultProps;

	declare state: {
		indexes: Record<string, Supercluster<DataT & AnyProps, AnyProps>>;
		zoom: number;
		glyphs: ClusterByTypeGlyph<DataT>[];
	};

	// The default implementation updates on prop and data changes, but not on viewport changes.
	// We therefore over-ride it, so that updateState() re-runs whenever anything has changed.
	shouldUpdateState({ changeFlags }: UpdateParameters<this>) {
		return changeFlags.somethingChanged;
	}

	updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
		const rebuildIndexes =
			changeFlags.dataChanged ||
			props.clusterRadius !== oldProps.clusterRadius ||
			props.clusterMaxZoom !== oldProps.clusterMaxZoom;

		if (rebuildIndexes) {
			const byKey: Record<string, DataT[]> = {};
			for (const d of props.data ?? []) (byKey[props.getKey(d)] ??= []).push(d);

			const indexes = Object.fromEntries(
				Object.entries(byKey).map(([key, data]) => {
					const index = new Supercluster<DataT & AnyProps, AnyProps>({
						radius: props.clusterRadius,
						maxZoom: props.clusterMaxZoom
					});
					index.load(
						data.map((d) => ({
							type: 'Feature' as const,
							geometry: { type: 'Point' as const, coordinates: props.getPosition(d) },
							properties: d as DataT & AnyProps
						}))
					);
					return [key, index];
				})
			);

			this.setState({ indexes });
		}

		const { viewport } = this.context;
		const zoom = Math.floor(viewport.zoom);
		if (rebuildIndexes || zoom !== this.state.zoom) {
			const glyphs: ClusterByTypeGlyph<DataT>[] = [];

			for (const [key, index] of Object.entries(this.state.indexes)) {
				for (const f of index.getClusters(WORLD_BOUNDS, zoom)) {
					const position = f.geometry.coordinates as [number, number];
					if (isCluster(f)) {
						const count = f.properties.point_count;
						glyphs.push({
							key,
							position,
							count,
							points: index.getLeaves(f.properties.cluster_id, Infinity).map((l) => l.properties),
							radius: clusterRadiusOf(count)
						});
					} else {
						const point = f.properties as DataT;
						glyphs.push({ key, position, count: 1, points: [point], radius: pointRadiusOf(zoom) });
					}
				}
			}

			this.setState({ zoom, glyphs });
		}
	}

	renderLayers() {
		const { glyphs, zoom } = this.state;
		const { getKey, colors, zoomStep } = this.props;

		return new NonOverlappingGlyphLayer<ClusterByTypeGlyph<DataT>>(
			this.getSubLayerProps({
				id: 'glyphs',
				data: glyphs,
				getPosition: (g: ClusterByTypeGlyph<DataT>) => g.position,
				radiusUnits: 'pixels',
				zoomStep,
				// Each glyph is spaced according to its own radius, plus a small gap
				getGlyphRadius: (g: ClusterByTypeGlyph<DataT>) => g.radius + 1,
				leaderLineEndRadius: 2,
				renderGlyphs: renderGlyphs<DataT>(zoom, getKey, colors)
			})
		);
	}
}

export default MultiClusterLayer;
