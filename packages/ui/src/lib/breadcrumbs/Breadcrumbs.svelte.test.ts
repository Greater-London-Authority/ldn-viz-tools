import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Breadcrumbs from './Breadcrumbs.svelte';

const breadcrumbs = [
	{ label: 'Home', href: '/' },
	{ label: 'Foo', href: '/foo' },
	{ label: 'Bar', href: '/foo/bar' }
];

describe('Breadcrumbs Component', () => {
	it('renders a link for every crumb except the last', async () => {
		render(Breadcrumbs, { breadcrumbs });

		const links = page.getByRole('link');
		await expect.element(links.nth(0)).toHaveTextContent('Home');
		await expect.element(links.nth(0)).toHaveAttribute('href', '/');
		await expect.element(links.nth(1)).toHaveTextContent('Foo');
		await expect.element(links.nth(1)).toHaveAttribute('href', '/foo');

		// Only 2 links: the last crumb ("Bar") is not a link.
		await expect.element(page.getByRole('link', { name: 'Bar' })).not.toBeInTheDocument();
	});

	it('renders the last crumb as a non-link, styled as current', async () => {
		const { container } = render(Breadcrumbs, { breadcrumbs });

		const current = page.getByText('Bar');
		await expect.element(current).toBeInTheDocument();

		const span = container.querySelector('span');
		expect(span).not.toBeNull();
		expect(span).toHaveTextContent('Bar');
		expect(span).toHaveClass('text-color-interactive-primary');

		// The last crumb has no aria-current attribute in the current implementation.
		expect(span).not.toHaveAttribute('aria-current');
	});

	it('renders separators between crumbs', async () => {
		const { container } = render(Breadcrumbs, { breadcrumbs });

		// Separator is a literal "/" (rendered via the &sol; HTML entity) between
		// each link and the next item - there is one separator per non-last crumb.
		const text = container.textContent ?? '';
		expect(text.match(/\//g)?.length).toBe(2);
	});

	it('calls the resolve prop to compute each link href', async () => {
		const resolve = vi.fn((url: string) => `/resolved${url}`);

		render(Breadcrumbs, { breadcrumbs, resolve });

		expect(resolve).toHaveBeenCalledWith('/');
		expect(resolve).toHaveBeenCalledWith('/foo');

		await expect
			.element(page.getByRole('link', { name: 'Home' }))
			.toHaveAttribute('href', '/resolved/');
	});

	it('renders nothing when breadcrumbs is empty', async () => {
		const { container } = render(Breadcrumbs, { breadcrumbs: [] });

		// Svelte leaves behind an HTML comment as an anchor for the (empty) `{#if}` block.
		expect(container.querySelector('div')).toBeNull();
		expect(container.textContent).toBe('');
	});

	it('renders a single crumb as current only, with no link and no separator', async () => {
		const { container } = render(Breadcrumbs, {
			breadcrumbs: [{ label: 'Home', href: '/' }]
		});

		await expect.element(page.getByRole('link')).not.toBeInTheDocument();
		await expect.element(page.getByText('Home')).toBeInTheDocument();
		expect(container.textContent).not.toContain('/');
	});
});
