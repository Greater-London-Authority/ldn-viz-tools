import { scaleOrdinal } from 'd3-scale';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import ColorLegendOrdinalChips from './ColorLegendOrdinalChips.svelte';

// ColorLegendOrdinalChips only accepts a `ScaleOrdinal` (see its `Props` type), so it is
// categorical-only - there is no continuous-scale variant to test here.

const ordinalScale = scaleOrdinal()
	.domain(['A', 'B', 'C', 'D'])
	.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']);

describe('ColorLegendOrdinalChips', () => {
	it('renders one swatch and one label per domain value, in domain order', async () => {
		const { container } = render(ColorLegendOrdinalChips, {
			scale: ordinalScale,
			title: 'Current EPC Rating'
		});

		const swatches = container.querySelectorAll('.mr-1.h-4.w-4');
		expect(swatches).toHaveLength(4);

		// The browser normalizes the `style:background-color` hex values to `rgb(...)`.
		expect(swatches[0]).toHaveAttribute('style', expect.stringContaining('rgb(197, 220, 242)'));
		expect(swatches[1]).toHaveAttribute('style', expect.stringContaining('rgb(143, 180, 219)'));
		expect(swatches[2]).toHaveAttribute('style', expect.stringContaining('rgb(98, 141, 186)'));
		expect(swatches[3]).toHaveAttribute('style', expect.stringContaining('rgb(59, 104, 148)'));

		const labels = Array.from(container.querySelectorAll('span.items-center')).map((el) =>
			el.textContent?.trim()
		);
		expect(labels).toEqual(['A', 'B', 'C', 'D']);
	});

	it('renders the title', async () => {
		render(ColorLegendOrdinalChips, { scale: ordinalScale, title: 'Current EPC Rating' });

		await expect.element(page.getByText('Current EPC Rating')).toBeInTheDocument();
	});

	it('does not render a title element when no title is given', async () => {
		const { container } = render(ColorLegendOrdinalChips, { scale: ordinalScale });

		expect(container.querySelector('.font-semibold.text-color-label')).toBeNull();
	});

	it('defaults to a horizontal, wrapping layout', async () => {
		const { container } = render(ColorLegendOrdinalChips, { scale: ordinalScale });

		const list = container.querySelector('.flex.flex-col > div');
		expect(list).toHaveClass('flex-wrap');
		expect(list).toHaveClass('gap-2');
	});

	it('lays out chips in a column when orientation is "vertical"', async () => {
		const { container } = render(ColorLegendOrdinalChips, {
			scale: ordinalScale,
			orientation: 'vertical'
		});

		const list = container.querySelector('.flex.flex-col > div');
		expect(list).toHaveClass('flex-col');
		expect(list).not.toHaveClass('flex-wrap');
	});

	it('highlights the swatch and label matching highlightedValue', async () => {
		const { container } = render(ColorLegendOrdinalChips, {
			scale: ordinalScale,
			highlightedValue: 'B'
		});

		const rows = container.querySelectorAll('.flex.items-center.text-color-label');
		expect(rows).toHaveLength(4);

		const highlightedRow = rows[1];
		expect(highlightedRow.querySelector('.mr-1.h-4.w-4')).toHaveClass('ring-2');
		expect(highlightedRow.querySelector('span.items-center')).toHaveClass('font-semibold');

		const otherRow = rows[0];
		expect(otherRow.querySelector('.mr-1.h-4.w-4')).not.toHaveClass('ring-2');
		expect(otherRow.querySelector('span.items-center')).toHaveClass('font-normal');
	});
});
