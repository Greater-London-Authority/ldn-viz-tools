<script lang="ts" module>
	export {
		EnhancedImage as img,
		MarkdownLink as a,
		MarkdownPre as pre,
		MarkdownTable as table
	} from '@ldn-viz/ui';
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import { setMarkdownImages, setMarkdownLinkResolver, type ImageModules } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';

	const images = import.meta.glob(
		'$lib/assets/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	) as ImageModules;

	setMarkdownImages(images);
	setMarkdownLinkResolver(resolve);

	let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
