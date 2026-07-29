<script lang="ts">
	import { format } from 'd3-format';

	import type { TableState } from '$lib/core/lib/tableState.svelte';
	import type { Group } from '$lib/core/lib/types';

	interface Props {
		table: TableState;
		group: Group | undefined;
		stretchUp?: boolean;
		fieldName?: string;
		val?: string | number;
	}

	let { table, group, stretchUp = false, fieldName, val }: Props = $props();

	const fPercentage = format('0.0%');
</script>

<div style:width={table.widths.groupSizeBar}>
	<div
		class="relative top-0 z-[-1]"
		style:margin-top={stretchUp ? '-5px' : ''}
		style:height="100%"
		style:background={table.scales && fieldName && val ? table.scales[fieldName](val) : 'lightgrey'}
		style:left={fPercentage(0)}
		style:width={fPercentage(group.order.length / table.data.length)}
	>
		<div>&nbsp;</div>
	</div>
</div>
