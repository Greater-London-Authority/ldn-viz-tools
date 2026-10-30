<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';
	import EnhancedImage from './enhancedImage/EnhancedImage.svelte';

	type Props = {
		url: string;
		image: string;
		title: string;
		titleClass: 'title-lg' | 'card-title';
		cta?: string;
		children?: Snippet;
	};
	const {
		url,
		image,
		title,
		titleClass = 'card-title',
		children,
		cta = 'Read more'
	}: Props = $props();

	// `url` may be an internal route (needs resolving against the base path) or an
	// absolute external link / mailto, which must be passed through untouched.
	const isExternal = $derived(/^([a-z][a-z\d+.-]*:|\/\/)/i.test(url));
	const href = $derived(isExternal ? url : resolve(url, {}));

	const buttonMargin = $derived(children ? '' : '!mt-0 mb-2');
</script>

<div class="flow-standard">
	<a {href} target={isExternal ? '_blank' : undefined}>
		<EnhancedImage src={image} />
	</a>
	<h3 class={titleClass}>{title}</h3>
	{@render children?.()}
	<Button
		{href}
		target={isExternal ? '_blank' : undefined}
		variant="text"
		slim
		emphasis="secondary"
		class={buttonMargin}
	>
		{cta}
	</Button>
</div>
