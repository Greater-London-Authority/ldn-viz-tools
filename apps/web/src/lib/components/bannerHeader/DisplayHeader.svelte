<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '@ldn-viz/ui';
	import { fade } from 'svelte/transition';

	interface BannerProps {
		title: string;
		subTitle?: string;
		src?: string;
		alt?: string;
	}

	let { title, subTitle, src = '', alt, ...restProps }: BannerProps = $props();

	// Glob import all Markdown images
	const imageModules = import.meta.glob(
		'$lib/assets/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	) as Record<string, { default: string }>;

	const getImage = (src: string) => {
		// Find the image module that matches the src
		const matchingPath = Object.keys(imageModules).find((path) => path.endsWith(src));
		return matchingPath ? imageModules[matchingPath].default : undefined;
	};

	const constructPath = (src: string, mode: string) => {
		const parts = src.split('.');
		return [parts.slice(0, -1), mode, '.', parts.slice(-1)].join('');
	};

	const baseImage = $derived(getImage(src));
	const lightImage = $derived(getImage(constructPath(src, '-light')));
	const darkImage = $derived(getImage(constructPath(src, '-dark')));
</script>

<div class="relative h-[500px] w-full bg-color-canvas-muted">
	{#key page.url.pathname}
		<div class="absolute inset-0" transition:fade={{ duration: 200 }}>
			{#if theme.currentMode === 'light' && lightImage}
				<enhanced:img src={lightImage} {alt} {...restProps} class="h-full w-full object-cover" />
			{:else if theme.currentMode === 'dark' && darkImage}
				<enhanced:img src={darkImage} {alt} {...restProps} class="h-full w-full object-cover" />
			{:else if baseImage}
				<enhanced:img src={baseImage} {alt} {...restProps} class="h-full w-full object-cover" />
			{:else if (!lightImage || !darkImage) && !baseImage}
				<img {src} {alt} {...restProps} class="h-full w-full object-cover" />
			{/if}
		</div>
	{/key}

	<div class="relative z-10 flex h-full items-center">
		<div class="container mx-auto">
			<div class="prose flow-prose">
				<p class="display">{title}</p>
				{#if subTitle}
					<p class="subhead">{subTitle}</p>
				{/if}
			</div>
		</div>
	</div>
</div>
