<script lang="ts">
	/**
	 * `Expandable.Trigger` — the button that opens and closes its item.
	 *
	 * - `row`: the whole row is the button, holding `children` and the icon. Keep
	 *   `children` free of links and buttons, because a button can't contain them.
	 * - `icon`: an icon-only button. `label` is its accessible name.
	 * - `text`: a text button, showing `label` when closed and `openLabel` when open.
	 *
	 * Use `icon` or `text` when the visible summary holds interactive content, and lay the
	 * summary out beside the trigger.
	 *
	 * `icon` takes an icon source, a snippet given `{ open }`, or `null` for no icon. The
	 * default chevron turns over when the item opens. The icon is centred on the first line
	 * of the trigger's text, so a typography class on the trigger also places the icon.
	 *
	 * @component
	 */
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Accordion } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';
	import { getItemContext, type ExpandableIcon } from './context.js';

	interface Props {
		variant?: 'row' | 'icon' | 'text';
		/** Wraps the trigger in a heading of this level. Leave unset for no heading. */
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		icon?: ExpandableIcon;
		iconPosition?: 'start' | 'end';
		/** Size classes for an icon source. */
		iconClass?: string;
		/** Accessible name for `icon`; visible text for `text`. */
		label?: string;
		/** Visible text for `text` when the item is open. */
		openLabel?: string;
		class?: string;
		children?: Snippet<[{ open: boolean }]>;
	}

	let {
		variant = 'row',
		headingLevel = undefined,
		icon = ChevronDown,
		iconPosition = 'end',
		iconClass = 'h-5 w-5',
		label = 'Show details',
		openLabel = 'Hide details',
		class: classes = '',
		children
	}: Props = $props();

	const item = getItemContext();
</script>

{#snippet iconSlot()}
	{#if icon !== null}
		<span
			class="flex h-[1lh] shrink-0 items-center text-color-text-muted group-hover:text-color-text"
			aria-hidden="true"
		>
			{#if typeof icon === 'function'}
				{@render icon({ open: item.open })}
			{:else}
				<Icon
					src={icon}
					theme="mini"
					class={classNames(
						iconClass,
						'transition-transform duration-200 motion-reduce:transition-none',
						item.open ? 'rotate-180' : ''
					)}
				/>
			{/if}
		</span>
	{/if}
{/snippet}

{#snippet button()}
	{#if variant === 'row'}
		<Accordion.Trigger
			class={classNames(
				'group flex w-full cursor-pointer items-start gap-4 text-left text-color-text',
				iconPosition === 'end' ? 'justify-between' : '',
				classes
			)}
		>
			{#if iconPosition === 'start'}{@render iconSlot()}{/if}
			<span class="min-w-0 flex-1">{@render children?.({ open: item.open })}</span>
			{#if iconPosition === 'end'}{@render iconSlot()}{/if}
		</Accordion.Trigger>
	{:else if variant === 'icon'}
		<Accordion.Trigger
			class={classNames(
				'group inline-flex shrink-0 cursor-pointer items-center justify-center p-1',
				classes
			)}
		>
			{@render iconSlot()}
			<span class="sr-only">{label}</span>
		</Accordion.Trigger>
	{:else}
		<Accordion.Trigger
			class={classNames(
				'label-md group inline-flex cursor-pointer items-center gap-1 text-color-interactive-primary-text hover:text-color-interactive-primary-text-hover',
				iconPosition === 'start' ? 'flex-row-reverse' : '',
				classes
			)}
		>
			<span>{item.open ? openLabel : label}</span>
			{@render iconSlot()}
		</Accordion.Trigger>
	{/if}
{/snippet}

{#if headingLevel}
	<Accordion.Header level={headingLevel}>{@render button()}</Accordion.Header>
{:else}
	{@render button()}
{/if}
