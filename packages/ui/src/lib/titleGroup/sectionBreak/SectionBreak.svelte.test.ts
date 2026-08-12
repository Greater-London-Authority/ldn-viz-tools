import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import SectionBreak from './SectionBreak.svelte';

describe('SectionBreak', () => {
	it('renders the title as an h2 with the title-1 role', async () => {
		const { container } = render(SectionBreak, { title: 'Population' });

		const heading = page.getByRole('heading', { level: 2 });
		await expect.element(heading).toHaveTextContent('Population');
		expect(container.querySelector('h2')).toHaveClass('title-1');
	});

	it('does not render an eyebrow or subtitle by default', async () => {
		const { container } = render(SectionBreak, { title: 'Population' });

		expect(container.querySelectorAll('p')).toHaveLength(0);
	});

	it('renders the subtitle when provided', async () => {
		render(SectionBreak, {
			title: 'Population',
			subtitle: 'How the city has grown over the last decade'
		});

		await expect
			.element(page.getByText('How the city has grown over the last decade'))
			.toBeInTheDocument();
	});

	it('renders the eyebrow when provided', async () => {
		render(SectionBreak, { title: 'Population', eyebrow: 'Demographics' });

		await expect.element(page.getByText('Demographics')).toBeInTheDocument();
	});

	it('applies additional classes passed via the `class` prop', async () => {
		const { container } = render(SectionBreak, { title: 'Population', class: 'my-class' });

		expect(container.querySelector('div')).toHaveClass('my-class');
	});
});
