<script lang="ts">
	/**
	 * `PageSectionBreak` — marks a new section within a long-form prose page.
	 *
	 * May appear several times down a page, one per section; sits below
	 * [PageTitle](./?path=/docs/ui-components-titlegroup-pagetitle--documentation)'s hero in the prose titling ladder.
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

<div class={classNames('flow-prose prose', classes)}>
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
