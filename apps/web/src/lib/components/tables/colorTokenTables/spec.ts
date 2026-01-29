import ColorChipCell from '$lib/components/tables/cells/ColorChipCell.svelte';

export const tokenTableSpec = {
	columns: [
		{
			short_label: 'value',
			label: 'Value',
			cell: {
				renderer: ColorChipCell as any
			}
		},
		{
			short_label: 'name',
			label: 'Token Name',
			cell: {
				renderer: 'TextCell'
			}
		},
		{
			short_label: 'value',
			label: 'Hex',
			cell: {
				renderer: 'TextCell'
			}
		}
	]
};
