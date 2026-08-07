import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Input from './Input.svelte';
import InputBindValueHarness from './InputBindValueHarness.svelte';

describe('Input', () => {
	it('updates the bound value when the user types', async () => {
		render(InputBindValueHarness, { label: 'Name' });

		const input = page.getByLabelText('Name');
		await input.fill('Hello');

		await expect.element(input).toHaveValue('Hello');
		await expect.element(page.getByTestId('bound-value')).toHaveTextContent('Hello');
	});

	it('prevents interaction when disabled', async () => {
		render(Input, { label: 'Name', type: 'text', disabled: true });

		const input = page.getByLabelText('Name');
		await expect.element(input).toBeDisabled();
	});

	it('associates the label with the control, so clicking the label focuses it', async () => {
		render(Input, { label: 'Name', type: 'text', id: 'name-input' });

		const label = page.getByText('Name');
		const input = page.getByLabelText('Name');

		await expect.element(input).not.toHaveFocus();

		await label.click();

		await expect.element(input).toHaveFocus();
	});

	it('renders a description, wired to the input via aria-describedby', async () => {
		render(Input, {
			label: 'Name',
			type: 'text',
			id: 'name-input',
			description: 'Some helpful text'
		});

		const description = page.getByText('Some helpful text');
		await expect.element(description).toBeInTheDocument();
		await expect.element(description).toHaveAttribute('id', 'name-input-description');

		const input = page.getByLabelText('Name');
		await expect.element(input).toHaveAttribute('aria-describedby', 'name-input-description');
	});

	it('renders an error message, wired to the input via aria-errormessage, in place of the description', async () => {
		render(Input, {
			label: 'Name',
			type: 'text',
			id: 'name-input',
			description: 'Some helpful text',
			error: 'This field is required'
		});

		const error = page.getByRole('alert');
		await expect.element(error).toBeInTheDocument();
		await expect.element(error).toHaveTextContent('This field is required');
		await expect.element(error).toHaveAttribute('id', 'name-input-error');

		// The description is not rendered while an error is present.
		await expect.element(page.getByText('Some helpful text')).not.toBeInTheDocument();

		const input = page.getByLabelText('Name');
		await expect.element(input).toHaveAttribute('aria-errormessage', 'name-input-error');
		await expect.element(input).toHaveAttribute('aria-invalid', 'true');
		// `aria-describedby` is only used for the description, so is absent once there's an error.
		await expect.element(input).not.toHaveAttribute('aria-describedby');
	});
});
