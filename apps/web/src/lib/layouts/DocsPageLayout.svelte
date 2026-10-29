<script lang="ts">
	import BannerHeader from '$lib/components/bannerHeader/BannerHeader.svelte';
	import Toc from '$lib/components/toc/Toc.svelte';
	import type { Snippet } from 'svelte';

	let { metadata, children }: { metadata: Record<string, any>; children: Snippet } = $props();
</script>

<BannerHeader title={metadata.title} subTitle={metadata.description} src={metadata.heroImage} />

<div class="container">
	<div class="flex justify-between">
		<!-- min-w-0 lets the column shrink beside the contents list, so wide code
		blocks scroll inside it. -->
		<div class="typeset-longform min-w-0 flex-1 pt-10">
			{@render children()}
		</div>
		<Toc toc={{ items: metadata.toc }} />
	</div>
</div>
