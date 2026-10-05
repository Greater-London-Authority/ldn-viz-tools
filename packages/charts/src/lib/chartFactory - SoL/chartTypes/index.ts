import { barChartHorizontal } from '$lib/components/charts/chartTypes/barChartHorizontal';
import { barChartHorizontalGrouped } from '$lib/components/charts/chartTypes/barChartHorizontalGrouped';
import { barChartStacked } from '$lib/components/charts/chartTypes/barChartStacked';
import { barChartStackedTimeseries } from '$lib/components/charts/chartTypes/barChartStackedTimeseries';
import { barChartVertical } from '$lib/components/charts/chartTypes/barChartVertical';
import { barChartVerticalGrouped } from '$lib/components/charts/chartTypes/barChartVerticalGrouped';
import { histogram } from '$lib/components/charts/chartTypes/histogram';
import { incomeSlopeChart } from '$lib/components/charts/chartTypes/incomeSlopeChart';
import { lineChart } from '$lib/components/charts/chartTypes/lineChart';
import { lineChartWithLineStyles } from '$lib/components/charts/chartTypes/lineChartWithLineStyles';
import { pairedDotplot } from '$lib/components/charts/chartTypes/pairedDotplot';
import { slopeChart } from '$lib/components/charts/chartTypes/slopeChart';
import type { ChartGenerator } from '../chartOptions';
import { boroughChoropleth } from './boroughChoropleth';

// Generators typed with chart-specific option subtypes need a cast to satisfy
// ChartGenerator (which accepts the full ChartOptions union). The cast is sound
// because each generator is only ever dispatched for its own chartType.
const asGenerator = (fn: (...args: any[]) => any): ChartGenerator =>
	fn as unknown as ChartGenerator;

export const chartFns: Record<string, ChartGenerator> = {
	histogram,
	barChartStacked,
	barChartStackedTimeseries: asGenerator(barChartStackedTimeseries),
	barChartHorizontalGrouped: asGenerator(barChartHorizontalGrouped),
	barChartVerticalGrouped,
	barChartVertical,
	barChartHorizontal: asGenerator(barChartHorizontal),
	line: asGenerator(lineChart),
	lineChartWithLineStyles: asGenerator(lineChartWithLineStyles),
	slopeChart,
	pairedDotPlot: asGenerator(pairedDotplot),

	incomeSlope: incomeSlopeChart,
	boroughChoropleth: asGenerator(boroughChoropleth)
};
