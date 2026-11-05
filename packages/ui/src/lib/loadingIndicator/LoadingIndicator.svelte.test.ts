import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LoadingIndicator from './LoadingIndicator.svelte';

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
