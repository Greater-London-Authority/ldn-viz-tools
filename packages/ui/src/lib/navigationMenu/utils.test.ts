import { describe, expect, it } from 'vitest';
import type { NavigationMenuItemProps } from './types';
import { findActiveItem } from './utils';

// The real callers pass SvelteKit's `page` object and `resolve` helper.
// Here we use a minimal page stub and an identity resolver unless a test
// needs to exercise resolution.
const pageWith = (pathname: string) => ({ url: { pathname } });
const identity = (url: string) => url;

describe('findActiveItem', () => {
	const items: NavigationMenuItemProps[] = [
		{
			title: 'Section A',
			href: '/a',
			children: [{ title: 'Section A / B', href: '/a/b' }]
		},
		{ title: 'Section C', href: '/c' }
	];

	it('returns the deepest matching item when paths overlap', () => {
		const active = findActiveItem(items, pageWith('/a/b/c'), identity);
		expect(active?.href).toBe('/a/b');
	});

	it('recurses into children to find a match', () => {
		const active = findActiveItem(items, pageWith('/a/b'), identity);
		expect(active?.title).toBe('Section A / B');
	});

	it('returns the shallower item when only it matches', () => {
		const active = findActiveItem(items, pageWith('/a'), identity);
		expect(active?.href).toBe('/a');
	});

	it('returns undefined when nothing matches', () => {
		expect(findActiveItem(items, pageWith('/x'), identity)).toBeUndefined();
	});

	it('handles an empty items list', () => {
		expect(findActiveItem([], pageWith('/a'), identity)).toBeUndefined();
	});

	it('handles an undefined items list without throwing', () => {
		expect(findActiveItem(undefined as any, pageWith('/a'), identity)).toBeUndefined();
	});

	it('does not select an item that has no href (documents current behaviour)', () => {
		// Quirk: the match check falls back to '/' (so an hrefless item matches
		// any path) but the depth comparison falls back to '' — giving it a path
		// depth of 1, which never beats the initial best-match depth of 1. So an
		// hrefless item can match yet never win.
		const hrefless: NavigationMenuItemProps[] = [{ title: 'Home' }];
		const active = findActiveItem(hrefless, pageWith('/anything'), identity);
		expect(active).toBeUndefined();
	});

	it('uses the resolve function to map hrefs to real paths', () => {
		const resolve = (url: string) => `/base${url}`;
		const active = findActiveItem(items, pageWith('/base/a/b'), resolve);
		expect(active?.href).toBe('/a/b');
	});
});
