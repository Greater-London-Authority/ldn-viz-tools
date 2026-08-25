import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Metric from './Metric.svelte';

describe('Metric', () => {
	it('renders the label, value and unit', async () => {
		render(Metric, { label: 'Population', value: 100000, unit: 'people' });

		await expect.element(page.getByText('Population')).toBeInTheDocument();
		await expect.element(page.getByText('100,000')).toBeInTheDocument();
		await expect.element(page.getByText('people')).toBeInTheDocument();
	});

	it('renders no change, translation or comparison when they are not provided', async () => {
		const { container } = render(Metric, { value: 100000 });

		expect(container.querySelectorAll('p, span')).toHaveLength(1);
	});

	it('renders the change value and comparison when provided', async () => {
		render(Metric, {
			value: 100000,
			comparisonValue: 110000
		});

		await expect.element(page.getByText('10%')).toBeInTheDocument();
		await expect.element(page.getByText('vs 110,000')).toBeInTheDocument();
	});

	it('renders the translation next to the hero figure', async () => {
		render(Metric, { value: 100000, translation: '(20%)' });

		await expect.element(page.getByText('(20%)')).toBeInTheDocument();
	});

	describe('status classes on the change value', () => {
		it('applies positive classes', async () => {
			const { container } = render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				status: 'positive'
			});

			const changeValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '10%'
			);
			expect(changeValue).toHaveClass('text-color-surface-positive');
		});

		it('applies negative classes', async () => {
			const { container } = render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				status: 'negative'
			});

			const changeValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '10%'
			);
			expect(changeValue).toHaveClass('text-color-surface-negative');
		});

		it('applies neutral classes and renders no icon', async () => {
			const { container } = render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				status: 'neutral'
			});

			const changeValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '10%'
			);
			expect(changeValue).toHaveClass('text-color-data-neutral-1');
			expect(container.querySelector('svg')).toBeNull();
		});
	});

	describe('hero', () => {
		it('renders the value as the metric role by default', async () => {
			const { container } = render(Metric, { value: 100000, comparisonValue: 110000 });

			const heroValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '100,000'
			);
			expect(heroValue).toHaveClass('metric');
		});

		it('renders the change as the metric role when hero is "change"', async () => {
			const { container } = render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				hero: 'change'
			});

			const heroChange = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '10%'
			);
			expect(heroChange).toHaveClass('metric');

			const supportingValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '100,000'
			);
			expect(supportingValue).toHaveClass('label');
		});
	});

	describe('size', () => {
		it('uses the metric-sm role when size is "sm"', async () => {
			const { container } = render(Metric, { value: 100000, comparisonValue: 110000, size: 'sm' });

			const heroValue = Array.from(container.querySelectorAll('span')).find(
				(el) => el.textContent === '100,000'
			);
			expect(heroValue).toHaveClass('metric-sm');
		});
	});

	describe('layout', () => {
		it('applies the vertical layout classes by default', async () => {
			const { container } = render(Metric, { value: 100000, comparisonValue: 110000 });

			expect(container.querySelector('div')).toHaveClass('flex-col');
		});

		it('applies the horizontal layout classes when layout is "horizontal"', async () => {
			const { container } = render(Metric, {
				value: 100000,
				comparisonValue: 110000,
				layout: 'horizontal'
			});

			expect(container.querySelector('div')).toHaveClass('flex-row');
		});
	});
});
