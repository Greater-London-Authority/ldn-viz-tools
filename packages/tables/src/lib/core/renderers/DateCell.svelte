<script lang="ts">
	/**
	 * The `DateCell` component renders a table cell representing a single date or datetime as text.
	 * @component
	 */
	import { utcFormat } from 'd3-time-format';
	import { classNames } from '../../utils/utilityFns.js';

	interface Props {
		/**
		 * The value to be encoded in the cell.
		 */
		value: Date;
		/**
		 * Alignment of the text within the cell.
		 */
		alignText?: 'left' | 'right' | 'center' | undefined;
		/**
		 * Format string defining how the number should be formatted for display (expressed in `d3-time-format`'s [notation](https://d3js.org/d3-time-format#locale_format),
		 * which is based on "the venerable strptime and strftime functions from the C standard library")
		 */
		formatString?: string;
		[key: string]: any;
	}

	let {
		value,
		alignText = undefined,
		formatString = '%Y-%m-%dT%H:%M:%S.%LZ',
		...rest
	}: Props = $props();
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
