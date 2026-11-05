import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Tabs from './Tabs.svelte';
import PanelA from './testFixtures/PanelA.svelte';
import PanelB from './testFixtures/PanelB.svelte';
import PanelC from './testFixtures/PanelC.svelte';
import type { Tab } from './types';

const tabs: Tab[] = [
	{ id: 'a', label: 'Tab A', content: PanelA },
	{ id: 'b', label: 'Tab B', content: PanelB },
	{ id: 'c', label: 'Tab C', content: PanelC }
];

describe('Tabs', () => {
	it('renders a tablist and shows the first tab selected by default', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs' });

		const tablist = page.getByRole('tablist');
		await expect.element(tablist).toBeInTheDocument();
		await expect.element(tablist).toHaveAttribute('aria-label', 'Example tabs');

		await expect
			.element(page.getByRole('tab', { name: 'Tab A' }))
			.toHaveAttribute('aria-selected', 'true');
		await expect
			.element(page.getByRole('tab', { name: 'Tab B' }))
			.toHaveAttribute('aria-selected', 'false');
		await expect
			.element(page.getByRole('tab', { name: 'Tab C' }))
			.toHaveAttribute('aria-selected', 'false');
	});

	it('shows the panel content of the selected tab and hides the others', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs' });

		await expect.element(page.getByText('Content of panel A')).toBeInTheDocument();
		await expect.element(page.getByText('Content of panel B')).not.toBeInTheDocument();
		await expect.element(page.getByText('Content of panel C')).not.toBeInTheDocument();
	});

	it('selecting a different tab shows its panel and hides the previous one', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs' });

		await page.getByRole('tab', { name: 'Tab B' }).click();

		await expect
			.element(page.getByRole('tab', { name: 'Tab B' }))
			.toHaveAttribute('aria-selected', 'true');
		await expect
			.element(page.getByRole('tab', { name: 'Tab A' }))
			.toHaveAttribute('aria-selected', 'false');

		await expect.element(page.getByText('Content of panel B')).toBeInTheDocument();
		await expect.element(page.getByText('Content of panel A')).not.toBeInTheDocument();
		await expect.element(page.getByText('Content of panel C')).not.toBeInTheDocument();
	});

	it('renders exactly one tabpanel at a time, linked to the selected tab', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs' });

		const initialPanels = page.getByRole('tabpanel').elements();
		expect(initialPanels).toHaveLength(1);
		expect(initialPanels[0]).toHaveAttribute('id', 'a-panel');
		expect(initialPanels[0]).toHaveAttribute('aria-labelledby', 'a');

		await page.getByRole('tab', { name: 'Tab C' }).click();

		const panelsAfterSelect = page.getByRole('tabpanel').elements();
		expect(panelsAfterSelect).toHaveLength(1);
		expect(panelsAfterSelect[0]).toHaveAttribute('id', 'c-panel');
		expect(panelsAfterSelect[0]).toHaveAttribute('aria-labelledby', 'c');
	});

	it('respects an initial selectedTabId prop', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs', selectedTabId: 'c' });

		await expect
			.element(page.getByRole('tab', { name: 'Tab C' }))
			.toHaveAttribute('aria-selected', 'true');
		await expect.element(page.getByText('Content of panel C')).toBeInTheDocument();
	});

	it('calls onChange with the id of the newly selected tab', async () => {
		const onChange = vi.fn();
		render(Tabs, { tabs, ariaLabel: 'Example tabs', onChange });

		await page.getByRole('tab', { name: 'Tab B' }).click();

		expect(onChange).toHaveBeenCalledWith('b');
	});

	it('sets aria-orientation on the tablist based on the orientation prop', async () => {
		render(Tabs, { tabs, ariaLabel: 'Example tabs', orientation: 'vertical' });

		await expect.element(page.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
	});
});
