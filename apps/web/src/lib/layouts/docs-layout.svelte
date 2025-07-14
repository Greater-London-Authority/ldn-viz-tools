<script lang="ts">
	import DocsSidebar from './docs-sidebar.svelte';

	let { children, navigation } = $props();
</script>

<!-- TODO: This should be handled by app shell? -->

<div class="flex space-x-24 p-4">
	<DocsSidebar {navigation} />
	<div class="prose responsive">
		{@render children?.()}
	</div>
</div>
