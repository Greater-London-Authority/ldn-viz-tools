<script module lang="ts">
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
	{#snippet template(args)}
		<Breadcrumbs {breadcrumbs} />
	{/snippet}
</Story>
