<script lang="ts">
	import { utcFormat } from 'd3-time-format';
	import { classNames } from '../../utils/utilityFns.js';

	export let value: number | string;
	export let alignText = 'left' | 'right' | 'center' | undefined;

	export let formatString = '%Y-%m-%dT%H:%M:%S.%LZ';
	$: f = utcFormat(formatString ?? '');

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

<span class={classNames(`flex h-full p-2`, alignmentClass)}>
	{formatString ? f(value) : value}
</span>
