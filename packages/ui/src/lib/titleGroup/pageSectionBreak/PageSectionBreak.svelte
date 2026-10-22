<script lang="ts">
	/**
	 * `PageSectionBreak` — marks a new section within a longform page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-layout-and-themes-titlegroup-longform-pagetitle--documentation), one level below the page's title.
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
		class?: string;
	}

	let { title = '', subtitle = '', eyebrow = '', class: classes = '' }: Props = $props();
</script>

<div class={classNames('typeset-longform', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h2 class="headline-lg text-color-text">{title}</h2>
	{/if}
	{#if subtitle}
		<p class="subtitle-sm text-color-text-muted">{subtitle}</p>
	{/if}
</div>
