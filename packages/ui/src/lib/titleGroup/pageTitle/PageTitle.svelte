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
		/** Companion line under the heading. Only rendered when `hero` is `"headline"`. */
		subhead?: string;
		eyebrow?: string;
		hero?: 'display' | 'headline';
		class?: string;
	}

	let {
		title = '',
		subhead = '',
		eyebrow = '',
		hero = 'headline',
		class: classes = ''
	}: Props = $props();
</script>

<div class={classNames('prose flex flex-col items-start', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class={classNames(hero, 'text-color-text')}>{title}</h1>
	{/if}
	{#if hero === 'headline' && subhead}
		<p class="subhead text-color-text-muted">{subhead}</p>
	{/if}
</div>
