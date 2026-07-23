import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import Footer from './Footer.svelte';

const exportBtnsSnippet = createRawSnippet(() => ({
	render: () => '<div>export buttons</div>',
	setup: () => {}
}));

describe('Footer', () => {
	it('renders no <ul> when byline/source/note/chartDescription are all unset, but still renders exportBtns', async () => {
		const { container } = render(Footer, {
			exportBtns: exportBtnsSnippet
		});

		expect(container.querySelector('ul')).toBeNull();
		expect(container.textContent).toContain('export buttons');
	});

	it('renders the <ul> when only chartDescription is set, even though byline/source/note are unset', async () => {
		const { container } = render(Footer, {
			chartDescription: 'A detailed description'
		});

		expect(container.querySelector('ul')).toBeTruthy();
	});

	it('prefixes source with a bold "Source:" label', async () => {
		const { container } = render(Footer, {
			source: 'Office for National Statistics'
		});

		const sourceItem = Array.from(container.querySelectorAll('li')).find((li) =>
			li.textContent?.includes('Office for National Statistics')
		);
		expect(sourceItem).toBeTruthy();
		expect(sourceItem!.querySelector('span')?.textContent).toBe('Source:');
	});

	it('prefixes note with a bold "Note:" label', async () => {
		const { container } = render(Footer, {
			note: 'Figures are provisional'
		});

		const noteItem = Array.from(container.querySelectorAll('li')).find((li) =>
			li.textContent?.includes('Figures are provisional')
		);
		expect(noteItem).toBeTruthy();
		expect(noteItem!.querySelector('span')?.textContent).toBe('Note:');
	});

	it('renders embedded markup in byline/source/note as real elements, not escaped text', async () => {
		const { container } = render(Footer, {
			byline: 'Written by <a href="https://example.com">Jane Doe</a>'
		});

		const link = container.querySelector('a[href="https://example.com"]');
		expect(link).toBeTruthy();
		expect(link!.textContent).toBe('Jane Doe');
	});

	it('opens the Modal showing chartDescription when "View description" is clicked', async () => {
		render(Footer, {
			chartDescription: 'This chart shows monthly values over time.'
		});

		await expect
			.element(page.getByRole('button', { name: 'View description' }))
			.toBeInTheDocument();

		await page.getByRole('button', { name: 'View description' }).click();

		await expect
			.element(page.getByText('This chart shows monthly values over time.'))
			.toBeInTheDocument();
	});

	// The wrapper div around `exportBtns` is a direct child of the root Footer div;
	// selecting it that way avoids also matching the root div itself, which contains
	// the same text as a descendant.
	const findExportBtnsWrapper = (container: Element) => {
		const root = container.firstElementChild as HTMLElement;
		return Array.from(root.children).find(
			(child) => child.tagName === 'DIV' && child.textContent?.includes('export buttons')
		) as HTMLElement | undefined;
	};

	it('applies ml-auto to the exportBtns wrapper only when there is no byline/source/note', async () => {
		const { container: withoutFootnotes } = render(Footer, {
			exportBtns: exportBtnsSnippet
		});
		expect(findExportBtnsWrapper(withoutFootnotes)?.className).toContain('ml-auto');

		const { container: withByline } = render(Footer, {
			byline: 'A byline',
			exportBtns: exportBtnsSnippet
		});
		expect(findExportBtnsWrapper(withByline)?.className).not.toContain('ml-auto');
	});

	it('still applies ml-auto when only chartDescription is set, since the check ignores chartDescription', async () => {
		const { container } = render(Footer, {
			chartDescription: 'A description',
			exportBtns: exportBtnsSnippet
		});
		expect(findExportBtnsWrapper(container)?.className).toContain('ml-auto');
	});
});
