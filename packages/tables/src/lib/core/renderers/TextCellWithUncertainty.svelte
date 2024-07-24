<script lang="ts">
	/**
	 * The `TextCellWithUncertainty` component formats a single value as text and displays it in a table cell.
	 * The first entry of `contextVals` is interpreted as indicating whether the value is uncertain;
	 * @component
	 */
	import { format } from 'd3-format';
	import { classNames } from '../../utils/utilityFns.js';
	import { Tooltip } from '@ldn-viz/ui';

	export let value: number | string;

	export let contextVals: boolean[] = [false];
	export let alignText = 'left' | 'right' | 'center' | undefined;

	export let formatString;
	$: f = format(formatString ?? '');

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass;
	$: alignmentClass = alignmentClasses[alignText ?? 'center'];

	$: textColor = contextVals.length > 0 && !contextVals[0] ? 'rgb(134, 139, 142)' : 'black';
</script>

<!--
<div class={classNames(`flex h-full p-2 items-center`, alignmentClass)}>
  <span style="padding-right: 0.25em">{formatString ? f(value) : value}</span>
    {#if contextVals.length >0 && contextVals[0]}
    <Tooltip hintLabel="est"> This value is estimated, rather than known.</Tooltip>
  {/if}
</div>
-->

<div class={classNames(`flex h-full p-2 items-center`, alignmentClass)}>
	<span style:color={textColor}>{formatString ? f(value) : value}</span>
</div>
