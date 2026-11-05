import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Tooltip from './Tooltip.svelte';

// Tooltip.svelte is a thin wrapper around bits-ui's `Tooltip` primitive
// (Provider/Root/Trigger/Portal/Content), with the default trigger provided
// by `../overlay/Trigger.svelte`. Its runtime behaviour - hover/focus to
// open, escape/blur to dismiss, and the `aria-describedby` wiring - comes
// from bits-ui rather than bespoke logic in this component, so these tests
// assert on that behaviour as exposed through the rendered DOM.
//
// Note: bits-ui's tooltip content has no ARIA `role` (no `role="tooltip"`),
// so content is located via its text rather than `getByRole('tooltip')`.

function makeSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));
}

describe('Tooltip', () => {
	it('renders the default trigger and keeps the content out of the DOM until opened', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		await expect
			.element(page.getByRole('button', { name: 'Hover for tooltip' }))
			.toBeInTheDocument();
		await expect.element(page.getByText('The contents of the Tooltip...')).not.toBeInTheDocument();
	});

	it('shows the content when the trigger is hovered', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		await userEvent.hover(trigger);

		// A generous timeout: bits-ui's tooltip provider delays opening by
		// `delayDuration` (100ms here), and - if the cursor was recently over a
		// different tooltip trigger - can add a further "safe polygon" transit
		// check (up to 250ms) before opening.
		await expect
			.element(page.getByText('The contents of the Tooltip...'), { timeout: 3000 })
			.toBeInTheDocument();

		// Move the (real, shared) cursor away so a leftover hover position
		// doesn't leak into later tests that rely on focus/blur instead.
		await userEvent.unhover(trigger);
	});

	it('shows the content when the trigger receives keyboard focus', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		(trigger.element() as HTMLElement).focus();

		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();
	});

	it('hides the content when the trigger loses focus (blur)', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		(trigger.element() as HTMLElement).focus();
		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();

		// Move focus to another element (rather than calling `.blur()` directly)
		// so the trigger blurs the same way it would for a real user tabbing
		// away - calling `.blur()` in isolation was observed to make bits-ui's
		// close handling far slower/flakier in this test environment.
		const elsewhere = document.createElement('button');
		document.body.appendChild(elsewhere);
		elsewhere.focus();

		await expect.element(page.getByText('The contents of the Tooltip...')).not.toBeInTheDocument();
	});

	it('closes when Escape is pressed', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		(trigger.element() as HTMLElement).focus();
		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect
			.element(page.getByText('The contents of the Tooltip...'), { timeout: 20000 })
			.not.toBeInTheDocument();
	});

	it('closes when clicking outside the trigger and content', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		(trigger.element() as HTMLElement).focus();
		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();

		await page.elementLocator(document.body).click({ position: { x: 700, y: 500 } });

		await expect
			.element(page.getByText('The contents of the Tooltip...'), { timeout: 20000 })
			.not.toBeInTheDocument();
	});

	it('does not close when the trigger itself is clicked while hovered (disableCloseOnTriggerClick)', async () => {
		// Tooltip.svelte hardcodes `disableCloseOnTriggerClick`, so - unlike a
		// vanilla bits-ui tooltip - clicking the trigger does not toggle it closed.
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		await userEvent.hover(trigger);
		await expect
			.element(page.getByText('The contents of the Tooltip...'), { timeout: 3000 })
			.toBeInTheDocument();

		await trigger.click();

		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();

		// Move the (real, shared) cursor away so a leftover hover position
		// doesn't leak into later tests that rely on focus/blur instead.
		await userEvent.unhover(trigger);
	});

	it('sets aria-describedby on the trigger to the content id only while open', async () => {
		render(Tooltip, {
			children: makeSnippet('The contents of the Tooltip...')
		});

		const trigger = page.getByRole('button', { name: 'Hover for tooltip' });
		await expect.element(trigger).not.toHaveAttribute('aria-describedby');

		(trigger.element() as HTMLElement).focus();
		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();

		const content = document.querySelector('[data-tooltip-content]');
		expect(content).not.toBeNull();
		await expect.element(trigger).toHaveAttribute('aria-describedby', (content as HTMLElement).id);
	});

	it('respects a custom hintLabel on the default trigger', async () => {
		render(Tooltip, {
			hintLabel: "I'm a little tooltip",
			children: makeSnippet('The contents of the Tooltip...')
		});

		await expect
			.element(page.getByRole('button', { name: "I'm a little tooltip" }))
			.toBeInTheDocument();
	});

	it('supports a controlled/bindable open prop', async () => {
		render(Tooltip, {
			open: true,
			children: makeSnippet('The contents of the Tooltip...')
		});

		await expect.element(page.getByText('The contents of the Tooltip...')).toBeInTheDocument();
	});
});
