<script lang="ts">
	/**
	 * `Metric` — a single figure with an optional previous value and change.
	 *
	 *
	 * `size` maps to the type roles: `lg` → `metric`/`label`/`body`, `sm` →
	 * `metric-sm`/`label-sm`/`body-sm`. `layout` arranges the parts vertically
	 * (stacked) or horizontally (inline).
	 *
	 * @component
	 */
	import { ArrowTrendingDown, ArrowTrendingUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { classNames } from '../utils/classNames.js';

	type Status = 'positive' | 'negative' | 'neutral';

	interface Props {
		/** Supporting label above the figure, e.g. "Population". */
		label?: string;

		/** The absolute figure, e.g. "100,000". */
		value: string;

		/** Unit or suffix shown after the value, e.g. "%" or "km". */
		unit?: string;

		/** The change figure, e.g. "10%". Omit to render a plain metric with no change. */
		change?: string;

		/** Colours the change (and its icon); `neutral` shows no icon. */
		status?: Status;

		/** Parenthetical supporting figure, e.g. "(20%)". Shown next to the hero figure. */
		translation?: string;

		/** Prior value to compare against; rendered as "vs {comparisonValue}". */
		comparisonValue?: string;

		/** Which figure leads: the absolute value, or the change. */
		hero?: 'value' | 'change';

		/** Size of the metric. */
		size?: 'lg' | 'sm';

		/** Determines whether parts are stacked vertically or horizontally. */
		layout?: 'vertical' | 'horizontal';

		/** Show the direction icon beside the change value. */
		showIcon?: boolean;

		class?: string;
	}

	let {
		label = '',
		value,
		unit = '',
		change = '',
		status = 'neutral',
		translation = '',
		comparisonValue = '',
		hero = 'value',
		size = 'lg',
		layout = 'vertical',
		showIcon = true,
		class: classes = ''
	}: Props = $props();

	const statusTextClass: Record<Status, string> = {
		positive: 'text-color-surface-positive',
		negative: 'text-color-surface-negative',
		neutral: 'text-color-data-neutral-1'
	};

	const statusIcon = {
		positive: ArrowTrendingUp,
		negative: ArrowTrendingDown,
		neutral: undefined
	};

	let metricRole = $derived(size === 'lg' ? 'metric' : 'metric-sm');
	let labelRole = $derived(size === 'lg' ? 'label' : 'label-sm');
	let bodyRole = $derived(size === 'lg' ? 'body' : 'body-sm');

	let hasChange = $derived(!!change);
	let heroIsChange = $derived(hero === 'change' && hasChange);
	let iconSize = $derived(
		heroIsChange
			? size === 'lg'
				? 'h-7 w-7'
				: 'h-5 w-5'
			: size === 'lg'
				? 'h-4 w-4'
				: 'h-3.5 w-3.5'
	);
	let icon = $derived(showIcon ? statusIcon[status] : undefined);
</script>

<div
	class={classNames(
		'product flex',
		layout === 'vertical' ? 'flex-col items-start gap-1' : 'flex-row items-baseline gap-2',
		classes
	)}
>
	{#if label}
		<p class={classNames(labelRole, 'text-color-text-muted')}>{label}</p>
	{/if}

	<div class="flex items-baseline gap-1">
		{#if heroIsChange}
			{#if icon}
				<Icon src={icon} class={classNames(iconSize, statusTextClass[status])} />
			{/if}
			<span class={classNames(metricRole, statusTextClass[status])}>{change}</span>
		{:else}
			<span class={classNames(metricRole, 'text-color-text')}>{value}</span>
			{#if unit}
				<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
			{/if}
		{/if}
		{#if translation}
			<span class={classNames(bodyRole, 'text-color-text-muted')}>{translation}</span>
		{/if}
	</div>

	{#if (heroIsChange && value) || (!heroIsChange && hasChange) || comparisonValue}
		<div class="flex items-baseline gap-1">
			{#if heroIsChange}
				<span class={classNames(labelRole, 'text-color-text')}>{value}</span>
				{#if unit}
					<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
				{/if}
			{:else if hasChange}
				{#if icon}
					<Icon src={icon} class={classNames(iconSize, statusTextClass[status])} />
				{/if}
				<span class={classNames(labelRole, statusTextClass[status])}>{change}</span>
			{/if}
			{#if comparisonValue}
				<span class={classNames(labelRole, 'text-color-text-muted')}>vs {comparisonValue}</span>
			{/if}
		</div>
	{/if}
</div>
