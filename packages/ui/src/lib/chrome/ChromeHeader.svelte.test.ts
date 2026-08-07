import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import ChromeHeader from './ChromeHeader.svelte';

describe('ChromeHeader', () => {
	it('renders nothing when title/subtitle/eyebrow/hint are all unset', async () => {
		const { container } = render(ChromeHeader, {});

		expect(container.firstElementChild).toBeNull();
	});

	it('renders a TitleGroup with the given title/subtitle/eyebrow', async () => {
		const { container } = render(ChromeHeader, {
			title: 'Chart title',
			subtitle: 'Chart subtitle',
			eyebrow: 'Eyebrow'
		});

		expect(container.querySelector('.title')?.textContent).toBe('Chart title');
		expect(container.querySelector('.subtitle')?.textContent).toBe('Chart subtitle');
		expect(container.querySelector('.eyebrow')?.textContent).toBe('Eyebrow');
	});

	it('passes emphasis through to the TitleGroup', async () => {
		const { container } = render(ChromeHeader, {
			title: 'Chart title',
			emphasis: 'secondary'
		});

		expect(container.querySelector('.title')).toBeNull();
		expect(container.querySelector('.eyebrow')?.textContent).toBe('Chart title');
	});

	it('renders no hint trigger when hint is unset', async () => {
		render(ChromeHeader, { title: 'Chart title' });

		await expect(page.getByRole('button', { name: 'More information' }).query()).toBeNull();
	});

	it('renders a hint trigger that opens a tooltip with the hint text by default', async () => {
		render(ChromeHeader, { title: 'Chart title', hint: 'Helpful context' });

		const trigger = page.getByRole('button', { name: 'More information' });
		await expect.element(trigger).toBeInTheDocument();
	});

	it('opens a popover showing the hint text when hintType is "popover"', async () => {
		render(ChromeHeader, {
			title: 'Chart title',
			hint: 'Helpful context',
			hintType: 'popover'
		});

		await page.getByRole('button', { name: 'More information' }).click();

		await expect.element(page.getByText('Helpful context')).toBeInTheDocument();
	});

	it('opens a modal with hintTitle as its heading when hintType is "modal"', async () => {
		render(ChromeHeader, {
			title: 'Chart title',
			hint: 'Helpful context',
			hintType: 'modal',
			hintTitle: 'About this chart'
		});

		await page.getByRole('button', { name: 'More information' }).click();

		await expect.element(page.getByText('Helpful context')).toBeInTheDocument();
		await expect.element(page.getByText('About this chart')).toBeInTheDocument();
	});

	it("uses hintLabel for the trigger's accessible name instead of the default", async () => {
		render(ChromeHeader, {
			title: 'Chart title',
			hint: 'Helpful context',
			hintLabel: 'Learn more'
		});

		await expect.element(page.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
	});

	it('renders a hint snippet as-is instead of an Overlay trigger, when hint is a snippet', async () => {
		const hintSnippet = createRawSnippet(() => ({
			render: () => '<div>CUSTOM_HINT_MARKER</div>',
			setup: () => {}
		}));

		const { container } = render(ChromeHeader, {
			title: 'Chart title',
			hint: hintSnippet
		});

		expect(container.textContent).toContain('CUSTOM_HINT_MARKER');
		await expect(page.getByRole('button', { name: 'More information' }).query()).toBeNull();
	});

	it('renders the header when only a hint is provided, with no title/subtitle/eyebrow', async () => {
		const { container } = render(ChromeHeader, { hint: 'Helpful context' });

		expect(container.firstElementChild).toBeTruthy();
		expect(container.querySelector('.title')).toBeNull();
	});
});
