<script module lang="ts">
	import { resolve } from '$app/paths';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';
	/**
	 * The `Breadcrumbs` componenent renders a series of links.
	 * It usually corresponds to the levels in a hierachy that has (or could have been) been traversed to reach the current page,
	 * providing a way to access ancestor pages.
	 *
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs']
	});

	let breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Foo', href: '/foo' },
		{ label: 'Bar', href: '/foo/bar' },
		{ label: 'Baz', href: '/foo/bar/baz' }
	];
</script>

<Story name="Default">
	{#snippet template()}
		<Breadcrumbs {breadcrumbs} {resolve} />
	{/snippet}
</Story>

<Story name="Single item">
	{#snippet template()}
		<Breadcrumbs breadcrumbs={[{ label: 'Home', href: '/' }]} {resolve} />
	{/snippet}
</Story>

<Story name="Two levels">
	{#snippet template()}
		<Breadcrumbs
			breadcrumbs={[
				{ label: 'Home', href: '/' },
				{ label: 'Current page', href: '/current-page' }
			]}
			{resolve}
		/>
	{/snippet}
</Story>

<Story name="Long labels / wrapping">
	{#snippet template()}
		<div class="max-w-sm">
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Greater London Authority Home Page', href: '/' },
					{
						label: 'Environment, Climate Change and Air Quality Programmes',
						href: '/environment'
					},
					{
						label: 'This is the very long label of the current page that should wrap',
						href: '/environment/current'
					}
				]}
				{resolve}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Empty array">
	{#snippet template()}
		<Breadcrumbs breadcrumbs={[]} {resolve} />
	{/snippet}
</Story>
