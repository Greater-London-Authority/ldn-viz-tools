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

describe('ExportButtons (separate)', () => {
	it('renders the data download button when dataDownloadButton is truthy and dataForDownload is defined', async () => {
		const { container } = render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: true,
			imageDownload: false
		});

		expect(container.textContent).toContain('Download as CSV');
	});

	it('hides the data download button when dataForDownload is undefined, even if dataDownloadButton is truthy', async () => {
		const { container } = render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: true,
			imageDownload: false
		});

		expect(container.textContent).not.toContain('Download as');
	});

	it('passes formats={["CSV", "JSON"]} to DataDownloadButton when dataDownloadButton === true', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: true,
			imageDownload: false
		});

		await expect.element(page.getByRole('button', { name: 'Download as CSV' })).toBeInTheDocument();
		await expect
			.element(page.getByRole('button', { name: 'Open popover to Select data format' }))
			.toBeInTheDocument();
	});

	it('passes a custom formats array to DataDownloadButton unchanged', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: ['CSV'],
			imageDownload: false
		});

		await expect.element(page.getByRole('button', { name: 'Download as CSV' })).toBeInTheDocument();
		await expect(
			page.getByRole('button', { name: 'Open popover to Select data format' }).query()
		).toBeNull();
	});

	it('renders the image download button unconditionally, regardless of dataForDownload', async () => {
		const { container } = render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: false,
			imageDownload: true
		});

		expect(container.textContent).toContain('Download as PNG');
	});

	it('passes formats={["PNG", "SVG"]} to ImageDownloadButton when imageDownload === true', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: false,
			imageDownload: true
		});

		await expect.element(page.getByRole('button', { name: 'Download as PNG' })).toBeInTheDocument();
		await expect
			.element(page.getByRole('button', { name: 'Open popover to Select image format' }))
			.toBeInTheDocument();
	});

	it('passes a custom formats array to ImageDownload unchanged', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: false,
			imageDownload: ['PNG']
		});

		await expect.element(page.getByRole('button', { name: 'Download as PNG' })).toBeInTheDocument();
		await expect(
			page.getByRole('button', { name: 'Open popover to Select image format' }).query()
		).toBeNull();
	});

	it('hides the image download button when imageDownload === false', async () => {
		const { container } = render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: false,
			imageDownload: false
		});

		expect(container.textContent).not.toContain('Download as');
	});

	it('forwards filename to DataDownload unchanged', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: ['CSV'],
			imageDownload: false,
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

	it('forwards columnMapping to DataDownload unchanged', async () => {
		render(ExportButtons, {
			variant: 'separate',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: ['CSV'],
			imageDownload: false,
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

describe('ExportButtons (compact and standard)', () => {
	it('renders one Download button with a text label by default', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: true,
			imageDownload: true
		});

		const button = page.getByRole('button', { name: 'Download' });
		await expect.element(button).toBeInTheDocument();
		expect(button.element().textContent?.trim()).toBe('Download');
		expect(page.getByRole('button', { name: /Download as/ }).query()).toBeNull();
	});

	it('renders an icon-only Download button when variant is compact', async () => {
		render(ExportButtons, {
			variant: 'compact',
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: true,
			imageDownload: true
		});

		const button = page.getByRole('button', { name: 'Download' });
		await expect.element(button).toBeInTheDocument();
		expect(button.element().textContent?.trim()).toBe('');
	});

	it('lists the formats passed in dataDownload and imageDownload', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: ['CSV'],
			imageDownload: ['PNG']
		});

		await page.getByRole('button', { name: 'Download' }).click();

		await expect.element(page.getByRole('menuitem', { name: /CSV/ })).toBeInTheDocument();
		await expect.element(page.getByRole('menuitem', { name: /PNG/ })).toBeInTheDocument();
		expect(page.getByRole('menuitem', { name: /JSON/ }).query()).toBeNull();
		expect(page.getByRole('menuitem', { name: /SVG/ }).query()).toBeNull();
	});

	it('leaves out the data group when dataForDownload is undefined', async () => {
		render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: undefined,
			dataDownload: true,
			imageDownload: true
		});

		await page.getByRole('button', { name: 'Download' }).click();

		await expect.element(page.getByRole('menuitem', { name: /PNG/ })).toBeInTheDocument();
		expect(page.getByRole('menuitem', { name: /CSV/ }).query()).toBeNull();
	});

	it('renders nothing when no format is offered', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: false,
			imageDownload: false
		});

		expect(container.querySelector('button')).toBeNull();
	});

	it('marks the controls with data-capture-ignore', async () => {
		const { container } = render(ExportButtons, {
			elementToCapture: document.createElement('div'),
			dataForDownload: demoData,
			dataDownload: true,
			imageDownload: true
		});

		expect(container.querySelector('[data-capture-ignore] button')).not.toBeNull();
	});
});
