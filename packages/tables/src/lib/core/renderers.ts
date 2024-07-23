import BarCell from './renderers/BarCell.svelte';
import ViolinPlot from './aggregateRenderers/ViolinPlot.svelte';
import Summary from './aggregateRenderers/Summary.svelte';
import DateCell from './renderers/DateCell.svelte';
import StackedBar from './aggregateRenderers/StackedBar.svelte';
import Mean from './aggregateRenderers/Mean.svelte';
import Histogram from './aggregateRenderers/Histogram.svelte';
import Dots from './aggregateRenderers/Dots.svelte';
import BoxPlot from './aggregateRenderers/BoxPlot.svelte';
import BarChart from './aggregateRenderers/BarChart.svelte';
import Tick from './renderers/Tick.svelte';
import TextCell from './renderers/TextCell.svelte';
import ProportionalSymbol from './renderers/ProportionalSymbol.svelte';
import Header from './renderers/Header.svelte';
import GoodOrBad from './renderers/GoodOrBad.svelte';
import Dot from './renderers/Dot.svelte';
import ColoredCell from './renderers/ColoredCell.svelte';
import ColorAndLabel from './renderers/ColorAndLabel.svelte';
import CategoricalTick from './renderers/CategoricalTick.svelte';

export const renderer = {
	BarCell,
	CategoricalTick,
	ColorAndLabel,
	ColoredCell,
	DateCell,
	Dot,
	GoodOrBad,
	Header, // ?
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
