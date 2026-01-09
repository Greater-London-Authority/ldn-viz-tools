<script lang="ts">
	/**
	 * The `TextCell` component formats a single value as text and displays it in a table cell.
	 * @component
	 */
	import type { TextCellProps } from '$lib/core/renderers/TextCellProps';
	import { classNames } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import { getVal } from '../../getVal';

	let {
		value,
		alignText = undefined,
		fontWeight = 'normal',
		visibility = 'visible',
		formatString = undefined,
		..._rest
	}: TextCellProps = $props();
	let f = $derived(format(formatString ?? ''));

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass = $derived(alignmentClasses[alignText ?? 'left']);
</script>

<span
	class={classNames(`flex h-full items-center py-2`, alignmentClass)}
	style:font-weight={getVal(value, fontWeight)}
	style:visibility={getVal(value, visibility)}
>
	{formatString ? f(+value) : value}
</span>
