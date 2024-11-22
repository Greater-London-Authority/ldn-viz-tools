<script lang="ts">
	/**
	 * The `TextCell` component formats a single value as text and displays it in a table cell.
	 * @component
	 */
	import { format } from 'd3-format';
	import { classNames } from '../../utils/utilityFns.js';

	export let value: number | string;
	export let alignText: 'left' | 'right' | 'center' | undefined = undefined;

	export let formatString: string | undefined = undefined;
	$: f = format(formatString ?? '');

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	$: alignmentClass = alignmentClasses[alignText ?? 'left'];

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	$$restProps;
</script>

<span class={classNames(`flex h-full items-center py-2`, alignmentClass)}>
	{formatString ? f(+value) : value}
</span>
