import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import PlacardButton from './PlacardButton.svelte';

const footerSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));

describe('PlacardButton Component', () => {
	it('opens in the same tab by default, with no new-tab text', async () => {
		render(PlacardButton, { href: '/data', footer: footerSnippet('Get the data') });

		const link = page.getByRole('link', { name: 'Get the data' });
		await expect.element(link).toHaveAttribute('target', '_self');
		await expect.element(link).not.toHaveAttribute('rel');
	});

	it('tells screen readers when the link opens a new tab', async () => {
		render(PlacardButton, {
			href: 'https://data.london.gov.uk',
			newWindow: true,
			footer: footerSnippet('Get the data')
		});

		const link = page.getByRole('link', { name: 'Get the data (opens in a new tab)' });
		await expect.element(link).toHaveAttribute('target', '_blank');
		await expect.element(link).toHaveAttribute('rel', 'noopener noreferrer');
	});

	it('sets the hover colour for focus as well as hover', async () => {
		render(PlacardButton, { href: '/data', footer: footerSnippet('Get the data') });

		const link = page.getByRole('link', { name: 'Get the data' });
		await expect.element(link).toHaveClass('focus-visible:bg-[var(--placard-bg-hover)]');
	});
});
