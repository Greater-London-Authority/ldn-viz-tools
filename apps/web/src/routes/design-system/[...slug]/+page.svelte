<script lang="ts">
	import DocsIndexLayout from '$lib/layouts/DocsIndexLayout.svelte';
	import DocsPageLayout from '$lib/layouts/DocsPageLayout.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const Layout = $derived(data.layout === 'index' ? DocsIndexLayout : DocsPageLayout);
</script>

<Layout metadata={data.metadata}>
	<PageComponent />
</Layout>
