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

	let labelRole = $derived(size === 'lg' ? 'label' : 'label-sm');
</script>

<div class={classNames('product space-y-1')} data-testid="metric">
	{#if label}
		<p class={classNames(labelRole, 'text-color-text-muted')}>{label}</p>
	{/if}

	<div class={classNames('flex', layout === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-1')}>
		<div data-testid="metric-primary">
			{@render primary()}
		</div>

		<!-- N.B Micro adjustments of margin required below to line things up visually across breakpoints -->
		<div
			class={classNames(
				'flex',
				layout === 'vertical' ? 'flex-row gap-1' : '-mt-1 flex-col sm:-mt-0.5 md:mt-0 xl:mt-1'
			)}
			data-testid="metric-secondary"
		>
			{@render secondary()}
		</div>
	</div>
</div>
