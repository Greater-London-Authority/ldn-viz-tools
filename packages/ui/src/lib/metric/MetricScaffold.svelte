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

<div class={classNames('product space-y-1')}>
	{#if label}
		<p class={classNames(labelRole, 'text-color-text-muted')}>{label}</p>
	{/if}

	<div class={classNames('flex', layout === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-2')}>
		<div>
			{@render primary()}
		</div>

		<div
			class={classNames('flex', layout === 'vertical' ? 'flex-row items-center gap-1' : 'flex-col')}
		>
			{@render secondary()}
		</div>
	</div>
</div>
