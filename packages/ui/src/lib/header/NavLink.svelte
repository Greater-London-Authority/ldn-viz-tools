<script lang="ts">
	/**
	 * `<NavLink>` represents a single link.
	 * The background color changes to indicate whether the target of the link is the current page.
	 * */
	import type { Readable } from 'svelte/store';

	// really a Page is
	// import type { Page } from "@sveltejs/kit";
	// and the page store is Readable<Page<Record<string, string>, string | null>>
	// but we use Readable<{url: {pathname: string}} as an approximation to avoid a dependency on SvelteKit

	/**
	 * The base URL: typically imported from `$app/paths` then passed as prop
	 */
	export let base = '';

	/**
	 * The current page store (typically imported from `$app/stores` then passed as prop).
	 */
	export let page: Readable<{ url?: { pathname: string } }>;

	/**
	 * The target of the link.
	 */
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
		<!-- contents of the link (text and/or an icon) -->
		<slot />
	</a>
</div>
