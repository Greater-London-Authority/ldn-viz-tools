<script lang="ts">
	import type { Snippet } from 'svelte';
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
	import { format } from 'd3-format';
	import { classNames } from '../utils/classNames.js';
	import ChangeIndicator from './ChangeIndicator.svelte';
	import MetricScaffold from './MetricScaffold.svelte';

	type Status = 'positive' | 'negative' | 'neutral';

	interface Props {
		/** Supporting label above the figure, e.g. "Population". */
		label?: string;

		/** The absolute figure, e.g. "100,000". */
		value: number;

		/** Unit or suffix shown after the value, e.g. "%" or "km". */
		unit?: string;

		/** Colours the change (and its icon); `neutral` shows no icon. */
		status?: Status;

		/** Parenthetical supporting figure, e.g. "(20%)". Shown next to the hero figure. */
		translation?: string;

		/** Prior value to compare against; rendered as "vs {comparisonValue}". */
		comparisonValue?: number;

		/** Which figure leads: the absolute value, or the change. */
		hero?: 'value' | 'change' | 'translation';

		/** Size of the metric. */
		size?: 'lg' | 'sm';

		/** Determines whether parts are stacked vertically or horizontally. */
		layout?: 'vertical' | 'horizontal';

		/** Show the direction icon beside the change value. */
		showIcon?: boolean;

		goodIs?: 'high' | 'low';

		class?: string;

		changeRenderer?: Snippet;

		showChangeAs: 'absolute' | 'percentage' | 'percentage-point';

		formatString?: string;
		changeFormatString?: string;
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
		class: classes = '',
		goodIs = 'high',
		changeRenderer = undefined,
		showChangeAs,
		formatString = ',.0f',
		changeFormatString
	}: Props = $props();

	let metricRole = $derived(size === 'lg' ? 'metric' : 'metric-sm');
	let labelRole = $derived(size === 'lg' ? 'label' : 'label-sm');
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
				? 'h-4 w-4'
				: 'h-3.5 w-3.5'
	);

	let f = $derived(format(formatString ?? '.0f'));
</script>

{#if heroIsChange}
	<MetricScaffold {label} {layout} class={classes} {size}>
		{#snippet primary()}
			{#if changeRenderer}
				{@render changeRenderer()}
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

			{#if translation}
				<span class={classNames(bodyRole, 'text-color-text-muted')}>{translation}</span>
			{/if}
		{/snippet}

		{#snippet secondary()}
			{#if value || comparisonValue}
				<span class={classNames(labelRole, 'text-color-text')}>{f(value)}</span>
				{#if unit}
					<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
				{/if}

				{#if comparisonValue}
					<span class={classNames(labelRole, 'text-color-text-muted')}>
						vs {f(comparisonValue)}
					</span>
				{/if}
			{/if}
		{/snippet}
	</MetricScaffold>

	<div class="flex items-baseline gap-1">
		{#if changeRenderer}
			{@render changeRenderer()}
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

		{#if translation}
			<span class={classNames(bodyRole, 'text-color-text-muted')}>{translation}</span>
		{/if}
	</div>

	{#if value || comparisonValue}
		<div class="flex items-baseline gap-1">
			<span class={classNames(labelRole, 'text-color-text')}>{f(value)}</span>
			{#if unit}
				<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
			{/if}

			{#if comparisonValue}
				<span class={classNames(labelRole, 'text-color-text-muted')}>vs {f(comparisonValue)}</span>
			{/if}
		</div>
	{/if}
{:else if heroIsTranslation}
	<div class="flex items-baseline gap-1">
		<span class={classNames(metricRole, 'text-color-text')}>{translation}</span>

		{#if changeRenderer}
			{@render changeRenderer()}
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
	</div>

	{#if value && comparisonValue}
		<div class="flex items-baseline gap-1">
			<span class={classNames(labelRole, 'text-color-text')}>{f(value)}</span>
			{#if unit}
				<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
			{/if}

			{#if comparisonValue}
				<span class={classNames(labelRole, 'text-color-text-muted')}>vs {f(comparisonValue)}</span>
			{/if}
		</div>
	{/if}
{:else}
	<div class="flex items-baseline gap-1">
		<span class={classNames(metricRole, 'text-color-text')}>{f(value)}</span>
		{#if unit}
			<span class={classNames(bodyRole, 'text-color-text-muted')}>{unit}</span>
		{/if}

		{#if translation}
			<span class={classNames(bodyRole, 'text-color-text-muted')}>{translation}</span>
		{/if}
	</div>

	{#if hasChange || comparisonValue}
		<div class="flex items-baseline gap-1">
			{#if hasChange}
				{#if changeRenderer}
					{@render changeRenderer()}
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
			{/if}

			{#if comparisonValue}
				<span class={classNames(labelRole, 'text-color-text-muted')}>vs {f(comparisonValue)}</span>
			{/if}
		</div>
	{/if}
{/if}
