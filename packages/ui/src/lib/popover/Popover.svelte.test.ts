import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Popover from './Popover.svelte';

// Popover.svelte is a thin wrapper around bits-ui's `Popover` primitive
// (Root/Trigger/Content), with the default trigger provided by
// `../overlay/Trigger.svelte`. Its runtime behaviour - click to open,
// escape/outside-click/close-button to dismiss, and the
// `aria-haspopup`/`aria-expanded`/`aria-controls` wiring - comes from
// bits-ui rather than bespoke logic in this component, so these tests
// assert on that behaviour as exposed through the rendered DOM.
//
// Note: `Popover.Trigger`'s `openOnHover` option defaults to `false` and
// Popover.svelte does not turn it on, so (unlike Tooltip) this popover only
// opens via click (or Enter/Space), never on hover.

function makeSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));
}

describe('Popover', () => {
	it('renders the default trigger and keeps the content out of the DOM until opened', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		await expect
			.element(page.getByRole('button', { name: 'Click for popover' }))
			.toBeInTheDocument();
		await expect.element(page.getByText('The contents of the popover...')).not.toBeInTheDocument();
	});

	it('has aria-haspopup="dialog" and aria-expanded="false" on the trigger by default', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		const trigger = page.getByRole('button', { name: 'Click for popover' });
		await expect.element(trigger).toHaveAttribute('aria-haspopup', 'dialog');
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	it('does not open when the trigger is only hovered', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		const trigger = page.getByRole('button', { name: 'Click for popover' });
		await userEvent.hover(trigger);

		await expect.element(page.getByText('The contents of the popover...')).not.toBeInTheDocument();
	});

	it('opens when the trigger is clicked, updating aria-expanded', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		const trigger = page.getByRole('button', { name: 'Click for popover' });
		await trigger.click();

		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
	});

	// NOTE: bits-ui's `PopoverTriggerState` derives `aria-controls` from its
	// internal `contentNode` ref (see `getAriaControls()` in
	// bits-ui/dist/bits/popover/popover.svelte.js), which is meant to be set to
	// the id of the rendered content. In practice, with the installed bits-ui
	// version (2.18.0) the id ends up only on the outer floating-position
	// wrapper (`[data-bits-floating-content-wrapper]`), not on the
	// `[data-popover-content]` element itself, and the trigger's `aria-controls`
	// attribute is never populated in this real-browser test environment even
	// once the popover is open and `aria-expanded="true"`. This looks like a
	// real gap in bits-ui's ref wiring rather than a quirk of the test setup,
	// so it's documented here rather than asserted as working.
	it('does not set aria-controls on the trigger even while open (documents a bits-ui limitation)', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		const trigger = page.getByRole('button', { name: 'Click for popover' });
		await expect.element(trigger).not.toHaveAttribute('aria-controls');

		await trigger.click();
		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();

		await expect.element(trigger).not.toHaveAttribute('aria-controls');
	});

	it('closes when the trigger is clicked again', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		const trigger = page.getByRole('button', { name: 'Click for popover' });
		await trigger.click();
		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();

		await trigger.click();
		// A generous timeout: the popover's close transition/presence teardown
		// can occasionally take a while to settle in this test environment.
		await expect
			.element(page.getByText('The contents of the popover...'), { timeout: 20000 })
			.not.toBeInTheDocument();
	});

	it('closes when the close button is clicked', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		await page.getByRole('button', { name: 'Click for popover' }).click();
		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();

		await page.getByRole('button', { name: 'Close' }).click();

		await expect
			.element(page.getByText('The contents of the popover...'), { timeout: 20000 })
			.not.toBeInTheDocument();
	});

	it('closes when Escape is pressed', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		await page.getByRole('button', { name: 'Click for popover' }).click();
		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect
			.element(page.getByText('The contents of the popover...'), { timeout: 20000 })
			.not.toBeInTheDocument();
	});

	it('closes when clicking outside the trigger and content', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		await page.getByRole('button', { name: 'Click for popover' }).click();
		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();

		// Click a dedicated sentinel element that is unambiguously outside the
		// trigger and the popover content. It's pinned to the top-left corner
		// with a high z-index (rather than relying on normal document flow, or
		// a raw coordinate click) so it is unambiguously the topmost element at
		// its own position and the click can't be swallowed by the floating
		// popover content, whose Tailwind classes aren't loaded in this test
		// environment.
		const outside = document.createElement('div');
		outside.textContent = 'outside';
		outside.style.cssText = 'position:fixed;top:0;left:0;z-index:99999;';
		document.body.appendChild(outside);

		// bits-ui attaches its outside-pointerdown listener slightly after the
		// content opens (so the same click that opened the popover isn't
		// immediately treated as an "outside" click too), so retry the click
		// until it lands after that listener is wired up rather than relying on
		// one specific delay.
		await expect
			.poll(
				async () => {
					await page.getByText('outside').click();
					return page.getByText('The contents of the popover...').query();
				},
				{ timeout: 5000 }
			)
			.toBeNull();
	});

	it('renders the optional title snippet', async () => {
		render(Popover, {
			title: makeSnippet('Account settings'),
			children: makeSnippet('The contents of the popover...')
		});

		await page.getByRole('button', { name: 'Click for popover' }).click();

		await expect.element(page.getByText('Account settings')).toBeInTheDocument();
	});

	it('renders without a title when none is provided', async () => {
		render(Popover, {
			children: makeSnippet('The contents of the popover...')
		});

		await page.getByRole('button', { name: 'Click for popover' }).click();

		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();
	});

	it('respects a custom hintLabel on the default trigger', async () => {
		render(Popover, {
			hintLabel: 'Click for more information!',
			children: makeSnippet('The contents of the popover...')
		});

		await expect
			.element(page.getByRole('button', { name: 'Click for more information!' }))
			.toBeInTheDocument();
	});

	it('supports a controlled/bindable open prop', async () => {
		render(Popover, {
			open: true,
			children: makeSnippet('The contents of the popover...')
		});

		await expect.element(page.getByText('The contents of the popover...')).toBeInTheDocument();
	});
});
