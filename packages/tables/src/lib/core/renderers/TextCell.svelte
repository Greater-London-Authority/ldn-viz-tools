<script lang="ts">
	/**
	 * The `TextCell` component formats a single value as text and displays it in a table cell.
	 * @component
	 */
	import { format } from 'd3-format';
	import { classNames } from '@ldn-viz/ui';

	export let value: number | string;
	export let alignText: 'left' | 'right' | 'center' | undefined = undefined;

	export let fontWeight: string | ((value: number | string) => string) = 'normal';
	export let visibility: string | ((value: number | string) => string) = 'visible';

	export let formatString: string | undefined = undefined;
	$: f = format(formatString ?? '');

	const alignmentClasses = {
		left: 'justify-start',
		right: 'justify-end',
		center: 'justify-center'
	};

	$: alignmentClass = alignmentClasses[alignText ?? 'left'];

	$: fontWeightValue = typeof fontWeight === 'function' ? fontWeight(value) : fontWeight;
	$: visibilityValue = typeof visibility === 'function' ? visibility(value) : visibility;

	// This suppresses warnings due to the RowRenderer providing props that aren't used.
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$$restProps;
</script>

<span
	class={classNames(`flex h-full items-center py-2`, alignmentClass)}
	style:font-weight={fontWeightValue}
	style:visibility={visibilityValue}
>
	{formatString ? f(+value) : value}
</span>
