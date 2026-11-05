import { createRawSnippet } from 'svelte';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import ChartContainer from './ChartContainer.svelte';

describe('ChartContainer', () => {
	it('should render title when provided', async () => {
		const { container } = render(ChartContainer, {
			props: { title: 'Test Chart' }
		});

		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('Test Chart');
	});

	it('should render subtitle when provided', async () => {
		const { container } = render(ChartContainer, {
			props: { title: 'Chart', subtitle: 'Subtitle' }
		});

		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('Subtitle');
	});

	it('should render source when provided', async () => {
		const { container } = render(ChartContainer, {
			props: { source: 'Some data source' }
		});
		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('Some data source');
	});

	it('should render byline when provided', async () => {
		const { container } = render(ChartContainer, {
			props: { byline: 'A byline' }
		});

		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('A byline');
	});

	it('should set alt-test', async () => {
		const { container } = render(ChartContainer, {
			props: { alt: 'Alt-text for the chart....' }
		});

		const altElement = container.querySelector('.sr-only');
		expect(altElement).toBeTruthy();
		expect(altElement.textContent).toContain('Alt-text for the chart....');
	});

	it('should show export buttons when showExport is true', async () => {
		const { container } = render(ChartContainer, {
			props: { imageDownloadButton: true }
		});

		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('Download as');
	});

	it('should hide export buttons when showExport is false', async () => {
		const { container } = render(ChartContainer, {
			props: { imageDownloadButton: false }
		});

		const captureElement = container.querySelector('#captureElement');
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).not.toContain('Download as');
	});

	it('should render note when provided', async () => {
		const { container } = render(ChartContainer, {
			props: { note: 'A footnote' }
		});

		const captureElement = container.querySelector('#captureElement') as HTMLElement;
		expect(captureElement).toBeTruthy();
		expect(captureElement.textContent).toContain('A footnote');
	});

	it('should render the "View description" trigger and show description inside the Modal when opened', async () => {
		render(ChartContainer, {
			props: { description: 'This chart shows monthly values over time.' }
		});

		await expect
			.element(page.getByRole('button', { name: 'View description' }))
			.toBeInTheDocument();

		await page.getByRole('button', { name: 'View description' }).click();

		await expect
			.element(
				page
					.getByRole('dialog', { name: 'Description' })
					.getByText('This chart shows monthly values over time.')
			)
			.toBeInTheDocument();
	});

	it('should omit the Footer entirely when source/byline/note/description/download buttons are all falsy', async () => {
		const { container } = render(ChartContainer, {
			props: {
				source: '',
				byline: '',
				note: '',
				description: '',
				dataDownloadButton: false,
				imageDownloadButton: false
			}
		});

		const captureElement = container.querySelector('#captureElement') as HTMLElement;
		expect(captureElement).toBeTruthy();
		expect(captureElement.querySelector('ul')).toBeNull();
		expect(captureElement.textContent).not.toContain('Download as');
		expect(captureElement.textContent).not.toContain('View description');
	});

	it('should use "contents"/no "min-w-0" classes when alignMultiple is false, and toggle them when true', async () => {
		const { container: withoutAlign } = render(ChartContainer, {
			props: { alignMultiple: false }
		});
		const outerWithoutAlign = withoutAlign.querySelector('#captureElement') as HTMLElement;
		expect(outerWithoutAlign.className).toContain('flex flex-col');
		expect(outerWithoutAlign.className).not.toContain('contents');

		const chartDivWithoutAlign = outerWithoutAlign.querySelector('.relative') as HTMLElement;
		expect(chartDivWithoutAlign.className).not.toContain('min-w-0');

		const { container: withAlign } = render(ChartContainer, {
			props: { alignMultiple: true }
		});
		const outerWithAlign = withAlign.querySelector('#captureElement') as HTMLElement;
		expect(outerWithAlign.className).toContain('contents');
		expect(outerWithAlign.className).not.toContain('flex flex-col');

		const chartDivWithAlign = outerWithAlign.querySelector('.relative') as HTMLElement;
		expect(chartDivWithAlign.className).toContain('min-w-0');
	});

	it('should reflect chartWidth/chartHeight/overrideClass in the rendered class lists', async () => {
		const { container } = render(ChartContainer, {
			props: {
				chartWidth: 'w-1/2',
				chartHeight: 'h-40',
				overrideClass: 'my-override-class'
			}
		});

		const outer = container.querySelector('#captureElement') as HTMLElement;
		expect(outer.className).toContain('w-1/2');

		const chartDiv = outer.querySelector('.relative') as HTMLElement;
		expect(chartDiv.className).toContain('h-40');
		expect(chartDiv.className).toContain('my-override-class');
	});

	it('should apply a custom id to the outer container div, and default to "captureElement"', async () => {
		const { container: withDefault } = render(ChartContainer, { props: {} });
		expect(withDefault.querySelector('#captureElement')).toBeTruthy();

		const { container: withCustomId } = render(ChartContainer, {
			props: { id: 'my-custom-chart-id' }
		});
		expect(withCustomId.querySelector('#my-custom-chart-id')).toBeTruthy();
		expect(withCustomId.querySelector('#captureElement')).toBeNull();
	});

	it('should render controls before legend, and legend before the chart body', async () => {
		const controls = createRawSnippet(() => ({
			render: () => '<div>CONTROLS_MARKER</div>',
			setup: () => {}
		}));
		const legend = createRawSnippet(() => ({
			render: () => '<div>LEGEND_MARKER</div>',
			setup: () => {}
		}));
		const children = createRawSnippet(() => ({
			render: () => '<div>CHILDREN_MARKER</div>',
			setup: () => {}
		}));

		const { container } = render(ChartContainer, {
			props: { controls, legend, children }
		});

		const html = container.innerHTML;
		const controlsIndex = html.indexOf('CONTROLS_MARKER');
		const legendIndex = html.indexOf('LEGEND_MARKER');
		const childrenIndex = html.indexOf('CHILDREN_MARKER');

		expect(controlsIndex).toBeGreaterThan(-1);
		expect(legendIndex).toBeGreaterThan(-1);
		expect(childrenIndex).toBeGreaterThan(-1);
		expect(controlsIndex).toBeLessThan(legendIndex);
		expect(legendIndex).toBeLessThan(childrenIndex);
	});
});
