import { page } from '@vitest/browser/context';
import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Button from './Button.svelte';

describe('Button Component', () => {
	it('renders with default props', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children
		});

		const button = page.getByRole('button');
		await expect.element(button).toBeInTheDocument();
		await expect.element(button).toHaveTextContent('Click me');
		await expect.element(button).toHaveClass('bg-color-action-background-primary');
	});
});
