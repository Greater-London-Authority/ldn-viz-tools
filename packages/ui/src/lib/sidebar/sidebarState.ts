import { writable, type Writable } from 'svelte/store';

export enum Align {
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	Right = 'right'
}

export type Tab = {
	id: string;
	label: string;
	icon: ComponentType;
};

export const isWideView = writable(false);
export const isSidebarOpen = writable(true);
export const sidebarAlignment: Writable<Align> = writable('bottom');
export const selectedTabId: Writable<null | string> = writable(null);

export default {
	isWideView,
	isSidebarOpen,
	sidebarAlignment,
	selectedTabId
};
