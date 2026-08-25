import { describe, expect, it } from 'vitest';
import { SidebarState } from './sidebarState.svelte';

// SidebarState uses Svelte runes ($state/$derived), so this runs in the
// browser (client) test project.
describe('SidebarState', () => {
	it('has the expected default state', () => {
		const state = new SidebarState();
		expect(state.isOpen).toBe(false);
		expect(state.isAlwaysOpen).toBe(false);
		expect(state.placement).toBe('left');
		expect(state.width).toBe('standard');
	});

	it('derives a vertical orientation for left/right placements', () => {
		const state = new SidebarState();
		state.placement = 'left';
		expect(state.orientation).toBe('vertical');
		state.placement = 'right';
		expect(state.orientation).toBe('vertical');
	});

	it('derives a horizontal orientation for top/bottom placements', () => {
		const state = new SidebarState();
		state.placement = 'top';
		expect(state.orientation).toBe('horizontal');
		state.placement = 'bottom';
		expect(state.orientation).toBe('horizontal');
	});
});
