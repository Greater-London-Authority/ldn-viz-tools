<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PageMetadata from './PageMetadata.svelte';

	/**
	 * The `<PageMetadata>` component adds metadata (`<meta>`) tags to the `<head>` of the page.
	 * These tags are used for indexing by search engines, and for constructing preview links on search engine results pages (e.g. Google, DuckDuckGo), social media platforms (e.g. X/Twitter, Facebook), and communication platforms (e.g. MS Teams, WhatsApp).
	 *
	 * The `title`, `description` and `url` are required - if any of them are missing, then the component will throw an `Error` that prevents the site from building.
	 *
	 * The definitions of properties below are taken from [https://ogp.me](https://ogp.me).
	 *
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components - Layout And Themes/Meta, Analytics And Cookies/PageMetadata',
		component: PageMetadata,
		tags: ['autodocs'],
		args: {
			title: 'The title',
			description: 'the description',
			url: 'http://london.gov.uk'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-xl">
			<PageMetadata {...args}></PageMetadata>
		</div>
	{/snippet}
</Story>
