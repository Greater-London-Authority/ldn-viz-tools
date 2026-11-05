import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import ExportButtons from './ExportButtons.svelte';

const demoData = [
	{ Month: '2015-01-01', Value: 53623.9 },
	{ Month: '2015-02-01', Value: 61816.0 }
];

// Decode a `data:application/csv;base64,...` or `data:application/json;base64,...` URL.
const decodeDataUrl = (dataUrl: string) => window.atob(dataUrl.split(',')[1]);

describe('ExportButtons', () => {
	it('renders the data download button when dataDownloadButton is truthy and dataForDownload is defined', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownloadButton: true,
			imageDownloadButton: false
		});

		expect(container.textContent).toContain('Download as CSV');
	});

	it('hides the data download button when dataForDownload is undefined, even if dataDownloadButton is truthy', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownloadButton: true,
			imageDownloadButton: false
		});

		expect(container.textContent).not.toContain('Download as');
	});

	it('passes formats={["CSV", "JSON"]} to DataDownloadButton when dataDownloadButton === true', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownloadButton: true,
			imageDownloadButton: false
		});

		await expect.element(page.getByRole('button', { name: 'Download as CSV' })).toBeInTheDocument();
		await expect
			.element(page.getByRole('button', { name: 'Open popover to Select data format' }))
			.toBeInTheDocument();
	});

	it('passes a custom formats array to DataDownloadButton unchanged', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownloadButton: ['CSV'],
			imageDownloadButton: false
		});

		await expect.element(page.getByRole('button', { name: 'Download as CSV' })).toBeInTheDocument();
		await expect(
			page.getByRole('button', { name: 'Open popover to Select data format' }).query()
		).toBeNull();
	});

	it('renders the image download button unconditionally, regardless of dataForDownload', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownloadButton: false,
			imageDownloadButton: true
		});

		expect(container.textContent).toContain('Download as PNG');
	});

	it('passes formats={["PNG", "SVG"]} to ImageDownloadButton when imageDownloadButton === true', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownloadButton: false,
			imageDownloadButton: true
		});

		await expect.element(page.getByRole('button', { name: 'Download as PNG' })).toBeInTheDocument();
		await expect
			.element(page.getByRole('button', { name: 'Open popover to Select image format' }))
			.toBeInTheDocument();
	});

	it('passes a custom formats array to ImageDownloadButton unchanged', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownloadButton: false,
			imageDownloadButton: ['PNG']
		});

		await expect.element(page.getByRole('button', { name: 'Download as PNG' })).toBeInTheDocument();
		await expect(
			page.getByRole('button', { name: 'Open popover to Select image format' }).query()
		).toBeNull();
	});

	it('hides the image download button when imageDownloadButton === false', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownloadButton: false,
			imageDownloadButton: false
		});

		expect(container.textContent).not.toContain('Download as');
	});

	it('forwards filename to DataDownloadButton unchanged', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownloadButton: ['CSV'],
			imageDownloadButton: false,
			filename: 'my-chart-export'
		});

		const anchors: HTMLAnchorElement[] = [];
		const originalCreateElement = document.createElement.bind(document);
		const spy = (tagName: string) => {
			const el = originalCreateElement(tagName);
			if (tagName === 'a') anchors.push(el as HTMLAnchorElement);
			return el;
		};
		document.createElement = spy as typeof document.createElement;

		try {
			await page.getByRole('button', { name: 'Download as CSV' }).click();
			await expect.poll(() => anchors.length).toBeGreaterThan(0);
		} finally {
			document.createElement = originalCreateElement;
		}

		expect(anchors[0].getAttribute('download')).toBe('my-chart-export.csv');
	});

	it('forwards columnMapping to DataDownloadButton unchanged', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownloadButton: ['CSV'],
			imageDownloadButton: false,
			columnMapping: { Month: 'Date', Value: 'Amount' }
		});

		const anchors: HTMLAnchorElement[] = [];
		const originalCreateElement = document.createElement.bind(document);
		const spy = (tagName: string) => {
			const el = originalCreateElement(tagName);
			if (tagName === 'a') anchors.push(el as HTMLAnchorElement);
			return el;
		};
		document.createElement = spy as typeof document.createElement;

		try {
			await page.getByRole('button', { name: 'Download as CSV' }).click();
			await expect.poll(() => anchors.length).toBeGreaterThan(0);
		} finally {
			document.createElement = originalCreateElement;
		}

		const csvContent = decodeDataUrl(anchors[0].getAttribute('href')!);
		expect(csvContent.split('\n')[0]).toBe('Date,Amount');
	});
});
