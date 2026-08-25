<script lang="ts">
	/**
	 * `Metric` — a single figure with an optional previous value and change.
	 *
	 * @component
	 */
	import { format } from 'd3-format';
	import type { Snippet } from 'svelte';
	import { classNames } from '../utils/classNames';
	import ChangeIndicator from './ChangeIndicator.svelte';
	import MetricScaffold from './MetricScaffold.svelte';

	interface Props {
		/** Supporting label above the figure, e.g. "Population". */
		label?: string;

		/** The absolute figure, e.g. "100,000". */
		value: number;

		/** Unit or suffix shown after the value, e.g. "km". */
		unit?: string;

		/** Parenthetical supporting figure, e.g. "(20%)". Shown next to the hero figure. */
		translation?: string;

		/** Prior value to compare against; rendered as "vs {comparisonValue}". */
		comparisonValue?: number;

		/** Which figure leads: the absolute value, the change, or the translation. */
		hero?: 'value' | 'change' | 'translation';

		/** Size of the metric. */
		size?: 'lg' | 'sm';

		/** Determines whether parts are stacked vertically or horizontally. */
		layout?: 'vertical' | 'horizontal';

		/** If `true`, then the direction icon is rendered beside the change value. */
		showIcon?: boolean;

		/** If `goodIs = 'high'` then an increase (from `comparisonValue` to `value`) is interpreted as good and rendered in green; if it is `low` then an increase is interpreted as bad and rendered in red. */
		goodIs?: 'high' | 'low';

		/** Whether to show absolute change, percentage change, or change in percentage-points (this requires `value` and `comparisonValue` to be expressed as proportions). */
		showChangeAs?: 'absolute' | 'percentage' | 'percentage-point';

		/** Format string applied to value (in format understood by d3-format) */
		formatString?: string;

		/** Format string applied to the change (in format understood by d3-format). If not provided (and `showChangeAs` is not `percentage-point`), will fall back on `formatString`. */
		changeFormatString?: string;

		/** Snippet that can override the primary contents of the metric. */
		primaryRenderer?: Snippet;

		/** Snippet that can override the secondary contents of the metric. */
		secondaryRenderer?: Snippet;
	}

	let {
		label = '',
		value,
		unit = '',
		translation = '',
		comparisonValue = undefined,
		hero = 'value',
		size = 'lg',
		layout = 'vertical',
		showIcon = true,
		goodIs = 'high',
		showChangeAs = 'absolute',
		formatString,
		changeFormatString,
		primaryRenderer,
		secondaryRenderer
	}: Props = $props();

	let metricRole = $derived(size === 'lg' ? 'metric' : 'metric-sm');
	let labelRole = $derived(size === 'lg' ? 'label-tight' : 'label-sm-tight');
	let bodyRole = $derived(size === 'lg' ? 'body' : 'body-sm');

	let hasChange = $derived(typeof value !== 'undefined' && typeof comparisonValue !== 'undefined');
	let heroIsChange = $derived(hero === 'change' && hasChange);
	let heroIsTranslation = $derived(hero === 'translation' && translation);

	let iconSize = $derived(
		heroIsChange
			? size === 'lg'
				? 'h-7 w-7'
				: 'h-5 w-5'
			: size === 'lg'
				? 'h-3.5 w-3.5'
				: 'h-3 w-3'
	);

	let f = $derived(format(formatString ?? ',.0f'));

	let heroValue = $derived.by(() => {
		let hVal: number | string = f(value);
		if (heroIsTranslation) {
			hVal = translation;
		}
		return hVal;
	});
</script>

<!-- Default primary group (Big number) -->
{#snippet primaryGroup()}
	{#if heroIsChange}
		<ChangeIndicator
			{showIcon}
			{iconSize}
			{size}
			{hero}
			{value}
			comparisonValue={comparisonValue!}
			{goodIs}
			{showChangeAs}
			{formatString}
			{changeFormatString}
		/>
	{:else}
		<!--If hero is default value or translation-->
		<span class={classNames(metricRole, 'text-color-text')}>{heroValue}</span>
	{/if}
	{#if translation && !heroIsTranslation}
		<span class={classNames(bodyRole, 'text-color-text-muted')}>{translation}</span>
	{/if}
	{#if heroIsTranslation}
		<span class={classNames(bodyRole, 'text-color-text-muted')}>({value})</span>
	{/if}

	<!-- TODO:
	{#if unit}
			<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
		{/if}
		-->
{/snippet}

<!-- Default secondary group (supporting numbers) -->
{#snippet secondaryGroup()}
	{#if comparisonValue}
		{#if heroIsChange}
			<span class={classNames(labelRole, 'text-color-text')}>{value}</span>
		{:else}
			<ChangeIndicator
				{showIcon}
				{iconSize}
				{size}
				{hero}
				{value}
				{comparisonValue}
				{goodIs}
				{showChangeAs}
				{formatString}
				{changeFormatString}
			/>
		{/if}
		<span class={classNames(labelRole, 'flex-shrink-0 text-color-text-muted')}>
			vs {f(comparisonValue)}
		</span>
	{/if}
{/snippet}

<!-- Component -->
<MetricScaffold {layout} {label} {size}>
	{#snippet primary()}
		{@render (primaryRenderer ?? primaryGroup)()}
	{/snippet}

	{#snippet secondary()}
		{@render (secondaryRenderer ?? secondaryGroup)()}
	{/snippet}
</MetricScaffold>
