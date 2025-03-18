<script lang="ts">
	export let item: { id: string; title: string; children?: []; isExpanded?: boolean };
</script>

<li class={item.isExpanded ? 'text-red-500' : 'text-color-text-primary'}>
	<a id={item.id}>{item.title}</a>

	{#if item.children}
		<ul>
			{#each item.children as child}
				<svelte:self item={child} />
			{/each}
		</ul>
	{/if}
</li>
