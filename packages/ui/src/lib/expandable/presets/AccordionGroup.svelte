<script lang="ts">
	/**
	 * `AccordionGroup` — an `Expandable.Root` for `AccordionItem`s. One item is open at a
	 * time unless `type="multiple"`.
	 *
	 * @component
	 */
	import type { ComponentProps } from 'svelte';
	import ExpandableRoot from '../ExpandableRoot.svelte';

	let {
		value = $bindable(),
		type = 'single',
		...rest
	}: ComponentProps<typeof ExpandableRoot> = $props();
</script>

<ExpandableRoot bind:value {type} {...rest} />
