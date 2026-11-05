import { createRawSnippet } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
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
		await expect.element(button).toHaveClass('bg-color-interactive-primary');
	});

	it('calls onclick handler when clicked', async () => {
		const onclick = vi.fn();
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children,
			onclick
		});

		const button = page.getByRole('button');
		await button.click();

		expect(onclick).toHaveBeenCalledOnce();
	});

	describe('variant / emphasis combinations', () => {
		// Spot-check a representative sample of the 25 variant x emphasis
		// combinations, asserting on the real class strings from Button.svelte's
		// `styleClasses` map rather than exhaustively covering every combination.
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		it('renders solid/primary classes (default)', async () => {
			render(Button, { children, variant: 'solid', emphasis: 'primary' });

			await expect.element(page.getByRole('button')).toHaveClass('bg-color-interactive-primary');
		});

		it('renders square/secondary classes', async () => {
			render(Button, { children, variant: 'square', emphasis: 'secondary' });

			await expect.element(page.getByRole('button')).toHaveClass('bg-color-interactive-secondary');
		});

		it('renders outline/positive classes', async () => {
			render(Button, { children, variant: 'outline', emphasis: 'positive' });

			const button = page.getByRole('button');
			await expect.element(button).toHaveClass('bg-transparent');
			await expect.element(button).toHaveClass('border-color-interactive-positive');
		});

		it('renders text/negative classes', async () => {
			render(Button, { children, variant: 'text', emphasis: 'negative' });

			await expect.element(page.getByRole('button')).toHaveClass('text-color-interactive-negative');
		});

		it('renders brand/caution classes', async () => {
			render(Button, { children, variant: 'brand', emphasis: 'caution' });

			const button = page.getByRole('button');
			await expect.element(button).toHaveClass('bg-color-interactive-caution');
			await expect.element(button).toHaveClass('border-color-static-brand');
		});
	});

	it('disabled prevents onclick from firing and sets the disabled attribute', async () => {
		const onclick = vi.fn();
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children,
			onclick,
			disabled: true
		});

		const button = page.getByRole('button');
		await expect.element(button).toBeDisabled();

		await button.click({ force: true });

		expect(onclick).not.toHaveBeenCalled();
	});

	it('fullWidth applies the w-full class', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children,
			fullWidth: true
		});

		await expect.element(page.getByRole('button')).toHaveClass('w-full');
	});

	it('forwards the type attribute to the underlying element', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children,
			type: 'submit'
		});

		await expect.element(page.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('defaults the type attribute to "button"', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Click me</span>',
			setup: () => {}
		}));

		render(Button, {
			children
		});

		await expect.element(page.getByRole('button')).toHaveAttribute('type', 'button');
	});
});
