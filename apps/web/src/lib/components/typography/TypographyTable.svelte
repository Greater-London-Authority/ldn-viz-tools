<script lang="ts">
	import TypographyRow from './TypographyRow.svelte';

	let { items } = $props();
</script>

<div class="my-8">
	<div class="grid grid-cols-2 text-color-text-secondary">
		<div><p>Example</p></div>
		<div><p>Usage</p></div>
	</div>
	{#each items as item}
		<TypographyRow {...item} />
	{/each}
</div>
