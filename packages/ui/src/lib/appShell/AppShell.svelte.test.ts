import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { placementLookup, transitionAxis } from '../sidebar/sidebarUtils';
import Harness from './PlacementHarness.test.svelte';

// <AppShell> resolves a placement from its `sidebarPlacement` breakpoint object
// and <Sidebar> positions itself from it. These used to be two separate writes
// into shared state, and which one landed last depended on initialisation
// order: a cold load resolved correctly, while an HMR update or a client-side
// navigation left the sidebar wherever <Sidebar>'s own prop default pointed.
//
// The tests below assert on the classes the sidebar actually carries, and in
// particular that they survive the sidebar being remounted underneath a live
// AppShell.

// The placement classes live on <Sidebar>'s positioning wrapper, which has no
// role of its own, so we reach it from the <aside> it contains.
const wrapperClasses = async () => {
	const aside = page.getByRole('complementary');
	await expect.element(aside).toBeInTheDocument();
	const wrapper = (await aside.element()).closest('.z-30');
	expect(wrapper, 'sidebar positioning wrapper').not.toBeNull();
	return (wrapper as HTMLElement).className;
};

describe('AppShell placement', () => {
	it('positions the sidebar from the AppShell breakpoint object', async () => {
		render(Harness, { sidebarPlacement: { initial: 'left' } });

		expect(await wrapperClasses()).toContain(placementLookup.left);
	});

	it('keeps that placement when the sidebar remounts underneath it', async () => {
		// The regression. `remountSidebar` re-runs <Sidebar>'s initialisation
		// without touching the AppShell, its props or the window width.
		const { rerender } = render(Harness, {
			sidebarPlacement: { initial: 'left' },
			remountSidebar: false
		});

		expect(await wrapperClasses()).toContain(placementLookup.left);

		await rerender({ sidebarPlacement: { initial: 'left' }, remountSidebar: true });

		expect(await wrapperClasses()).toContain(placementLookup.left);
		expect(await wrapperClasses()).not.toContain(placementLookup.right);
	});

	it('keeps a bottom placement across a remount', async () => {
		// The animation half of the same bug: a clobbered placement flipped the
		// slide transition from the y axis to the x axis, so a sidebar configured
		// to rise from the bottom arrived from the side instead.
		const { rerender } = render(Harness, {
			sidebarPlacement: { initial: 'bottom' },
			remountSidebar: false
		});

		expect(await wrapperClasses()).toContain(placementLookup.bottom);

		await rerender({ sidebarPlacement: { initial: 'bottom' }, remountSidebar: true });

		expect(await wrapperClasses()).toContain(placementLookup.bottom);
		expect(transitionAxis.bottom).toBe('y');
	});

	it('lets an explicit placement prop override the breakpoint object', async () => {
		render(Harness, { sidebarPlacement: { initial: 'left' }, placement: 'top' });

		expect(await wrapperClasses()).toContain(placementLookup.top);
	});

	it('follows a changing explicit placement prop', async () => {
		const { rerender } = render(Harness, {
			sidebarPlacement: { initial: 'left' },
			placement: 'top'
		});

		expect(await wrapperClasses()).toContain(placementLookup.top);

		await rerender({ sidebarPlacement: { initial: 'left' }, placement: 'bottom' });

		expect(await wrapperClasses()).toContain(placementLookup.bottom);
	});
});
