<script lang="ts">
	import DocsShell from '$lib/layouts/DocsShell.svelte';
	import { navigation } from '$lib/navigation';

	let { children } = $props();
</script>

<DocsShell {navigation}>
	{@render children()}
</DocsShell>
