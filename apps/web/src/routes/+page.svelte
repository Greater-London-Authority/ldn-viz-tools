<script lang="ts">
	import HomeLayout from '$lib/layouts/HomeLayout.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<HomeLayout metadata={data.metadata}>
	<PageComponent />
</HomeLayout>
