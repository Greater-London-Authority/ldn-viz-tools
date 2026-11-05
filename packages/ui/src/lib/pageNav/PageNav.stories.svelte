<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import PageNav from './PageNav.svelte';
	/**
	 * The `PageNav` component renders links to the previous and next pages in a sequence of pages.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/PageNav',
		component: PageNav,
		tags: ['autodocs']
	});

	const pages = [
		{ title: 'Introduction', href: '/introduction' },
		{ title: 'Colour', href: '/colour' },
		{ title: 'Typography', href: '/typography' }
	];
</script>

<Story name="Default" args={{ pages, currentHref: '/colour' }} />

<!-- On the first page there is no "Previous" button. -->
<Story name="First page" args={{ pages, currentHref: '/introduction' }} />

<!-- On the last page there is no "Next" button. -->
<Story name="Last page" args={{ pages, currentHref: '/typography' }} />
