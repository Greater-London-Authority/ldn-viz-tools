<script lang="ts">
	export let title;
	export let description;
	export let url; // Must be full URL with scheme

	if (!title || !description || !url) {
		// Minimum requirement for SEO.
		throw new Error('Metadata component is missing either a title, description, or full URL');
	}

	// By default, assumes there is a favicon.ico file in the static folder.
	export let favicon = url.replace(/\/?$/, '/favicon.ico');

	export let type = 'website'; // https://ogp.me/#types
	export let site = 'GLA Intelligence and Analysis Unit';

	export let image = undefined;
	export let imageAlt = undefined;

	// Image size should be as close to these dimensions as possible.
	export let imageWidth = 1200;
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
