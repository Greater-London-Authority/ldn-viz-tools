<script lang="ts">
	/**
	 * `MarkdownLink` is rendered instead of the `<a>` HTML element in Markdown processed by mdsvex.
	 *
	 * The purpose of this component is to avoid problems due to links not using `resolve()`.
	 *
	 * An href that starts with `/` goes through the resolver set by `setMarkdownLinkResolver`.
	 * In a SvelteKit app, call `setMarkdownLinkResolver(resolve)` in the blueprint, with `resolve`
	 * from `'$app/paths'`, so that links include the app's base path.
	 * Without a resolver, the href is unchanged.
	 *
	 * Other props are passed through to the `<a>` element.
	 *
	 * @component
	 */

	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { getMarkdownLinkResolver } from './linkResolver';

	let { href, children, ...rest }: HTMLAnchorAttributes & { href: string; children: Snippet } =
		$props();

	const resolve = getMarkdownLinkResolver();
</script>

<a {...rest} href={href.startsWith('/') ? resolve(href) : href}>
	{@render children()}
</a>
