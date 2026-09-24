import type { Color, LayersList } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { AnyProps } from 'supercluster';

import { CanvasIconLayer, ICON_PX, rgba } from '../../canvasIconLayer/canvasIconLayer';
import { tokenColor } from '../../tokenColor';
import type { ClusterRenderer } from '../types';
import { tallyBy } from './clusterRows';
import { clusterRadiusRamp } from './defaultRenderers';

export type SplitClusterStyle<DataT> = {
	/** The category each cluster is split on, e.g. `(d) => d.properties.event_type`. */
	getKey: (d: DataT) => string;

	/** Circle color for each category. Categories not listed here are drawn in grey. */
	colors: Record<string, Color>;

	/**
	 * Fixed category order, so a given category always occupies the same place around the
	 * cluster. Categories not listed follow, in order of first appearance.
	 */
	order?: string[];

	strokeColor?: Color;

	/** Stroke width, as a fraction of each circle's radius. */
	strokeWidth?: number;

	/** Extra pixels between neighbouring circles. */
	gap?: number;

	/** If `true`, draw the ring on which each cluster's circles are placed. */
	showRing?: boolean;

	/** Color of the ring. */
	ringColor?: Color;

	/** Width of the ring, in pixels. */
	ringWidth?: number;

	showCount?: boolean;
	textColor?: Color;
	maxTextSize?: number;
	minRadius?: number;
	maxRadius?: number;
	radiusScale?: number;

	/** Width and height of the canvas each circle is drawn on, in pixels. */
	iconSize?: number;

	/** Triggers for the options above. Change `updateTriggers.paint` to redraw the circles. */
	updateTriggers?: Record<string, unknown>;
};

/** The ring drawn behind a cluster's circles. */
type Ring = {
	position: [number, number];

	/** Twice the radius of the ring, in pixels. */
	diameter: number;
};

/**
 * Splits each cluster into one circle per category returned by `getKey`, each sized by its own
 * count and fanned out around the cluster centre. The circles are drawn by a `CanvasIconLayer`,
 * with one icon per category, and a `TextLayer` renders the count on each circle.
 *
 * One cluster becomes several rendered rows, so each row is wrapped with `props.makeRow`;
 * picking any of them still resolves back to the whole cluster, with `key` set to the category
 * of the circle that was picked.
 */
export const splitClusters = <DataT extends AnyProps = AnyProps>(
	style: SplitClusterStyle<DataT>
): ClusterRenderer<DataT> => {
	const {
		getKey,
		colors,
		order,
		strokeColor = tokenColor('geo.inverse.feature.default'),
		strokeWidth = 0.12,
		gap = 2,
		showRing = false,
		ringColor = tokenColor('geo.feature.default'),
		ringWidth = 1.5,
		showCount = true,
		textColor = tokenColor('inverse.text.default'),
		maxTextSize = 14,
		minRadius,
		maxRadius,
		radiusScale,
		iconSize = ICON_PX,
		updateTriggers
	} = style;

	const fallbackColor = tokenColor('data.neutral.0');
	const radiusOf = clusterRadiusRamp({ minRadius, maxRadius, radiusScale });

	const paintDisc = (ctx: CanvasRenderingContext2D, key: string) => {
		const c = ctx.canvas.width / 2;
		const lineWidth = c * strokeWidth;
		ctx.beginPath();
		ctx.arc(c, c, c - lineWidth / 2, 0, Math.PI * 2);
		ctx.fillStyle = rgba(colors[key] ?? fallbackColor);
		ctx.fill();
		if (lineWidth > 0) {
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = rgba(strokeColor);
			ctx.stroke();
		}
	};

	// A ring is an icon drawn `diameter` pixels wide, with a circle touching the edges of the canvas.
	// Icons are scaled to `size`, so the line is drawn thinner on the canvas for larger rings,
	// to keep its on-screen width at `ringWidth`.
	const paintRing = (ctx: CanvasRenderingContext2D, diameter: number) => {
		const c = ctx.canvas.width / 2;
		const lineWidth = (ringWidth * ctx.canvas.width) / diameter;
		ctx.beginPath();
		ctx.arc(c, c, c - lineWidth / 2, 0, Math.PI * 2);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = rgba(ringColor);
		ctx.stroke();
	};

	return (props) => {
		const rings: Ring[] = [];

		// Resolved once per render: getLeaves walks the supercluster index, which is far too
		// expensive to do inside an accessor.
		const rows = props.data.flatMap((f, i) => {
			const parts = tallyBy(props.getLeaves(f), getKey, order).map((p) => ({
				...p,
				radius: radiusOf(p.count)
			}));
			if (!parts.length) return [];

			const position = props.getPosition(f);

			// Place the circles on a ring wide enough that neighbours would just touch,
			// if all circles were the width of the widest circle.
			// For n points arranged around a ring of radius R, neighbouring points are 2*R*sin(pi/n) apart.
			// If each of these points is the center of a circle of radius r,
			// and these circles just touch, then 2 r = 2*R*sin(pi/n), so R = r / sin(pi/n).
			const widest = Math.max(...parts.map((p) => p.radius)) + gap / 2;
			const spread = parts.length === 1 ? 0 : widest / Math.sin(Math.PI / parts.length);

			// Two circles read best side by side; more than two fan from the top.
			const phase = parts.length === 2 ? Math.PI : -Math.PI / 2;

			if (showRing && spread > 0) {
				// Rounded so that rings of similar sizes share an icon.
				rings.push({ position, diameter: Math.round(2 * spread) });
			}

			return parts.map((p, j) => {
				const angle = (j / parts.length) * Math.PI * 2 + phase;
				return props.makeRow(
					{
						key: p.key,
						position,
						offset: [Math.cos(angle) * spread, Math.sin(angle) * spread] as [number, number],
						size: 2 * p.radius,
						textSize: Math.min(p.radius * 0.9, maxTextSize),
						count: p.count
					},
					f,
					i
				);
			});
		});

		type Row = (typeof rows)[number];

		const triggers = {
			...props.updateTriggers,
			...updateTriggers
		};

		const layers: LayersList = [];

		if (rings.length) {
			layers.push(
				new CanvasIconLayer<Ring>({
					...props,
					id: `${props.id}-split-rings`,
					data: rings,
					pickable: false,
					iconSize,
					getIconKey: (r) => String(r.diameter),
					paint: (ctx, r) => paintRing(ctx, r.diameter),
					getPosition: (r) => r.position,
					sizeUnits: 'pixels',
					getSize: (r) => r.diameter,
					updateTriggers: triggers
				})
			);
		}

		layers.push(
			new CanvasIconLayer<Row>({
				...props,
				id: `${props.id}-split`,
				data: rows,
				iconSize,
				getIconKey: (r) => r.key,
				paint: (ctx, r) => paintDisc(ctx, r.key),
				getPosition: (r) => r.position,
				getPixelOffset: (r) => r.offset,
				sizeUnits: 'pixels',
				getSize: (r) => r.size,
				updateTriggers: triggers
			})
		);

		if (showCount) {
			layers.push(
				new TextLayer<Row>({
					...props,
					id: `${props.id}-split-counts`,
					data: rows,
					// Let picks fall through to the circle underneath.
					pickable: false,
					getPosition: (r) => r.position,
					getPixelOffset: (r) => r.offset,
					sizeUnits: 'pixels',
					getText: (r) => String(r.count),
					getSize: (r) => r.textSize,
					getColor: textColor,
					getTextAnchor: 'middle' as const,
					getAlignmentBaseline: 'center' as const,
					fontWeight: 600,
					characterSet: '0123456789',
					updateTriggers: triggers
				})
			);
		}

		return layers;
	};
};
