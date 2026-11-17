import { getContext, setContext } from 'svelte';

const IMAGES_KEY = Symbol.for('MARKDOWN_IMAGES');

/**
 * The value of an image imported with the `?enhanced` query from `@sveltejs/enhanced-img`.
 * An SVG isn't processed, so it imports as a URL string.
 */
export type EnhancedPicture =
	| string
	| {
			sources: Record<string, string>;
			img: { src: string; w: number; h: number };
	  };

export type ImageModules = Record<string, { default: EnhancedPicture }>;

/**
 * Sets the images `EnhancedImage` can show, as the result of an eager `import.meta.glob` with the
 * `?enhanced` query. The glob has to run in the app, because Vite resolves it against the app's files.
 */
export function setMarkdownImages(images: ImageModules) {
	return setContext(IMAGES_KEY, images);
}

export function getMarkdownImages(): ImageModules {
	return getContext<ImageModules | undefined>(IMAGES_KEY) ?? {};
}
