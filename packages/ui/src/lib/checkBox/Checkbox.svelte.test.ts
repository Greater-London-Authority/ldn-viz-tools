import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
	it('renders unchecked by default', async () => {
		render(Checkbox, { checked: false, label: 'Accept terms' });

		const checkbox = page.getByRole('checkbox');
		await expect.element(checkbox).toBeInTheDocument();
		await expect.element(checkbox).not.toBeChecked();
	});

	it('updates bound checked state on click', async () => {
		render(Checkbox, { checked: false, label: 'Accept terms' });

		const checkbox = page.getByRole('checkbox');
		await expect.element(checkbox).not.toBeChecked();

		await checkbox.click();

		await expect.element(checkbox).toBeChecked();

		await checkbox.click();

		await expect.element(checkbox).not.toBeChecked();
	});

	it('calls onchange handler when clicked', async () => {
		const onchange = vi.fn();
		render(Checkbox, { checked: false, label: 'Accept terms', onchange });

		const checkbox = page.getByRole('checkbox');
		await checkbox.click();

		expect(onchange).toHaveBeenCalledOnce();
	});

	it('does not respond to clicks when disabled', async () => {
		render(Checkbox, { checked: false, label: 'Accept terms', disabled: true });

		const checkbox = page.getByRole('checkbox');
		await expect.element(checkbox).toBeDisabled();
		await expect.element(checkbox).not.toBeChecked();

		await checkbox.click({ force: true });

		await expect.element(checkbox).not.toBeChecked();
	});

	it('associates the label with the control, and toggles it when the label is clicked', async () => {
		render(Checkbox, { checked: false, label: 'Accept terms' });

		const checkbox = page.getByLabelText('Accept terms');
		await expect.element(checkbox).toBeInTheDocument();
		await expect.element(checkbox).not.toBeChecked();

		const label = page.getByText('Accept terms');
		await label.click();

		await expect.element(checkbox).toBeChecked();
	});
});
