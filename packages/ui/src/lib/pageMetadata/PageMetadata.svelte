<script lang="ts">
	/**
	 * The `<PageMetadata>` component adds metadata (`<meta>`) tags to the `<head>` of the page.
	 * These tags are used for indexing by search engines, and for constructing preview links on search engine results pages (e.g. Google, DuckDuckGo), social media platforms (e.g. X/Twitter, Facebook), and communication platforms (e.g. MS Teams, WhatsApp).
	 *
	 * The `title`, `description` and `url` are required - if any of them are missing, then the component will throw an `Error` that prevents the site from building.
	 *
	 * The definitions of properties below are taken from [https://ogp.me](https://ogp.me).
	 *
	 * @component
	 */

	/**
	 * "The title of your object as it should appear within the graph, e.g., 'The Rock'."
	 */
	export let title: string;

	/**
	 * "A one to two sentence description of your object."
	 */
	export let description: string;

	/**
	 * "The canonical URL of your object that will be used as its permanent ID in the graph". Should include the scheme (`http://` or `https://`).
	 */
	export let url: string; // Must be full URL with scheme

	if (!title || !description || !url) {
		// Minimum requirement for SEO.
		throw new Error('Metadata component is missing either a title, description, or full URL');
	}

	/**
	 * URL of the favicon. By default, assumes there is a favicon.ico file in the static folder.
	 */
	export let favicon = url.replace(/\/?$/, '/favicon.ico');

	/**
	 * The object type - see [this documentation](https://ogp.me/#types)
	 */
	export let type = 'website';

	/**
	 * "If your object is part of a larger website, the name which should be displayed for the overall site"
	 */
	export let site = 'GLA Intelligence and Analysis Unit';

	/**
	 * "An image URL which should represent your object within the graph".
	 * If an `image` is provided, then `imageAlt` should be too.
	 */
	export let image: string;

	/**
	 * "A description of what is in the image (not a caption)."
	 */
	export let imageAlt: string;

	/**
	 * Image width in pixels. Recommended value is 1200.
	 */
	export let imageWidth = 1200;

	/**
	 * Image height in pixels. Recommended value is 630.
	 */
	export let imageHeight = 630;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- OpenGraph -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:site_name" content={site} />
	<meta property="og:determiner" content="" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="og:image:width" content={imageWidth.toString()} />
	<meta property="og:image:height" content={imageHeight.toString()} />

	<!-- 𝕏 / Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:site" content={site} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
	<meta property="twitter:image:alt" content={imageAlt} />
	<meta property="twitter:image:width" content={imageWidth.toString()} />
	<meta property="twitter:image:height" content={imageHeight.toString()} />

	<!-- Pinterest -->
	<meta property="pin:media" content={image} />
	<meta property="pin:url" content={url} />
	<meta property="pin:description" content={description} />
</svelte:head>
