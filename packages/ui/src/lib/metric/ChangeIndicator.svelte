<script lang="ts">
	import { ArrowTrendingDown, ArrowTrendingUp } from '@steeze-ui/heroicons';
	import type { IconSource } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'd3-format';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		/** If `true`, then the direction icon is rendered beside the change value. */
		showIcon: boolean;

		/** Size of the icon (as tailwind classes setting the height and width)*/
		iconSize: string;

		/** Size of the Metric. */
		size?: 'lg' | 'sm';

		/** Which figure leads: the absolute value, the change, or the translation. */
		hero?: 'value' | 'change' | 'translation';

		/** The absolute figure, e.g. "100,000". */
		value: number;

		/** Prior value to compare against; rendered as "vs {comparisonValue}". */
		comparisonValue: number;

		/** If `goodIs = 'high'` then an increase (from `comparisonValue` to `value`) is interpreted as good and rendered in green; if it is `low` then an increase is interpreted as bad and rendered in red. */
		goodIs: 'high' | 'low';

		/** Whether to show absolute change, percentage change, or change in percentage-points (this requires `value` and `comparisonValue` to be expressed as proportions). */
		showChangeAs: 'absolute' | 'percentage' | 'percentage-point';

		/** Format string applied to value (in format understood by d3-format) */
		formatString?: string;

		/** Format string applied to the change (in format understood by d3-format). If not provided (and `showChangeAs` is not `percentage-point`), will fall back on `formatString`. */
		changeFormatString?: string;
	}

	let {
		showIcon,
		iconSize,
		size,
		hero,
		value,
		comparisonValue,
		goodIs,
		showChangeAs = 'absolute',
		formatString,
		changeFormatString
	}: Props = $props();

	type Change = 'decrease' | 'no-change' | 'increase';
	const statusIcon: Record<Change, IconSource | undefined> = {
		increase: ArrowTrendingUp,
		decrease: ArrowTrendingDown,
		'no-change': undefined
	};

	type Status = 'positive' | 'neutral' | 'negative';

	const statusTextClass: Record<Status, string> = {
		positive: 'text-color-surface-positive',
		negative: 'text-color-surface-negative',
		neutral: 'text-color-data-neutral-1'
	};

	let status: Status = $derived.by(() => {
		if (value === comparisonValue) {
			// TODO: handle case where figures are qual after rounding for display
			return 'neutral';
		} else if (value < comparisonValue) {
			return goodIs === 'high' ? 'negative' : 'positive';
		} else {
			return goodIs === 'high' ? 'positive' : 'negative';
		}
	});

	let change: Change = $derived.by(() => {
		if (value === comparisonValue) {
			return 'no-change';
		} else if (value < comparisonValue) {
			return 'decrease';
		} else {
			return 'increase';
		}
	});

	let heroIsChange = $derived(hero === 'change' && !!change);
	let changeSize = $derived.by(() => {
		if (heroIsChange) {
			return size === 'lg' ? 'metric' : 'metric-sm';
		} else {
			return size === 'lg' ? 'label-tight' : 'label-sm-tight';
		}
	});

	let icon = $derived(showIcon ? statusIcon[change] : undefined);

	let formattedChange = $derived.by(() => {
		if (showChangeAs === 'absolute') {
			const f = format(changeFormatString ?? formatString ?? ',.0f');
			return f(value - comparisonValue);
		} else if (showChangeAs === 'percentage') {
			const f = format(changeFormatString ?? formatString ?? ',.0%');
			return f((value - comparisonValue) / comparisonValue);
		} else if (showChangeAs === 'percentage-point') {
			// N.B. if changeFormatString isn't set, don't fall back on the
			// value of formatString as we generally want the value and
			// change to be formatted differently (one as a percentage,
			// the other as percetnage-points)
			const f = format(changeFormatString ?? '.0f');
			return f(value * 100 - comparisonValue * 100) + 'pp';
		} else {
			return '';
		}
	});
</script>

<div class="flex items-center">
	{#if icon}
		<span class="sr-only">{value < 0 ? 'down' : 'up'}</span>
		<Icon src={icon} class={classNames(iconSize, statusTextClass[status])} />
	{/if}
	<span class={classNames(changeSize, statusTextClass[status])}>{formattedChange}</span>
	<span class="sr-only">{status}</span>
</div>
