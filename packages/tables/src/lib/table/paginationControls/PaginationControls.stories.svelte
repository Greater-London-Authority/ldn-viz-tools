<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import PaginationControls from './PaginationControls.svelte';

	/**
	 * The `PaginationControls` component shows the range of rows currently displayed
	 * ("Showing X to Y of Z entries") together with Previous/Next buttons and an
	 * editable page-number input. The `page` prop is bindable.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/PaginationControls/PaginationControls',
		component: PaginationControls,
		tags: ['autodocs'],

		args: {
			numRows: 95,
			page: 3,
			pageSize: 10
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<PaginationControls {...args} />
	{/snippet}
</Story>

<!-- On the first page the Previous button is disabled. -->
<Story name="FirstPage">
	{#snippet template()}
		<PaginationControls numRows={95} page={1} pageSize={10} />
	{/snippet}
</Story>

<!-- On the last page (page === numPages) the Next button is disabled. -->
<Story name="LastPage">
	{#snippet template()}
		<PaginationControls numRows={95} page={10} pageSize={10} />
	{/snippet}
</Story>

<!-- When numRows <= pageSize there is a single page, so both buttons are disabled. -->
<Story name="SinglePage">
	{#snippet template()}
		<PaginationControls numRows={7} page={1} pageSize={10} />
	{/snippet}
</Story>

<!-- A large dataset exercises the row-range math and the editable page-number input. -->
<Story name="LargeDataset">
	{#snippet template()}
		<PaginationControls numRows={10000} page={42} pageSize={25} />
	{/snippet}
</Story>
