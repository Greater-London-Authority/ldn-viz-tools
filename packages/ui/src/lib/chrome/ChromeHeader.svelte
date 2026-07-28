<script lang="ts">
	/**
	 * `ChromeHeader` — the header row shared by `Card` and `ChartContainer`.
	 * Composes a `TitleGroup` (eyebrow / title / subtitle) on the left and an
	 * optional hint affordance on the right, justified apart.
	 *
	 * `hint` may be a string (rendered as an information icon carrying the text as
	 * its tooltip) or a snippet for full control (e.g. a modal trigger). Renders
	 * nothing when it has no title, subtitle, eyebrow or hint.
	 *
	 * @component
	 */
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames.js';
	import TitleGroup from './TitleGroup.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		treatment?: 'dominant' | 'demoted';
		hint?: string | Snippet;
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		treatment = 'dominant',
		hint,
		class: klass = ''
	}: Props = $props();
</script>

{#if title || subtitle || eyebrow || hint}
	<div class={classNames('flex items-start justify-between gap-2', klass)}>
		<TitleGroup {title} {subtitle} {eyebrow} {treatment} />
		{#if hint}
			<div class="shrink-0 pt-0.5">
				{#if typeof hint === 'string'}
					<span class="text-color-text-muted" title={hint} aria-label={hint}>
						<Icon src={InformationCircle} theme="mini" class="h-[18px] w-[18px]" />
					</span>
				{:else}
					{@render hint()}
				{/if}
			</div>
		{/if}
	</div>
{/if}
