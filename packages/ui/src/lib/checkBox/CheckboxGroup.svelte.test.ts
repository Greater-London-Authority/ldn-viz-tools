import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import CheckboxGroup from './CheckboxGroup.svelte';

const options = [
	{ id: 'bus', name: 'bus', label: 'Bus stops' },
	{ id: 'train', name: 'train', label: 'Train stations' },
	{ id: 'underground', name: 'underground', label: 'Underground stations' },
	{ id: 'taxi', name: 'taxi', label: 'Taxi ranks', disabled: true }
];

describe('CheckboxGroup', () => {
	it('renders a checkbox for each option, plus a "Select all" checkbox', async () => {
		render(CheckboxGroup, { options, selectedOptions: [] });

		await expect.element(page.getByLabelText('Select all')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Bus stops')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Train stations')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Underground stations')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Taxi ranks')).toBeInTheDocument();
	});

	it('reflects the initial selectedOptions in the checkbox state', async () => {
		render(CheckboxGroup, { options, selectedOptions: ['bus', 'underground'] });

		await expect.element(page.getByLabelText('Bus stops')).toBeChecked();
		await expect.element(page.getByLabelText('Train stations')).not.toBeChecked();
		await expect.element(page.getByLabelText('Underground stations')).toBeChecked();
	});

	it('calls onChange with the updated array of selected ids when an option is selected', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, { options, selectedOptions: [], onChange });

		await page.getByLabelText('Bus stops').click();

		expect(onChange).toHaveBeenCalledWith(['bus']);
	});

	it('calls onChange with the id removed when a selected option is deselected', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, { options, selectedOptions: ['bus', 'train'], onChange });

		await page.getByLabelText('Bus stops').click();

		expect(onChange).toHaveBeenCalledWith(['train']);
	});

	it('"Select all" selects every non-disabled option', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, { options, selectedOptions: [], onChange });

		await page.getByLabelText('Select all').click();

		expect(onChange).toHaveBeenCalledWith(['bus', 'train', 'underground']);
	});

	it('clicking "Select all" again (once all are selected) clears the selection', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, {
			options,
			selectedOptions: ['bus', 'train', 'underground'],
			onChange
		});

		await page.getByLabelText('Select all').click();

		expect(onChange).toHaveBeenCalledWith([]);
	});

	it('does not allow a disabled option to be toggled', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, { options, selectedOptions: [], onChange });

		const taxiCheckbox = page.getByLabelText('Taxi ranks');
		await expect.element(taxiCheckbox).toBeDisabled();

		await taxiCheckbox.click({ force: true });

		expect(onChange).not.toHaveBeenCalled();
	});

	it('does not allow any option to be toggled when the whole group is disabled', async () => {
		const onChange = vi.fn();
		render(CheckboxGroup, { options, selectedOptions: [], disabled: true, onChange });

		const busCheckbox = page.getByLabelText('Bus stops');
		await expect.element(busCheckbox).toBeDisabled();

		await busCheckbox.click({ force: true });

		expect(onChange).not.toHaveBeenCalled();
	});

	// CheckboxGroup does not implement any custom keydown handling (no onkeydown/arrow-key
	// logic in CheckboxGroup.svelte) - each Checkbox is a plain <input type="checkbox">, so
	// keyboard navigation between options is just the browser's native Tab order, which does
	// not warrant a dedicated test here.
	it('each checkbox is reachable in the native tab order', async () => {
		render(CheckboxGroup, { options, selectedOptions: [] });

		const busCheckbox = page.getByLabelText('Bus stops').element() as HTMLInputElement;
		busCheckbox.focus();
		await expect.element(page.getByLabelText('Bus stops')).toHaveFocus();
	});
});
