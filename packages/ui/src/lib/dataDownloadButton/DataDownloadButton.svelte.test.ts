import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import DataDownloadButton from './DataDownloadButton.svelte';

/**
 * `DataDownloadButton` triggers a download by:
 *   1. building a `data:` URL of the form `data:application/<csv|json>;base64,<...>`
 *   2. calling `document.createElement('a')`
 *   3. setting `href` / `download` / `target` attributes on that anchor
 *   4. calling `anchor.dispatchEvent(new MouseEvent('click'))` (NOT `anchor.click()`)
 *
 * Because a dispatched (untrusted) click event does not cause a real browser
 * navigation, we don't strictly need to neutralise it - but we still spy on
 * `dispatchEvent` so we can (a) capture the href/download that were set at the
 * moment the "download" was triggered, and (b) guarantee no navigation is ever
 * attempted inside the test browser.
 */

type CapturedDownload = {
	href: string;
	download: string;
};

let capturedDownloads: CapturedDownload[];

beforeEach(() => {
	capturedDownloads = [];

	const originalCreateElement = document.createElement.bind(document);

	vi.spyOn(document, 'createElement').mockImplementation(
		(tagName: string, options?: ElementCreationOptions) => {
			const element = originalCreateElement(tagName, options);

			if (tagName.toLowerCase() === 'a') {
				const anchor = element as HTMLAnchorElement;
				vi.spyOn(anchor, 'dispatchEvent').mockImplementation(() => {
					capturedDownloads.push({
						href: anchor.getAttribute('href') ?? '',
						download: anchor.getAttribute('download') ?? ''
					});
					return true;
				});
			}

			return element;
		}
	);
});

afterEach(() => {
	vi.restoreAllMocks();
});

const decodeDataUrl = (href: string): string => {
	const base64 = href.split(',')[1];
	return atob(base64);
};

const data = [
	{ A: 1, B: 2, C: 3 },
	{ A: 4, B: 5, C: 6 }
];

describe('DataDownloadButton', () => {
	describe('rendering one action per format', () => {
		it('renders a single button and no format-switcher when only CSV is offered', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['CSV'] });

			await expect
				.element(page.getByRole('button', { name: 'Download as CSV' }))
				.toBeInTheDocument();

			await expect
				.element(page.getByRole('button', { name: /Open popover/ }))
				.not.toBeInTheDocument();
		});

		it('renders a single button and no format-switcher when only JSON is offered', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['JSON'] });

			await expect
				.element(page.getByRole('button', { name: 'Download as JSON' }))
				.toBeInTheDocument();

			await expect
				.element(page.getByRole('button', { name: /Open popover/ }))
				.not.toBeInTheDocument();
		});

		it('offers both CSV and JSON in the format-switcher menu when both formats are provided', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['CSV', 'JSON'] });

			// CSV is listed first, so it is selected by default.
			await expect
				.element(page.getByRole('button', { name: 'Download as CSV' }))
				.toBeInTheDocument();

			const trigger = page.getByRole('button', {
				name: 'Open popover to Select data format'
			});
			await trigger.click();

			await expect.element(page.getByText('CSV', { exact: true })).toBeInTheDocument();
			await expect.element(page.getByText('JSON', { exact: true })).toBeInTheDocument();
		});
	});

	describe('triggering downloads', () => {
		it('clicking the CSV action downloads a file with a .csv extension', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['CSV'] });

			await page.getByRole('button', { name: 'Download as CSV' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('download.csv');
			expect(capturedDownloads[0].href).toMatch(/^data:application\/csv;base64,/);
		});

		it('clicking the JSON action downloads a file with a .json extension', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['JSON'] });

			await page.getByRole('button', { name: 'Download as JSON' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('download.json');
			expect(capturedDownloads[0].href).toMatch(/^data:application\/json;base64,/);
		});

		it('switching format via the menu and clicking downloads the newly-selected format', async () => {
			render(DataDownloadButton, { data, filename: 'download', formats: ['CSV', 'JSON'] });

			const trigger = page.getByRole('button', {
				name: 'Open popover to Select data format'
			});
			await trigger.click();
			await page.getByText('JSON', { exact: true }).click();

			await page.getByRole('button', { name: 'Download as JSON' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('download.json');
		});
	});

	describe('enforceExtension', () => {
		it('does not double-append the extension when the filename already ends with it', async () => {
			render(DataDownloadButton, { data, filename: 'report.csv', formats: ['CSV'] });

			await page.getByRole('button', { name: 'Download as CSV' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('report.csv');
		});

		it('is case-insensitive when checking the existing extension', async () => {
			render(DataDownloadButton, { data, filename: 'REPORT.CSV', formats: ['CSV'] });

			await page.getByRole('button', { name: 'Download as CSV' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('REPORT.CSV');
		});

		it('falls back to the filename "data" when none is provided', async () => {
			render(DataDownloadButton, {
				data,
				// `filename` is typed as required, but the implementation falls back to
				// 'data' for any falsy value (e.g. an empty string) at runtime.
				filename: '' as unknown as string,
				formats: ['CSV']
			});

			await page.getByRole('button', { name: 'Download as CSV' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(capturedDownloads[0].download).toBe('data.csv');
		});
	});

	describe('columnMapping', () => {
		it('renames mapped columns and drops unmapped ones in the generated JSON', async () => {
			render(DataDownloadButton, {
				data,
				filename: 'download',
				formats: ['JSON'],
				columnMapping: { A: 'foo', B: 'bar' }
			});

			await page.getByRole('button', { name: 'Download as JSON' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			const content = JSON.parse(decodeDataUrl(capturedDownloads[0].href));

			expect(content).toEqual([
				{ foo: 1, bar: 2 },
				{ foo: 4, bar: 5 }
			]);
		});

		it('renames mapped columns and drops unmapped ones in the generated CSV', async () => {
			render(DataDownloadButton, {
				data,
				filename: 'download',
				formats: ['CSV'],
				columnMapping: { A: 'foo', B: 'bar' }
			});

			await page.getByRole('button', { name: 'Download as CSV' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			const content = decodeDataUrl(capturedDownloads[0].href);

			expect(content).toBe('foo,bar\n1,2\n4,5');
		});
	});

	describe('dataFn', () => {
		it('is used in preference to the data prop', async () => {
			const dataFn = vi.fn(() => [{ A: 99 }]);

			render(DataDownloadButton, {
				data,
				dataFn,
				filename: 'download',
				formats: ['JSON']
			});

			await page.getByRole('button', { name: 'Download as JSON' }).click();

			await expect.poll(() => capturedDownloads.length).toBe(1);
			expect(dataFn).toHaveBeenCalled();
			const content = JSON.parse(decodeDataUrl(capturedDownloads[0].href));
			expect(content).toEqual([{ A: 99 }]);
		});

		it('awaits an async dataFn before triggering the download', async () => {
			const dataFn = vi.fn(async () => {
				await new Promise((resolve) => setTimeout(resolve, 20));
				return [{ A: 42 }];
			});

			render(DataDownloadButton, {
				dataFn,
				filename: 'download',
				formats: ['JSON']
			});

			await page.getByRole('button', { name: 'Download as JSON' }).click();

			// Nothing should be downloaded until the async dataFn resolves.
			expect(capturedDownloads.length).toBe(0);

			await expect.poll(() => capturedDownloads.length).toBe(1);
			const content = JSON.parse(decodeDataUrl(capturedDownloads[0].href));
			expect(content).toEqual([{ A: 42 }]);
		});
	});
});
