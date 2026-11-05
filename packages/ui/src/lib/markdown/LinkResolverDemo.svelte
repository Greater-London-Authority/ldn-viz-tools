<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setMarkdownLinkResolver, type LinkResolver } from './linkResolver';

	let { resolve, children }: { resolve: LinkResolver; children: Snippet } = $props();

	// Context is read once when MarkdownLink mounts, so the resolver doesn't need to update
	// svelte-ignore state_referenced_locally
	setMarkdownLinkResolver(resolve);
</script>

{@render children()}
