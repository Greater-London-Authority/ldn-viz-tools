import { writable } from 'svelte/store'

export const isDesktopView = writable(false)
export const isSidebarOpen = writable(true)
export const sidebarAlignment = writable('bottom')
// Options: ['top', 'bottom', 'left', 'right']

export default {
	isDesktopView,
	isSidebarOpen,
	sidebarAlignment,
}
