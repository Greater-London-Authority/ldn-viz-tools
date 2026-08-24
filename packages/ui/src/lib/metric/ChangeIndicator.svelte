<script lang="ts">
	import { ArrowTrendingDown, ArrowTrendingUp } from '@steeze-ui/heroicons';
	import type { IconSource } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'd3-format';
	import { classNames } from '../utils/classNames.js';

	interface Props {
		showIcon: boolean;
		iconSize: string;
		size?: 'lg' | 'sm';

		hero?: 'value' | 'change' | 'translation';

		value: number;
		comparisonValue: number;
		goodIs: 'high' | 'low';

		showChangeAs: 'absolute' | 'percentage' | 'percentage-point';
		formatString: string;
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
			// was metricRole
			return size === 'lg' ? 'metric' : 'metric-sm';
		} else {
			return size === 'lg' ? 'label' : 'label-sm';
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
			const f = format(changeFormatString ?? '.0f');
			return f(value * 100 - comparisonValue * 100) + 'pp';
		} else {
			return '';
		}
	});
</script>

{#if icon}
	<Icon src={icon} class={classNames(iconSize, statusTextClass[status])} />
{/if}
<span class={classNames(changeSize, statusTextClass[status])}>{formattedChange} </span>
