<script lang="ts">
	import BannerHeader from '$lib/components/bannerHeader/BannerHeader.svelte';
	import DisplayHeader from '$lib/components/bannerHeader/DisplayHeader.svelte';
	import Toc from '$lib/components/toc/Toc.svelte';
	import { classNames } from '@ldn-viz/ui';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);

	let wrapperClass = $derived(
		classNames('flow-prose prose', data.metadata.layout === 'index' ? 'max-w-full' : '')
	);
</script>

{#if data.metadata.layout === 'index'}
	<DisplayHeader
		title={data.metadata.title}
		subTitle={data.metadata.description}
		src={data.metadata.heroImage}
	/>
{:else}
	<BannerHeader
		title={data.metadata.title}
		subTitle={data.metadata.description}
		src={data.metadata.heroImage}
	/>
{/if}

<div class="container mx-auto pt-spacing-5xl">
	<div class="flex justify-between">
		<div class={wrapperClass}>
			<PageComponent />
		</div>
		<Toc toc={{ items: tocItems }} />
	</div>
</div>
