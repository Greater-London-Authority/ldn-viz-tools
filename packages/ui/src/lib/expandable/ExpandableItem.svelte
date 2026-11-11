<script lang="ts">
	/**
	 * `Expandable.Item` — one item in an `Expandable.Root`. It holds an
	 * `Expandable.Trigger` and an `Expandable.Content`. `children` is given `{ open }` so a
	 * preset can change its closed and open layouts.
	 *
	 * @component
	 */
	import { Accordion } from 'bits-ui';
	import { onDestroy, type Snippet } from 'svelte';
	import { getRootContext, setItemContext, type ExpandableMount } from './context.js';

	interface Props {
		/** Identifies the item in the root's `value`. Set it when using `persistKey`. */
		value?: string;
		disabled?: boolean;
		mount?: ExpandableMount;
		class?: string;
		children?: Snippet<[{ open: boolean }]>;
	}

	const uid = $props.id();

	let {
		value = uid,
		disabled = false,
		mount = 'first-open',
		class: classes = '',
		children
	}: Props = $props();

	const root = getRootContext();
	const open = $derived(root.isOpen(value));

	onDestroy(root.register(() => value));

	setItemContext({
		get value() {
			return value;
		},
		get open() {
			return open;
		},
		get mount() {
			return mount;
		}
	});
</script>

<Accordion.Item {value} {disabled} class={classes}>
	{@render children?.({ open })}
</Accordion.Item>
