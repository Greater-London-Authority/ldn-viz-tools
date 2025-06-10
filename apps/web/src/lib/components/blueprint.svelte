<script lang="ts" module>
	// prettier-ignore
	export { default as h1 } from "$lib/components/markdown/h1.svelte";
	export { default as h2 } from '$lib/components/markdown/h2.svelte';
	export { default as p } from '$lib/components/markdown/p.svelte';
	export { default as a } from '$lib/components/markdown/a.svelte';
</script>

<script lang="ts">
	let { children } = $props();
</script>

<div class="prose responsive">
	{@render children?.()}
</div>
