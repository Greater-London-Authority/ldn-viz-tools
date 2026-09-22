import { getContext, setContext } from 'svelte';
import type { PlacementType, SidebarProps } from './types';

/**
 * A function returning the placement the sidebar should currently use, or
 * `undefined` to defer to the next source down.
 *
 * Placement is *pulled* from these sources rather than assigned into the state.
 * That is deliberate: when several components each wrote their own value into a
 * shared `placement` field, whichever wrote last won, and the ordering varied
 * between a cold page load and an HMR update or a client-side navigation.
 */
export type PlacementSource = () => PlacementType | undefined;

const DEFAULT_PLACEMENT: PlacementType = 'right';

export class SidebarState {
	isOpen: boolean = $state(false);
	isAlwaysOpen: boolean = $state(false);
	width: SidebarProps['width'] = $state('standard');

	/** Supplied by `<AppShell>`: the placement resolved from its breakpoint object. */
	#placementSource: PlacementSource | undefined;

	/** Supplied by `<Sidebar>` when a consumer passes an explicit `placement` prop. */
	#placementOverride: PlacementSource | undefined = $state(undefined);

	constructor(placementSource?: PlacementSource) {
		this.#placementSource = placementSource;
	}

	/**
	 * An explicit `placement` prop wins; otherwise the AppShell's breakpoint
	 * resolution is used; otherwise we fall back to the default.
	 */
	get placement(): PlacementType {
		return this.#placementOverride?.() ?? this.#placementSource?.() ?? DEFAULT_PLACEMENT;
	}

	set placement(value: PlacementType) {
		this.#placementOverride = () => value;
	}

	/**
	 * Install a reactive override. Pass a getter rather than a value so the
	 * override tracks a changing prop instead of freezing at its first value.
	 * A getter returning `undefined` defers to the AppShell.
	 */
	overridePlacement(source: PlacementSource) {
		this.#placementOverride = source;
	}

	orientation: 'vertical' | 'horizontal' = $derived(
		['top', 'bottom'].includes(this.placement) ? 'horizontal' : 'vertical'
	);
}

// `Symbol.for` rather than `Symbol` so the key keeps its identity when this
// module is replaced by HMR. With a fresh symbol per evaluation, components
// mounted before the update look up a key nothing set and get `undefined`.
const SIDEBAR_KEY = Symbol.for('SIDEBAR');

export function setSidebarState(placementSource?: PlacementSource) {
	return setContext(SIDEBAR_KEY, new SidebarState(placementSource));
}

export function getSidebarState() {
	return getContext<ReturnType<typeof setSidebarState>>(SIDEBAR_KEY);
}
