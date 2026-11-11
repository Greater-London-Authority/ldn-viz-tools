import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Flag, { type FlagCondition } from './Flag.svelte';

describe('Flag', () => {
	const defaultMessages: Record<FlagCondition, string> = {
		alpha: 'Alpha Preview',
		beta: 'Beta Preview',
		alert: 'Alert',
		warning: 'Warning',
		positive: 'Positive',
		notice: 'Notice'
	};

	const backgroundClasses: Record<FlagCondition, string> = {
		alpha: 'bg-color-surface-alpha',
		beta: 'bg-color-surface-beta',
		alert: 'bg-color-surface-negative',
		warning: 'bg-color-surface-caution',
		positive: 'bg-color-surface-positive',
		notice: 'bg-color-surface-accent'
	};

	const conditions = Object.keys(defaultMessages) as FlagCondition[];

	it('renders the default message for the default condition (alpha)', async () => {
		render(Flag, {});

		await expect.element(page.getByText('Alpha Preview')).toBeInTheDocument();
	});

	for (const condition of conditions) {
		it(`renders the default message for condition "${condition}"`, async () => {
			render(Flag, { condition });

			await expect.element(page.getByText(defaultMessages[condition])).toBeInTheDocument();
		});
	}

	it('renders custom children instead of the default message', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Custom message</span>',
			setup: () => {}
		}));

		render(Flag, { condition: 'alpha', children });

		await expect.element(page.getByText('Custom message')).toBeInTheDocument();
		expect(page.getByText('Alpha Preview').elements().length).toBe(0);
	});

	for (const condition of conditions) {
		it(`applies the background class for condition "${condition}"`, async () => {
			const { container } = render(Flag, { condition });

			const flagDiv = container.querySelector('div');
			expect(flagDiv?.className).toContain(backgroundClasses[condition]);
		});
	}

	it('does not render a link when `link` is not set', async () => {
		render(Flag, { condition: 'alpha' });

		const links = page.getByRole('link').elements();
		expect(links.length).toBe(0);
	});

	it('renders a link with `linkText` when `link` is set', async () => {
		render(Flag, {
			condition: 'alpha',
			link: 'https://apps.london.gov.uk',
			linkText: 'Please provide feedback here'
		});

		const link = page.getByRole('link', { name: 'Please provide feedback here' });
		await expect.element(link).toBeInTheDocument();
		await expect.element(link).toHaveAttribute('href', 'https://apps.london.gov.uk');
	});

	it('supports mailto: URLs for `link`, and a custom `linkText`', async () => {
		render(Flag, {
			condition: 'beta',
			link: 'mailto://feedback@london.gov.uk',
			linkText: 'Email us your feedback'
		});

		const link = page.getByRole('link', { name: 'Email us your feedback' });
		await expect.element(link).toBeInTheDocument();
		await expect.element(link).toHaveAttribute('href', 'mailto://feedback@london.gov.uk');
	});
});
