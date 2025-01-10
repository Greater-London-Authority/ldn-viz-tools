<script lang="ts">
	/**
	 * The `<ColorLegendOrdinalHorizontal>` component draws a legend for an ordinal D3 color scale.
	 *
	 * **Alternatives**: [ColorLegend](./?path=/docs/ui-legends-colorlegend--documentation) can draw a legend for an ordinal scale, but with a different appearance.
	 * @component
	 */
	import { type ScaleLinear } from 'd3-scale';
	import { classNames } from '../utils/classNames';

	/**
	 * An ordinal d3 color scale.
	 */
	export let scale: ScaleLinear<number | string, string>;

	/**
	 * Title to display above the legend.
	 */
	export let title = '';

	/**
	 * Direction in which to lay out color chips.
	 */
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * Value to highlight.
	 */
	export let highlightedValue: number | string | undefined = undefined;
</script>

<div class="flex flex-col">
	{#if title}
		<span class="font-semibold text-color-input-label mb-1">{title}</span>
	{/if}

	<div class={orientation === 'horizontal' ? 'flex flex-wrap gap-2' : 'flex flex-col'}>
		{#each scale.domain() as d}
			<div class="flex items-center text-color-input-label">
				<div
					class={classNames(
						'flex-none w-4 h-4 mr-1',
						d === highlightedValue ? 'ring-offset-2 ring-2 ring-color-input-border-focussed' : ''
					)}
					style:background-color={scale(d)}
				/>
				<span
					class={classNames(
						'items-center',
						d === highlightedValue ? 'font-semibold' : 'font-normal'
					)}
				>
					{d}
				</span>
			</div>
		{/each}
	</div>
</div>
