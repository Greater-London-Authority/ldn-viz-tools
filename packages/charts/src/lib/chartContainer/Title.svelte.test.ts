import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import Title from './Title.svelte';

describe('Title', () => {
	it('renders children inside a text-xl font-bold wrapper', async () => {
		const children = createRawSnippet(() => ({
			render: () => '<span>Chart title</span>',
			setup: () => {}
		}));

		const { container } = render(Title, { children });

		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.className).toContain('text-xl');
		expect(wrapper.className).toContain('font-bold');
		expect(wrapper.textContent).toBe('Chart title');
	});

	it('renders an empty wrapper when no children are passed', async () => {
		const { container } = render(Title, {});

		const wrapper = container.firstElementChild as HTMLElement;
		expect(wrapper.className).toContain('text-xl');
		expect(wrapper.textContent).toBe('');
	});
});
