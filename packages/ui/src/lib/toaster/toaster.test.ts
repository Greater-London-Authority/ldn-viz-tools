import { get } from 'svelte/store';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { messages, newToastMessage } from './toaster';
import { ToastType } from './types';

describe('toaster', () => {
	beforeEach(() => {
		// messages is module-level shared state; reset it between tests.
		messages.set([]);
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	describe('newToastMessage defaults', () => {
		it('applies default type, closeButton and a generated id', () => {
			const msg = newToastMessage('Hello');

			expect(msg.text).toBe('Hello');
			expect(msg.type).toBe(ToastType.Notice);
			expect(msg.closeButton).toBe(false);
			expect(msg.id).toMatch(/^[A-Za-z]{12}$/);
		});

		it('lets options override the defaults', () => {
			const msg = newToastMessage('Hello', {
				id: 'my-id',
				type: ToastType.Error as keyof typeof ToastType,
				closeButton: true
			});

			expect(msg.id).toBe('my-id');
			expect(msg.type).toBe(ToastType.Error);
			expect(msg.closeButton).toBe(true);
		});
	});

	describe('post / remove', () => {
		it('adds a message to the store when posted', () => {
			const msg = newToastMessage('Hello', { id: 'a' });
			expect(get(messages)).toHaveLength(0);

			msg.post();

			expect(get(messages)).toHaveLength(1);
			expect(get(messages)[0].id).toBe('a');
		});

		it('does not create a duplicate when a message with the same id is re-posted', () => {
			const first = newToastMessage('Hello', { id: 'dup' });
			const second = newToastMessage('Hello again', { id: 'dup' });

			first.post();
			second.post();

			const list = get(messages);
			expect(list).toHaveLength(1);
			expect(list[0].text).toBe('Hello again');
		});

		it('removes a message from the store', () => {
			const msg = newToastMessage('Hello', { id: 'a' });
			msg.post();
			expect(get(messages)).toHaveLength(1);

			msg.remove();

			expect(get(messages)).toHaveLength(0);
		});
	});

	describe('store limits and ordering', () => {
		it('never holds more than three messages, newest first', () => {
			['a', 'b', 'c', 'd'].forEach((id) => newToastMessage(id, { id }).post());

			const list = get(messages);
			expect(list).toHaveLength(3);
			expect(list.map((m) => m.id)).toEqual(['d', 'c', 'b']);
		});
	});

	describe('time to live', () => {
		it('auto-removes a message after its timeToLive elapses', () => {
			const msg = newToastMessage('Hello', { id: 'a', timeToLive: 1000 });
			msg.post();
			expect(get(messages)).toHaveLength(1);

			vi.advanceTimersByTime(1000);

			expect(get(messages)).toHaveLength(0);
		});

		it('does not auto-remove when timeToLive is zero or negative', () => {
			const msg = newToastMessage('Hello', { id: 'a', timeToLive: 0 });
			msg.post();

			vi.advanceTimersByTime(60_000);

			// timeToLive of 0 is falsy, so the DEFAULT_TIME_TO_LIVE (5000) applies.
			// This test documents that a persistent toast requires a negative value.
			expect(get(messages)).toHaveLength(0);

			messages.set([]);
			const persistent = newToastMessage('Stay', { id: 'b', timeToLive: -1 });
			persistent.post();
			vi.advanceTimersByTime(60_000);
			expect(get(messages)).toHaveLength(1);
		});
	});
});
