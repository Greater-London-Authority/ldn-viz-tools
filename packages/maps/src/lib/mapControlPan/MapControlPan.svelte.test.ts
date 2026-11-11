import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { writable } from 'svelte/store';
import MapControlPan from './MapControlPan.svelte';
import { FLY_ANIMATION_OPTIONS } from '../themes/animations';

describe('MapControlPan', () => {
	function createMockMap() {
		return {
			panBy: vi.fn(),
			getContainer: vi.fn(() => ({
				getBoundingClientRect: () => ({ width: 1000, height: 500 })
			})),
			getCanvas: vi.fn(() => ({ focus: vi.fn() }))
		};
	}

	test.each([
		['Pan left', [-140, 0]],
		['Pan right', [140, 0]],
		['Pan up', [0, -70]],
		['Pan down', [0, 70]]
	])(
		'clicking %s calls $mapStore.panBy with the derived vector and FLY_ANIMATION_OPTIONS',
		async (name, vector) => {
			const mockMap = createMockMap();
			const mapStore = writable(mockMap);
			render(MapControlPan, { context: new Map([['mapStore', mapStore]]) });

			const button = page.getByRole('button', { name });
			await button.click();

			expect(mockMap.panBy).toHaveBeenCalledWith(vector, FLY_ANIMATION_OPTIONS);
		}
	);

	test('buttons are inert (no map calls, no throw) when $mapStore is falsy', async () => {
		const mapStore = writable(null);
		render(MapControlPan, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Pan up' });
		await button.click();

		await expect.element(button).toBeInTheDocument();
	});

	test('a non-keyboard click (event.detail > 0) refocuses $mapStore.getCanvas() afterwards', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlPan, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Pan up' });
		// A real Playwright click dispatches a native mouse event with detail: 1.
		await button.click();

		expect(mockMap.panBy).toHaveBeenCalledWith([0, -70], FLY_ANIMATION_OPTIONS);
		expect(mockMap.getCanvas).toHaveBeenCalledTimes(1);
		const canvas = mockMap.getCanvas.mock.results[0].value;
		expect(canvas.focus).toHaveBeenCalledTimes(1);
	});

	test('a keyboard-triggered click (event.detail === 0) does not refocus the canvas', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlPan, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Pan up' });
		button
			.element()
			.dispatchEvent(new MouseEvent('click', { detail: 0, bubbles: true, cancelable: true }));

		expect(mockMap.panBy).toHaveBeenCalledWith([0, -70], FLY_ANIMATION_OPTIONS);
		expect(mockMap.getCanvas).not.toHaveBeenCalled();
	});
});
