import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import LayerControl from './LayerControl.svelte';

describe('LayerControl', () => {
	it('names the checkbox with the layer label', async () => {
		render(LayerControl, { label: 'Boroughs', optionId: 'boroughs', controlsInUse: [] });

		const checkbox = page.getByRole('checkbox', { name: 'Boroughs' });
		await expect.element(checkbox).toBeChecked();

		await page.getByText('Boroughs').click();

		await expect.element(checkbox).not.toBeChecked();
	});

	it('names the radio with the layer label when mutually exclusive', async () => {
		render(LayerControl, {
			label: 'Boroughs',
			optionId: 'boroughs',
			name: 'layers',
			mutuallyExclusive: true,
			selectedOptionId: '',
			controlsInUse: []
		});

		const radio = page.getByRole('radio', { name: 'Boroughs' });
		await expect.element(radio).not.toBeChecked();

		await page.getByText('Boroughs').click();

		await expect.element(radio).toBeChecked();
	});
});
