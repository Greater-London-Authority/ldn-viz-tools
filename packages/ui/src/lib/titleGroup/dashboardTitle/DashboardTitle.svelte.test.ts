import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import DashboardTitle from './DashboardTitle.svelte';

describe('DashboardTitle', () => {
	it('renders the title as an h1 with the page-head role', async () => {
		const { container } = render(DashboardTitle, { title: 'Dashboard title' });

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toHaveTextContent('Dashboard title');
		expect(container.querySelector('h1')).toHaveClass('page-head');
	});

	it('does not render an eyebrow or subtitle by default', async () => {
		const { container } = render(DashboardTitle, { title: 'Dashboard title' });

		expect(container.querySelectorAll('p')).toHaveLength(0);
	});

	it('renders the subtitle when provided', async () => {
		render(DashboardTitle, { title: 'Dashboard title', subtitle: 'A subtitle for this dashboard' });

		await expect.element(page.getByText('A subtitle for this dashboard')).toBeInTheDocument();
	});

	it('renders the eyebrow when provided', async () => {
		render(DashboardTitle, { title: 'Dashboard title', eyebrow: 'Region' });

		await expect.element(page.getByText('Region')).toBeInTheDocument();
	});

	it('applies additional classes passed via the `class` prop', async () => {
		const { container } = render(DashboardTitle, { title: 'Dashboard title', class: 'my-class' });

		expect(container.querySelector('div')).toHaveClass('my-class');
	});
});
