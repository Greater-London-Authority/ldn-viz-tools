<script lang="ts">
	/**
	 * The `TextCell` component formats a single value as text and displays it in a table cell.
	 * @component
	 */
	import { classNames } from '@ldn-viz/ui';
	import { format } from 'd3-format';
	import type { TextCellProps } from '$lib/core/renderers/TextCellProps';

	let {
		value,
		alignText = undefined,
		fontWeight = 'normal',
		visibility = 'visible',
		formatString = undefined,
		...rest
	}: TextCellProps = $props();
	let f = $derived(format(formatString ?? ''));

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass = $derived(alignmentClasses[alignText ?? 'left']);

	let fontWeightValue = $derived(typeof fontWeight === 'function' ? fontWeight(value) : fontWeight);
	let visibilityValue = $derived(typeof visibility === 'function' ? visibility(value) : visibility);
</script>

<span
	class={classNames(`flex h-full items-center py-2`, alignmentClass)}
	style:font-weight={fontWeightValue}
	style:visibility={visibilityValue}
>
	{formatString ? f(+value) : value}
</span>
