import type { Color } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { AnyProps, ClusterFeature, PointFeature } from 'supercluster';
import { tokenColor } from '../../tokenColor';
import type { ClusterRenderer, PointRenderer } from '../types';

/** Area scales with count, so radius scales with sqrt(count). */
export const clusterRadiusRamp =
	({ radiusMinPixels = 8, radiusMaxPixels = 42, radiusScale = 3 } = {}) =>
	(count: number) =>
		Math.min(radiusMinPixels + Math.sqrt(count) * radiusScale, radiusMaxPixels);

/** A single point has no count to scale by, so zoom drives it instead, using the same
 * min + sqrt(growth) * scale shape. Fed the integer query zoom, so points step in size with
 * the clusters rather than resizing through every fractional zoom. */
export const pointRadiusRamp =
	({ radiusMinPixels = 3, radiusMaxPixels = 10, radiusScale = 1.5, fromZoom = 10 } = {}) =>
	(zoom: number) =>
		Math.min(
			radiusMinPixels + Math.sqrt(Math.max(0, zoom - fromZoom)) * radiusScale,
			radiusMaxPixels
		);

/** Abbreviates a count in the same way as supercluster's `point_count_abbreviated` (e.g. "1.2k"). */
export const abbreviateCount = (count: number) =>
	count >= 10000
		? `${Math.round(count / 1000)}k`
		: count >= 1000
			? `${Math.round(count / 100) / 10}k`
			: String(count);

export type CircleClusterStyle = {
	/** Fill color of the circles. */
	getFillColor?: Color;

	/** Outline color of the circles. */
	getLineColor?: Color;

	/** Outline width of the circles (in pixels). */
	getLineWidth?: number;

	textColor?: Color;
	maxTextSize?: number;

	/** Radius (in pixels) of a cluster of a single point; larger clusters grow from this. */
	radiusMinPixels?: number;

	/** Maximum radius (in pixels). */
	radiusMaxPixels?: number;

	/** How quickly the radius grows with the square root of the count. */
	radiusScale?: number;

	/**
	 * Triggers for the layers' accessors, keyed by deck accessor name (e.g. `getRadius`), and
	 * merged into the layers' own.
	 */
	updateTriggers?: Record<string, unknown>;
};

/**
 * Renders clusters as two layers: a `ScatterplotLayer` (which renders a circle for each cluster)
 * and a `TextLayer` (which renders the number of features grouped into each cluster),
 */
export function circleClusters<DataT extends AnyProps = AnyProps>(
	style: CircleClusterStyle = {}
): ClusterRenderer<DataT> {
	const {
		getFillColor = tokenColor('data.primary'),
		getLineColor = tokenColor('geo.inverse.feature.default', 100),
		getLineWidth = 5,
		textColor = tokenColor('inverse.text.default'),
		maxTextSize = 18,
		radiusMinPixels,
		radiusMaxPixels,
		radiusScale,
		updateTriggers
	} = style;

	const radiusOf = clusterRadiusRamp({ radiusMinPixels, radiusMaxPixels, radiusScale });

	return (props) => [
		new ScatterplotLayer<ClusterFeature<AnyProps>>({
			...props,
			id: `${props.id}-circles`,
			radiusUnits: 'pixels',
			lineWidthUnits: 'pixels',
			stroked: true,
			getRadius: (f) => radiusOf(props.getPointCount(f)),
			getFillColor,
			getLineColor,
			getLineWidth,
			updateTriggers: {
				...props.updateTriggers,
				...updateTriggers
			}
		}),

		new TextLayer<ClusterFeature<AnyProps>>({
			fontFamily: 'Inter',

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
				...updateTriggers,
				getSize: [props.zoom, updateTriggers?.getRadius, updateTriggers?.getSize]
			}
		})
	];
}

export type CirclePointStyle<DataT extends AnyProps> = {
	/** Fill color, or an accessor that receives the point's datum. */
	getFillColor?: Color | ((datum: DataT) => Color);

	/** Outline color of the circles. */
	getLineColor?: Color;

	/** Outline width of the circles (in pixels). */
	getLineWidth?: number;

	/** Minimum radius (in pixels). */
	radiusMinPixels?: number;

	/** Maximum radius (in pixels). */
	radiusMaxPixels?: number;

	/** How quickly the radius grows with the square root of the zoom above `fromZoom`. */
	radiusScale?: number;

	/** The zoom level below which the radius is clamped at `radiusMinPixels`. */
	fromZoom?: number;

	/** Triggers for the accessors above, merged into the layer's own. */
	updateTriggers?: Record<string, unknown>;
};

/**
 * Renders points as a `ScatterplotLayer` (which renders a circle for each points).
 */
export function circlePoints<DataT extends AnyProps = AnyProps>(
	style: CirclePointStyle<DataT> = {}
): PointRenderer<DataT> {
	const {
		getFillColor = tokenColor('data.secondary'),
		getLineColor = tokenColor('geo.inverse.feature.default', 100),
		getLineWidth = 1.5,
		radiusMinPixels,
		radiusMaxPixels,
		radiusScale,
		fromZoom,
		updateTriggers
	} = style;

	const radiusOf = pointRadiusRamp({ radiusMinPixels, radiusMaxPixels, radiusScale, fromZoom });

	return (props) =>
		new ScatterplotLayer<PointFeature<DataT>>({
			...props,
			id: `${props.id}-circles`,
			radiusUnits: 'pixels',
			lineWidthUnits: 'pixels',
			stroked: true,
			getRadius: radiusOf(props.zoom),
			getFillColor:
				typeof getFillColor === 'function'
					? (f) => getFillColor(props.getDatum(f))
					: (getFillColor as Color),
			getLineColor,
			getLineWidth,
			updateTriggers: {
				...props.updateTriggers,
				...updateTriggers
			}
		});
}
