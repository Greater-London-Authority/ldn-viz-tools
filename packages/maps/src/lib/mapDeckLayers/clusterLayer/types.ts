import type { Accessor, CompositeLayerProps, Layer, LayersList } from '@deck.gl/core';
import type { Position } from 'geojson';
import type { AnyProps, ClusterFeature, PointFeature } from 'supercluster';

type BaseRenderProps<FeatureT> = {
	id: string;
	data: FeatureT[];

	/** Integer zoom level the features were queried at. */
	zoom: number;
	getPosition: (f: FeatureT) => [number, number];
	updateTriggers?: Record<string, unknown>;

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
	points: DataT[];
};

/** The type of `info.object` when the user picks/clicks the rendering of a non-clustered point. */
export type PointPickingObject<DataT> = { isCluster: false; point: DataT };

export type ClusterLayerOwnProps<DataT extends AnyProps = AnyProps> = {
	data?: DataT[] | null;

	/**
	 * A function that receives options/props as an argument, and returns a Deck.gl Layer (or list of layers) that will be used to render clusters.
	 */
	renderClusters?: ClusterRenderer<DataT>;

	/**
	 * A function that receives options/props as an argument, and returns a Deck.gl Layer (or list of layers) that will be used to render individual points.
	 */
	renderPoints?: PointRenderer<DataT>;

	/** GeoJSON coordinates, i.e. `number[]` rather than deck's narrower `Position` tuple. */
	getPosition?: Accessor<DataT, Position>;

	clusterRadius?: number;
	clusterMaxZoom?: number;

	/** Read by @deck.gl/mapbox off the top-level layer and applied to the whole sublayer tree.
	 * Declared here because it is not one of deck's own layer props. */
	beforeId?: string;
};

export type ClusterLayerProps<DataT extends AnyProps = AnyProps> = ClusterLayerOwnProps<DataT> &
	CompositeLayerProps;
