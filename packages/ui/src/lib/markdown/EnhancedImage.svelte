<script lang="ts">
	/**
	 * `EnhancedImage` is rendered instead of the `<img>` HTML element in Markdown processed by mdsvex.
	 *
	 * It looks up `src` in the images set by `setMarkdownImages`, and matches the end of each image's path.
	 * If the images include a `-light` and `-dark` version of `src`
	 * (such as `chart-light.png` and `chart-dark.png` for `chart.png`), it shows the one for the current mode.
	 * An image imported with the `?enhanced` query renders as a `<picture>` with a source for each format.
	 * If no image matches, it renders an `<img>` with `src` unchanged.
	 *
	 * In the blueprint's instance script, import the app's images with an eager `import.meta.glob`
	 * and pass them to `setMarkdownImages`:
	 *
	 * ```ts
	 * const images = import.meta.glob('$lib/assets/images/**', {
	 * 	eager: true,
	 * 	query: { enhanced: true }
	 * }) as ImageModules;
	 *
	 * setMarkdownImages(images);
	 * ```
	 *
	 * This glob has to run in the app, because Vite resolves it against the app's files.
	 * The `?enhanced` query needs the `enhancedImages()` plugin from `@sveltejs/enhanced-img` in the app's Vite config.
	 *
	 * @component
	 */

	import { theme } from '../theme/themeState.svelte';
	import { getMarkdownImages, type EnhancedPicture } from './imageContext';

	let { src, alt, ...restProps }: { src: string; alt?: string } & Record<string, any> = $props();

	const imageModules = getMarkdownImages();

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

	const image: EnhancedPicture | undefined = $derived(
		(theme.currentMode === 'light' && lightImage) ||
			(theme.currentMode === 'dark' && darkImage) ||
			baseImage
	);

	// Nothing in the images from setMarkdownImages matched, so the fallback below emits `src`
	// as a bare relative URL. The SvelteKit prerenderer then crawls it as a page link and
	// the build fails with an opaque 500, so surface the real cause at authoring time.
	$effect(() => {
		if (!baseImage && !lightImage && !darkImage) {
			console.warn(
				`[EnhancedImage] no image found for "${src}" in the images set by setMarkdownImages — expected ${src}, or a ${constructPath(src, '-light')} / ${constructPath(src, '-dark')} pair.`
			);
		}
	});
</script>

<!-- The same markup <enhanced:img> outputs for a dynamic src, so apps using this component don't need the enhanced-img plugin to compile it -->
{#if typeof image === 'object'}
	<picture>
		{#each Object.entries(image.sources) as [format, srcset] (format)}
			<source {srcset} type={'image/' + format} />
		{/each}
		<img src={image.img.src} width={image.img.w} height={image.img.h} {alt} {...restProps} />
	</picture>
{:else if image}
	<img src={image} {alt} {...restProps} />
{:else if !lightImage || !darkImage}
	<img {src} {alt} {...restProps} />
{/if}
