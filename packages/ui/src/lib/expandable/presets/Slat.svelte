<script lang="ts">
	/**
	 * `Slat` — a compact card that summarises something in one row and can open to show
	 * details. Without `children` it is a static row with no toggle.
	 *
	 * The row has a `TitleGroup` on the left and the `summary` snippet on the right, for
	 * metrics, a small chart or tags. `header` replaces the whole row and is given
	 * `{ open }`. `openHeader` replaces it only while open.
	 *
	 * The row is not a button, so it can hold links, buttons and tooltips. A separate toggle
	 * opens the slat: an icon at the end of the row (`toggle="icon"`) or a "Show details"
	 * button below it (`toggle="text"`).
	 *
	 * @component
	 */
	import type { Snippet } from 'svelte';
	import TitleGroup from '../../chrome/TitleGroup.svelte';
	import { classNames } from '../../utils/classNames.js';
	import type { ExpandableIcon, ExpandableMount } from '../context.js';
	import ExpandableContent from '../ExpandableContent.svelte';
	import ExpandableItem from '../ExpandableItem.svelte';
	import ExpandableTrigger from '../ExpandableTrigger.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		summary?: Snippet<[{ open: boolean }]>;
		header?: Snippet<[{ open: boolean }]>;
		openHeader?: Snippet;
		toggle?: 'icon' | 'text';
		icon?: ExpandableIcon;
		/** Toggle text for `toggle="text"`, closed and open. */
		toggleLabel?: string;
		toggleOpenLabel?: string;
		value?: string;
		disabled?: boolean;
		mount?: ExpandableMount;
		class?: string;
		children?: Snippet;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		headingLevel = undefined,
		summary = undefined,
		header = undefined,
		openHeader = undefined,
		toggle = 'icon',
		icon = undefined,
		toggleLabel = 'Show details',
		toggleOpenLabel = 'Hide details',
		value = undefined,
		disabled = false,
		mount = 'first-open',
		class: classes = '',
		children: details
	}: Props = $props();

	const surface = $derived(
		classNames(
			'typeset-product elevation-1 border border-color-border-wash bg-color-surface p-4 text-color-text',
			classes
		)
	);
</script>

{#snippet row(open: boolean)}
	{#if open && openHeader}
		{@render openHeader()}
	{:else if header}
		{@render header({ open })}
	{:else}
		<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
			<TitleGroup {title} {subtitle} {eyebrow} {headingLevel} />
			{#if summary}
				<div class="flex flex-wrap items-center gap-x-6 gap-y-2">{@render summary({ open })}</div>
			{/if}
		</div>
	{/if}
{/snippet}

{#if !details}
	<div class={surface}>{@render row(false)}</div>
{:else}
	<ExpandableItem {value} {disabled} {mount} class={surface}>
		{#snippet children({ open })}
			<div class="flex items-start gap-4">
				<div class="min-w-0 flex-1">{@render row(open)}</div>
				{#if toggle === 'icon'}
					<ExpandableTrigger
						variant="icon"
						{icon}
						label={title ? `Details for ${title}` : 'Details'}
						class="-mr-1"
					/>
				{/if}
			</div>
			{#if toggle === 'text'}
				<div class="mt-2">
					<ExpandableTrigger
						variant="text"
						{icon}
						label={toggleLabel}
						openLabel={toggleOpenLabel}
					/>
				</div>
			{/if}
			<ExpandableContent class="pt-4">{@render details()}</ExpandableContent>
		{/snippet}
	</ExpandableItem>
{/if}
