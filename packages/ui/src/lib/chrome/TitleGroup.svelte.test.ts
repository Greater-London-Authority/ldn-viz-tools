import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import TitleGroup from './TitleGroup.svelte';

describe('TitleGroup', () => {
	it('renders title, subtitle and eyebrow with their respective roles when emphasis is primary', async () => {
		const { container } = render(TitleGroup, {
			title: 'Chart title',
			subtitle: 'Chart subtitle',
			eyebrow: 'Eyebrow'
		});

		const title = container.querySelector('.title');
		expect(title?.textContent).toBe('Chart title');
		expect(title?.className).toContain('text-color-text');

		const subtitle = container.querySelector('.subtitle');
		expect(subtitle?.textContent).toBe('Chart subtitle');
		expect(subtitle?.className).toContain('text-color-text-muted');

		const eyebrow = container.querySelector('.eyebrow');
		expect(eyebrow?.textContent).toBe('Eyebrow');
		expect(eyebrow?.className).toContain('text-color-text-muted');
	});

	it('defaults to emphasis="primary"', async () => {
		const { container } = render(TitleGroup, { title: 'Chart title' });

		expect(container.querySelector('.title')).toBeTruthy();
	});

	it('omits eyebrow/title/subtitle elements that are not provided', async () => {
		const { container } = render(TitleGroup, { title: 'Only a title' });

		expect(container.querySelector('.title')).toBeTruthy();
		expect(container.querySelector('.subtitle')).toBeNull();
		expect(container.querySelector('.eyebrow')).toBeNull();
	});

	it('renders an empty wrapper when no title/subtitle/eyebrow are passed', async () => {
		const { container } = render(TitleGroup, {});

		expect(container.querySelector('.title')).toBeNull();
		expect(container.querySelector('.subtitle')).toBeNull();
		expect(container.querySelector('.eyebrow')).toBeNull();
	});

	it('renders embedded markup in title/subtitle/eyebrow as real elements, not escaped text', async () => {
		const { container } = render(TitleGroup, {
			title: 'Written by <a href="https://example.com">Jane Doe</a>'
		});

		const link = container.querySelector('a[href="https://example.com"]');
		expect(link).toBeTruthy();
		expect(link!.textContent).toBe('Jane Doe');
	});

	it('renders the title as an eyebrow, and ignores subtitle/eyebrow, when emphasis is secondary', async () => {
		const { container } = render(TitleGroup, {
			title: 'Chart title',
			subtitle: 'Chart subtitle',
			eyebrow: 'Eyebrow',
			emphasis: 'secondary'
		});

		expect(container.querySelector('.title')).toBeNull();
		expect(container.querySelector('.subtitle')).toBeNull();

		const eyebrow = container.querySelector('.eyebrow');
		expect(eyebrow?.textContent).toBe('Chart title');
	});

	it('renders nothing when emphasis is secondary and no title is provided', async () => {
		const { container } = render(TitleGroup, {
			subtitle: 'Chart subtitle',
			eyebrow: 'Eyebrow',
			emphasis: 'secondary'
		});

		expect(container.querySelector('.eyebrow')).toBeNull();
		expect(container.textContent).toBe('');
	});
});
