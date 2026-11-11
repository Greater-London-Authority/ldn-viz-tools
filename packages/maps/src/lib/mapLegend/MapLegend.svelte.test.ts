import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import MapLegend from './MapLegend.svelte';

describe('MapLegend', () => {
	test('renders the "Legend" button when isOpen is false', async () => {
		render(MapLegend, { props: { isOpen: false, width: 0 } });

		const showButton = page.getByRole('button', { name: 'Show legend' });
		await expect.element(showButton).toBeInTheDocument();

		const closeButton = page.getByRole('button', { name: 'Close legend' });
		await expect.element(closeButton).not.toBeInTheDocument();
	});

	test('renders the panel and "Close legend" button when isOpen is true', async () => {
		render(MapLegend, { props: { isOpen: true, width: 0 } });

		const closeButton = page.getByRole('button', { name: 'Close legend' });
		await expect.element(closeButton).toBeInTheDocument();

		const showButton = page.getByRole('button', { name: 'Show legend' });
		await expect.element(showButton).not.toBeInTheDocument();
	});

	test('clicking "Show legend" opens the panel', async () => {
		render(MapLegend, { props: { isOpen: false, width: 0 } });

		const showButton = page.getByRole('button', { name: 'Show legend' });
		await showButton.click();

		const closeButton = page.getByRole('button', { name: 'Close legend' });
		await expect.element(closeButton).toBeInTheDocument();
	});

	test('clicking "Close legend" closes the panel', async () => {
		render(MapLegend, { props: { isOpen: true, width: 0 } });

		const closeButton = page.getByRole('button', { name: 'Close legend' });
		await closeButton.click();

		const showButton = page.getByRole('button', { name: 'Show legend' });
		await expect.element(showButton).toBeInTheDocument();
	});

	test('width is updated via bind:clientWidth when the panel is open', async () => {
		const props = $state({ isOpen: true, width: undefined as number | undefined });
		render(MapLegend, { props });

		const closeButton = page.getByRole('button', { name: 'Close legend' });
		await expect.element(closeButton).toBeInTheDocument();

		expect(typeof props.width).toBe('number');
		expect(props.width).toBeGreaterThanOrEqual(0);
	});
});
