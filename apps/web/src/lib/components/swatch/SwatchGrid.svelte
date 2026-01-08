<script lang="ts">
	import { classNames } from '@ldn-viz/ui';
	import Swatch from './Swatch.svelte';

	let { tokenData, title, size = 'md' } = $props();

	const sizeClasses = {
		// xs: 'grid grid-cols-6 gap-1 pb-4 pt-2 md:grid-cols-9 xl:grid-cols-11',
		xs: 'flex flex-wrap gap-1 pb-2',
		sm: 'grid grid-cols-2 gap-4 pb-8 pt-2 md:grid-cols-4',
		md: 'grid grid-cols-2 gap-4 pb-8 pt-2 md:grid-cols-4',
		lg: 'grid grid-cols-2 gap-4 pb-8 pt-2 md:grid-cols-4',
		xl: 'grid grid-cols-2 gap-4 pb-8 pt-2 md:grid-cols-4'
	};

	const gridClass = $derived(classNames(sizeClasses[size as keyof typeof sizeClasses]));
</script>

{#if title}
	<h3 class={size === 'xs' ? 'title-xs' : 'title-sm'}>{title}</h3>
{/if}

<div class={gridClass}>
	{#each tokenData as token}
		<Swatch {...token} {size} content={token.value} />
	{/each}
</div>
