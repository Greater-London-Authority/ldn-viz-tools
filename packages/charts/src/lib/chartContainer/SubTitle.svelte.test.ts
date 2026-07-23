import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import SubTitle from './SubTitle.svelte';

describe('SubTitle', () => {
	it('renders children inside a text-color-text-muted wrapper', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Chart subtitle</span>',
			setup: () => {}
		}));

		const { container } = render(SubTitle, { children });

		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.className).toContain('text-color-text-muted');
		expect(wrapper.textContent).toBe('Chart subtitle');
	});

	it('renders an empty wrapper when no children are passed', async () => {
		const { container } = render(SubTitle, {});

		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.className).toContain('text-color-text-muted');
		expect(wrapper.textContent).toBe('');
	});
});
