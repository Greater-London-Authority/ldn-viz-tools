<script lang="ts">
	import BannerHeader from '$lib/components/bannerHeader/BannerHeader.svelte';
	import DisplayHeader from '$lib/components/bannerHeader/DisplayHeader.svelte';
	import Toc from '$lib/components/toc/Toc.svelte';
	import { classNames } from '@ldn-viz/ui';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);

	let wrapperClass = $derived(
		// min-w-0 lets the column shrink beside the contents list, so wide code
		// blocks scroll inside it. Index pages lay out cards, not running text,
		// so they lift the reading measure.
		classNames(
			'typeset-longform min-w-0 flex-1',
			data.metadata.layout === 'index' ? '[--readable-width:none]' : ''
		)
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

<div class="flow-spacious container mx-auto pt-8">
	<div class="flex justify-between">
		<div class={wrapperClass}>
			<PageComponent />
		</div>
		<Toc toc={{ items: tocItems }} />
	</div>
</div>
