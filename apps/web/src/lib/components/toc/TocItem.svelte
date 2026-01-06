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
		class={`hover:text-color-action-primary-hover text-color-text-secondary text-sm hover:underline ${highlighted ? 'text-color-ui-primary' : 'text-color-text-secondary'}`}
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
