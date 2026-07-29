<script lang="ts">
	/**
	 * `TitleGroup` — the titling cluster for cards, panels and chrome. Up to three
	 * stacked parts: an optional eyebrow, a title, and an optional subtitle.
	 *
	 * `emphasis` sets how much prominence the title carries (the primary-slot rule),
	 * following the library's standard emphasis axis (as on `Button`):
	 * - `primary` — the title owns its container's primary slot. Rendered at the
	 *   `title` role (Semibold, primary colour). May carry an `eyebrow` above and/or
	 *   a `subtitle` below (both recessive/muted).
	 * - `secondary` — the title yields the primary slot and renders as an `eyebrow`
	 *   only (a quiet label above the content, secondary colour). No subtitle.
	 *
	 * Which emphasis applies is decided by the container (the primary-slot rule),
	 * not chosen on the instance for visual effect.
	 *
	 * The type roles (`title`/`subtitle`/`eyebrow`) resolve inside a `product` or
	 * `chart` context ancestor (e.g. `Card`, `ChartContainer`). Colour is bound
	 * explicitly so the cluster reads correctly regardless of surface.
	 *
	 * @component
	 */
	import { classNames } from '../utils/classNames.js';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		emphasis?: 'primary' | 'secondary';
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		emphasis = 'primary',
		class: classes = ''
	}: Props = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if emphasis === 'secondary'}
	{#if title}
		<p class={classNames('eyebrow text-color-text-muted', classes)}>{@html title}</p>
	{/if}
{:else}
	<!--
		4px construction gap (= product/tight). The owl companion-coupling rules
		(flow.cjs) don't cover the bare product `.title` role, so the cluster spaces
		itself rather than relying on a flow context.
	-->
	<div class={classNames('flex flex-col gap-1', classes)}>
		{#if eyebrow}
			<p class="eyebrow text-color-text-muted">{@html eyebrow}</p>
		{/if}
		{#if title}
			<div class="title text-color-text">{@html title}</div>
		{/if}
		{#if subtitle}
			<p class="subtitle text-color-text-muted">{@html subtitle}</p>
		{/if}
	</div>
{/if}
<!-- eslint-enable svelte/no-at-html-tags -->
