<script lang="ts">
	/**
	 * `DashboardSection` — a section of a dashboard that can be closed to its title. A
	 * `border-wash` rule sits above the title row, and the whole row is the button.
	 *
	 * Open, the row shows the title in `dashboard-section-title` and the subtitle below it.
	 * Closed, it shows the title only: in `dashboard-section-title` when
	 * `closedStyle="title"`, or in `eyebrow` when `closedStyle="eyebrow"`.
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
		subtitle?: string;
		closedStyle?: 'title' | 'eyebrow';
		value?: string;
		disabled?: boolean;
		mount?: ExpandableMount;
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		icon?: ExpandableIcon;
		header?: Snippet<[{ open: boolean }]>;
		openHeader?: Snippet;
		class?: string;
		/** Classes on the content box, e.g. a grid for cards. */
		contentClass?: string;
		children?: Snippet;
	}

	let {
		title = '',
		subtitle = '',
		closedStyle = 'title',
		value = undefined,
		disabled = false,
		mount = 'first-open',
		headingLevel = undefined,
		icon = undefined,
		header = undefined,
		openHeader = undefined,
		class: classes = '',
		contentClass = '',
		children: content
	}: Props = $props();
</script>

<ExpandableItem {value} {disabled} {mount} class={classNames('typeset-product', classes)}>
	{#snippet children({ open })}
		{@const small = !open && closedStyle === 'eyebrow'}
		<ExpandableTrigger
			{headingLevel}
			{icon}
			iconClass={small ? 'h-5 w-5' : 'h-6 w-6'}
			class={classNames(
				'border-t border-color-border-wash pt-4',
				small ? 'eyebrow' : 'dashboard-section-title'
			)}
		>
			{#snippet children()}
				{#if open && openHeader}
					{@render openHeader()}
				{:else if header}
					{@render header({ open })}
				{:else}
					<span class="block">{title}</span>
					{#if open && subtitle}
						<span class="dashboard-section-subtitle block">{subtitle}</span>
					{/if}
				{/if}
			{/snippet}
		</ExpandableTrigger>
		<ExpandableContent class={classNames('pt-4', contentClass)}>
			{@render content?.()}
		</ExpandableContent>
	{/snippet}
</ExpandableItem>
