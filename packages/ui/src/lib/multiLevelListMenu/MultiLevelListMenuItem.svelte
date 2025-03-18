<script lang="ts">
	export let item: { id: string; title: string; children?: [] };
</script>

<li>
	<a id={item.id}>{item.title}</a>

	{#if item.children}
		<ul class="bg-blue-100">
			{#each item.children as child}
				<svelte:self item={child} />
			{/each}
		</ul>
	{/if}
</li>
