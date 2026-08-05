<script lang="ts">
	import { classNames, CopyButton, ThemeSwitcher } from '@ldn-viz/ui';
	import Swatch from './Swatch.svelte';

	interface SwatchGridProps {
		tokenData: { [key: string]: any };
		title: string;
		size: keyof typeof sizeClasses;
	}

	let { tokenData, title, size = 'md' }: SwatchGridProps = $props();

	const sizeClasses = {
		// xs: 'grid grid-cols-6 gap-1 pb-4 pt-2 md:grid-cols-9 xl:grid-cols-11',
		xs: 'flex flex-wrap gap-1 pb-2',
		sm: 'grid grid-cols-2 gap-4 pb-2 pt-2 md:grid-cols-4',
		md: 'grid grid-cols-2 gap-4 pb-2 pt-2 md:grid-cols-4',
		lg: 'grid grid-cols-2 gap-4 pb-2 pt-2 md:grid-cols-4',
		xl: 'grid grid-cols-2 gap-4 pb-2 pt-2 md:grid-cols-4'
	};

	const gridClass = $derived(classNames(sizeClasses[size as keyof typeof sizeClasses]));

	const tokensToHex = (tokensObj = []) => {
		return Object.values(tokensObj).map((token) => token['value']);
	};

	let hex = $derived(tokensToHex(tokenData));
</script>

{#if title}
	<h3 class={`${size === 'xs' ? 'title-4' : 'title-3'} mb-2`}>{title}</h3>
{/if}

<div class={gridClass}>
	{#each Object.values(tokenData) as token}
		<Swatch {...token} {size} content={token.value} />
	{/each}
</div>

<div class="flex pb-6">
	<div class="float-left flex-1 pr-4 pt-4">
		<CopyButton
			content={hex}
			label="Copy Hex Values"
			emphasis="secondary"
			variant="outline"
			size="sm"
		/>
	</div>

	<div class="flex-1 pt-4 text-right">
		<div class="float-right flex items-center pt-1">
			<span class="label-sm mr-2 text-color-label-muted">Mode</span>
			<ThemeSwitcher size="xs" />
		</div>
	</div>
</div>
