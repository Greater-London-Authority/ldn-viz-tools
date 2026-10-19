<script lang="ts">
	/**
	 * `DashboardTitle` — the top-level title of a dashboard.
	 *
	 * Sits at the top of the product titling ladder, above
	 * [SectionTitle](./?path=/docs/ui-components-titlegroup-sectiontitle--documentation).
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

<div class={classNames('flow-standard typeset-product', classes)}>
	{#if eyebrow}
		<p class="eyebrow text-color-text-muted">{eyebrow}</p>
	{/if}
	{#if title}
		<h1 class="headline-md text-color-text">{title}</h1>
	{/if}
	{#if subtitle}
		<p class="subtitle-sm text-color-text-muted">{subtitle}</p>
	{/if}
</div>
