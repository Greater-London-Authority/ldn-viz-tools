import type { Color } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { AnyProps, ClusterFeature, PointFeature } from 'supercluster';
import type { ClusterRenderer, PointRenderer } from '../types';

/** Area scales with count, so radius scales with sqrt(count). */
export const clusterRadiusRamp =
	({ minRadius = 8, maxRadius = 42, radiusScale = 3 } = {}) =>
	(count: number) =>
		Math.min(minRadius + Math.sqrt(count) * radiusScale, maxRadius);

/** A single point has no count to scale by, so zoom drives it instead, using the same
 * min + sqrt(growth) * scale shape. Fed the integer query zoom, so points step in size with
 * the clusters rather than resizing through every fractional zoom. */
export const pointRadiusRamp =
	({ minRadius = 3, maxRadius = 10, radiusScale = 1.5, fromZoom = 10 } = {}) =>
	(zoom: number) =>
		Math.min(minRadius + Math.sqrt(Math.max(0, zoom - fromZoom)) * radiusScale, maxRadius);

/** Abbreviates a count in the same way as supercluster's `point_count_abbreviated` (e.g. "1.2k"). */
export const abbreviateCount = (count: number) =>
	count >= 10000
		? `${Math.round(count / 1000)}k`
		: count >= 1000
			? `${Math.round(count / 100) / 10}k`
			: String(count);

export type CircleClusterStyle = {
	color?: Color;
	strokeColor?: Color;
	strokeWidth?: number;
	textColor?: Color;
	maxTextSize?: number;
	minRadius?: number;
	maxRadius?: number;
	radiusScale?: number;
};

/**
 * Renders clusters as two layers: a `ScatterplotLayer` (which renders a circle for each cluster)
 * and a `TextLayer` (which renders the number of features grouped into each cluster),
 */
export function circleClusters<DataT extends AnyProps = AnyProps>(
	style: CircleClusterStyle = {}
): ClusterRenderer<DataT> {
	const {
		color = [0, 92, 176],
		strokeColor = [255, 255, 255, 100],
		strokeWidth = 5,
		textColor = [255, 255, 255],
		maxTextSize = 18,
		minRadius,
		maxRadius,
		radiusScale
	} = style;

	const radiusOf = clusterRadiusRamp({ minRadius, maxRadius, radiusScale });

	return (props) => [
		new ScatterplotLayer<ClusterFeature<AnyProps>>({
			...props,
			id: `${props.id}-circles`,
			radiusUnits: 'pixels',
			lineWidthUnits: 'pixels',
			stroked: true,
			getRadius: (f) => radiusOf(props.getPointCount(f)),
			getFillColor: color,
			getLineColor: strokeColor,
			getLineWidth: strokeWidth,
			updateTriggers: {
				...props.updateTriggers
			}
		}),

		new TextLayer<ClusterFeature<AnyProps>>({
			...props,
			id: `${props.id}-counts`,
			// Let clicks fall through to the circle underneath.
			pickable: false,
			sizeUnits: 'pixels',
			getText: (f) => abbreviateCount(props.getPointCount(f)),
			getSize: (f) => Math.min(radiusOf(props.getPointCount(f)) * 0.9, maxTextSize),
			getColor: textColor,
			getTextAnchor: 'middle' as const,
			getAlignmentBaseline: 'center' as const,
			fontWeight: 600,
			// Only the glyphs a count can contain, which keeps the font atlas small.
			characterSet: '0123456789.k',
			updateTriggers: {
				...props.updateTriggers,
				getSize: [props.zoom]
			}
		})
	];
}

export type CirclePointStyle<DataT extends AnyProps> = {
	/** Fill color accessor. */
	getColor?: Color | ((datum: DataT) => Color);

	/** Stroke color */
	strokeColor?: Color;

	/** Stroke width. */
	strokeWidth?: number;

	/** Minimum radius (in pixels). */
	minRadius?: number;

	/** Maximum radius (in pixels). */
	maxRadius?: number;

	radiusScale?: number;

	/** The zoom level below which the radius is clamped at `minRadius`. */
	fromZoom?: number;

	/** Triggers for the accessors above, merged into the layer's own. */
	updateTriggers?: Record<string, unknown>;
};

/**
 * Renders clusters as a `ScatterplotLayer` (which renders a circle for each points).
 */
export function circlePoints<DataT extends AnyProps = AnyProps>(
	style: CirclePointStyle<DataT> = {}
): PointRenderer<DataT> {
	const {
		getColor = [214, 66, 66] as Color,
		strokeColor = [255, 255, 255, 100],
		strokeWidth = 1.5,
		minRadius,
		maxRadius,
		radiusScale,
		fromZoom,
		updateTriggers
	} = style;

	const radiusOf = pointRadiusRamp({ minRadius, maxRadius, radiusScale, fromZoom });

	return (props) =>
		new ScatterplotLayer<PointFeature<DataT>>({
			...props,
			id: `${props.id}-circles`,
			radiusUnits: 'pixels',
			lineWidthUnits: 'pixels',
			stroked: true,
			getRadius: radiusOf(props.zoom),
			getFillColor:
				typeof getColor === 'function' ? (f) => getColor(props.getDatum(f)) : (getColor as Color),
			getLineColor: strokeColor,
			getLineWidth: strokeWidth,
			updateTriggers: {
				...props.updateTriggers,
				...updateTriggers,
				getFillColor: [updateTriggers?.getColor]
			}
		});
}
