<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';
	import EnhancedImage from './enhancedImage/EnhancedImage.svelte';

	type Props = {
		url: string;
		image: string;
		title: string;
		cta?: string;
		children?: Snippet;
	};
	const { url, image, title, children, cta = 'Read more' }: Props = $props();
</script>

<div class="flow-product">
	<a href={resolve(url, {})}>
		<EnhancedImage src={image} />
	</a>
	<h3 class="title-3">{title}</h3>
	{@render children?.()}
	<Button href={resolve(url, {})} variant="text" slim emphasis="secondary">{cta}</Button>
</div>
