import type { IconSource } from '@steeze-ui/svelte-icon';
import { getContext, setContext, type Snippet } from 'svelte';

/**
 * When the content of a closed item is in the DOM.
 * - `first-open`: rendered on the first open, then kept.
 * - `always`: rendered up front and hidden with `hidden="until-found"`, so the browser's
 *   find-in-page can open it. Charts inside measure no width until the item opens.
 * - `open`: rendered while the item is open and removed after it closes.
 */
export type ExpandableMount = 'first-open' | 'always' | 'open';

/** An icon source, a snippet given the open state, or `null` for no icon. */
export type ExpandableIcon = IconSource | Snippet<[{ open: boolean }]> | null;

export interface ExpandableControls {
	expandAll: () => void;
	collapseAll: () => void;
	allOpen: boolean;
	noneOpen: boolean;
}

export interface ExpandableRootContext {
	readonly type: 'single' | 'multiple';
	isOpen(value: string): boolean;
	/** Adds an item to the set that "expand all" opens. Returns a function that removes it. */
	register(getValue: () => string): () => void;
}

export interface ExpandableItemContext {
	readonly value: string;
	readonly open: boolean;
	readonly mount: ExpandableMount;
}

const ROOT = Symbol('expandable-root');
const ITEM = Symbol('expandable-item');

export const setRootContext = (ctx: ExpandableRootContext) => setContext(ROOT, ctx);
export const setItemContext = (ctx: ExpandableItemContext) => setContext(ITEM, ctx);

export const getRootContext = () => {
	const ctx = getContext<ExpandableRootContext | undefined>(ROOT);
	if (!ctx) throw new Error('Expandable.Item must be inside Expandable.Root');
	return ctx;
};

export const getItemContext = () => {
	const ctx = getContext<ExpandableItemContext | undefined>(ITEM);
	if (!ctx)
		throw new Error('Expandable.Trigger and Expandable.Content must be inside Expandable.Item');
	return ctx;
};
