import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { writable } from 'svelte/store';
import MapControlFullscreen from './MapControlFullscreen.svelte';

/**
 * Environment note (read before adding more cases here):
 *
 * `vitest-browser-svelte` runs every test file inside a real Chromium tab via
 * Playwright, and Vitest's browser mode always nests that tab's document inside
 * an orchestrator iframe. That means `window !== window.top` is permanently
 * true for *every* test in this harness (confirmed empirically), regardless of
 * anything a test does - `window.top`/`window.top.location` are also
 * browser-"unforgeable" own properties, so they cannot be reassigned or
 * shadowed via `Object.defineProperty`/`vi.stubGlobal` (both throw
 * `TypeError: Cannot redefine property`).
 *
 * Consequences for `MapControlFullscreen`:
 * - `isPageEmbedded()` (`window !== window.top`) always evaluates `true` here,
 *   so `isFullscreenAllowed()` is always `true` and `mode` is always resolved
 *   to `MODE_EMBED` in `onMount`, irrespective of `document.fullscreenEnabled`.
 *   This makes the `MODE_API` (toggle fullscreen) branch and the "renders
 *   nothing" branch (`!isPageEmbedded() && !document.fullscreenEnabled`)
 *   unreachable via genuine globals in this harness.
 * - Actually invoking `MODE_EMBED`'s click handler runs
 *   `window.top.location.href = window.location.href`, which for real (the
 *   two frames have different URLs here) navigates the orchestrator tab away
 *   from the test runner and kills the browser/WebSocket connection
 *   mid-run (verified experimentally: the whole `vitest run` process aborted
 *   with "[vitest] Browser connection was closed while running tests"). So the
 *   click cannot be exercised safely.
 *
 * As a result, only the reachable behaviour - that `onMount` resolves
 * `MODE_EMBED` and renders the corresponding button - is covered below. The
 * `MODE_API` toggle, the "renders nothing" case, and the `fullscreenchange`
 * reset (which only has an observable effect once `MODE_API`'s
 * `enterFullscreen`/`exitFullscreen` have set `isFullscreen` to `true`, which
 * never happens here) are not exercised; see the task write-up for this
 * caveat.
 */

describe('MapControlFullscreen', () => {
	const mapStoreContext = () =>
		new Map([['mapStore', writable({ getCanvas: vi.fn(() => ({ focus: vi.fn() })) })]]);

	test('resolves MODE_EMBED in onMount (window !== window.top in this harness) and renders its button', async () => {
		render(MapControlFullscreen, { context: mapStoreContext() });

		const button = page.getByRole('button', { name: 'View as full page' });
		await expect.element(button).toBeInTheDocument();
	});

	test('mode stays MODE_EMBED regardless of document.fullscreenEnabled, since embedding takes priority', async () => {
		const original = Object.getOwnPropertyDescriptor(document, 'fullscreenEnabled');
		Object.defineProperty(document, 'fullscreenEnabled', { value: false, configurable: true });

		try {
			render(MapControlFullscreen, { context: mapStoreContext() });

			const button = page.getByRole('button', { name: 'View as full page' });
			await expect.element(button).toBeInTheDocument();
		} finally {
			if (original) {
				Object.defineProperty(document, 'fullscreenEnabled', original);
			}
		}
	});
});
