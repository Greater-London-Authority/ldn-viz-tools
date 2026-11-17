import { afterEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Toaster from './Toaster.svelte';
import { messages, newToastMessage } from './toaster';
import { ToastType } from './types';

// All messages posted in these tests use timeToLive: -1 so they never
// auto-dismiss on a real timer mid-test (the store's default is 5000ms,
// and these are browser-mode tests running against real timers - see
// CopyButton.svelte.test.ts for the same reasoning). Instead we reset the
// module-level `messages` store directly, since it is shared singleton
// state across tests in this file (and across toaster.test.ts).
afterEach(() => {
	messages.set([]);
});

describe('Toaster', () => {
	it('renders a message posted to the store, and removes it when the message is removed', async () => {
		render(Toaster);

		const msg = newToastMessage('Hello world', { id: 'a', timeToLive: -1 });
		msg.post();

		const toast = page.getByRole('alert');
		await expect.element(toast).toBeInTheDocument();
		await expect.element(toast).toHaveTextContent('Hello world');

		msg.remove();

		await expect.element(toast).not.toBeInTheDocument();
	});

	it('does not render anything when no messages have been posted', async () => {
		render(Toaster);

		await expect.element(page.getByRole('alert')).not.toBeInTheDocument();
	});

	it('removes the toast when its close button is clicked', async () => {
		render(Toaster);

		const msg = newToastMessage('Closable message', {
			id: 'closable',
			timeToLive: -1,
			closeButton: true
		});
		msg.post();

		const toast = page.getByRole('alert');
		await expect.element(toast).toBeInTheDocument();

		const closeButton = page.getByRole('button', { name: 'Close' });
		await expect.element(closeButton).toBeInTheDocument();
		await closeButton.click();

		await expect.element(toast).not.toBeInTheDocument();
	});

	it('does not render a close button when closeButton is not set', async () => {
		render(Toaster);

		newToastMessage('No close button here', { id: 'no-close', timeToLive: -1 }).post();

		await expect.element(page.getByRole('alert')).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Close' })).not.toBeInTheDocument();
	});

	describe('styling per ToastType', () => {
		// Mirrors the typeClasses map in Toast.svelte: each ToastType has its own
		// surface/border classes, and an unrecognised type falls back to neutral.
		it.each([
			[ToastType.Notice, 'bg-color-surface-accent-muted', 'border-color-surface-accent'],
			[ToastType.Success, 'bg-color-surface-positive-muted', 'border-color-surface-positive'],
			[ToastType.Warning, 'bg-color-surface-caution-muted', 'border-color-surface-caution'],
			[ToastType.Error, 'bg-color-surface-negative-muted', 'border-color-surface-negative']
		])(
			'renders %s with its distinct surface/border classes',
			async (type, bgClass, borderClass) => {
				render(Toaster);

				newToastMessage(`A ${type} message`, {
					id: `type-${type}`,
					type: type as keyof typeof ToastType,
					timeToLive: -1
				}).post();

				const toast = page.getByRole('alert');
				await expect.element(toast).toBeInTheDocument();
				// The type classes live on the inner div, not the role="alert" div itself.
				const styledDiv = toast.element().querySelector('div');
				expect(styledDiv?.className).toContain(bgClass);
				expect(styledDiv?.className).toContain(borderClass);
			}
		);
	});

	it('never renders more than MAX_MESSAGES (3) toasts at once', async () => {
		render(Toaster);

		['a', 'b', 'c', 'd', 'e'].forEach((id) => newToastMessage(id, { id, timeToLive: -1 }).post());

		const toasts = page.getByRole('alert');
		await expect.element(toasts.first()).toBeInTheDocument();

		expect(toasts.elements()).toHaveLength(3);

		// Newest-first: the three most recently posted messages are shown, in
		// order, and the oldest two ('a', 'b') are dropped.
		const ids = toasts.elements().map((el) => el.id);
		expect(ids).toEqual(['e', 'd', 'c']);
	});
});
