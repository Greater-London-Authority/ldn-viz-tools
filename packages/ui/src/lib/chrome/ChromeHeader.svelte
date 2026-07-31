<script lang="ts">
	/**
	 * `ChromeHeader` — the header row shared by `Card`, `ChartContainer` and
	 * `TableContainer`. Composes a `TitleGroup` (eyebrow / title / subtitle) on the
	 * left and an optional hint affordance on the right, justified apart.
	 *
	 * `hint` may be a string or a snippet:
	 * - **string** — rendered as an information-icon trigger that opens an `Overlay`
	 *   carrying the text. `hintType` selects the overlay form (`tooltip` default,
	 *   `popover`, or `modal`); `hintTitle` sets the modal heading when
	 *   `hintType="modal"`.
	 * - **snippet** — full control (e.g. a bespoke `Overlay`/trigger); rendered as-is.
	 *
	 * Renders nothing when it has no title, subtitle, eyebrow or hint.
	 *
	 * @component
	 */
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import { classNames } from '../utils/classNames.js';
	import TitleGroup from './TitleGroup.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		emphasis?: 'primary' | 'secondary';
		/** Help affordance on the right: a string (opens an `Overlay`) or a snippet for full control. */
		hint?: string | Snippet;
		/** Overlay form used when `hint` is a string. */
		hintType?: 'tooltip' | 'popover' | 'modal';
		/** Modal heading when `hintType="modal"`. */
		hintTitle?: string;
		/** Accessible label for the hint trigger (also the modal/popover trigger text if shown). */
		hintLabel?: string;
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		emphasis = 'primary',
		hint,
		hintType = 'tooltip',
		hintTitle = undefined,
		hintLabel = 'More information',
		class: classes = ''
	}: Props = $props();
</script>

{#snippet hintTrigger(props: Record<string, any>)}
	<Trigger {...props} size="xs" variant="text" emphasis="secondary" slim {hintLabel}>
		<span class="text-color-text-muted">
			<Icon src={InformationCircle} theme="mini" class="h-[18px] w-[18px]" aria-hidden="true" />
		</span>
		<span class="sr-only">{hintLabel}</span>
	</Trigger>
{/snippet}

{#if title || subtitle || eyebrow || hint}
	<div class={classNames('flex items-start justify-between gap-2', classes)}>
		<TitleGroup {title} {subtitle} {eyebrow} {emphasis} />
		{#if hint}
			<div class="shrink-0 pt-0.5">
				{#if typeof hint === 'string'}
					<Overlay overlayType={hintType} modalTitle={hintTitle} {hintLabel} trigger={hintTrigger}>
						{hint}
					</Overlay>
				{:else}
					{@render hint()}
				{/if}
			</div>
		{/if}
	</div>
{/if}
