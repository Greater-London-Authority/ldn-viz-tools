import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import MultipleActionButton from './MultipleActionButton.svelte';
import type { MultipleActionButtonOption, MultipleActionButtonProps } from './types';

const options: MultipleActionButtonOption[] = [
	{
		id: 'PNG',
		buttonLabel: 'Download as PNG',
		menuLabel: 'PNG',
		menuDescription: 'A raster image format.',
		default: true
	},
	{
		id: 'SVG',
		buttonLabel: 'Download as SVG',
		menuLabel: 'SVG',
		menuDescription: 'A vector image format.'
	}
];

describe('MultipleActionButton', () => {
	it("renders the default option's buttonLabel", async () => {
		const onClick = vi.fn();

		render(MultipleActionButton, {
			options,
			state: options[0],
			onClick
		});

		await expect.element(page.getByRole('button', { name: 'Download as PNG' })).toBeInTheDocument();
	});

	it('lists all options with their menuLabel / menuDescription when the menu is opened', async () => {
		const onClick = vi.fn();

		render(MultipleActionButton, {
			options,
			state: options[0],
			menuTitle: 'Select image format',
			onClick
		});

		const trigger = page.getByRole('button', { name: 'Open popover to Select image format' });
		await trigger.click();

		await expect.element(page.getByText('PNG', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('A raster image format.')).toBeInTheDocument();
		await expect.element(page.getByText('SVG', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('A vector image format.')).toBeInTheDocument();
	});

	it('selecting a non-default option changes the primary action and the bound state', async () => {
		const onClick = vi.fn();

		// `state` is a `$bindable` prop. To observe two-way binding updates from
		// outside a parent component (there's no host `.svelte` component in a
		// `.ts` test file), define it as an accessor on the props object passed
		// to `render` - Svelte's bindable mechanism writes back through this
		// setter whenever the component reassigns `state`. The backing value
		// must itself be a rune so Svelte's reactivity picks up the change and
		// re-renders (this file is `.svelte.test.ts`, so runes are available).
		let capturedState = $state<MultipleActionButtonOption | undefined>(options[0]);
		const props: MultipleActionButtonProps = {
			options,
			onClick,
			menuTitle: 'Select image format',
			state: options[0]
		};
		Object.defineProperty(props, 'state', {
			enumerable: true,
			configurable: true,
			get: () => capturedState,
			set: (value: MultipleActionButtonOption) => {
				capturedState = value;
			}
		});

		render(MultipleActionButton, props);

		const trigger = page.getByRole('button', { name: 'Open popover to Select image format' });
		await trigger.click();

		await page.getByText('SVG', { exact: true }).click();

		await expect.element(page.getByRole('button', { name: 'Download as SVG' })).toBeInTheDocument();

		expect(capturedState?.id).toBe('SVG');
	});

	it('onClick fires with the currently-selected option', async () => {
		const onClick = vi.fn();

		render(MultipleActionButton, {
			options,
			state: options[0],
			menuTitle: 'Select image format',
			onClick
		});

		const trigger = page.getByRole('button', { name: 'Open popover to Select image format' });
		await trigger.click();
		await page.getByText('SVG', { exact: true }).click();

		const primaryButton = page.getByRole('button', { name: 'Download as SVG' });
		await primaryButton.click();

		expect(onClick).toHaveBeenCalledWith('SVG');
	});

	it('disabled disables the control', async () => {
		const onClick = vi.fn();

		render(MultipleActionButton, {
			options,
			state: options[0],
			onClick,
			disabled: true
		});

		const primaryButton = page.getByRole('button', { name: 'Download as PNG' });
		await expect.element(primaryButton).toBeDisabled();
	});
});
