import { afterEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { tabFocus } from './actions';

// `tabFocus` is a Svelte action, but it only ever touches the DOM directly
// (it reads `node.children`, calls `.focus()` on them, and adds a native
// `keydown` listener) so it is exercised here without mounting any Svelte
// component - just plain DOM nodes wired up the same way `TabList.svelte`
// wires up its tab `<button>`s.

const buildTabList = (ids: string[], orientation: 'horizontal' | 'vertical') => {
	const container = document.createElement('div');
	container.setAttribute('role', 'tablist');

	for (const id of ids) {
		const tab = document.createElement('button');
		tab.id = id;
		tab.textContent = id;
		tab.setAttribute('role', 'tab');
		container.appendChild(tab);
	}

	document.body.appendChild(container);

	const action = tabFocus(container, { orientation });

	return {
		container,
		tabs: Array.from(container.children) as HTMLElement[],
		destroy: () => {
			action.destroy();
			container.remove();
		}
	};
};

describe('tabFocus', () => {
	let cleanup: (() => void) | undefined;

	afterEach(() => {
		cleanup?.();
		cleanup = undefined;
	});

	describe('horizontal orientation', () => {
		it('ArrowRight moves focus to the next tab', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'horizontal');
			cleanup = destroy;

			tabs[0].focus();
			await expect.element(tabs[0]).toHaveFocus();

			await userEvent.keyboard('{ArrowRight}');
			await expect.element(tabs[1]).toHaveFocus();
		});

		it('ArrowLeft moves focus to the previous tab', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'horizontal');
			cleanup = destroy;

			tabs[2].focus();
			await expect.element(tabs[2]).toHaveFocus();

			await userEvent.keyboard('{ArrowLeft}');
			await expect.element(tabs[1]).toHaveFocus();
		});

		it('ArrowUp/ArrowDown have no effect', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'horizontal');
			cleanup = destroy;

			tabs[0].focus();
			await userEvent.keyboard('{ArrowDown}');
			await expect.element(tabs[0]).toHaveFocus();

			await userEvent.keyboard('{ArrowUp}');
			await expect.element(tabs[0]).toHaveFocus();
		});

		it('wraps focus from the last tab to the first on ArrowRight', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'horizontal');
			cleanup = destroy;

			tabs[2].focus();
			await expect.element(tabs[2]).toHaveFocus();

			await userEvent.keyboard('{ArrowRight}');
			await expect.element(tabs[0]).toHaveFocus();
		});

		it('wraps focus from the first tab to the last on ArrowLeft', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'horizontal');
			cleanup = destroy;

			tabs[0].focus();
			await userEvent.keyboard('{ArrowLeft}');
			await expect.element(tabs[2]).toHaveFocus();
		});
	});

	describe('vertical orientation', () => {
		it('ArrowDown moves focus to the next tab', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'vertical');
			cleanup = destroy;

			tabs[0].focus();
			await userEvent.keyboard('{ArrowDown}');
			await expect.element(tabs[1]).toHaveFocus();
		});

		it('ArrowUp moves focus to the previous tab', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'vertical');
			cleanup = destroy;

			tabs[2].focus();
			await userEvent.keyboard('{ArrowUp}');
			await expect.element(tabs[1]).toHaveFocus();
		});

		it('ArrowLeft/ArrowRight have no effect', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'vertical');
			cleanup = destroy;

			tabs[0].focus();
			await userEvent.keyboard('{ArrowRight}');
			await expect.element(tabs[0]).toHaveFocus();

			await userEvent.keyboard('{ArrowLeft}');
			await expect.element(tabs[0]).toHaveFocus();
		});

		it('wraps focus from the last tab to the first on ArrowDown', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'vertical');
			cleanup = destroy;

			tabs[2].focus();
			await userEvent.keyboard('{ArrowDown}');
			await expect.element(tabs[0]).toHaveFocus();
		});

		it('wraps focus from the first tab to the last on ArrowUp', async () => {
			const { tabs, destroy } = buildTabList(['a', 'b', 'c'], 'vertical');
			cleanup = destroy;

			tabs[0].focus();
			await userEvent.keyboard('{ArrowUp}');
			await expect.element(tabs[2]).toHaveFocus();
		});
	});

	it('removes its keydown listener on destroy', async () => {
		const { tabs, container, destroy } = buildTabList(['a', 'b'], 'horizontal');

		tabs[0].focus();
		destroy();

		// re-append so we can still assert focus behaviour after teardown
		document.body.appendChild(container);
		tabs[0].focus();
		await userEvent.keyboard('{ArrowRight}');
		await expect.element(tabs[0]).toHaveFocus();

		container.remove();
	});
});
