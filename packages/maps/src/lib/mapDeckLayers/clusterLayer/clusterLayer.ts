import { CompositeLayer } from '@deck.gl/core';
import type { Feature, Point } from 'geojson';

import type {
	DefaultProps,
	GetPickingInfoParams,
	PickingInfo,
	UpdateParameters
} from '@deck.gl/core';
import Supercluster, { type AnyProps, type ClusterFeature, type PointFeature } from 'supercluster';
import { circleClusters, circlePoints } from './renderers/defaultRenderers';
import type {
	ClusterLayerOwnProps,
	ClusterLayerProps,
	ClusterOrPoint,
	ClusterPickingObject,
	PointPickingObject
} from './types';

// this covers the full range of longitudes (-180 degrees to 180 degrees),
// and truncates the latitude at approximately the value that makes the projected map square
// (85 degrees north or south).
const WORLD_BOUNDS: [number, number, number, number] = [-180, -85, 180, 85];

const DEFAULT_CLUSTER_RENDERER = circleClusters();
const DEFAULT_POINT_RENDERER = circlePoints();

export const isCluster = <DataT extends AnyProps>(
	feature: ClusterOrPoint<DataT>
): feature is ClusterFeature<AnyProps> => Boolean((feature.properties as AnyProps)?.cluster);

const defaultProps: DefaultProps<ClusterLayerProps> = {
	data: { type: 'array', value: [], compare: 1 },

	// Compared by reference, so a new renderer (e.g. with different options) re-renders the layer
	renderClusters: { type: 'function', value: DEFAULT_CLUSTER_RENDERER, compare: true },
	renderPoints: { type: 'function', value: DEFAULT_POINT_RENDERER, compare: true },

	// Assumes GeoJSON point features; pass `getPosition` for any other shape.
	getPosition: {
		type: 'function',
		value: (d: AnyProps) => (d as Feature<Point>).geometry.coordinates,
		compare: false
	},

	clusterRadius: { type: 'number', value: 60, min: 1 },
	clusterMaxZoom: { type: 'number', value: 16, min: 0 }
};

/**
 * ClusterLayer is a composite layer that clusters data using supercluster.
 * It renders clusters and lone points separately, using the layers returned by calling the
 * `renderClusters` and `renderPoints` functions provided as props.
 *
 * Picking a non-clustered point returns the original feature;
 * picking a cluster returns an object that includes an array of the features it contains
 * (and other details).
 */
export class ClusterLayer<DataT extends AnyProps = Feature<Point>> extends CompositeLayer<
	Required<ClusterLayerOwnProps<DataT>>
> {
	static layerName = 'ClusterLayer';
	static defaultProps = defaultProps;

	declare state: {
		index: Supercluster<DataT, AnyProps>;
		/** Integer zoom level the current clusters and points were queried at. */
		zoom: number;
		clusters: ClusterFeature<AnyProps>[];
		points: PointFeature<DataT>[];
	};

	// The default implementation ignores viewport changes, so we need to override it.
	// We need to update in response to a viewport change if the zoom level crossed
	// an integer threshold; other viewport changes (e.g. panning) should be ignored.
	shouldUpdateState({ changeFlags }: UpdateParameters<this>) {
		return (
			changeFlags.propsOrDataChanged ||
			(changeFlags.viewportChanged && Math.floor(this.context.viewport.zoom) !== this.state.zoom)
		);
	}

	updateState({ props, oldProps, changeFlags }: UpdateParameters<this>) {
		// Building the index is the expensive part and is only necessary if
		// there are changes to the data or some props (not on the viewport)
		// As for deck's own accessors, a change to `getPosition` is only noticed via updateTriggers,
		// so that an inline function doesn't rebuild the index on every render
		const triggers = changeFlags.updateTriggersChanged;
		const rebuildIndex =
			changeFlags.dataChanged ||
			props.clusterRadius !== oldProps.clusterRadius ||
			props.clusterMaxZoom !== oldProps.clusterMaxZoom ||
			(triggers && (triggers.all || triggers.getPosition));

		if (rebuildIndex) {
			const index = new Supercluster<DataT, AnyProps>({
				radius: props.clusterRadius,
				maxZoom: props.clusterMaxZoom
			});

			// We pass supercluster a modified copy of the data, in which
			// each feature has been replaced by a new feature whose geometry
			// is a point at the location returned by `getPosition`,
			// and whose `properties` attribute contains the entire original
			// feature object (both geometry and properties).
			const data = props.data ?? [];
			index.load(
				data.map((d) => ({
					type: 'Feature' as const,
					geometry: { type: 'Point' as const, coordinates: props.getPosition(d) },
					properties: d
				}))
			);

			this.setState({ index });
		}

		// Only update when index has been rebuilt, or zoom has moved past an
		// integer threshold (not on every fractional change in zoom level).
		const zoom = Math.floor(this.context.viewport.zoom);
		if (rebuildIndex || zoom !== this.state.zoom) {
			const clusters: ClusterFeature<AnyProps>[] = [];
			const points: PointFeature<DataT>[] = [];

			for (const f of this.state.index.getClusters(WORLD_BOUNDS, zoom)) {
				if (isCluster(f)) clusters.push(f);
				else points.push(f as PointFeature<DataT>);
			}

			this.setState({ zoom, clusters, points });
		}
	}

	getPickingInfo(params: GetPickingInfoParams): PickingInfo {
		const info = super.getPickingInfo(params);
		const feature = info.object as ClusterOrPoint<DataT> | undefined;

		if (feature?.type !== 'Feature') return info as PickingInfo;

		let object: ClusterPickingObject<DataT> | PointPickingObject<DataT>;

		if (isCluster(feature)) {
			const { cluster_id: clusterId, point_count: pointCount } = feature.properties;
			object = {
				isCluster: true,
				clusterId,
				pointCount,
				expansionZoom: this.state.index.getClusterExpansionZoom(clusterId),

				// Fetch all points, not just the default limit of 10.
				// TODO: prop to specify limit?
				points: this.state.index.getLeaves(clusterId, Infinity).map((f) => f.properties)
			};
		} else {
			object = { isCluster: false, point: feature.properties };
		}

		return { ...info, object } as PickingInfo;
	}

	renderLayers() {
		const { clusters, points, zoom } = this.state;
		const { renderClusters, renderPoints } = this.props;

		return [
			renderClusters(
				this.getSubLayerProps({
					id: 'clusters',
					data: clusters,
					zoom,
					getPosition: (f: ClusterFeature<DataT>) => f.geometry.coordinates as [number, number],
					getPointCount: (f: ClusterFeature<DataT>) => f.properties.point_count,
					getLeaves: (f: ClusterFeature<DataT>) =>
						this.state.index.getLeaves(f.properties.cluster_id, Infinity).map((l) => l.properties),
					makeRow: <R extends object>(row: R, source: unknown, index: number) =>
						this.getSubLayerRow(row, source, index)
				})
			),
			renderPoints(
				this.getSubLayerProps({
					id: 'points',
					data: points,
					zoom,
					getPosition: (f: PointFeature<DataT>) => f.geometry.coordinates as [number, number],
					getDatum: (f: PointFeature<DataT>) => f.properties,
					makeRow: <R extends object>(row: R, source: unknown, index: number) =>
						this.getSubLayerRow(row, source, index)
				})
			)
		]
			.flat()
			.filter(Boolean);
	}
}

export default ClusterLayer;
