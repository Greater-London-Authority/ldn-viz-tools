import * as ObservablePlot from '@observablehq/plot';
import { createRawSnippet } from 'svelte';
import { writable } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';

import ObservablePlotInner from './ObservablePlotInner.svelte';
import ObservablePlotInnerHarness from './ObservablePlotInnerHarness.test.svelte';

const data = [
	{ x: 1, y: 2 },
	{ x: 2, y: 4 }
];

const makeSpec = () => ({ marks: [ObservablePlot.dot(data, { x: 'x', y: 'y' })] });

describe('ObservablePlotInner', () => {
	it('renders an svg inside the container div, with the container id set from the id prop', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'my-plot'
		});

		const containerDiv = container.querySelector('#my-plot') as HTMLElement;
		expect(containerDiv).toBeTruthy();
		expect(containerDiv.querySelector('svg')).toBeTruthy();
	});

	it('defaults ariaHidden to true on the container div', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'aria-default'
		});

		expect(container.querySelector('#aria-default')?.getAttribute('aria-hidden')).toBe('true');
	});

	it('reflects the ariaHidden prop on the container div', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'aria-false',
			ariaHidden: false
		});

		expect(container.querySelector('#aria-false')?.getAttribute('aria-hidden')).toBe('false');
	});

	it('reflects ariaDescribedBy as aria-describedby on the container div', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'aria-described',
			ariaDescribedBy: 'aria-described-description'
		});

		expect(container.querySelector('#aria-described')?.getAttribute('aria-describedby')).toBe(
			'aria-described-description'
		);
	});

	it('applies themed default styling to the svg when applyDefaults is true (the default)', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'defaults-true'
		});

		const style = container.querySelector('svg')?.getAttribute('style') ?? '';
		expect(style).toContain('font-family');
		expect(style).toContain('background');
	});

	it('skips themed default styling when applyDefaults is false, using ObservablePlot.plot directly', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'defaults-false',
			applyDefaults: false
		});

		expect(container.querySelector('svg')?.getAttribute('style')).toBeNull();
	});

	it('renders the default JSON tooltip when tooltipStore has a valid data index and no tooltip snippet is supplied', async () => {
		const tooltipStore = writable<any>({
			index: 0,
			layerX: 100,
			layerY: 50
		});

		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'tooltip-default',
			tooltipStore
		});

		const pre = container.querySelector('pre');
		expect(pre).toBeTruthy();
		expect(pre!.textContent).toBe(JSON.stringify(data[0], null, 2));
	});

	it('renders a custom tooltip snippet instead of the default JSON fallback when one is supplied', async () => {
		const tooltipStore = writable<any>({
			index: 0,
			layerX: 100,
			layerY: 50
		});
		const tooltip = createRawSnippet(() => ({
			render: () => '<div>CUSTOM_TOOLTIP</div>',
			setup: () => {}
		}));

		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'tooltip-custom',
			tooltipStore,
			tooltip
		});

		expect(container.querySelector('pre')).toBeNull();
		expect(container.textContent).toContain('CUSTOM_TOOLTIP');
	});

	it('hides the tooltip entirely when tooltipStore is (or becomes) undefined', async () => {
		const tooltipStore = writable<any>(undefined);

		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'tooltip-hidden',
			tooltipStore
		});

		expect(container.querySelector('pre')).toBeNull();

		tooltipStore.set({ index: 0, layerX: 100, layerY: 50 });
		await expect.poll(() => container.querySelector('pre')).not.toBeNull();

		tooltipStore.set(undefined);
		await expect.poll(() => container.querySelector('pre')).toBeNull();
	});

	it('positions the tooltip using layerY + tooltipOffset (top) and layerX (left)', async () => {
		const tooltipStore = writable<any>({
			index: 0,
			layerX: 120,
			layerY: 80
		});

		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'tooltip-position',
			tooltipStore,
			tooltipOffset: -16
		});

		const tooltipEl = container.querySelector('pre')?.parentElement as HTMLElement;
		expect(tooltipEl.style.top).toBe('64px'); // 80 + (-16)
		expect(tooltipEl.style.left).toBe('120px');
	});

	it('recomputes the tooltip top position when a custom tooltipOffset is supplied', async () => {
		const tooltipStore = writable<any>({
			index: 0,
			layerX: 120,
			layerY: 80
		});

		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'tooltip-custom-offset',
			tooltipStore,
			tooltipOffset: 10
		});

		const tooltipEl = container.querySelector('pre')?.parentElement as HTMLElement;
		expect(tooltipEl.style.top).toBe('90px'); // 80 + 10
	});

	it('renders the plot at the container clientWidth on mount, without mutating spec', async () => {
		const spec = makeSpec();

		const { container } = render(ObservablePlotInner, {
			spec,
			data,
			id: 'resize-initial'
		});

		await expect
			.poll(() => {
				const containerDiv = container.querySelector('#resize-initial') as HTMLElement;
				return containerDiv.querySelector('svg')?.getAttribute('width');
			})
			.toBe(String((container.querySelector('#resize-initial') as HTMLElement).clientWidth));
		expect((spec as { width?: number }).width).toBeUndefined();
	});

	it('re-renders the plot at the new width when the container is resized', async () => {
		const { container } = render(ObservablePlotInner, {
			spec: makeSpec(),
			data,
			id: 'resize-diff'
		});

		const svgWidth = () =>
			container.querySelector('#resize-diff svg')?.getAttribute('width');
		const divWidth = () =>
			String((container.querySelector('#resize-diff') as HTMLElement).clientWidth);

		await expect.poll(svgWidth).toBe(divWidth());

		container.style.width = '300px';

		await expect.poll(svgWidth).toBe('300');
	});

	it('remounts with fresh DOM nodes when a new spec object is passed, even if content is equivalent', async () => {
		const spec1 = makeSpec();

		const { container, rerender } = render(ObservablePlotInner, {
			spec: spec1,
			data,
			id: 'remount-test'
		});

		const divBefore = container.querySelector('#remount-test');
		expect(divBefore).toBeTruthy();

		const spec2 = makeSpec();
		await rerender({ spec: spec2 });

		const divAfter = container.querySelector('#remount-test');
		expect(divAfter).toBeTruthy();
		expect(divAfter).not.toBe(divBefore);
	});

	it('does not remount when the parent passes the same spec object again', async () => {
		const spec = makeSpec();

		const { container, rerender } = render(ObservablePlotInnerHarness, {
			spec,
			data,
			id: 'no-remount-test'
		});

		// Wait for the initial width measurement, which remounts the div once.
		await expect
			.poll(() => container.querySelector('#no-remount-test svg')?.getAttribute('width'))
			.toBe(String((container.querySelector('#no-remount-test') as HTMLElement).clientWidth));

		const divBefore = container.querySelector('#no-remount-test');
		await rerender({ spec, ariaHidden: false });

		const divAfter = container.querySelector('#no-remount-test');
		expect(divAfter?.getAttribute('aria-hidden')).toBe('false');
		expect(divAfter).toBe(divBefore);
	});
});
