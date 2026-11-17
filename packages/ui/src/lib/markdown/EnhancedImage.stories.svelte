<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EnhancedImage from './EnhancedImage.svelte';
	import type { ImageModules } from './imageContext';
	import MarkdownContextDemo from './MarkdownContextDemo.svelte';

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
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Markdown/EnhancedImage',
		component: EnhancedImage,
		tags: ['autodocs'],
		argTypes: {
			src: { control: { type: 'text' } },
			alt: { control: { type: 'text' } }
		},
		args: {
			src: '/chart.svg',
			alt: 'A bar chart'
		}
	});

	// Helper to construct example images
	const svg = (fill: string, label: string) =>
		'data:image/svg+xml,' +
		encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="160"><rect width="320" height="160" fill="${fill}"/><text x="160" y="88" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#888">${label}</text></svg>`
		);

	const images: ImageModules = {
		'/src/images/chart.svg': { default: svg('#e0e7ff', 'chart.svg') },
		'/src/images/mode-light.svg': { default: svg('#ffffff', 'mode-light.svg') },
		'/src/images/mode-dark.svg': { default: svg('#1f2937', 'mode-dark.svg') }
	};
</script>

<Story name="Default">
	{#snippet template(args)}
		<MarkdownContextDemo {images}>
			<EnhancedImage {...args} />
		</MarkdownContextDemo>
	{/snippet}
</Story>

<!-- The images include `mode-light.svg` and `mode-dark.svg`, so `src="/mode.svg"` shows the one for the current mode. Switch the mode in the toolbar to see the other. -->
<Story name="Light and dark versions" args={{ src: '/mode.svg', alt: 'An example image' }}>
	{#snippet template(args)}
		<MarkdownContextDemo {images}>
			<EnhancedImage {...args} />
		</MarkdownContextDemo>
	{/snippet}
</Story>
