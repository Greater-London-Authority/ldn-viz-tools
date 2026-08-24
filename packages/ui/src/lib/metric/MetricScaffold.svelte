<script lang="ts">
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames';

	type Props = {
		label: string;
		layout?: 'vertical' | 'horizontal';

		primary: Snippet;
		secondary: Snippet;

		class?: string;

		/** Size of the metric. */
		size?: 'lg' | 'sm';
	};

	let { label, primary, secondary, layout, class: classes = '', size }: Props = $props();

	let labelRole = $derived(size === 'lg' ? 'label' : 'label-sm');
</script>

<div
	class={classNames(
		'product flex',
		layout === 'vertical' ? 'flex-col items-start gap-1' : 'flex-row items-baseline gap-2',
		classes
	)}
>
	{#if label}
		<p class={classNames(labelRole, 'text-color-text-muted')}>{label}</p>
	{/if}

	<div class="flex items-baseline gap-1">
		{@render primary()}
	</div>

	<div class="flex items-baseline gap-1">
		{@render secondary()}
	</div>
</div>
