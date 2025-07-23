import { getContext, setContext } from 'svelte';
import type { PlacementType } from './types';

export class SidebarState {
	isOpen: boolean = $state(false);
	isAlwaysOpen: boolean = $state(false);
	placement: PlacementType = $state('left');
	width: 'standard' | 'wide' = $state('standard');
	orientation: 'vertical' | 'horizontal' = $derived(
		['top', 'bottom'].includes(this.placement) ? 'horizontal' : 'vertical'
	);
}

const SIDEBAR_KEY = Symbol('SIDEBAR');

export function setSidebarState() {
	return setContext(SIDEBAR_KEY, new SidebarState());
}

export function getSidebarState() {
	return getContext<ReturnType<typeof setSidebarState>>(SIDEBAR_KEY);
}
