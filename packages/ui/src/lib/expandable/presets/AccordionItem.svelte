<script lang="ts">
	/**
	 * `AccordionItem` — a title row that opens the content below it. Items are divided by
	 * `border-wash` rules. The whole row is the button.
	 *
	 * `header` replaces the title in both states and is given `{ open }`. `openHeader`
	 * replaces it only while open. Both render inside the button, so they can't hold links
	 * or buttons.
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import { classNames } from '../../utils/classNames.js';
	import type { ExpandableIcon, ExpandableMount } from '../context.js';
	import ExpandableContent from '../ExpandableContent.svelte';
	import ExpandableItem from '../ExpandableItem.svelte';
	import ExpandableTrigger from '../ExpandableTrigger.svelte';

	interface Props {
		title?: string;
		value?: string;
		disabled?: boolean;
		mount?: ExpandableMount;
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		icon?: ExpandableIcon;
		iconPosition?: 'start' | 'end';
		header?: Snippet<[{ open: boolean }]>;
		openHeader?: Snippet;
		class?: string;
		children?: Snippet;
	}

	let {
		title = '',
		value = undefined,
		disabled = false,
		mount = 'first-open',
		headingLevel = undefined,
		icon = undefined,
		iconPosition = 'end',
		header = undefined,
		openHeader = undefined,
		class: classes = '',
		children: content
	}: Props = $props();
</script>

<ExpandableItem
	{value}
	{disabled}
	{mount}
	class={classNames('typeset-product border-b border-color-border-wash', classes)}
>
	{#snippet children({ open })}
		<ExpandableTrigger {headingLevel} {icon} {iconPosition} class="label-md py-2">
			{#snippet children()}
				{#if open && openHeader}
					{@render openHeader()}
				{:else if header}
					{@render header({ open })}
				{:else}
					{title}
				{/if}
			{/snippet}
		</ExpandableTrigger>
		<ExpandableContent class="body-md pb-4">{@render content?.()}</ExpandableContent>
	{/snippet}
</ExpandableItem>
