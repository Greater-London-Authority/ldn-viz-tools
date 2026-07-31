<script lang="ts">
	import DisplayHeader from '$lib/components/bannerHeader/DisplayHeader.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<DisplayHeader
	title={data.metadata.title}
	subTitle={data.metadata.description}
	src={data.metadata.heroImage}
/>
<div class="container mx-auto py-8">
	<div class="prose flow-prose">
		<PageComponent />
	</div>
</div>
