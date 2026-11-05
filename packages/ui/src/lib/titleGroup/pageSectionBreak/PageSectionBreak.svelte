<script lang="ts">
	/**
	 * `PageSectionBreak` — marks a new section within a longform page.
	 *
	 * May appear several times down a page, one per section, one level below
	 * [PageTitle](./?path=/docs/ui-components-layout-and-themes-titlegroup-longform-pagetitle--documentation).
	 * `size` sets the title and subtitle roles together: `title-{size}` and `subtitle-{size}`.
	 *
	 * This component exists as a convenience wrapper as correct element structure within a flow container would produce the same result
	 *
	 * @component
	 */
	import { classNames } from '../../utils/classNames.js';

	interface Props {
		title?: string;
		subtitle?: string;
		eyebrow?: string;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		eyebrow = '',
		size = 'lg',
		class: classes = ''
	}: Props = $props();
</script>

<div class={classNames('typeset-longform', classes)}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	{#if title}
		<h2 class={`title-${size}`}>{title}</h2>
	{/if}
	{#if subtitle}
		<p class={`subtitle-${size}`}>{subtitle}</p>
	{/if}
</div>
