<script lang="ts">
	import { theme } from '@ldn-viz/ui';

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

	const { src, alt, ...restProps } = $props();

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

{#if theme.currentMode === 'light' && lightImage}
	<enhanced:img src={lightImage} {alt} {...restProps} />
{:else if theme.currentMode === 'dark' && darkImage}
	<enhanced:img src={darkImage} {alt} {...restProps} />
{:else if baseImage}
	<enhanced:img src={baseImage} {alt} {...restProps} />
{:else if (!lightImage || !darkImage) && !baseImage}
	<img {src} {alt} {...restProps} />
{/if}
