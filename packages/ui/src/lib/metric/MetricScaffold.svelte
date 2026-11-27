<script lang="ts">
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames';

	type Props = {
		/** Supporting label above the figure, e.g. "Population". */
		label?: string;

		/** Determines whether parts are stacked vertically or horizontally. */
		layout?: 'vertical' | 'horizontal';

		/** The primary contents.*/
		primary: Snippet;

		/** The secondary contents */
		secondary: Snippet;

		/** Size of the metric. */
		size?: 'lg' | 'sm';
	};

	let { label, primary, secondary, layout = 'vertical', size }: Props = $props();

	let labelRole = $derived(size === 'lg' ? 'label-md' : 'label-sm');
	let horizontal = $derived(layout === 'horizontal');
</script>

<div class="typeset-product" data-testid="metric">
	{#if label}
		<p class={classNames(labelRole, 'text-color-text-muted')}>{label}</p>
	{/if}

	<!--
		Horizontal layout: the label sits on its own row above, so it never sets the width of the
		figure. The secondary lines use a tighter line height, and the row aligns on the last
		baseline, so the comparison line shares the figure's baseline.
	-->
	<div
		class={classNames(
			'flex',
			horizontal ? 'flex-row gap-x-2 [align-items:last_baseline]' : 'flex-col gap-1'
		)}
	>
		<div data-testid="metric-primary">
			{@render primary()}
		</div>

		<div
			class={classNames(
				'flex',
				horizontal
					? '-mt-1 flex-col [--label-md-line-height:1] [--label-sm-line-height:1]'
					: 'flex-row items-baseline gap-1'
			)}
			data-testid="metric-secondary"
		>
			{@render secondary()}
		</div>
	</div>
</div>
