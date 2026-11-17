import { describe, test, expect } from 'vitest';
import { isConstructor } from './isConstructor';

describe('isConstructor', () => {
	test('returns true for a class', () => {
		class MyComponent {}
		expect(isConstructor(MyComponent)).toEqual(true);
	});

	test('returns false for a plain object literal', () => {
		expect(isConstructor({ some: 'value' })).toEqual(false);
	});

	test('returns false for a string', () => {
		expect(isConstructor('hello')).toEqual(false);
	});

	test('returns true for a function declaration (usable as a constructor)', () => {
		function MyFormatter() {}
		expect(isConstructor(MyFormatter)).toEqual(true);
	});

	test('returns false for an arrow function (no prototype)', () => {
		const myFormatter = () => 'formatted';
		expect(isConstructor(myFormatter)).toEqual(false);
	});
});
