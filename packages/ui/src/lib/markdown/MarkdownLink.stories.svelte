<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MarkdownContextDemo from './MarkdownContextDemo.svelte';
	import MarkdownLink from './MarkdownLink.svelte';

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
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Markdown/MarkdownLink',
		component: MarkdownLink,
		tags: ['autodocs'],
		argTypes: {
			href: { control: { type: 'text' } }
		},
		args: {
			href: 'https://data.london.gov.uk'
		}
	});
</script>

<!-- An href that doesn't start with `/` is unchanged. -->
<Story name="Default">
	{#snippet template(args)}
		<div class="typeset-longform">
			<p>Find datasets on the <MarkdownLink href={args.href}>London Datastore</MarkdownLink>.</p>
		</div>
	{/snippet}
</Story>

<!-- With the base path `/city-data`, the href `/design-system` resolves to `/city-data/design-system`. -->
<Story name="Root relative with resolver" args={{ href: '/design-system' }}>
	{#snippet template(args)}
		<MarkdownContextDemo resolve={(href) => `/city-data${href}`}>
			<div class="typeset-longform">
				<p>Read the <MarkdownLink href={args.href}>design system guidance</MarkdownLink>.</p>
			</div>
		</MarkdownContextDemo>
	{/snippet}
</Story>
