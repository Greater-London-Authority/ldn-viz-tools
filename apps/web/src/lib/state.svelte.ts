export class SidebarState {
	state = $state({
		isOpen: false
	});
	// isOpen: boolean = $state(false);
}

export const sidebarState = new SidebarState();

export const breakPoint: { current: number } = $state({ current: 0 });
