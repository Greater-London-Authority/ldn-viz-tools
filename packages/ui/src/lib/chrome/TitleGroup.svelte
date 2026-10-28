<script lang="ts">
	/**
	 * `TitleGroup` — the titling cluster for cards, panels and chrome. Up to three
	 * stacked parts: an optional eyebrow, a title, and an optional subtitle.
	 *
	 * `emphasis` sets how much prominence the title carries,
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
	 * The roles take their values from the nearest typeset (`Card` and
	 * `ChartContainer` set `typeset-product`). The title sets its colour
	 * explicitly; the `eyebrow` and `subtitle` roles are muted by their own class.
	 *
	 * @component
	 */
	import { classNames } from '../utils/classNames.js';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		emphasis?: 'primary' | 'secondary';
		/**
		 * The heading level of the title. Leave it unset for a title that isn't a heading.
		 */
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		emphasis = 'primary',
		headingLevel = undefined,
		class: classes = ''
	}: Props = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
{#if emphasis === 'secondary'}
	{#if title}
		<svelte:element
			this={headingLevel ? `h${headingLevel}` : 'p'}
			class={classNames('eyebrow', classes)}>{@html title}</svelte:element
		>
	{/if}
{:else}
	<!--
		No gap: the eyebrow / title / subtitle roles carry their own line-heights,
		which supply the optical spacing (Figma `TitleGroup` uses itemSpacing 0). A
		flex gap here would sit on top of that leading and read too loose.
	-->
	<div class={classNames('flex flex-col', classes)}>
		{#if eyebrow}
			<p class="eyebrow">{@html eyebrow}</p>
		{/if}
		{#if title}
			<svelte:element
				this={headingLevel ? `h${headingLevel}` : 'div'}
				class="title-sm text-color-text">{@html title}</svelte:element
			>
		{/if}
		{#if subtitle}
			<p class="subtitle-sm">{@html subtitle}</p>
		{/if}
	</div>
{/if}
<!-- eslint-enable svelte/no-at-html-tags -->
