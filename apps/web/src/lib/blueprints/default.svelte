<script lang="ts" module>
	export { MarkdownLink as a, MarkdownPre as pre, MarkdownTable as table } from '@ldn-viz/ui';
	export { default as img } from '$lib/components/enhancedImage/EnhancedImage.svelte';
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { setMarkdownLinkResolver } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';

	setMarkdownLinkResolver(resolve);

	let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
