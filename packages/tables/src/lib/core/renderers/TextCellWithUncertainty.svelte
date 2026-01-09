<script lang="ts">
	/**
	 * The `TextCellWithUncertainty` component formats a single value as text and displays it in a table cell.
	 * The first entry of `contextVals` is interpreted as indicating whether the value is uncertain;
	 * @component
	 */
	import { format } from 'd3-format';
	import { classNames } from '../../utils/utilityFns.js';
	import type { TextCellWithUncertaintyProps } from '$lib/core/renderers/TextCellWithUncertaintyProps';

	let {
		value,
		contextVals = [false],
		alignText = undefined,
		formatString = undefined,
		..._rest
	}: TextCellWithUncertaintyProps = $props();
	let f = $derived(format(formatString ?? ''));

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass = $derived(alignmentClasses[alignText ?? 'center']);

	let textColor = $derived(
		contextVals.length > 0 && !contextVals[0]
			? 'text-color-text-secondary'
			: 'text-color-text-primary'
	);
</script>

<div class={classNames(`flex h-full items-center p-2`, alignmentClass)}>
	<span class={textColor}>{formatString ? f(+value) : value}</span>
</div>
