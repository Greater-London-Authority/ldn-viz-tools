<script>
	import { format } from 'd3-format';

	export let table;
	export let group;
	export let stretchUp = false;
	export let fieldName;
	export let val;

	const fPercentage = format('0.0%');
</script>

<div style:width={table.widths.groupSizeBar}>
	<div
		class="top-0 z-[-1] relative"
		style:margin-top={stretchUp ? '-5px' : ''}
		style:height={'100%'}
		style:background={table.scales ? table.scales[fieldName](val) : 'lightgrey'}
		style:left={fPercentage(0)}
		style:width={fPercentage(group.order.length / table.data.length)}
	>
		<div>&nbsp;</div>
	</div>
</div>
