import { getContext, setContext } from 'svelte';

const LINK_RESOLVER_KEY = Symbol.for('MARKDOWN_LINK_RESOLVER');

export type LinkResolver = (href: string) => string;

/**
 * Sets the function `MarkdownLink` uses to resolve root-relative hrefs, such as `resolve` from `'$app/paths'`.
 * Call it in the component that wraps the rendered markdown, such as an mdsvex blueprint.
 */
export function setMarkdownLinkResolver(resolve: LinkResolver) {
	return setContext(LINK_RESOLVER_KEY, resolve);
}

export function getMarkdownLinkResolver(): LinkResolver {
	return getContext<LinkResolver | undefined>(LINK_RESOLVER_KEY) ?? ((href) => href);
}
