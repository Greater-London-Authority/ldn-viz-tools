import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import DownloadButton from './DownloadButton.svelte';

type CapturedDownload = { href: string; download: string };

let capturedDownloads: CapturedDownload[];

// The download helpers click a generated <a>; capture its attributes instead of navigating.
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

const data = [
	{ A: 1, B: 2 },
	{ A: 3, B: 4 }
];

const makeNode = () => {
	const node = document.createElement('div');
	node.innerHTML = '<svg width="10" height="10"><rect width="10" height="10" /></svg>';
	document.body.appendChild(node);
	return node;
};

describe('DownloadButton', () => {
	it('lists the Data and Image groups when data and htmlNode are both set', async () => {
		render(DownloadButton, { data, htmlNode: makeNode() });

		await page.getByRole('button', { name: 'Download' }).click();

		await expect.element(page.getByText('Data', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Image', { exact: true })).toBeInTheDocument();
		for (const format of ['CSV', 'JSON', 'PNG', 'SVG']) {
			await expect.element(page.getByRole('menuitem', { name: format })).toBeInTheDocument();
		}
	});

	it('lists only the Data group when htmlNode is not set', async () => {
		render(DownloadButton, { data });

		await page.getByRole('button', { name: 'Download' }).click();

		await expect.element(page.getByText('Data', { exact: true })).toBeInTheDocument();
		await expect.element(page.getByText('Image', { exact: true })).not.toBeInTheDocument();
	});

	it('lists only the formats passed in dataFormats and imageFormats', async () => {
		render(DownloadButton, {
			data,
			htmlNode: makeNode(),
			dataFormats: ['JSON'],
			imageFormats: ['SVG']
		});

		await page.getByRole('button', { name: 'Download' }).click();

		await expect.element(page.getByRole('menuitem', { name: /JSON/ })).toBeInTheDocument();
		await expect.element(page.getByRole('menuitem', { name: /SVG/ })).toBeInTheDocument();
		await expect.element(page.getByRole('menuitem', { name: /CSV/ })).not.toBeInTheDocument();
		await expect.element(page.getByRole('menuitem', { name: /PNG/ })).not.toBeInTheDocument();
	});

	it('downloads a CSV file when CSV is chosen', async () => {
		render(DownloadButton, { data, filename: 'report' });

		await page.getByRole('button', { name: 'Download' }).click();
		await page.getByRole('menuitem', { name: /CSV/ }).click();

		await expect.poll(() => capturedDownloads.length).toBe(1);
		expect(capturedDownloads[0].download).toBe('report.csv');
		expect(capturedDownloads[0].href).toMatch(/^data:application\/csv;base64,/);
	});

	it('downloads an SVG file when SVG is chosen', async () => {
		render(DownloadButton, { htmlNode: makeNode(), filename: 'chart' });

		await page.getByRole('button', { name: 'Download' }).click();
		await page.getByRole('menuitem', { name: /SVG/ }).click();

		await expect.poll(() => capturedDownloads.length).toBe(1);
		expect(capturedDownloads[0].download).toBe('chart.svg');
		expect(capturedDownloads[0].href).toMatch(/^data:image\/svg\+xml/);
	});

	it('uses label as the accessible name of a compact button', async () => {
		render(DownloadButton, { data, compact: true, label: 'Download chart' });

		await expect.element(page.getByRole('button', { name: 'Download chart' })).toBeInTheDocument();
	});

	it('is disabled when there is nothing to download', async () => {
		render(DownloadButton, {});

		await expect.element(page.getByRole('button', { name: 'Download' })).toBeDisabled();
	});
});
