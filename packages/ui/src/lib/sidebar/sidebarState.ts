import { writable, type Writable } from 'svelte/store';

export enum Align {
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	Right = 'right',
}

export const isWideView = writable(false)
export const isSidebarOpen = writable(true)
export const sidebarAlignment: Writable<Align> = writable('bottom')

export default {
	isWideView,
	isSidebarOpen,
	sidebarAlignment,
}
