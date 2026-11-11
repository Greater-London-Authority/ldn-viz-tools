import { describe, expect, it, vi } from 'vitest';

import {
	addEventHandler,
	addMultipleEventHandlers,
	registerTooltip
} from './ObservablePlotInner.svelte';

// `values.channels` mimics the shape Observable Plot passes to a custom render function:
// per-channel arrays indexed in parallel with the marks produced by `next`.
const makeValues = (x: number[], y: number[]) => ({
	channels: {
		x: { value: x },
		y: { value: y }
	}
});

const makeMarksContainer = (tagNames: string[]) => {
	const el = document.createElement('div');
	for (const tagName of tagNames) {
		el.appendChild(document.createElement(tagName));
	}
	return el;
};

describe('registerTooltip', () => {
	it('calls next with the render arguments and wires mouseenter/mouseleave on the default "circle" marks', async () => {
		const posStore = { set: vi.fn() };
		const el = makeMarksContainer(['circle', 'circle']);
		const next = vi.fn(() => el);
		const index = [100, 101];
		const values = makeValues([1, 2], [10, 20]);
		const scales = { x: {} };
		const dimensions = { width: 10 };
		const context = {};

		const renderFn = registerTooltip(posStore);
		const result = renderFn(index, scales, values, dimensions, context, next);

		expect(next).toHaveBeenCalledWith(index, scales, values, dimensions, context);
		expect(result).toBe(el);

		const [firstCircle, secondCircle] = el.querySelectorAll('circle');

		firstCircle.dispatchEvent(
			new MouseEvent('mouseenter', { clientX: 5, clientY: 6, bubbles: true })
		);

		expect(posStore.set).toHaveBeenCalledTimes(1);
		const posArg = posStore.set.mock.calls[0][0];
		expect(posArg).toMatchObject({ index: 100, x: 1, y: 10, clientX: 5, clientY: 6 });
		expect(posArg.x1).toBeUndefined();
		expect(posArg.cx).toBeUndefined();
		expect(typeof posArg.pageX).toBe('number');
		expect(typeof posArg.layerX).toBe('number');

		secondCircle.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
		expect(posStore.set).toHaveBeenLastCalledWith(undefined);
	});

	it('uses a custom markShape when supplied', async () => {
		const posStore = { set: vi.fn() };
		const el = makeMarksContainer(['rect']);
		const next = vi.fn(() => el);

		const renderFn = registerTooltip(posStore, 'rect');
		renderFn([0], {}, makeValues([1], [2]), {}, {}, next);

		const rect = el.querySelector('rect')!;
		rect.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
		expect(posStore.set).toHaveBeenCalledWith(expect.objectContaining({ index: 0, x: 1, y: 2 }));
	});

	it('returns null (not undefined) when next is not provided', async () => {
		const posStore = { set: vi.fn() };
		const renderFn = registerTooltip(posStore);

		const result = renderFn([0], {}, makeValues([1], [2]), {}, {}, undefined);

		expect(result).toBeNull();
		expect(posStore.set).not.toHaveBeenCalled();
	});

	it('does not throw when the produced element has zero matching marks', async () => {
		const posStore = { set: vi.fn() };
		const el = document.createElement('div'); // no <circle> children
		const next = vi.fn(() => el);
		const renderFn = registerTooltip(posStore);

		let result;
		expect(() => {
			result = renderFn([0], {}, makeValues([1], [2]), {}, {}, next);
		}).not.toThrow();

		expect(result).toBe(el);
	});
});

describe('addEventHandler', () => {
	it('attaches a single listener of the given event name to the default "circle" marks', async () => {
		const handler = vi.fn();
		const el = makeMarksContainer(['circle']);
		const next = vi.fn(() => el);

		const renderFn = addEventHandler('click', handler);
		renderFn([42], {}, makeValues([7], [8]), {}, {}, next);

		const circle = el.querySelector('circle')!;
		const clickEvent = new MouseEvent('click', { bubbles: true });
		circle.dispatchEvent(clickEvent);

		expect(handler).toHaveBeenCalledTimes(1);
		const [ev, d] = handler.mock.calls[0];
		expect(ev).toBe(clickEvent);
		expect(d).toMatchObject({ index: 42, x: 7, y: 8 });
	});

	it('uses a custom markShape when supplied', async () => {
		const handler = vi.fn();
		const el = makeMarksContainer(['rect']);
		const next = vi.fn(() => el);

		const renderFn = addEventHandler('click', handler, 'rect');
		renderFn([1], {}, makeValues([3], [4]), {}, {}, next);

		el.querySelector('rect')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(handler).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ index: 1 }));
	});
});

describe('addMultipleEventHandlers', () => {
	it('wires mouseenter/mousemove/mouseout for a "tooltip"-typed event using its own markShape', async () => {
		const store = { set: vi.fn() };
		const el = makeMarksContainer(['circle']);
		const next = vi.fn(() => el);

		const renderFn = addMultipleEventHandlers([{ type: 'tooltip', store, markShape: 'circle' }]);
		renderFn([5], {}, makeValues([1], [2]), {}, {}, next);

		const circle = el.querySelector('circle')!;

		circle.dispatchEvent(new MouseEvent('mouseenter', { clientX: 1, bubbles: true }));
		expect(store.set).toHaveBeenCalledWith(expect.objectContaining({ index: 5, clientX: 1 }));

		circle.dispatchEvent(new MouseEvent('mousemove', { clientX: 2, bubbles: true }));
		expect(store.set).toHaveBeenCalledWith(expect.objectContaining({ index: 5, clientX: 2 }));

		circle.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
		expect(store.set).toHaveBeenLastCalledWith(undefined);
	});

	it('dispatches any non-"tooltip" event type to a single addEventHandlerInner listener, defaulting markShape to "rect"', async () => {
		const handler = vi.fn();
		const el = makeMarksContainer(['rect', 'circle']);
		const next = vi.fn(() => el);

		// No markShape supplied for this event, unlike registerTooltip/addEventHandler which default to 'circle'.
		const renderFn = addMultipleEventHandlers([{ type: 'click', handler }]);
		renderFn([9], {}, makeValues([10], [20]), {}, {}, next);

		el.querySelector('circle')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(handler).not.toHaveBeenCalled();

		el.querySelector('rect')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		expect(handler).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ index: 9 }));
	});

	it('returns the element produced by next, or null when next is not provided', async () => {
		const el = makeMarksContainer(['rect']);
		const next = vi.fn(() => el);

		const withNext = addMultipleEventHandlers([{ type: 'click', handler: vi.fn() }]);
		expect(withNext([0], {}, makeValues([1], [1]), {}, {}, next)).toBe(el);

		const withoutNext = addMultipleEventHandlers([{ type: 'click', handler: vi.fn() }]);
		expect(withoutNext([0], {}, makeValues([1], [1]), {}, {}, undefined)).toBeNull();
	});
});
