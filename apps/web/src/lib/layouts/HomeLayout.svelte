<script lang="ts">
	import DisplayHeader from '$lib/components/bannerHeader/DisplayHeader.svelte';
	import type { Snippet } from 'svelte';

	let { metadata, children }: { metadata: Record<string, any>; children: Snippet } = $props();
</script>

<DisplayHeader title={metadata.title} subTitle={metadata.description} src={metadata.heroImage} />
<div class="typeset-longform container py-10">
	{@render children()}
</div>
