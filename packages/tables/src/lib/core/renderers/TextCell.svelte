<script lang="ts">
	import { format } from 'd3-format';
	import { classNames } from '../../utils/utilityFns.js';

	export let value: number | string;
	export let alignText = 'left' | 'right' | 'center' | undefined;

	export let formatString;
	$: f = format(formatString ?? '');

	/*
    const alignmentClasses = {
        left: "text-left",
        right: "text-right",
        center: "text-center",
        justify: "text-justify"
    }

     */

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-middle'
	};

	let alignmentClass;
	$: alignmentClass = alignmentClasses[alignText ?? 'center'];
</script>

<span class={classNames(`flex h-full p-2 items-center`, alignmentClass)}>
	{formatString ? f(value) : value}
</span>
