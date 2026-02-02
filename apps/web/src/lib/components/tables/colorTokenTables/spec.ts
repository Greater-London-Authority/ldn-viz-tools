import ColorChipCell from '$lib/components/tables/cells/ColorChipCell.svelte';

export const tokenTableSpec = {
	columns: [
		{
			short_label: 'value',
			label: 'Value',
			width: 60,
			cell: {
				renderer: ColorChipCell as any
			}
		},
		{
			short_label: 'name',
			label: 'Token Name',
			// relativeWidth: 1,
			cell: {
				renderer: 'TextCell'
			}
		},
		{
			short_label: 'value',
			label: 'Hex',
			// relativeWidth: 0.5,
			cell: {
				renderer: 'TextCell'
			}
		},
		{
			short_label: 'description',
			label: 'Description',
			// relativeWidth: 2,
			cell: {
				renderer: 'TextCell'
			}
		}
	]
};
