<script lang="ts">
	import type { Readable } from 'svelte/store';

	// really a Page is
	// import type { Page } from "@sveltejs/kit";
	// and the page store is Readable<Page<Record<string, string>, string | null>>
	// but we use Readable<{url: {pathname: string}} as an approximation to avoid a dependency on SvelteKit

	export let base = ''; // typcally imported from '$app/paths' then pased as prop
	export let page: Readable<{ url?: { pathname: string } }>; // typically imported from '$app/stores then passed as prop

	export let target = '';

	let classes: string;
	const highlightedClasses = 'flex h-[50px] bg-core-blue-500 items-center px-4 py-2 items-center';
	const nonHighlightedClasses =
		'flex h-[50px] bg-core-grey-700 items-center px-4 py-2 items-center';
	$: {
		if (!page) {
			// no page store provided - we don't know whether or not we're on the page this links points at
			classes = nonHighlightedClasses;
		} else if (!target && $page.url?.pathname === '/') {
			// we're currently on the homepage, and that is what this link points at
			classes = highlightedClasses;
		} else if (!!target && ($page.url?.pathname || '').endsWith(target)) {
			// we're currently on the page that this link points at
			classes = highlightedClasses;
		} else {
			// we're currently on a page that is not what this link points at
			classes = nonHighlightedClasses;
		}
	}
</script>

<div class={classes}>
	<a href={`${base}/${target}`}>
		<slot />
	</a>
</div>
