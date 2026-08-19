import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Switch from './Switch.svelte';

describe('Switch', () => {
	it('renders unchecked by default', async () => {
		render(Switch, { checked: false, label: 'Enable something' });

		const switchControl = page.getByRole('switch');
		await expect.element(switchControl).toBeInTheDocument();
		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');
	});

	it('toggles the bound checked state (reflected via aria-checked) when clicked', async () => {
		render(Switch, { checked: false, label: 'Enable something' });

		const switchControl = page.getByRole('switch');
		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');

		await switchControl.click();

		await expect.element(switchControl).toHaveAttribute('aria-checked', 'true');

		await switchControl.click();

		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');
	});

	it('renders as checked when the checked prop is true', async () => {
		render(Switch, { checked: true, label: 'Enable something' });

		await expect.element(page.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
	});

	it('does not respond to clicks when disabled', async () => {
		render(Switch, { checked: false, label: 'Enable something', disabled: true });

		const switchControl = page.getByRole('switch');
		await expect.element(switchControl).toBeDisabled();
		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');

		await switchControl.click({ force: true });

		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');
	});

	it('associates the label with the control, and toggles it when the label is clicked', async () => {
		render(Switch, { checked: false, label: 'Enable something' });

		const switchControl = page.getByLabelText('Enable something');
		await expect.element(switchControl).toBeInTheDocument();
		await expect.element(switchControl).toHaveAttribute('aria-checked', 'false');

		await page.getByText('Enable something').click();

		await expect.element(switchControl).toHaveAttribute('aria-checked', 'true');
	});
});
