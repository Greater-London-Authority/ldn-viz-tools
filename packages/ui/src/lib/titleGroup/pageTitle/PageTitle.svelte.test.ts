import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import PageTitle from './PageTitle.svelte';

describe('PageTitle', () => {
	it('renders the title as an h1 with the display role by default', async () => {
		const { container } = render(PageTitle, { title: 'State of London' });

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toHaveTextContent('State of London');
		expect(container.querySelector('h1')).toHaveClass('display');
	});

	it('does not render an eyebrow or subhead by default', async () => {
		const { container } = render(PageTitle, { title: 'State of London' });

		expect(container.querySelectorAll('p')).toHaveLength(0);
	});

	it('renders the subhead when provided', async () => {
		render(PageTitle, { title: 'State of London', subhead: 'A subhead' });

		await expect.element(page.getByText('A subhead')).toBeInTheDocument();
	});

	it('renders the eyebrow when provided', async () => {
		render(PageTitle, { title: 'State of London', eyebrow: 'GLA City Intelligence' });

		await expect.element(page.getByText('GLA City Intelligence')).toBeInTheDocument();
	});

	it('applies additional classes passed via the `class` prop', async () => {
		const { container } = render(PageTitle, { title: 'State of London', class: 'my-class' });

		expect(container.querySelector('div')).toHaveClass('my-class');
	});
});
