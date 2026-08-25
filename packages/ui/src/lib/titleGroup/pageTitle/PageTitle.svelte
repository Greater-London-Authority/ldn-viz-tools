<script lang="ts">
	/**
	 * `PageTitle` — the hero title of a prose page.
	 *
	 * May have multiple [SectionBreak](./?path=/docs/ui-components-titlegroup-sectionbreak-documentation)
	 * headings beneath it.
	 *
	 * This component exists as a convenience wrapper as correct element structure within a flow container would produce the same result
	 *
	 * @component
	 */
	import { classNames } from '../../utils/classNames.js';

	interface Props {
		title?: string;
		subhead?: string;
		eyebrow?: string;
		class?: string;
		hero?: 'headline' | 'display';
	}

	let {
		title = '',
		subhead = '',
		eyebrow = '',
		hero = 'headline',
		class: classes = ''
	}: Props = $props();
</script>

<div class={classNames('flow-prose prose', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class={`${hero} text-color-text`}>{title}</h1>
	{/if}
	{#if subhead}
		<p class="subhead text-color-text-muted">{subhead}</p>
	{/if}
</div>
