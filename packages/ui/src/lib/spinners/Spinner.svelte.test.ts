import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Spinner from './Spinner.svelte';

// Discrepancy from SUGGESTED_TESTS.md: Spinner.svelte does not itself set
// `role="status"` or `aria-busy` - it accepts arbitrary rest props (`[key:
// string]: any`) spread onto the root <svg>, so a consumer *could* pass those
// attributes through, but nothing in Spinner.svelte sets them by default.
// (AsyncButton.svelte.test.ts already covers the `role="status"`/`aria-busy`
// behaviour, which is added by AsyncButton's own wrapping <div>.) These tests
// instead cover what Spinner actually renders: an animated svg arc, with
// configurable colours via `circleColorClass`/`arcColorClass`, an optional
// accessible `title`, and forwarding of arbitrary rest attributes.

describe('Spinner Component', () => {
	it('renders an animated svg with a circle and an arc path', async () => {
		const { container } = render(Spinner, {});

		const svg = container.querySelector('svg');
		expect(svg).not.toBeNull();
		expect(svg).toHaveAttribute('viewBox', '0 0 100 100');

		const circle = svg?.querySelector('circle');
		expect(circle).not.toBeNull();
		expect(circle).toHaveClass('stroke-color-surface-empty');

		const path = svg?.querySelector('path');
		expect(path).not.toBeNull();
		expect(path).toHaveClass('stroke-color-interactive-primary-active');
		expect(path?.querySelector('animateTransform')).not.toBeNull();
	});

	it('does not render a <title> element when no title prop is given', async () => {
		const { container } = render(Spinner, {});

		expect(container.querySelector('svg title')).toBeNull();
	});

	it('renders an accessible <title> element when a title prop is given', async () => {
		const { container } = render(Spinner, { title: 'Loading' });

		const title = container.querySelector('svg title');
		expect(title).toHaveTextContent('Loading');
	});

	it('applies circleColorClass and arcColorClass to the circle and path respectively', async () => {
		const { container } = render(Spinner, {
			circleColorClass: 'stroke-color-surface-negative-muted',
			arcColorClass: 'stroke-color-surface-negative'
		});

		const circle = container.querySelector('svg circle');
		expect(circle).toHaveClass('stroke-color-surface-negative-muted');

		const path = container.querySelector('svg path');
		expect(path).toHaveClass('stroke-color-surface-negative');
	});

	it('forwards rest props (e.g. class) to the root svg element', async () => {
		const { container } = render(Spinner, { class: 'w-8 stroke-[16]' });

		const svg = container.querySelector('svg');
		expect(svg).toHaveClass('w-8');
		expect(svg).toHaveClass('stroke-[16]');
	});
});
