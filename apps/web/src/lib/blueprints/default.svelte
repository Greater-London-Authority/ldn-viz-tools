<script lang="ts" module>
	export { default as img } from '$lib/components/markdown/img.svelte';
	export { default as pre } from '$lib/components/markdown/pre.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
