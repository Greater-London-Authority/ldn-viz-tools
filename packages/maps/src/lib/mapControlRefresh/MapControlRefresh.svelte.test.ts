import { describe, test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, cdp } from '@vitest/browser/context';
import MapControlRefresh from './MapControlRefresh.svelte';

describe('MapControlRefresh', () => {
	// `window.location` and its `reload` method are "Unforgeable" per the HTML
	// spec: in a real Chromium instance (unlike jsdom) their property
	// descriptors are non-configurable/non-writable, so neither
	// `vi.spyOn(window.location, 'reload')` nor
	// `Object.defineProperty(window, 'location', ...)` can replace them - both
	// throw `TypeError: Cannot redefine property`. Letting the real reload()
	// go ahead also isn't an option: it actually reloads the browser tab
	// hosting this test, which vitest-browser detects and fails the run with
	// "The iframe ... was reloaded during a test".
	//
	// Instead, we use the Playwright CDP session (exposed by vitest-browser
	// via `cdp()`) to intercept the network request the reload triggers and
	// abort it before the navigation commits. Seeing that a same-page
	// "Document" request was fired is proof `window.location.reload()` was
	// called, and aborting it keeps the test page alive.
	test('clicking the button calls window.location.reload()', async () => {
		const session = cdp();
		let reloadRequestSeen = false;

		await session.send('Fetch.enable', {
			patterns: [{ urlPattern: '*', requestStage: 'Request' }]
		});

		const onRequestPaused = async (event: { requestId: string; resourceType: string }) => {
			if (event.resourceType === 'Document') {
				reloadRequestSeen = true;
				await session.send('Fetch.failRequest', {
					requestId: event.requestId,
					errorReason: 'Aborted'
				});
			} else {
				await session.send('Fetch.continueRequest', { requestId: event.requestId });
			}
		};

		session.on('Fetch.requestPaused', onRequestPaused);

		try {
			render(MapControlRefresh);

			const button = page.getByRole('button', { name: 'Refresh page' });
			await button.click();

			await expect.poll(() => reloadRequestSeen).toBe(true);
		} finally {
			session.off('Fetch.requestPaused', onRequestPaused);
			await session.send('Fetch.disable');
		}
	});
});
