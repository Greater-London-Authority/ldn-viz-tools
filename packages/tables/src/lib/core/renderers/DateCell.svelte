<script lang="ts">
	/**
	 * The `DateCell` component renders a table cell representing a single date or datetime as text.
	 * @component
	 */
	import { utcFormat } from 'd3-time-format';
	import { classNames } from '../../utils/utilityFns.js';
	import type { DateCellProps } from '$lib/core/renderers/DateCellProps';

	let {
		value,
		alignText = undefined,
		formatString = '%Y-%m-%dT%H:%M:%S.%LZ',
		..._rest
	}: DateCellProps = $props();
	let f = $derived(utcFormat(formatString ?? ''));

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass = $derived(alignmentClasses[alignText ?? 'left']);
</script>

<span class={classNames(`flex h-full p-2`, alignmentClass)}>
	{formatString ? f(value) : value}
</span>
