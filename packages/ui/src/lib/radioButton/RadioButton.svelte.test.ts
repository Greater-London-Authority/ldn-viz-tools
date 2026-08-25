import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import RadioButton from './RadioButton.svelte';

describe('RadioButton', () => {
	it('renders unchecked by default', async () => {
		render(RadioButton, { id: 'foo', label: 'Foo', selectedId: '' });

		const radio = page.getByRole('radio');
		await expect.element(radio).toBeInTheDocument();
		await expect.element(radio).not.toBeChecked();
	});

	it('updates the bound selectedId (reflected as the checked state) when clicked', async () => {
		render(RadioButton, { id: 'foo', label: 'Foo', selectedId: '' });

		const radio = page.getByRole('radio');
		await expect.element(radio).not.toBeChecked();

		await radio.click();

		await expect.element(radio).toBeChecked();
	});

	it('renders as checked when selectedId already matches its id', async () => {
		render(RadioButton, { id: 'foo', label: 'Foo', selectedId: 'foo' });

		await expect.element(page.getByRole('radio')).toBeChecked();
	});

	it('does not respond to clicks when disabled', async () => {
		render(RadioButton, { id: 'foo', label: 'Foo', selectedId: '', disabled: true });

		const radio = page.getByRole('radio');
		await expect.element(radio).toBeDisabled();
		await expect.element(radio).not.toBeChecked();

		await radio.click({ force: true });

		await expect.element(radio).not.toBeChecked();
	});

	it('associates the label with the control, and toggles it when the label is clicked', async () => {
		render(RadioButton, { id: 'foo', label: 'Foo', selectedId: '' });

		const radio = page.getByLabelText('Foo');
		await expect.element(radio).toBeInTheDocument();
		await expect.element(radio).not.toBeChecked();

		await page.getByText('Foo').click();

		await expect.element(radio).toBeChecked();
	});
});
