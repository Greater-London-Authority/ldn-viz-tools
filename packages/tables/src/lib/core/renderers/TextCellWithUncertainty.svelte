<script lang="ts">
	/**
	 * The `TextCellWithUncertainty` component formats a single value as text and displays it in a table cell.
	 * The first entry of `contextVals` is interpreted as indicating whether the value is uncertain;
	 * @component
	 */
	import { format } from 'd3-format';
	import { classNames } from '../../utils/utilityFns.js';

	export let value: number | string;

	export let contextVals: boolean[] = [false];
	export let alignText: 'left' | 'right' | 'center' | undefined = undefined;

	export let formatString: string | undefined = undefined;
	$: f = format(formatString ?? '');

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	$: alignmentClass = alignmentClasses[alignText ?? 'center'];

	$: textColor =
		contextVals.length > 0 && !contextVals[0]
			? 'text-color-text-secondary'
			: 'text-color-text-primary';

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<div class={classNames(`flex h-full p-2 items-center`, alignmentClass)}>
	<span class={textColor}>{formatString ? f(+value) : value}</span>
</div>
