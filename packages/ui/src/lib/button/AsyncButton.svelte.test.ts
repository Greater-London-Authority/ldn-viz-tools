import { createRawSnippet } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import AsyncButton from './AsyncButton.svelte';

describe('AsyncButton Component', () => {
	it('shows loading state during async operation and reverts after completion', async () => {
		// A mock async function that resolves after 3 seconds
		const waitThreeSeconds = () => new Promise((resolve) => setTimeout(resolve, 3000));
		const onclick = vi.fn(waitThreeSeconds);

		const children = createRawSnippet(() => ({
			render: () => '<span>Click me!</span>',
			setup: () => {}
		}));

		render(AsyncButton, {
			children,
			onclick
		});

		const button = page.getByRole('button');

		// Initially shows "Click me!"
		await expect.element(button).toHaveTextContent('Click me!');
		await expect.element(button).toBeEnabled();

		// Click the button
		await button.click();

		// Wait a bit for the async handler to start
		await new Promise((resolve) => setTimeout(resolve, 100));

		// Button should be disabled during loading
		await expect.element(button).toBeDisabled();

		// Loading indicator should be present (look for the svg element)
		const loadingIndicator = page.getByRole('status');
		await expect.element(loadingIndicator).toHaveAttribute('aria-busy', 'true');

		// Wait for the async operation to complete (3 seconds + 0.1s buffer)
		await new Promise((resolve) => setTimeout(resolve, 3100));

		// Should revert to "Click me!" after completion
		await expect.element(button).toHaveTextContent('Click me!');

		// Button should be enabled again
		await expect.element(button).toBeEnabled();

		// Status should not be busy
		await expect.element(loadingIndicator).toHaveAttribute('aria-busy', 'false');

		// onclick should have been called once
		expect(onclick).toHaveBeenCalledOnce();
	});
});
