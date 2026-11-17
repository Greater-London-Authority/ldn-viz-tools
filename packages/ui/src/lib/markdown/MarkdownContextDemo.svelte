<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setMarkdownImages, type ImageModules } from './imageContext';
	import { setMarkdownLinkResolver, type LinkResolver } from './linkResolver';

	let {
		resolve,
		images,
		children
	}: { resolve?: LinkResolver; images?: ImageModules; children: Snippet } = $props();

	// Context is read once when each component mounts, so the values don't need to update
	// svelte-ignore state_referenced_locally
	if (resolve) setMarkdownLinkResolver(resolve);
	// svelte-ignore state_referenced_locally
	if (images) setMarkdownImages(images);
</script>

{@render children()}
