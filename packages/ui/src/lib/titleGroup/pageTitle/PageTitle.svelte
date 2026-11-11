<script lang="ts">
	/**
	 * `PageTitle` — the hero title of a longform page.
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

<div class={classNames('typeset-longform', classes)}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class={`${hero}-lg`}>{title}</h1>
	{/if}
	{#if subhead}
		<p class="subhead-lg">{subhead}</p>
	{/if}
</div>
