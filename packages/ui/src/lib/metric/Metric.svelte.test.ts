import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Metric from './Metric.svelte';

describe('Metric', () => {
	it('renders the label, value and unit', async () => {
		render(Metric, { label: 'Population', value: 100000, unit: 'people' });

		const metric = page.getByTestId('metric');
		const primary = page.getByTestId('metric-primary');

		await expect.element(metric.getByText('Population')).toBeInTheDocument();
		await expect.element(primary.getByText('100,000')).toBeInTheDocument();
		await expect.element(primary.getByText('people')).toBeInTheDocument();
	});

	it('renders no change, translation or comparison when they are not provided', async () => {
		render(Metric, { value: 100000 });

		const primary = page.getByTestId('metric-primary').element();
		const secondary = page.getByTestId('metric-secondary').element();

		expect(primary.textContent?.trim()).toBe('100,000');
		expect(secondary.textContent?.trim()).toBe('');
	});

	it('renders the change value and comparison when provided', async () => {
		render(Metric, {
			value: 100000,
			comparisonValue: 110000
		});

		const secondary = page.getByTestId('metric-secondary');

		// N.B. d3-format renders the sign as a Unicode minus (U+2212), not a hyphen.
		await expect.element(secondary.getByText('−10,000', { exact: true })).toBeInTheDocument();
		await expect.element(secondary.getByText('vs 110,000')).toBeInTheDocument();
	});

	it('renders the translation next to the hero figure', async () => {
		render(Metric, { value: 100000, translation: '(20%)' });

		await expect.element(page.getByTestId('metric-primary').getByText('(20%)')).toBeInTheDocument();
	});

	describe('status classes on the change value', () => {
		it('applies positive classes', async () => {
			render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				goodIs: 'low'
			});

			const changeValue = page
				.getByTestId('metric-secondary')
				.getByText('−10,000', { exact: true });

			await expect.element(changeValue).toHaveClass('text-color-surface-positive');
		});

		it('applies negative classes', async () => {
			render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				goodIs: 'high'
			});

			const changeValue = page
				.getByTestId('metric-secondary')
				.getByText('−10,000', { exact: true });

			await expect.element(changeValue).toHaveClass('text-color-surface-negative');
		});

		it('applies neutral classes and renders no icon', async () => {
			render(Metric, {
				value: 100000,
				comparisonValue: 100000
			});

			const changeValue = page.getByTestId('metric-secondary').getByText('0', { exact: true });

			await expect.element(changeValue).toHaveClass('text-color-data-neutral-1');
			expect(page.getByTestId('metric').element().querySelector('svg')).toBeNull();
		});
	});

	describe('hero', () => {
		it('renders the value as the metric role by default', async () => {
			render(Metric, { value: 100000, comparisonValue: 110000 });

			const heroValue = page.getByTestId('metric-primary').getByText('100,000');

			await expect.element(heroValue).toHaveClass('metric');
		});

		it('renders the change as the metric role when hero is "change"', async () => {
			render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				hero: 'change'
			});

			const heroChange = page.getByTestId('metric-primary').getByText('−10,000', { exact: true });
			const supportingValue = page
				.getByTestId('metric-secondary')
				.getByText('100,000', { exact: true });

			await expect.element(heroChange).toHaveClass('metric');
			await expect.element(supportingValue).toHaveClass('label-tight');
		});
	});

	describe('size', () => {
		it('uses the metric-sm role when size is "sm"', async () => {
			render(Metric, { value: 100000, comparisonValue: 110000, size: 'sm' });

			const heroValue = page.getByTestId('metric-primary').getByText('100,000');

			await expect.element(heroValue).toHaveClass('metric-sm');
		});
	});

	describe('layout', () => {
		it('applies the vertical layout classes by default', async () => {
			render(Metric, { value: 100000, comparisonValue: 110000 });

			expect(page.getByTestId('metric-primary').element().parentElement).toHaveClass('flex-col');
		});

		it('applies the horizontal layout classes when layout is "horizontal"', async () => {
			render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				layout: 'horizontal'
			});

			expect(page.getByTestId('metric-primary').element().parentElement).toHaveClass('flex-row');
		});
	});
});
