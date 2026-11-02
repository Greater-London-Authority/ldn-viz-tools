import { Plot } from '../observablePlotFragments/plot';
import type { ChartDataRow, EndOfLineLabelOptions } from './chartOptions';

/**
 * Minimum vertical distance, in pixels, between the centres of auto-dodged labels:
 * the 14px label font size plus 2px of padding.
 */
const LABEL_SPACING = 16;

/**
 * Moves the labels in index `I` apart so their centres in `Y` (in pixels) are at
 * least `spacing` apart, while keeping each one as close as possible to its
 * original position, and within the vertical bounds `[minY, maxY]`.
 *
 * Overlapping labels are merged into clusters; each cluster is laid out as an
 * evenly spaced stack centred on the mean of its members' original positions.
 */
const separateLabels = (
	I: number[],
	Y: Float64Array,
	spacing: number,
	minY: number,
	maxY: number
) => {
	const sorted = I.filter((i) => Number.isFinite(Y[i])).sort((a, b) => Y[a] - Y[b]);
	if (sorted.length < 2) return;

	// Each cluster is a run of `sorted` starting at `start`, with `n` members; `offsetSum`
	// is the sum of (original y - k * spacing) for the k-th member, so the best position
	// for the top of the stack is `offsetSum / n`.
	const clusters: { start: number; n: number; offsetSum: number }[] = [];
	const top = (c: { n: number; offsetSum: number }) => c.offsetSum / c.n;

	sorted.forEach((i, k) => {
		let cluster = { start: k, n: 1, offsetSum: Y[i] };
		let previous = clusters[clusters.length - 1];
		while (previous && top(previous) + previous.n * spacing > top(cluster)) {
			cluster = {
				start: previous.start,
				n: previous.n + cluster.n,
				offsetSum: previous.offsetSum + cluster.offsetSum - cluster.n * previous.n * spacing
			};
			clusters.pop();
			previous = clusters[clusters.length - 1];
		}
		clusters.push(cluster);
	});

	for (const c of clusters) {
		for (let k = 0; k < c.n; k++) {
			Y[sorted[c.start + k]] = top(c) + k * spacing;
		}
	}

	// Keep labels inside the plot area, preserving the spacing between them.
	Y[sorted[0]] = Math.max(Y[sorted[0]], minY);
	for (let k = 1; k < sorted.length; k++) {
		Y[sorted[k]] = Math.max(Y[sorted[k]], Y[sorted[k - 1]] + spacing);
	}
	const last = sorted.length - 1;
	Y[sorted[last]] = Math.min(Y[sorted[last]], maxY);
	for (let k = last - 1; k >= 0; k--) {
		Y[sorted[k]] = Math.min(Y[sorted[k]], Y[sorted[k + 1]] - spacing);
	}
};

/**
 * Plot initializer that positions each label at its scaled `y` value, then nudges
 * overlapping labels apart vertically (separately within each facet).
 *
 * Unlike `Plot.dodgeY`, which ignores the `y` channel and lays marks out as a
 * beeswarm from an anchor line, this keeps labels next to the ends of their lines.
 */
const dodgeLabelsY = (options: any, spacing = LABEL_SPACING) =>
	Plot.initializer(options, (data, facets, channels: any, scales: any, dimensions) => {
		const Y = Float64Array.from(channels.y.value as ArrayLike<any>, (v) =>
			channels.y.scale ? scales[channels.y.scale](v) : v
		);
		const minY = dimensions.marginTop + spacing / 2;
		const maxY = dimensions.height - dimensions.marginBottom - spacing / 2;

		for (const I of facets) {
			separateLabels(Array.from(I), Y, spacing, minY, maxY);
		}

		return { data, facets, channels: { y: { value: Y } } };
	});

/**
 * Returns marks that label the end of each line with its series name (`b`).
 *
 * Three rendering modes:
 *   (a) autoDodgeLabels=true — single text mark whose labels are pushed apart
 *       vertically wherever they would overlap.
 *   (b) labelNudges configured — nudged series rendered as separate
 *       marks so each carries its own dx/dy; non-nudged share default.
 *   (c) neither — single default text mark.
 */
export const getEndOfLineLabelMarks = (
	data: ChartDataRow[],
	options: EndOfLineLabelOptions & { faceted?: boolean }
) => {
	if (options.autoDodgeLabels) {
		return [
			Plot.text(
				data,
				dodgeLabelsY(
					Plot.selectLast({
						x: 'xd',
						y: 'y',
						fx: options.faceted ? 'z2' : undefined,
						text: 'b',
						fill: 'b',
						textAnchor: 'start',
						dx: 10,
						lineWidth: options.labelLineWidth
					})
				)
			)
		];
	}

	const nudges = options.labelNudges ?? {};
	const nudgedSeries = Object.keys(nudges);
	const defaultData =
		nudgedSeries.length > 0 ? data.filter((d) => !nudgedSeries.includes(d.b)) : data;

	const defaultMark = Plot.text(
		defaultData,
		Plot.selectLast({
			x: 'xd',
			y: 'y',
			fx: options.faceted ? 'z2' : undefined,
			text: 'b',
			fill: 'b',
			textAnchor: 'start',
			dx: 10,
			lineWidth: options.labelLineWidth
		})
	);

	const nudgedMarks = nudgedSeries.map((name) => {
		const n = nudges[name];
		return Plot.text(
			data.filter((d) => d.b === name),
			Plot.selectLast({
				x: 'xd',
				y: 'y',
				fx: options.faceted ? 'z2' : undefined,
				text: 'b',
				fill: 'b',
				textAnchor: 'start',
				dx: 10 + (n.dx ?? 0),
				dy: n.dy ?? 0,
				lineWidth: options.labelLineWidth
			})
		);
	});

	return [defaultMark, ...nudgedMarks];
};
