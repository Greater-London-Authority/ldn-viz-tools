<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Header from './Header.svelte';

	/**
	 * The `Header` component displays the heading for a column, optionally with arrows to indicate sort order.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/Header',
		component: Header,
		tags: ['autodocs'],

		argTypes: {
			order: {
				options: ['ascending', 'descending', undefined],
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

<!-- With `allowSorting` the header renders as a <button> with sort icons that depend on `order`. -->
<Story name="Sortable - ascending">
	{#snippet template()}
		<Header label="Age" allowSorting={true} order="ascending" />
	{/snippet}
</Story>

<Story name="Sortable - descending">
	{#snippet template()}
		<Header label="Age" allowSorting={true} order="descending" />
	{/snippet}
</Story>

<!-- With no `order` set, the neutral up/down chevron icon is shown. -->
<Story name="Sortable - unsorted">
	{#snippet template()}
		<Header label="Age" allowSorting={true} />
	{/snippet}
</Story>

<!-- `superscriptText` triggers the two-line layout branch. -->
<Story name="With superscriptText">
	{#snippet template()}
		<Header label="Age" superscriptText="Years" />
	{/snippet}
</Story>

<!-- The `alignHeader` prop controls horizontal alignment of the heading. -->
<Story name="Alignment variants">
	{#snippet template()}
		<div class="flex w-64 flex-col gap-2">
			<Header label="Left aligned" alignHeader="left" />
			<Header label="Center aligned" alignHeader="center" />
			<Header label="Right aligned" alignHeader="right" />
		</div>
	{/snippet}
</Story>

<!-- A custom text `color` can be applied to the heading. -->
<Story name="Custom color">
	{#snippet template()}
		<Header label="Age" color="rebeccapurple" />
	{/snippet}
</Story>
