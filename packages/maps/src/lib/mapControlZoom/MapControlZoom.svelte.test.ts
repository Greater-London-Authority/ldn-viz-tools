import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { writable } from 'svelte/store';
import MapControlZoom from './MapControlZoom.svelte';
import { ZOOM_ANIMATION_OPTIONS } from '../themes/animations';

describe('MapControlZoom', () => {
	function createMockMap() {
		return {
			zoomIn: vi.fn(),
			zoomOut: vi.fn(),
			getCanvas: vi.fn(() => ({ focus: vi.fn() }))
		};
	}

	test('clicking zoom in calls $mapStore.zoomIn with ZOOM_ANIMATION_OPTIONS', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlZoom, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Zoom in' });
		await button.click();

		expect(mockMap.zoomIn).toHaveBeenCalledWith(ZOOM_ANIMATION_OPTIONS);
	});

	test('clicking zoom out calls $mapStore.zoomOut with ZOOM_ANIMATION_OPTIONS', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlZoom, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Zoom out' });
		await button.click();

		expect(mockMap.zoomOut).toHaveBeenCalledWith(ZOOM_ANIMATION_OPTIONS);
	});

	test('buttons are inert (no map calls, no throw) when $mapStore is falsy', async () => {
		const mapStore = writable(null);
		render(MapControlZoom, { context: new Map([['mapStore', mapStore]]) });

		const zoomInButton = page.getByRole('button', { name: 'Zoom in' });
		const zoomOutButton = page.getByRole('button', { name: 'Zoom out' });

		await zoomInButton.click();
		await zoomOutButton.click();

		await expect.element(zoomInButton).toBeInTheDocument();
		await expect.element(zoomOutButton).toBeInTheDocument();
	});

	test('a non-keyboard click (event.detail > 0) refocuses $mapStore.getCanvas() afterwards', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlZoom, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Zoom in' });
		// A real Playwright click dispatches a native mouse event with detail: 1.
		await button.click();

		expect(mockMap.zoomIn).toHaveBeenCalledWith(ZOOM_ANIMATION_OPTIONS);
		expect(mockMap.getCanvas).toHaveBeenCalledTimes(1);
		const canvas = mockMap.getCanvas.mock.results[0].value;
		expect(canvas.focus).toHaveBeenCalledTimes(1);
	});

	test('a keyboard-triggered click (event.detail === 0) does not refocus the canvas', async () => {
		const mockMap = createMockMap();
		const mapStore = writable(mockMap);
		render(MapControlZoom, { context: new Map([['mapStore', mapStore]]) });

		const button = page.getByRole('button', { name: 'Zoom in' });
		button
			.element()
			.dispatchEvent(new MouseEvent('click', { detail: 0, bubbles: true, cancelable: true }));

		expect(mockMap.zoomIn).toHaveBeenCalledWith(ZOOM_ANIMATION_OPTIONS);
		expect(mockMap.getCanvas).not.toHaveBeenCalled();
	});
});
