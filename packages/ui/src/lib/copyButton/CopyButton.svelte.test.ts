import { createRawSnippet } from 'svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import CopyButton from './CopyButton.svelte';

describe('CopyButton', () => {
	let writeTextMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		// Mock the clipboard API for testing

		writeTextMock = vi.fn();

		Object.defineProperty(navigator, 'clipboard', {
			value: {
				writeText: vi.fn().mockImplementation(() => Promise.resolve())
			},
			configurable: true
		});
	});

	it('renders', async () => {
		const beforeClick = createRawSnippet(() => ({
			render: () => '<span>Click me!</span>',
			setup: () => {}
		}));

		render(CopyButton, {
			beforeCopy: beforeClick,
			content: 'Content to copy'
		});

		const button = page.getByRole('button');
		await expect.element(button).toBeInTheDocument();
		await expect.element(button).toHaveTextContent('Click me!');
	});

	it('updates clipboard when it is clicked on', async () => {
		const beforeClick = createRawSnippet(() => ({
			render: () => '<span>Click me!</span>',
			setup: () => {}
		}));

		render(CopyButton, {
			beforeCopy: beforeClick,
			content: 'Content to copy'
		});

		const button = page.getByRole('button');

		await button.click();

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Content to copy');
	});

	it('changes appearance after click, and then reverts', async () => {
		const beforeClick = createRawSnippet(() => ({
			render: () => '<span>Click me!</span>',
			setup: () => {}
		}));

		const afterClick = createRawSnippet(() => ({
			render: () => '<span>You clicked me!</span>',
			setup: () => {}
		}));

		render(CopyButton, {
			beforeCopy: beforeClick,
			afterCopy: afterClick,
			content: 'Content to copy'
		});

		const button = page.getByRole('button');

		await expect.element(button).toBeInTheDocument();
		await expect.element(button).toHaveTextContent('Click me!');

		await button.click();
		await new Promise((resolve) => setTimeout(resolve, 100));

		await expect.element(button).toHaveTextContent('You clicked me!');

		await new Promise((resolve) => setTimeout(resolve, 3100));

		await expect.element(button).toHaveTextContent('Click me!');
	});
});
