<script lang="ts">
	import TocItem from './TocItem.svelte';

	interface TocItemProps {
		title: string;
		url: string;
		items?: TocItemProps[];
		level?: number;
		activeUrl?: string;
	}

	let { title, url, items = [], level = 1, activeUrl = '' }: TocItemProps = $props();

	let highlighted = $derived(activeUrl === url);
</script>

<li class="pl-4">
	<a
		href={url}
		class={`text-color-text-muted hover:text-color-interactive-primary-hover text-sm hover:underline ${highlighted ? 'text-color-interactive-primary' : 'text-color-text-muted'}`}
		>{title}</a
	>

	{#if items?.length}
		<ul>
			{#each items as item}
				<TocItem
					title={item.title}
					url={item.url}
					items={item.items}
					level={level + 1}
					{activeUrl}
				/>
			{/each}
		</ul>
	{/if}
</li>
