import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import TestGroup from './testFixtures/TestGroup.svelte';
import Slat from './presets/Slat.svelte';

afterEach(() => localStorage.clear());

describe('Expandable', () => {
	it('renders content on first open and keeps it after closing (mount="first-open")', async () => {
		render(TestGroup, { mount: 'first-open' });

		expect(page.getByText('Body A').query()).toBeNull();

		await page.getByRole('button', { name: 'Item A' }).click();
		await expect.element(page.getByText('Body A')).toBeVisible();

		await page.getByRole('button', { name: 'Item A' }).click();
		await expect.element(page.getByText('Body A')).not.toBeVisible();
		expect(page.getByText('Body A').query()).not.toBeNull();
	});

	it('renders content before the first open (mount="always")', async () => {
		render(TestGroup, { mount: 'always' });

		expect(page.getByText('Body A').query()).not.toBeNull();
		await expect.element(page.getByText('Body A')).not.toBeVisible();
	});

	it('removes content after closing (mount="open")', async () => {
		render(TestGroup, { mount: 'open' });

		await page.getByRole('button', { name: 'Item A' }).click();
		await expect.element(page.getByText('Body A')).toBeVisible();

		await page.getByRole('button', { name: 'Item A' }).click();
		await expect.poll(() => page.getByText('Body A').query()).toBeNull();
	});

	it('keeps one item open with type="single"', async () => {
		render(TestGroup, { type: 'single' });

		await page.getByRole('button', { name: 'Item A' }).click();
		await page.getByRole('button', { name: 'Item B' }).click();

		await expect
			.element(page.getByRole('button', { name: 'Item A' }))
			.toHaveAttribute('aria-expanded', 'false');
		await expect
			.element(page.getByRole('button', { name: 'Item B' }))
			.toHaveAttribute('aria-expanded', 'true');
	});

	it('saves and restores the open items with persistKey', async () => {
		const first = render(TestGroup, { persistKey: 'test' });
		await page.getByRole('button', { name: 'Item B' }).click();
		await expect.poll(() => localStorage.getItem('ldn-viz-expandable:test')).toBe('["b"]');
		first.unmount();

		render(TestGroup, { persistKey: 'test' });
		await expect
			.element(page.getByRole('button', { name: 'Item B' }))
			.toHaveAttribute('aria-expanded', 'true');
	});

	it('opens every item with the default controls', async () => {
		render(TestGroup, { controls: true });

		await page.getByRole('button', { name: 'Expand all' }).click();

		await expect
			.element(page.getByRole('button', { name: 'Item A' }))
			.toHaveAttribute('aria-expanded', 'true');
		await expect
			.element(page.getByRole('button', { name: 'Item B' }))
			.toHaveAttribute('aria-expanded', 'true');
	});
});

describe('Slat', () => {
	it('renders a static row with no toggle when it has no children', async () => {
		render(Slat, { title: 'Static slat' });

		await expect.element(page.getByText('Static slat')).toBeVisible();
		expect(page.getByRole('button').query()).toBeNull();
	});

	it('names the icon toggle after the title', async () => {
		render(TestGroup, { slat: true });

		await expect
			.element(page.getByRole('button', { name: 'Details for Camden' }))
			.toHaveAttribute('aria-expanded', 'false');
	});
});
