import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Callout from './Callout.svelte';

// Note: unlike NonIdealState, Callout.svelte does not render an icon at all -
// it only ever shows a title (in an <h3>), a body, and an optional `more`
// snippet, styled by `status` and `size`. So "renders icon per variant" from
// SUGGESTED_TESTS.md does not apply here; there is no icon prop/slot.

const titleSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));

const bodySnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));

describe('Callout Component', () => {
	it('renders title and body content', async () => {
		render(Callout, {
			title: titleSnippet('The title!'),
			body: bodySnippet('The body!')
		});

		await expect.element(page.getByRole('heading', { level: 3 })).toHaveTextContent('The title!');
		await expect.element(page.getByText('The body!')).toBeInTheDocument();
	});

	it('renders the `more` snippet when provided', async () => {
		const more = createRawSnippet(() => ({
			render: () => '<span>Extra detail</span>',
			setup: () => {}
		}));

		render(Callout, {
			title: titleSnippet('The title!'),
			body: bodySnippet('The body!'),
			more
		});

		await expect.element(page.getByText('Extra detail')).toBeInTheDocument();
	});

	it('renders a visually-hidden ariaTitle heading when no title snippet is provided', async () => {
		render(Callout, {
			ariaTitle: 'Learn about chart methodology',
			body: bodySnippet('The body!')
		});

		const heading = page.getByRole('heading', { level: 3 });
		await expect.element(heading).toHaveTextContent('Learn about chart methodology');
		await expect.element(heading).toHaveClass('sr-only');
	});

	describe('status variants', () => {
		// Asserts on the real class strings from Callout.svelte's `statusClasses`
		// map, which determine the banner's background/border colour.
		it('applies notice classes (default)', async () => {
			const { container } = render(Callout, {
				title: titleSnippet('Notice'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-accent-muted');
			expect(aside).toHaveClass('border-color-surface-accent');
		});

		it('applies positive classes', async () => {
			const { container } = render(Callout, {
				status: 'positive',
				title: titleSnippet('Positive'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-positive-muted');
			expect(aside).toHaveClass('border-color-surface-positive');
		});

		it('applies caution classes', async () => {
			const { container } = render(Callout, {
				status: 'caution',
				title: titleSnippet('Caution'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-caution-muted');
			expect(aside).toHaveClass('border-color-surface-caution');
		});

		it('applies negative classes', async () => {
			const { container } = render(Callout, {
				status: 'negative',
				title: titleSnippet('Negative'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-negative-muted');
			expect(aside).toHaveClass('border-color-surface-negative');
		});
	});

	describe('size variants', () => {
		it('applies sm classes (no left border, smaller heading)', async () => {
			const { container } = render(Callout, {
				size: 'sm',
				title: titleSnippet('Title'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).not.toHaveClass('border-l-[5px]');

			const heading = container.querySelector('h3');
			expect(heading).toHaveClass('text-base');
		});

		it('applies lg classes (left border, larger heading)', async () => {
			const { container } = render(Callout, {
				size: 'lg',
				title: titleSnippet('Title'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('border-l-[5px]');

			const heading = container.querySelector('h3');
			expect(heading).toHaveClass('text-xl');
		});
	});

	it('associates the title with the container via aria-labelledby', async () => {
		const { container } = render(Callout, {
			id: 'my-callout-title',
			title: titleSnippet('Title'),
			body: bodySnippet('Body')
		});

		const aside = container.querySelector('aside');
		expect(aside).toHaveAttribute('aria-labelledby', 'my-callout-title');

		const heading = container.querySelector('h3');
		expect(heading).toHaveAttribute('id', 'my-callout-title');
	});
});
