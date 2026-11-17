import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ChromeFooter from './ChromeFooter.svelte';

const actionsSnippet = createRawSnippet(() => ({
	render: () => '<div>export buttons</div>',
	setup: () => {}
}));

const footnoteExtraSnippet = createRawSnippet(() => ({
	render: () => '<li>View description</li>',
	setup: () => {}
}));

describe('ChromeFooter', () => {
	it('renders nothing when byline/source/note/footnoteExtra/actions are all unset', async () => {
		const { container } = render(ChromeFooter, {});

		expect(container.firstElementChild).toBeNull();
	});

	it('renders no <ul> when byline/source/note/footnoteExtra are all unset, but still renders actions', async () => {
		const { container } = render(ChromeFooter, {
			actions: actionsSnippet
		});

		expect(container.querySelector('ul')).toBeNull();
		expect(container.textContent).toContain('export buttons');
	});

	it('renders the <ul> when only footnoteExtra is set, even though byline/source/note are unset', async () => {
		const { container } = render(ChromeFooter, {
			footnoteExtra: footnoteExtraSnippet
		});

		expect(container.querySelector('ul')).toBeTruthy();
		expect(container.textContent).toContain('View description');
	});

	it('prefixes source with a bold "Source:" label', async () => {
		const { container } = render(ChromeFooter, {
			source: 'Office for National Statistics'
		});

		const sourceItem = Array.from(container.querySelectorAll('li')).find((li) =>
			li.textContent?.includes('Office for National Statistics')
		);
		expect(sourceItem).toBeTruthy();
		expect(sourceItem!.querySelector('span')?.textContent).toBe('Source:');
	});

	it('prefixes note with a bold "Note:" label', async () => {
		const { container } = render(ChromeFooter, {
			note: 'Figures are provisional'
		});

		const noteItem = Array.from(container.querySelectorAll('li')).find((li) =>
			li.textContent?.includes('Figures are provisional')
		);
		expect(noteItem).toBeTruthy();
		expect(noteItem!.querySelector('span')?.textContent).toBe('Note:');
	});

	it('renders embedded markup in byline/source/note as real elements, not escaped text', async () => {
		const { container } = render(ChromeFooter, {
			byline: 'Written by <a href="https://example.com">Jane Doe</a>'
		});

		const link = container.querySelector('a[href="https://example.com"]');
		expect(link).toBeTruthy();
		expect(link!.textContent).toBe('Jane Doe');
	});

	// The wrapper div around `actions` is a direct child of the root ChromeFooter div;
	// selecting it that way avoids also matching the root div itself, which contains
	// the same text as a descendant.
	const findActionsWrapper = (container: Element) => {
		const root = container.firstElementChild as HTMLElement;
		return Array.from(root.children).find(
			(child) => child.tagName === 'DIV' && child.textContent?.includes('export buttons')
		) as HTMLElement | undefined;
	};

	it('applies ml-auto to the actions wrapper only when there are no footnotes at all', async () => {
		const { container: withoutFootnotes } = render(ChromeFooter, {
			actions: actionsSnippet
		});
		expect(findActionsWrapper(withoutFootnotes)?.className).toContain('ml-auto');

		const { container: withByline } = render(ChromeFooter, {
			byline: 'A byline',
			actions: actionsSnippet
		});
		expect(findActionsWrapper(withByline)?.className).not.toContain('ml-auto');
	});

	it('does not apply ml-auto when only footnoteExtra is set, since footnoteExtra counts as a footnote', async () => {
		const { container } = render(ChromeFooter, {
			footnoteExtra: footnoteExtraSnippet,
			actions: actionsSnippet
		});
		expect(findActionsWrapper(container)?.className).not.toContain('ml-auto');
	});

	it('applies a custom class to the root element', async () => {
		const { container } = render(ChromeFooter, {
			source: 'A source',
			class: 'my-custom-class'
		});

		expect((container.firstElementChild as HTMLElement).className).toContain('my-custom-class');
	});
});
