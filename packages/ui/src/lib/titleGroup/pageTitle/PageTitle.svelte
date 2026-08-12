<script lang="ts">
	/**
	 * `PageTitle` — the hero title of a prose page.
	 *
	 * May have multiple [SectionBreak](./?path=/docs/ui-components-titlegroup-sectionbreak-documentation)
	 * headings beneath it.
	 * @component
	 */
	import { classNames } from '../../utils/classNames.js';

	interface Props {
		title?: string;
		subhead?: string;
		eyebrow?: string;
		class?: string;
	}

	let { title = '', subhead = '', eyebrow = '', class: classes = '' }: Props = $props();
</script>

<div class={classNames('prose flex flex-col items-start', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class={'display text-color-text'}>{title}</h1>
	{/if}
	{#if subhead}
		<p class="subhead text-color-text-muted">{subhead}</p>
	{/if}
</div>
