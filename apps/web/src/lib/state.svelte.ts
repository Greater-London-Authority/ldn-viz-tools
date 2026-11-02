export class SidebarState {
	state = $state({
		isOpen: false
	});
	// isOpen: boolean = $state(false);
}

export const sidebarState = new SidebarState();

export const breakPoint: { current: number } = $state({ current: 0 });

export type Usage = 'full' | 'adapting' | 'anywhere';

const usageStorageKey = 'ldn-viz-docs-usage';
const usages: Usage[] = ['full', 'adapting', 'anywhere'];

// The way of using the system that the reader last chose, shared by every UsageTabs.
// Storage can be unavailable (private windows, blocked site data), so it is optional.
export class UsageState {
	current: Usage = $state('full');

	restore() {
		try {
			const saved = localStorage.getItem(usageStorageKey) as Usage | null;
			if (saved && usages.includes(saved)) this.current = saved;
		} catch {
			// keep the default
		}
	}

	set(usage: Usage) {
		this.current = usage;
		try {
			localStorage.setItem(usageStorageKey, usage);
		} catch {
			// the choice lasts for this page view only
		}
	}
}

export const usageState = new UsageState();
