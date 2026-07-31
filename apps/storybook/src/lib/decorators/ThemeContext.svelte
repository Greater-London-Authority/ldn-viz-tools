<script lang="ts">
	import { Theme } from '@ldn-viz/ui';

	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Theme />

{@render children?.()}
