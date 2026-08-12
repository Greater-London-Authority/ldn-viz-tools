import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import SectionTitle from './SectionTitle.svelte';

describe('SectionTitle', () => {
	it('renders the title as an h2 with the section-head role', async () => {
		const { container } = render(SectionTitle, { title: 'Dashboard section title' });

		const heading = page.getByRole('heading', { level: 2 });
		await expect.element(heading).toHaveTextContent('Dashboard section title');
		expect(container.querySelector('h2')).toHaveClass('section-head');
	});

	it('does not render an eyebrow or subtitle by default', async () => {
		const { container } = render(SectionTitle, { title: 'Dashboard section title' });

		expect(container.querySelectorAll('p')).toHaveLength(0);
	});

	it('renders the subtitle when provided', async () => {
		render(SectionTitle, {
			title: 'Dashboard section title',
			subtitle: 'A subtitle for this dashboard'
		});

		await expect.element(page.getByText('A subtitle for this dashboard')).toBeInTheDocument();
	});

	it('renders the eyebrow when provided', async () => {
		render(SectionTitle, { title: 'Dashboard section title', eyebrow: 'Overview' });

		await expect.element(page.getByText('Overview')).toBeInTheDocument();
	});

	it('applies additional classes passed via the `class` prop', async () => {
		const { container } = render(SectionTitle, {
			title: 'Dashboard section title',
			class: 'my-class'
		});

		expect(container.querySelector('div')).toHaveClass('my-class');
	});
});
