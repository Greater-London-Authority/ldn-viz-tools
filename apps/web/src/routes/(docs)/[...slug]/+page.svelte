<script lang="ts">
	import BannerHeader from '$lib/components/bannerHeader/BannerHeader.svelte';
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<!-- TODO: adding container her is of course restrictive to items that may want to break out of the column -->

<!-- <div class="my-typography-spacing-xl">
	<p class="mb-0.5 text-xs uppercase tracking-widest text-color-surface-accent">Design system</p>
	<h1 class="headline format">{data.metadata.title}</h1>
	<p class="subhead format">
		{data.metadata.description}
	</p>
</div> -->
<BannerHeader title={data.metadata.title} subTitle={data.metadata.description} />
<!-- <div class="container flex p-0"> -->
<div class="container mx-auto">
	<div class="flex space-x-24">
		<div class="prose responsive w-full">
			<PageComponent />
		</div>
		<Toc toc={{ items: tocItems }} />
	</div>
</div>
