<script lang="ts">
	/**
	 * `DashboardSectionTitle` — groups a run of cards or panels within a dashboard, a
	 * mid-dashboard heading.
	 *
	 * Sits one step below [DashboardTitle](.?path=/docs/ui-components-layout-and-themes-titlegroup-product-dashboardtitle--documentation);
	 * may appear several times down a page.
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

<div class={classNames('typeset-product flow-standard', classes)}>
	{#if eyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	{#if title}
		<h2 class="dashboard-section-title">{title}</h2>
	{/if}
	{#if subtitle}
		<p class="dashboard-section-subtitle">{subtitle}</p>
	{/if}
</div>
