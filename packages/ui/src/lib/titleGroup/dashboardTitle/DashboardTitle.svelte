<script lang="ts">
	/**
	 * `DashboardTitle` — the top-level title of a dashboard.
	 *
	 * Sits at the top of the product titling ladder, above
	 * [SectionTitle](./?path=/docs/ui-components-titlegroup-sectiontitle--documentation).
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

<div
	class={classNames(
		'product flex flex-col items-start border-t border-color-border-muted py-2',
		classes
	)}
>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class="page-head text-color-text">{title}</h1>
	{/if}
	{#if subtitle}
		<p class="subtitle text-color-text-muted">{subtitle}</p>
	{/if}
</div>
