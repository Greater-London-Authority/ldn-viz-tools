import { describe, expect, it } from 'vitest';
import { SidebarState } from './sidebarState.svelte';

// SidebarState uses Svelte runes ($state/$derived), so this runs in the
// browser (client) test project.
describe('SidebarState', () => {
	it('has the expected default state', () => {
		const state = new SidebarState();
		expect(state.isOpen).toBe(false);
		expect(state.isAlwaysOpen).toBe(false);
		expect(state.placement).toBe('right');
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

	it('reads placement from the source it was constructed with', () => {
		let resolved: 'left' | 'right' = 'left';
		const state = new SidebarState(() => resolved);

		expect(state.placement).toBe('left');

		resolved = 'right';
		expect(state.placement).toBe('right');
	});

	it('prefers an explicit override to the constructed source', () => {
		const state = new SidebarState(() => 'left');

		state.overridePlacement(() => 'top');
		expect(state.placement).toBe('top');
	});

	it('defers to the constructed source when the override yields undefined', () => {
		const state = new SidebarState(() => 'bottom');

		// This is what <Sidebar> installs when no `placement` prop is passed.
		state.overridePlacement(() => undefined);
		expect(state.placement).toBe('bottom');
	});

	it('tracks a changing override rather than freezing at its first value', () => {
		let prop: 'top' | 'bottom' = 'top';
		const state = new SidebarState(() => 'left');

		state.overridePlacement(() => prop);
		expect(state.placement).toBe('top');

		prop = 'bottom';
		expect(state.placement).toBe('bottom');
	});

	// The regression this whole design exists to prevent. Previously <Sidebar>
	// wrote its own `placement` prop into the shared state at init, so a re-init
	// with no prop reset placement to the prop default and the AppShell's value
	// was lost until something happened to re-run its effect.
	it('keeps the resolved placement when a sidebar re-initialises', () => {
		const state = new SidebarState(() => 'left');

		// First mount of <Sidebar>, no explicit placement.
		state.overridePlacement(() => undefined);
		expect(state.placement).toBe('left');

		// HMR update or a client-side navigation remounts it. Same call again.
		state.overridePlacement(() => undefined);
		expect(state.placement).toBe('left');
	});

	it('falls back to the default when there is no source at all', () => {
		// A bare <Sidebar> whose consumer called setSidebarState() themselves.
		const state = new SidebarState();
		state.overridePlacement(() => undefined);
		expect(state.placement).toBe('right');
	});
});
