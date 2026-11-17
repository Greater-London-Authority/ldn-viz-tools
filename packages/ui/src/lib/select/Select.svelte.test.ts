import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Select from './Select.svelte';
import SelectBindValueHarness from './SelectBindValueHarness.svelte';

const options = [
	{ label: 'One', value: 1 },
	{ label: 'Two', value: 2 },
	{ label: 'Three', value: 3 }
];

/**
 * `Select` wraps the third-party `svelecte` combobox, which renders its options as plain
 * `<div>`s with no ARIA role (there's no `role="option"`/`role="listbox"` in its markup), and
 * only exposes them once the control has been opened. There's also no accessible name/size for
 * Playwright's actionability checks to latch onto (the input's width is calculated from a
 * `data-value` attribute, and is 0 until `svelecte`'s own CSS runs), so `locator.click()` can hang
 * waiting for the element to be "stable". Dispatching a native `click()` directly on the relevant
 * element sidesteps that, and still exercises the real `svelecte` mouse-handling code path.
 */
function openDropdown(container: Element) {
	const control = container.querySelector('.sv-control') as HTMLElement;
	control.click();
}

function getDropdownOptions(container: Element) {
	return Array.from(container.querySelectorAll('.sv-item--wrap.in-dropdown'));
}

describe('Select', () => {
	it('renders the provided options once opened', async () => {
		const { container } = render(Select, { label: 'Pick a number', name: 'pick', options });

		openDropdown(container);

		await expect
			.poll(() => getDropdownOptions(container).map((option) => option.textContent))
			.toEqual(['One', 'Two', 'Three']);
	});

	it('fires onChange with the selected option when an option is selected', async () => {
		const onChange = vi.fn();
		const { container } = render(Select, {
			label: 'Pick a number',
			name: 'pick',
			options,
			onChange
		});

		openDropdown(container);
		await expect.poll(() => getDropdownOptions(container).length).toBeGreaterThan(0);

		const [, secondOption] = getDropdownOptions(container);
		(secondOption as HTMLElement).click();

		// `onChange` is invoked asynchronously (after a `tick()`) by svelecte, so retry until it fires.
		await expect.poll(() => onChange).toHaveBeenCalledWith({ label: 'Two', value: 2 });
		await expect
			.poll(() => container.querySelector('.sv-control--selection')?.textContent)
			.toContain('Two');
	});

	it('updates the value bound with bind:value when an option is selected', async () => {
		const { container } = render(SelectBindValueHarness, { label: 'Pick a number', options });

		openDropdown(container);
		await expect.poll(() => getDropdownOptions(container).length).toBeGreaterThan(0);

		const [, secondOption] = getDropdownOptions(container);
		(secondOption as HTMLElement).click();

		await expect.element(page.getByTestId('bound-value')).toHaveTextContent('2');
	});

	it('prevents interaction when disabled', async () => {
		const { container } = render(Select, {
			label: 'Pick a number',
			name: 'pick',
			options,
			disabled: true
		});

		const input = page.getByPlaceholder('Select an option');
		await expect.element(input).toBeDisabled();

		openDropdown(container);

		// Clicking the control while disabled must not open the dropdown.
		expect(getDropdownOptions(container)).toHaveLength(0);
	});
});
