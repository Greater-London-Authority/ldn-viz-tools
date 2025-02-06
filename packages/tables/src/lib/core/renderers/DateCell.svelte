<script lang="ts">
	/**
	 * The `DateCell` component renders a table cell representing a single date or datetime as text.
	 * @component
	 */
	import { utcFormat } from 'd3-time-format';
	import { classNames } from '../../utils/utilityFns.js';

	/**
	 * The value to be encoded in the cell.
	 */
	export let value: Date;

	/**
	 * Alignment of the text within the cell.
	 */
	export let alignText: 'left' | 'right' | 'center' | undefined = undefined;

	/**
	 * Format string defining how the number should be formatted for display (expressed in `d3-time-format`'s [notation](https://d3js.org/d3-time-format#locale_format),
	 * which is based on "the venerable strptime and strftime functions from the C standard library")
	 */
	export let formatString = '%Y-%m-%dT%H:%M:%S.%LZ';
	$: f = utcFormat(formatString ?? '');

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	let alignmentClass;
	$: alignmentClass = alignmentClasses[alignText ?? 'left'];

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<span class={classNames(`flex h-full p-2`, alignmentClass)}>
	{formatString ? f(value) : value}
</span>
