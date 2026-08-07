import { describe, expect, it } from 'vitest';
import { classNames } from './classNames';

describe('classNames', () => {
	it('joins multiple class strings with a single space', () => {
		expect(classNames('a', 'b', 'c')).toBe('a b c');
	});

	it('filters out empty strings', () => {
		expect(classNames('a', '', 'b')).toBe('a b');
	});

	it('filters out falsy values', () => {
		// The type is string[], but callers frequently pass conditional
		// expressions that can evaluate to undefined/false/null.
		expect(classNames('a', undefined as any, false as any, null as any, 'b')).toBe('a b');
	});

	it('returns an empty string when given no arguments', () => {
		expect(classNames()).toBe('');
	});

	it('returns an empty string when every argument is falsy', () => {
		expect(classNames('', undefined as any, null as any)).toBe('');
	});

	it('does trim whitespace within a single argument', () => {
		expect(classNames('a b', 'c')).toBe('a b c');
		expect(classNames(' a ', 'b')).toBe('a b');
	});
});
