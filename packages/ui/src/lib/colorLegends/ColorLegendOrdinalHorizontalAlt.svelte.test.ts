import { scaleOrdinal } from 'd3-scale';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import ColorLegendOrdinalHorizontalAlt from './ColorLegendOrdinalHorizontalAlt.svelte';

// ColorLegendOrdinalHorizontalAlt only accepts a `ScaleOrdinal` (see its `Props` type), so it
// is categorical-only - there is no continuous-scale variant to test here.

const ordinalScale = scaleOrdinal()
	.domain(['A', 'B', 'C', 'D'])
	.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);

describe('ColorLegendOrdinalHorizontalAlt', () => {
	it('renders one rect and one text label per domain value, in domain order', async () => {
		const { container } = render(ColorLegendOrdinalHorizontalAlt, {
			scale: ordinalScale,
			title: 'Current EPC Rating'
		});

		const rects = container.querySelectorAll('svg rect');
		expect(rects).toHaveLength(4);

		expect(rects[0]).toHaveAttribute('fill', '#c5dcf2');
		expect(rects[1]).toHaveAttribute('fill', '#8fb4db');
		expect(rects[2]).toHaveAttribute('fill', '#628dba');
		expect(rects[3]).toHaveAttribute('fill', '#3b6894');

		// Each rect's x position should increase left-to-right in domain order.
		const xPositions = Array.from(rects).map((r) => Number(r.getAttribute('x')));
		expect(xPositions).toEqual([...xPositions].sort((a, b) => a - b));
		expect(new Set(xPositions).size).toBe(4);

		const labels = Array.from(container.querySelectorAll('svg text')).map((el) =>
			el.textContent?.trim()
		);
		expect(labels).toEqual(['A', 'B', 'C', 'D']);
	});

	it('renders the title', async () => {
		render(ColorLegendOrdinalHorizontalAlt, {
			scale: ordinalScale,
			title: 'Current EPC Rating'
		});

		await expect.element(page.getByText('Current EPC Rating')).toBeInTheDocument();
	});

	it('does not render a title element when no title is given', async () => {
		const { container } = render(ColorLegendOrdinalHorizontalAlt, { scale: ordinalScale });

		expect(container.querySelector('p')).toBeNull();
	});

	it('bolds only the text label matching highlightedValue', async () => {
		const { container } = render(ColorLegendOrdinalHorizontalAlt, {
			scale: ordinalScale,
			highlightedValue: 'B'
		});

		const texts = container.querySelectorAll('svg text');
		expect(texts).toHaveLength(4);

		expect(texts[0]).toHaveStyle({ fontWeight: 'normal' });
		expect(texts[1]).toHaveStyle({ fontWeight: 'bold' });
		expect(texts[2]).toHaveStyle({ fontWeight: 'normal' });
		expect(texts[3]).toHaveStyle({ fontWeight: 'normal' });
	});
});
