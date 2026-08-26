<script lang="ts" module>
	export { default as a } from '$lib/components/markdown/a.svelte';
	export { default as img } from '$lib/components/enhancedImage/EnhancedImage.svelte';
	export { default as pre } from '$lib/components/markdown/pre.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
