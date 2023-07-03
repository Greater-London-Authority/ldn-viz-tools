import { writable } from 'svelte/store'

export const isWideView = writable(false)
export const isSidebarOpen = writable(true)
export const sidebarAlignment = writable('bottom')
// Options: ['top', 'bottom', 'left', 'right']

export default {
	isWideView,
	isSidebarOpen,
	sidebarAlignment,
}
