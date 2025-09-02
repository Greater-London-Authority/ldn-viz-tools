<script module>
	/**
	 * The `Header` component displays the heading for a column, optionally with arrows to indicate sort order.
	 */
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Header from './Header.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/Header',
		component: Header,
		tags: ['autodocs'],

		argTypes: {
			order: {
				options: ['asc', 'desc', undefined],
				control: { type: 'radio' }
			}
		},

		args: {
			label: 'Age'
		}
	});
</script>

<script lang="ts">
	import HeaderModalDemo from './HeaderModalDemo.svelte';
</script>

<Story name="Default">
	{#snippet template(args)}
		<Header {...args} />
	{/snippet}
</Story>

<Story name="With a hint string - tooltip">
	{#snippet template()}
		<Header label="A column" hintText="An explanation" />
	{/snippet}
</Story>

<Story name="With a hint string - popover">
	{#snippet template()}
		<Header label="A column" hintText="An explanation" hintType="popover" />
	{/snippet}
</Story>

<Story name="With a hint string - modal">
	{#snippet template()}
		<Header label="A column" hintText="An explanation" hintType="modal" />
	{/snippet}
</Story>

<Story name="With a hint component - tooltip">
	{#snippet template()}
		<Header label="A column" hintComponent={HeaderModalDemo} />
	{/snippet}
</Story>

<Story name="With a hint component - popover">
	{#snippet template()}
		<Header label="A column" hintComponent={HeaderModalDemo} hintType="popover" />
	{/snippet}
</Story>

<Story name="With a hint component - modal">
	{#snippet template()}
		<Header label="A column" hintComponent={HeaderModalDemo} hintType="modal" />
	{/snippet}
</Story>
