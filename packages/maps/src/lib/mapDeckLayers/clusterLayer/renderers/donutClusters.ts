import type { Color, LayersList } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { AnyProps, ClusterFeature } from 'supercluster';
import { CanvasIconLayer, ICON_PX, rgba } from '../../canvasIconLayer/canvasIconLayer';
import { tokenColor } from '../../tokenColor';
import type { ClusterRenderer } from '../types';
import { tallyBy } from './clusterRows';
import { clusterRadiusRamp } from './defaultRenderers';

export type DonutClusterStyle<DataT> = {
	/** The category each point is counted under, e.g. `(d) => d.properties.event_type`. */
	getKey: (d: DataT) => string;

	/** Segment color for each category. Categories not listed here are drawn in grey. */
	colors: Record<string, Color>;

	/**
	 * Fixed segment order, so a given category always occupies the same part of the ring.
	 * Categories not listed follow, in order of first appearance.
	 */
	order?: string[];

	/** Ring thickness, as a fraction of the radius. */
	ringWidth?: number;

	/** Fill for the hole in the middle of the donut, behind the count. */
	holeColor?: Color;

	/** Color of the thin gaps between segments, and the outline of the ring. */
	getLineColor?: Color;

	showCount?: boolean;
	textColor?: Color;
	maxTextSize?: number;

	/** Radius (in pixels) of a cluster of a single point; larger clusters grow from this. */
	radiusMinPixels?: number;

	/** Maximum radius (in pixels). */
	radiusMaxPixels?: number;

	/** How quickly the radius grows with the square root of the count. */
	radiusScale?: number;

	/** Width and height of the canvas each donut is drawn on, in pixels. */
	iconSize?: number;

	/** Triggers for the options above. Change `updateTriggers.paint` to redraw the donuts. */
	updateTriggers?: Record<string, unknown>;
};

type Slice = { key: string; count: number };

/**
 * Renders clusters as donuts, whose segments show the proportion of the cluster's points in each
 * category returned by `getKey`, using a `CanvasIconLayer`. A `TextLayer` renders the number of
 * points in the middle of each donut.
 *
 * Proportions are rounded to the nearest percent to form the icon key, so clusters with the
 * same split share one icon.
 */
export const donutClusters = <DataT extends AnyProps = AnyProps>(
	style: DonutClusterStyle<DataT>
): ClusterRenderer<DataT> => {
	const {
		getKey,
		colors,
		order,
		ringWidth = 0.4,
		holeColor = tokenColor('geo.inverse.feature.default', 230),
		getLineColor = tokenColor('geo.inverse.feature.default'),
		showCount = true,
		textColor = tokenColor('geo.label.default'),
		maxTextSize = 16,
		radiusMinPixels = 12,
		radiusMaxPixels = 48,
		radiusScale = 3,
		iconSize = ICON_PX,
		updateTriggers
	} = style;

	const fallbackColor = tokenColor('data.neutral.0');
	const radiusOf = clusterRadiusRamp({ radiusMinPixels, radiusMaxPixels, radiusScale });

	const paintDonut = (ctx: CanvasRenderingContext2D, slices: Slice[]) => {
		const size = ctx.canvas.width;
		const c = size / 2;
		const outer = c - 2;
		const inner = outer * (1 - ringWidth);
		const total = slices.reduce((sum, s) => sum + s.count, 0);

		ctx.beginPath();
		ctx.arc(c, c, inner, 0, Math.PI * 2);
		ctx.fillStyle = rgba(holeColor);
		ctx.fill();

		// Start at 12 o'clock and go clockwise.
		let angle = -Math.PI / 2;
		for (const { key, count } of slices) {
			const end = angle + (count / total) * Math.PI * 2;
			ctx.beginPath();
			ctx.arc(c, c, outer, angle, end);
			ctx.arc(c, c, inner, end, angle, true);
			ctx.closePath();
			ctx.fillStyle = rgba(colors[key] ?? fallbackColor);
			ctx.fill();
			if (slices.length > 1) {
				ctx.lineWidth = size / 64;
				ctx.strokeStyle = rgba(getLineColor);
				ctx.stroke();
			}
			angle = end;
		}
	};

	return (props) => {
		// Resolved once per render: getLeaves walks the supercluster index, which is far too
		// expensive to do inside an accessor.
		const donuts = new Map<ClusterFeature<AnyProps>, { key: string; slices: Slice[] }>();
		for (const f of props.data) {
			const slices = tallyBy(props.getLeaves(f), getKey, order);
			const total = slices.reduce((sum, s) => sum + s.count, 0);
			const key = slices.map((s) => `${s.key}:${Math.round((100 * s.count) / total)}`).join('|');
			donuts.set(f, { key, slices });
		}

		const triggers = {
			...props.updateTriggers,
			...updateTriggers,
			getSize: [props.zoom]
		};

		const layers: LayersList = [
			new CanvasIconLayer<ClusterFeature<AnyProps>>({
				...props,
				id: `${props.id}-donuts`,
				iconSize,
				getIconKey: (f) => donuts.get(f)!.key,
				paint: (ctx, f) => paintDonut(ctx, donuts.get(f)!.slices),
				sizeUnits: 'pixels',
				getSize: (f) => 2 * radiusOf(props.getPointCount(f)),
				updateTriggers: triggers
			})
		];

		if (showCount) {
			layers.push(
				new TextLayer<ClusterFeature<AnyProps>>({
					...props,
					id: `${props.id}-counts`,
					// Let picks fall through to the donut underneath.
					pickable: false,
					sizeUnits: 'pixels',
					getText: (f) => String(f.properties.point_count_abbreviated),
					getSize: (f) =>
						Math.min(radiusOf(props.getPointCount(f)) * (1 - ringWidth) * 0.9, maxTextSize),
					getColor: textColor,
					getTextAnchor: 'middle' as const,
					getAlignmentBaseline: 'center' as const,
					fontWeight: 600,
					characterSet: '0123456789.k',
					updateTriggers: triggers
				})
			);
		}

		return layers;
	};
};
