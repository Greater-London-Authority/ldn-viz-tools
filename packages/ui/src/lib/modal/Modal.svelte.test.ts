import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page, userEvent } from 'vitest/browser';
import Modal from './Modal.svelte';

// Modal.svelte is a thin wrapper around bits-ui's `Dialog` primitive: it
// renders `Dialog.Root` / `Dialog.Trigger` / `Dialog.Portal` / `Dialog.Overlay`
// / `Dialog.Content` / `Dialog.Title` / `Dialog.Description` / `Dialog.Close`
// directly, so its runtime behaviour (escape/outside-click dismissal, focus
// trapping, `role`/`aria-modal`) comes from bits-ui rather than from any
// bespoke logic in this component. These tests assert on that behaviour as
// exposed through the rendered DOM, without asserting on bits-ui internals.

function makeSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
		setup: () => {}
	}));
}

describe('Modal', () => {
	it('is not visible when open is false', async () => {
		render(Modal, {
			open: false,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		// The default trigger is always rendered; the dialog content is not.
		await expect.element(page.getByRole('button', { name: 'More Info' })).toBeInTheDocument();
		await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
	});

	it('is visible when open is true', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeInTheDocument();
		await expect.element(dialog).toHaveTextContent('Modal title');
		await expect.element(dialog).toHaveTextContent('Modal description');
	});

	it('opens when the default trigger is clicked', async () => {
		render(Modal, {
			open: false,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();

		await page.getByRole('button', { name: 'More Info' }).click();

		await expect.element(page.getByRole('dialog')).toBeInTheDocument();
	});

	it('has role="dialog" and aria-modal="true" on the content', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toHaveAttribute('aria-modal', 'true');
	});

	it('closes when the close button is clicked', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		await expect.element(page.getByRole('dialog')).toBeInTheDocument();

		await page.getByRole('button', { name: 'Close' }).click();

		await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
	});

	it('closes when Escape is pressed', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect.element(dialog).not.toBeInTheDocument();
	});

	it('closes when clicking outside the content (on the backdrop)', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		await expect.element(page.getByRole('dialog')).toBeInTheDocument();

		// bits-ui's dismissible layer closes the dialog on any pointerdown
		// outside the content element, detected via a document-level listener
		// rather than by anything painted on screen. Click a corner of the
		// document (away from the centred modal content) via a locator, so a
		// real pointerdown/pointerup sequence is dispatched - a raw DOM
		// `.click()` only fires a synthetic `click` event, which the
		// dismissible layer does not listen for.
		await page.elementLocator(document.documentElement).click({ position: { x: 5, y: 5 } });

		await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
	});

	it('disables Escape/outside-click dismissal when contentProps opts out', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description'),
			contentProps: {
				escapeKeydownBehavior: 'ignore',
				interactOutsideBehavior: 'ignore'
			}
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		await expect.element(dialog).toBeInTheDocument();
	});

	it('traps focus within the modal content (Tab does not escape to the trigger)', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description')
		});

		const dialog = page.getByRole('dialog');
		await expect.element(dialog).toBeInTheDocument();

		// bits-ui's `FocusScope` auto-focuses inside the content on open and
		// traps Tab within it; the trigger button (outside the content) should
		// never receive focus while the modal is open.
		const closeButton = page.getByRole('button', { name: 'Close' });
		await expect.element(closeButton).toBeInTheDocument();

		for (let i = 0; i < 5; i++) {
			await userEvent.tab();
		}

		const trigger = page.getByRole('button', { name: 'More Info' });
		await expect.element(trigger).not.toHaveFocus();
	});

	it('renders custom buttons snippet', async () => {
		render(Modal, {
			open: true,
			title: makeSnippet('Modal title'),
			description: makeSnippet('Modal description'),
			buttons: makeSnippet('Accept')
		});

		await expect.element(page.getByText('Accept')).toBeInTheDocument();
	});
});
