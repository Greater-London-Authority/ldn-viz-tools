import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import RadioButtonGroup from './RadioButtonGroup.svelte';

const options = [
	{ id: 'bus', label: 'Bus stops' },
	{ id: 'train', label: 'Train stations' },
	{ id: 'underground', label: 'Underground stations' },
	{ id: 'taxi', label: 'Taxi ranks', disabled: true }
];

describe('RadioButtonGroup', () => {
	it('renders a radio button for each option', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: '' });

		await expect.element(page.getByLabelText('Bus stops')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Train stations')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Underground stations')).toBeInTheDocument();
		await expect.element(page.getByLabelText('Taxi ranks')).toBeInTheDocument();
	});

	it('reflects the initial selectedId in the radio button state', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: 'train' });

		await expect.element(page.getByLabelText('Bus stops')).not.toBeChecked();
		await expect.element(page.getByLabelText('Train stations')).toBeChecked();
	});

	it('selecting an option checks it and unchecks the previously-selected option (mutually exclusive, bound selectedId)', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: 'bus' });

		await expect.element(page.getByLabelText('Bus stops')).toBeChecked();
		await expect.element(page.getByLabelText('Underground stations')).not.toBeChecked();

		await page.getByLabelText('Underground stations').click();

		await expect.element(page.getByLabelText('Underground stations')).toBeChecked();
		await expect.element(page.getByLabelText('Bus stops')).not.toBeChecked();
	});

	it('does not allow a disabled option to be selected', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: '' });

		const taxiRadio = page.getByLabelText('Taxi ranks');
		await expect.element(taxiRadio).toBeDisabled();

		await taxiRadio.click({ force: true });

		await expect.element(taxiRadio).not.toBeChecked();
	});

	it('does not allow any option to be selected when the whole group is disabled', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: '', disabled: true });

		const busRadio = page.getByLabelText('Bus stops');
		await expect.element(busRadio).toBeDisabled();

		await busRadio.click({ force: true });

		await expect.element(busRadio).not.toBeChecked();
	});

	it('the "Clear" button unchecks the selected option', async () => {
		render(RadioButtonGroup, { options, name: 'station-type', selectedId: 'bus' });

		await expect.element(page.getByLabelText('Bus stops')).toBeChecked();

		await page.getByRole('button', { name: 'Clear' }).click();

		await expect.element(page.getByLabelText('Bus stops')).not.toBeChecked();
	});

	it('does not render the "Clear" button when allowClear is false', async () => {
		render(RadioButtonGroup, {
			options,
			name: 'station-type',
			selectedId: '',
			allowClear: false
		});

		await expect.element(page.getByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
	});

	// RadioButtonGroup.svelte implements no custom keydown/arrow-key handling of its own; each
	// RadioButton is a plain native <input type="radio">. Because all options share the same
	// `name`, arrow-key navigation between them is handled entirely by the browser's native radio
	// group behaviour rather than any code in this component, so it is not re-tested here.
});
