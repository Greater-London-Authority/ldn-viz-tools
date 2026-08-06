<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import EnhancedImage from './enhancedImage/EnhancedImage.svelte';

	type Props = {
		url: string;
		image: string;
		title: string;
		children?: Snippet;
	};
	const { url, image, title, children }: Props = $props();
</script>

<div class="flow-product">
	<a href={resolve(url, {})}>
		<EnhancedImage src={image} />
	</a>
	<h3 class="title-3">{title}</h3>
	{@render children?.()}
	<Button href={resolve(url, {})} variant="text" slim emphasis="secondary">Read more</Button>
</div>
