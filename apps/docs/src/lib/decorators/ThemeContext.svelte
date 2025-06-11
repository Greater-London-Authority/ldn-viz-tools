<script lang="ts">
	import Theme from '../../../../../packages/ui/src/lib/theme/Theme.svelte';

	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Theme />

{@render children?.()}
