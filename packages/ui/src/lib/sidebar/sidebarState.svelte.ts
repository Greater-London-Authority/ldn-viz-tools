import { getContext, setContext } from 'svelte';
import type { PlacementType, SidebarProps } from './types';

export type PlacementGetter = () => PlacementType | undefined;

const DEFAULT_PLACEMENT: PlacementType = 'right';

export class SidebarState {
	isOpen: boolean = $state(false);
	isAlwaysOpen: boolean = $state(false);
	width: SidebarProps['width'] = $state('standard');

	/** Supplied by `<AppShell>`: the placement resolved from its breakpoint object. */
	#placementByBreakpoint: PlacementGetter | undefined;

	/** Supplied by `<Sidebar>` when a consumer passes an explicit `placement` prop. */
	#placementOverride: PlacementGetter | undefined = $state(undefined);

	constructor(placementByBreakpoint?: PlacementGetter) {
		this.#placementByBreakpoint = placementByBreakpoint;
	}

	get placement(): PlacementType {
		return this.#placementOverride?.() ?? this.#placementByBreakpoint?.() ?? DEFAULT_PLACEMENT;
	}

	set placement(value: PlacementType) {
		this.#placementOverride = () => value;
	}

	overridePlacement(placementOverride: PlacementGetter) {
		this.#placementOverride = placementOverride;
	}

	orientation: 'vertical' | 'horizontal' = $derived(
		['top', 'bottom'].includes(this.placement) ? 'horizontal' : 'vertical'
	);
}

// `Symbol.for` rather than `Symbol` so the key keeps its identity when this
// module is replaced by HMR.
const SIDEBAR_KEY = Symbol.for('SIDEBAR');

export function setSidebarState(placementByBreakpoint?: PlacementGetter) {
	return setContext(SIDEBAR_KEY, new SidebarState(placementByBreakpoint));
}

export function getSidebarState() {
	return getContext<ReturnType<typeof setSidebarState>>(SIDEBAR_KEY);
}
