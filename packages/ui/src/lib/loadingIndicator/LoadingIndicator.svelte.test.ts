import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LoadingIndicator from './LoadingIndicator.svelte';

// Discrepancy from SUGGESTED_TESTS.md: LoadingIndicator.svelte itself does
// NOT set `role="status"` or `aria-busy`. Those attributes are added by
// *consumers* of LoadingIndicator (e.g. the wrapping <div> in AsyncButton.svelte,
// already covered by AsyncButton.svelte.test.ts) - LoadingIndicator only
// forwards a `title` (used for the accessible name, via an inner <title>
// element) and a `class` prop, and renders <Spinner> (or a static clock icon
// under prefers-reduced-motion). These tests assert on what the component
// itself actually renders.
//
// Note: the prefers-reduced-motion branch (which swaps <Spinner> for a static
// clock <Icon>) is not exercised here, since `prefersReducedMotion` is a
// module-level `MediaQuery` singleton read from the real browser at import
// time, and the default Playwright/Chromium context used by these tests has
// no reduced-motion preference - there's no supported way to flip it for a
// single test in this suite.

describe('LoadingIndicator Component', () => {
	it('renders a Spinner svg by default, with a default accessible title of "Loading"', async () => {
		const { container } = render(LoadingIndicator, { class: 'h-10 w-10' });

		const svg = container.querySelector('svg');
		expect(svg).not.toBeNull();
		expect(svg).toHaveAttribute('viewBox', '0 0 100 100');

		const title = svg?.querySelector('title');
		expect(title).toHaveTextContent('Loading');
	});

	it('forwards the class prop to the rendered svg', async () => {
		const { container } = render(LoadingIndicator, { class: 'h-4 w-4' });

		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('h-4');
		expect(svg).toHaveClass('w-4');
	});

	it('uses a custom title for the accessible name when provided', async () => {
		const { container } = render(LoadingIndicator, {
			class: 'h-10 w-10',
			title: 'Fetching results'
		});

		const title = container.querySelector('svg title');
		expect(title).toHaveTextContent('Fetching results');
	});

	it('applies arcColorClass to the animated arc', async () => {
		const { container } = render(LoadingIndicator, {
			class: 'h-10 w-10',
			arcColorClass: 'stroke-color-static-gla-pink'
		});

		const path = container.querySelector('svg path');
		expect(path).toHaveClass('stroke-color-static-gla-pink');
	});
});
