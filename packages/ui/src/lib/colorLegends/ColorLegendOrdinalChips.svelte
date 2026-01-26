<script lang="ts">
	/**
	 * The `<ColorLegendOrdinalHorizontal>` component draws a legend for an ordinal D3 color scale.
	 *
	 * **Alternatives**: [ColorLegend](./?path=/docs/ui-components-legends-colorlegend--documentation) can draw a legend for an ordinal scale, but with a different appearance.
	 * @component
	 */
	import { type ScaleOrdinal } from 'd3-scale';
	import { classNames } from '../utils/classNames';

	interface Props {
		/**
		 * An ordinal d3 color scale.
		 */
		scale: ScaleOrdinal<string, unknown, never>;
		/**
		 * Title to display above the legend.
		 */
		title?: string;
		/**
		 * Direction in which to lay out color chips.
		 */
		orientation?: 'horizontal' | 'vertical';
		/**
		 * Value to highlight.
		 */
		highlightedValue?: number | string | undefined;
	}

	let {
		scale,
		title = '',
		orientation = 'horizontal',
		highlightedValue = undefined
	}: Props = $props();
</script>

<div class="flex flex-col">
	{#if title}
		<span class="text-color-input-label mb-1 font-semibold">{title}</span>
	{/if}

	<div class={orientation === 'horizontal' ? 'flex flex-wrap gap-2' : 'flex flex-col'}>
		{#each scale.domain() as d}
			<div class="text-color-input-label flex items-center">
				<div
					class={classNames(
						'mr-1 h-4 w-4 flex-none',
						d === highlightedValue ? 'ring-color-interactive-focus ring-2 ring-offset-2' : ''
					)}
					style:background-color={scale(d) as string}
				></div>
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
