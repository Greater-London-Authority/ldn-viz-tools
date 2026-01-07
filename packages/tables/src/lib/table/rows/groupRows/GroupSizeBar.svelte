<script>
	import { format } from 'd3-format';

	/**
	 * @typedef {Object} Props
	 * @property {any} table
	 * @property {any} group
	 * @property {boolean} [stretchUp]
	 * @property {any} [fieldName]
	 * @property {any} [val]
	 */

	/** @type {Props} */
	let { table, group, stretchUp = false, fieldName, val } = $props();

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
