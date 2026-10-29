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
<div class="typeset-longform container py-8">
	<PageComponent />
</div>
