<script lang="ts">
	/**
	 * `Expandable.Root` — a group of expandable items, built on the bits-ui `Accordion`.
	 *
	 * `type="single"` keeps at most one item open; `type="multiple"` lets each item open on
	 * its own. `value` is bindable: a string for `single` (empty for none), an array for
	 * `multiple`.
	 *
	 * `persistKey` saves the open items to localStorage under that key and restores them on
	 * mount. Give each item an explicit `value` when using it, because generated values
	 * change if the items are reordered.
	 *
	 * `controls` adds "Expand all" and "Collapse all" buttons above the items, or renders a
	 * snippet given the same functions. They only apply to `type="multiple"`.
	 *
	 * @component
	 */
	import { Accordion } from 'bits-ui';
	import { onMount, untrack, type Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames.js';
	import { setRootContext, type ExpandableControls } from './context.js';

	interface Props {
		type?: 'single' | 'multiple';
		value?: string | string[];
		onValueChange?: (value: string | string[]) => void;
		/** localStorage key for the open items. Nothing is stored without it. */
		persistKey?: string;
		controls?: boolean | Snippet<[ExpandableControls]>;
		disabled?: boolean;
		/** Classes on the list of items. */
		class?: string;
		children?: Snippet;
	}

	let {
		type = 'multiple',
		value = $bindable(),
		onValueChange,
		persistKey = undefined,
		controls = false,
		disabled = false,
		class: classes = '',
		children
	}: Props = $props();

	if (value === undefined) value = untrack(() => type) === 'single' ? '' : [];

	const openValues = $derived(Array.isArray(value) ? value : value ? [value] : []);
	// Getters, so an item whose `value` changes is still found without registering again.
	const items = new SvelteSet<() => string>();
	const itemValues = () => [...items].map((get) => get());

	const setValue = (next: string | string[]) => {
		value = next;
		onValueChange?.(next);
	};

	const expandAll = () => {
		if (type === 'multiple') setValue(itemValues());
	};
	const collapseAll = () => setValue(type === 'single' ? '' : []);

	const api: ExpandableControls = {
		expandAll,
		collapseAll,
		get allOpen() {
			return items.size > 0 && itemValues().every((v) => openValues.includes(v));
		},
		get noneOpen() {
			return openValues.length === 0;
		}
	};

	setRootContext({
		get type() {
			return type;
		},
		isOpen: (v) => openValues.includes(v),
		register: (getValue) => {
			items.add(getValue);
			return () => items.delete(getValue);
		}
	});

	const storageKey = $derived(persistKey ? `ldn-viz-expandable:${persistKey}` : undefined);
	let restored = false;

	onMount(() => {
		if (storageKey) {
			try {
				const raw = localStorage.getItem(storageKey);
				const saved = raw === null ? undefined : JSON.parse(raw);
				if (type === 'single' && typeof saved === 'string') setValue(saved);
				if (type === 'multiple' && Array.isArray(saved)) {
					setValue(saved.filter((v): v is string => typeof v === 'string'));
				}
			} catch {
				// Storage can be blocked or hold bad JSON; the default open state stands.
			}
		}
		restored = true;
	});

	$effect(() => {
		const snapshot = $state.snapshot(value);
		if (!restored || !storageKey) return;
		try {
			localStorage.setItem(storageKey, JSON.stringify(snapshot));
		} catch {
			// Storage can be blocked or full; persistence is best effort.
		}
	});
</script>

{#if controls && type === 'multiple'}
	<div class="mb-2 flex justify-end gap-2">
		{#if typeof controls === 'function'}
			{@render controls(api)}
		{:else}
			<Button
				variant="text"
				size="sm"
				emphasis="secondary"
				disabled={api.allOpen}
				onclick={expandAll}
			>
				Expand all
			</Button>
			<Button
				variant="text"
				size="sm"
				emphasis="secondary"
				disabled={api.noneOpen}
				onclick={collapseAll}
			>
				Collapse all
			</Button>
		{/if}
	</div>
{/if}

{#if type === 'single'}
	<Accordion.Root
		type="single"
		bind:value={() => value as string, (v) => setValue(v)}
		{disabled}
		class={classes}
	>
		{@render children?.()}
	</Accordion.Root>
{:else}
	<Accordion.Root
		type="multiple"
		bind:value={() => value as string[], (v) => setValue(v)}
		{disabled}
		class={classes}
	>
		{@render children?.()}
	</Accordion.Root>
{/if}
