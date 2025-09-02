<script lang="ts">
	import Swatch from './Swatch.svelte';

	let { tokenData, title } = $props();
</script>

{#if title}
	<h3 class="title-sm">{title}</h3>
{/if}
<div class=" grid grid-cols-2 gap-4 pb-8 pt-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
	{#each tokenData as token}
		<Swatch {...token} />
	{/each}
</div>
