import type { CompositeLayerProps, Layer, LayersList } from '@deck.gl/core';
import type { Position } from 'geojson';
import type { AnyProps, ClusterFeature, PointFeature } from 'supercluster';
import type { LayerDataInput } from '../layerData';

type BaseRenderProps<FeatureT> = {
	id: string;
	data: FeatureT[];

	/** Integer zoom level the features were queried at. */
	zoom: number;
	getPosition: (f: FeatureT) => [number, number];
	updateTriggers?: Record<string, unknown>;

	/**
	 * Wraps a row derived from a feature (e.g. when one feature is drawn as several rows), so
	 * that picking the row resolves back to the feature. See CompositeLayer.getSubLayerRow.
	 */
	makeRow: <R extends object>(row: R, source: FeatureT, index: number) => R;

	/** Everything CompositeLayer.getSubLayerProps injects: pickable, opacity, extensions, ... */
	[prop: string]: unknown;
};

/** The type of props provided as an argument to a clusterRender() function. */
export type ClusterRenderProps<DataT extends AnyProps> = BaseRenderProps<
	ClusterFeature<AnyProps>
> & {
	/** Gets the number of points in a cluster  */
	getPointCount: (f: ClusterFeature<AnyProps>) => number;

	/** Get the points in a cluster. */
	getLeaves: (f: ClusterFeature<AnyProps>) => DataT[];
};

/** The type of props provided as an argument to a pointRender() function. */
export type PointRenderProps<DataT extends AnyProps> = BaseRenderProps<PointFeature<DataT>> & {
	getDatum: (f: PointFeature<DataT>) => DataT;
};

/** The type of a renderCluster() function, which receives props as an argument and returns a Layer that renders clusters. */
export type ClusterRenderer<DataT extends AnyProps = AnyProps> = (
	props: ClusterRenderProps<DataT>
) => Layer | LayersList | null;

/** The type of a renderPoints() function, which receives props as an argument and returns a Layer that renders non-clustered points. */
export type PointRenderer<DataT extends AnyProps = AnyProps> = (
	props: PointRenderProps<DataT>
) => Layer | LayersList | null;

export type ClusterOrPoint<DataT extends AnyProps> = PointFeature<DataT> | ClusterFeature<AnyProps>;

/** The type of `info.object` when the user picks/clicks the rendering of a cluster. */
export type ClusterPickingObject<DataT> = {
	isCluster: true;
	clusterId: number;
	pointCount: number;
	/** The zoom at which this cluster splits apart. */
	expansionZoom: number;
	/** The position of the cluster, as `[longitude, latitude]`. */
	position: [number, number];

	/** All the points in the cluster, including those in categories other than `key`. */
	points: DataT[];

	/**
	 * The category of the part of the cluster that was picked, for renderers that draw each
	 * category separately (e.g. `splitClusters`). Not set for renderers that draw the cluster as one.
	 */
	key?: string;
};

/** The type of `info.object` when the user picks/clicks the rendering of a non-clustered point. */
export type PointPickingObject<DataT> = { isCluster: false; point: DataT };

export type ClusterLayerOwnProps<DataT extends AnyProps = AnyProps> = {
	/**
	 * An array of data or a GeoJSON FeatureCollection, or a URL or promise that resolves to one
	 * (loaded as for deck's own layers). The layer is empty until the data has loaded.
	 */
	data?: LayerDataInput<DataT>;

	/**
	 * A function that receives options/props as an argument, and returns a Deck.gl Layer (or list of layers) that will be used to render clusters.
	 * The clusters are re-rendered whenever a different function is passed.
	 *
	 * As for deck's own layers, a renderer with a new style (e.g. a new call to `circleClusters()`)
	 * updates constant values, such as colors, straight away. Function accessors, such as radius
	 * ramps, only update when the data changes (at the next integer zoom) or when the matching
	 * trigger in the style's `updateTriggers` changes, e.g. `updateTriggers: { getRadius: [radiusMinPixels] }`.
	 */
	renderClusters?: ClusterRenderer<DataT>;

	/**
	 * A function that receives options/props as an argument, and returns a Deck.gl Layer (or list of layers) that will be used to render individual points.
	 * The points are re-rendered whenever a different function is passed.
	 *
	 * As for deck's own layers, a renderer with a new style (e.g. a new call to `circlePoints()`)
	 * updates constant values, such as colors, straight away. Function accessors, such as a
	 * `getFillColor` function, only update when the data changes (at the next integer zoom) or when the
	 * matching trigger in the style's `updateTriggers` changes, e.g. `updateTriggers: { getFillColor: [palette] }`.
	 */
	renderPoints?: PointRenderer<DataT>;

	/**
	 * Returns the position of a point, as GeoJSON coordinates (i.e. `number[]` rather than deck's
	 * narrower `Position` tuple). Assumes GeoJSON point features by default.
	 * As for deck's own accessors, a new function is only noticed when `updateTriggers.getPosition` changes.
	 */
	getPosition?: (d: DataT) => Position;

	clusterRadius?: number;
	clusterMaxZoom?: number;

	/**
	 * If `true`, clicking a cluster zooms the map in on it, to the zoom level at which it splits
	 * apart (`expansionZoom`). The zoom is requested through the Deck `onViewStateChange` prop,
	 * which `MapDeckOverlay` applies to the MapLibre map.
	 */
	clickToZoom?: boolean;

	/** Read by @deck.gl/mapbox off the top-level layer and applied to the whole sublayer tree.
	 * Declared here because it is not one of deck's own layer props. */
	beforeId?: string;
};

export type ClusterLayerProps<DataT extends AnyProps = AnyProps> = ClusterLayerOwnProps<DataT> &
	CompositeLayerProps;
