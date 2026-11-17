import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Well from './Well.svelte';

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

describe('Well Component', () => {
	it('renders title and body content', async () => {
		render(Well, {
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

		render(Well, {
			title: titleSnippet('The title!'),
			body: bodySnippet('The body!'),
			more
		});

		await expect.element(page.getByText('Extra detail')).toBeInTheDocument();
	});

	it('renders a visually-hidden ariaTitle heading when no title snippet is provided', async () => {
		render(Well, {
			ariaTitle: 'Learn about chart methodology',
			body: bodySnippet('The body!')
		});

		const heading = page.getByRole('heading', { level: 3 });
		await expect.element(heading).toHaveTextContent('Learn about chart methodology');
		await expect.element(heading).toHaveClass('sr-only');
	});

	describe('status variants', () => {
		it('applies neutral classes (default)', async () => {
			const { container } = render(Well, {
				title: titleSnippet('Neutral'),
				body: bodySnippet('Body')
			});

			expect(container.querySelector('aside')).toHaveClass('bg-color-surface-neutral-muted');
		});

		it('applies notice classes', async () => {
			const { container } = render(Well, {
				status: 'notice',
				title: titleSnippet('Notice'),
				body: bodySnippet('Body')
			});

			expect(container.querySelector('aside')).toHaveClass('bg-color-surface-accent-muted');
		});

		it('applies positive classes', async () => {
			const { container } = render(Well, {
				status: 'positive',
				title: titleSnippet('Positive'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-positive-muted');
		});

		it('applies caution classes', async () => {
			const { container } = render(Well, {
				status: 'caution',
				title: titleSnippet('Caution'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-caution-muted');
		});

		it('applies negative classes', async () => {
			const { container } = render(Well, {
				status: 'negative',
				title: titleSnippet('Negative'),
				body: bodySnippet('Body')
			});

			const aside = container.querySelector('aside');
			expect(aside).toHaveClass('bg-color-surface-negative-muted');
		});
	});

	describe('size variants', () => {
		it('draws no border at any size', async () => {
			for (const size of ['sm', 'md', 'lg'] as const) {
				const { container } = render(Well, {
					size,
					title: titleSnippet('Title'),
					body: bodySnippet('Body')
				});

				expect(container.querySelector('aside')?.className).not.toMatch(/\bborder/);
			}
		});

		it('sets the title and body roles for each size', async () => {
			for (const [size, titleRole, bodyRole] of [
				['sm', 'label-md', 'body-sm'],
				['md', 'title-sm', 'body-md'],
				['lg', 'title-md', 'body-lg']
			] as const) {
				const { container } = render(Well, {
					size,
					title: titleSnippet('Title'),
					body: bodySnippet('Body')
				});

				expect(container.querySelector('h3')).toHaveClass(titleRole);
				expect(container.querySelector('aside > div')).toHaveClass(bodyRole);
			}
		});
	});

	it('renders the title at headingLevel', async () => {
		const { container } = render(Well, {
			headingLevel: 2,
			title: titleSnippet('Title'),
			body: bodySnippet('Body')
		});

		expect(container.querySelector('h2')).toHaveTextContent('Title');
		expect(container.querySelector('h3')).toBeNull();
	});

	it('associates the title with the container via aria-labelledby', async () => {
		const { container } = render(Well, {
			id: 'my-Well-title',
			title: titleSnippet('Title'),
			body: bodySnippet('Body')
		});

		const aside = container.querySelector('aside');
		expect(aside).toHaveAttribute('aria-labelledby', 'my-Well-title');

		const heading = container.querySelector('h3');
		expect(heading).toHaveAttribute('id', 'my-Well-title');
	});
});
