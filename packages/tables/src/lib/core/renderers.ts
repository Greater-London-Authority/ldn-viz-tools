import BarChart from './aggregateRenderers/BarChart.svelte';
import BoxPlot from './aggregateRenderers/BoxPlot.svelte';
import Dots from './aggregateRenderers/Dots.svelte';
import Histogram from './aggregateRenderers/Histogram.svelte';
import Mean from './aggregateRenderers/Mean.svelte';
import StackedBar from './aggregateRenderers/StackedBar.svelte';
import Summary from './aggregateRenderers/Summary.svelte';
import ViolinPlot from './aggregateRenderers/ViolinPlot.svelte';
import BarCell from './renderers/BarCell.svelte';
import BarDivergingCell from './renderers/BarDivergingCell.svelte';
import CategoricalTick from './renderers/CategoricalTick.svelte';
import ColorAndLabel from './renderers/ColorAndLabel.svelte';
import ColoredCell from './renderers/ColoredCell.svelte';
import DateCell from './renderers/DateCell.svelte';
import Dot from './renderers/Dot.svelte';
import GoodOrBad from './renderers/GoodOrBad.svelte';
import Header from './renderers/Header.svelte';
import PairArrow from './renderers/PairArrowCell.svelte';
import ProportionalSymbol from './renderers/ProportionalSymbol.svelte';
import TextCell from './renderers/TextCell.svelte';
import Tick from './renderers/Tick.svelte';

//
import BarDivergingAxis from '../core/renderers/BarDivergingAxis.svelte';
import PairArrowAxis from '../core/renderers/PairArrowAxis.svelte';

export const renderer = {
	BarCell,
	CategoricalTick,
	ColorAndLabel,
	ColoredCell,
	DateCell,
	Dot,
	BarDivergingCell,
	GoodOrBad,
	Header, // ?
	PairArrow,
	ProportionalSymbol,
	TextCell,
	Tick,

	//
	BarChart,
	BoxPlot,
	Dots,
	Histogram,
	Mean,
	StackedBar,
	Summary,
	ViolinPlot
};

export const axisRenderer = {
	BarDivergingAxis,
	PairArrowAxis
};
