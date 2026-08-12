<script lang="ts">
	/**
	 * `SectionBreak` — marks a new section within a long-form prose page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-titlegroup-pagetitle--documentation)'s hero in the prose titling ladder.
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

<div class={classNames('prose flex flex-col items-start', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h2 class="title-1 text-color-text">{title}</h2>
	{/if}
	{#if subtitle}
		<p class="subtitle text-color-text-muted">{subtitle}</p>
	{/if}
</div>
