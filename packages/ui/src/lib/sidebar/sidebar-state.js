import { writable } from 'svelte/store'

export const isWideView = writable(false)
export const isSidebarOpen = writable(true)

// Options: ['top', 'bottom', 'left', 'right']
export const sidebarAlignment = writable('bottom')

export default {
	isWideView,
	isSidebarOpen,
	sidebarAlignment,
}
