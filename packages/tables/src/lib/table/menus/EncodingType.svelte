<script lang="ts">
	import type { ColSpec } from '$lib/core/lib/types';
	import { Popover, RadioButtonGroup } from '@ldn-viz/ui';
	import { ChartBar } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { SvelteComponent } from 'svelte';
	import BarChart from '../../core/aggregateRenderers/BarChart.svelte';
	import BoxPlot from '../../core/aggregateRenderers/BoxPlot.svelte';
	import Dots from '../../core/aggregateRenderers/Dots.svelte';
	import Histogram from '../../core/aggregateRenderers/Histogram.svelte';
	import Mean from '../../core/aggregateRenderers/Mean.svelte';
	import StackedBar from '../../core/aggregateRenderers/StackedBar.svelte';
	import Summary from '../../core/aggregateRenderers/Summary.svelte';
	import ViolinPlot from '../../core/aggregateRenderers/ViolinPlot.svelte';
	import BarCell from '../../core/renderers/BarCell.svelte';
	import BarDivergingCell from '../../core/renderers/BarDivergingCell.svelte';
	import CategoricalTick from '../../core/renderers/CategoricalTick.svelte';
	import ColorAndLabel from '../../core/renderers/ColorAndLabel.svelte';
	import ColoredCell from '../../core/renderers/ColoredCell.svelte';
	import DateCell from '../../core/renderers/DateCell.svelte';
	import Dot from '../../core/renderers/Dot.svelte';
	import PairArrow from '../../core/renderers/PairArrowCell.svelte';
	import ProportionalSymbol from '../../core/renderers/ProportionalSymbol.svelte';
	import TextCell from '../../core/renderers/TextCell.svelte';
	import Tick from '../../core/renderers/Tick.svelte';

	export let col;

	// TODO: filter basd on data type
	// TODO: options

	const unaggregatedOptions = [
		{ label: 'Bar', id: 'BarCell' },
		{ label: 'BarDivergingCell', id: 'BarDivergingCell' },
		{ label: 'Categorical Tick', id: 'CategoricalTick' },
		{ label: 'Color and Label', id: 'ColorAndLabel' },
		{ label: 'Colored', id: 'ColoredCell' },
		{ label: 'Date', id: 'DateCell' },
		{ label: 'Dot', id: 'Dot' },
		{ label: 'PairArrow', id: 'PairArrow' },
		{ label: 'ProportionalSymbol', id: 'ProportionalSymbol' },
		{ label: 'Text', id: 'TextCell' },
		{ label: 'Tick', id: 'Tick' }
	];

	const unaggregatedRenderer = {
		BarCell: BarCell,
		BarDivergingCell,
		CategoricalTick,
		ColorAndLabel,
		ColoredCell,
		DateCell,
		Dot,
		PairArrow,
		ProportionalSymbol,
		TextCell,
		Tick
	};

	const aggregatedOptions = [
		{ label: 'BarChart', id: 'BarChart' },
		{ label: 'BoxPlot', id: 'BoxPlot' },

		{ label: 'Dots', id: 'Dots' },
		{ label: 'Histogram', id: 'Histogram' },
		{ label: 'Mean', id: 'Mean' },
		{ label: 'Stacked Bar', id: 'StackedBar' },
		{ label: 'Summary', id: 'Summary' },
		{ label: 'ViolinPlot', id: 'ViolinPlot' }
	];

	const aggregatedRenderer = {
		BarChart,
		BoxPlot,
		Dots,
		Histogram,
		Mean,
		StackedBar,
		Summary,
		ViolinPlot
	};

	// TODO: set icon based on whether filter applied
	// TODO: position better

	const getRendererName = (col: ColSpec, type: 'cell' | 'group' | 'column') => {
		if (col[type] && col[type].renderer) {
			const name = (col[type].renderer as SvelteComponent).name; // something like 'Proxy<TextCell>'. String will have bene replaced by svelte component at this point.
			return name.slice(6, -1);
		}
		return undefined;
	};

	let selectedCellEncoding: string;
	selectedCellEncoding = getRendererName(col, 'cell');

	const setCellEncoding = () => {
		if (!col.cell) {
			col.cell = {};
		}
		col.cell.renderer = unaggregatedRenderer[selectedCellEncoding];
	};
	$: setCellEncoding(selectedCellEncoding);

	let selectedGroupEncoding: string;
	selectedGroupEncoding = getRendererName(col, 'group');

	const setGroupEncoding = () => {
		if (!col.group) {
			col.group = {};
		}
		col.group.renderer = aggregatedRenderer[selectedGroupEncoding];
	};
	$: setGroupEncoding(selectedGroupEncoding);

	let selectedColumnEncoding: string;
	selectedColumnEncoding = getRendererName(col, 'column');

	const setColumnEncoding = () => {
		if (!col.column) {
			col.column = {};
		}
		col.column.renderer = aggregatedRenderer[selectedColumnEncoding];
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	$: selectedColumnEncoding && setColumnEncoding();
</script>

<Popover>
	<svelte:fragment slot="hint">
		<Icon src={ChartBar} theme="solid" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />

		<span class="sr-only">Open Popover</span>
	</svelte:fragment>

	<h2 class="text-large font-bold">Visual Encoding</h2>

	<h3 class="text-large font-bold">Rows</h3>
	<RadioButtonGroup
		options={unaggregatedOptions}
		name="cell-encoding"
		bind:selectedId={selectedCellEncoding}
		buttonsHidden
	/>

	<h3 class="text-large font-bold">Groups</h3>
	<RadioButtonGroup
		options={aggregatedOptions}
		name="group-encoding"
		bind:selectedId={selectedGroupEncoding}
		buttonsHidden
	/>

	<h3 class="text-large font-bold">Column Summary</h3>
	<RadioButtonGroup
		options={aggregatedOptions}
		name="column-encoding"
		bind:selectedId={selectedColumnEncoding}
		buttonsHidden
	/>
</Popover>
