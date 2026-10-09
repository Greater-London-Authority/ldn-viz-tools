import { Plot } from '../observablePlotFragments/plot';
import type { ChartDataRow, EndOfLineLabelOptions } from './chartOptions';

/**
 * Returns marks that label the end of each line with its series name (`b`).
 *
 * Three rendering modes:
 *   (a) autoDodgeLabels=true — single text mark wrapped in Plot.dodgeY
 *       so Plot auto-spaces overlapping labels.
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
				Plot.dodgeY(
					{ anchor: 'middle', padding: 2 },
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
