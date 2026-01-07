<script lang="ts">
	import GuideLayout from '$lib/layouts/GuideLayout.svelte';

	let { children } = $props();
</script>

<GuideLayout>
	{@render children()}
</GuideLayout>
