<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GroupSizeBar from './GroupSizeBar.svelte';

	/**
	 * The `GroupSizeBar` component draws a horizontal bar whose width encodes the
	 * proportion of table rows belonging to a group (group.order.length /
	 * table.data.length). The fill is `lightgrey` unless a matching `table.scales`
	 * entry, `fieldName` and `val` are supplied, in which case the scale colour is used.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Rows/GroupSizeBar',
		component: GroupSizeBar,
		tags: ['autodocs']
	});
</script>

<script lang="ts">
	// GroupSizeBar only reads a handful of fields off `table` and `group`, so we
	// build minimal plain objects rather than a full TableData:
	//   table.widths.groupSizeBar  -> width of the outer container
	//   table.data.length          -> denominator for the proportion
	//   table.scales[fieldName]    -> optional (value) => colour function
	//   group.order.length         -> numerator for the proportion
	const table = {
		widths: { groupSizeBar: '160px' },
		data: { length: 100 }
	};

	const group = { order: { length: 40 } };

	// A table equipped with a colour scale for the "category" field.
	const coloredTable = {
		widths: { groupSizeBar: '160px' },
		data: { length: 100 },
		scales: {
			category: (v: string) => (v === 'A' ? '#d13438' : '#0078d4')
		}
	};
</script>

<!-- Width from group.order.length / table.data.length; no scale so fill is lightgrey. -->
<Story name="Default">
	{#snippet template()}
		<GroupSizeBar {table} {group} />
	{/snippet}
</Story>

<!-- fieldName + val + table.scales[fieldName] make the fill use the scale colour. -->
<Story name="ColoredByScale">
	{#snippet template()}
		<GroupSizeBar table={coloredTable} {group} fieldName="category" val="A" />
	{/snippet}
</Story>

<!-- stretchUp applies a -5px top margin so the bar reaches up into the row above. -->
<Story name="StretchUp">
	{#snippet template()}
		<GroupSizeBar {table} {group} stretchUp />
	{/snippet}
</Story>
