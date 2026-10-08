import type { ChartGenerator } from '../chartOptions';
import { barChartHorizontal } from './barChartHorizontal';
import { barChartHorizontalGrouped } from './barChartHorizontalGrouped';
import { barChartStacked } from './barChartStacked';
import { barChartStackedTimeseries } from './barChartStackedTimeseries';
import { barChartVertical } from './barChartVertical';
import { barChartVerticalGrouped } from './barChartVerticalGrouped';
import { choropleth } from './choropleth';
import { histogram } from './histogram';
import { incomeSlopeChart } from './incomeSlopeChart';
import { lineChart } from './lineChart';
import { lineChartWithForecast } from './lineChartWithForecast';
import { lineChartWithLineStyles } from './lineChartWithLineStyles';
import { pairedDotplot } from './pairedDotplot';
import { slopeChart } from './slopeChart';

// Generators typed with chart-specific option subtypes need a cast to satisfy
// ChartGenerator (which accepts the full ChartOptions union). The cast is sound
// because each generator is only ever dispatched for its own chartType.
const asGenerator = (fn: (...args: any[]) => any): ChartGenerator =>
	fn as unknown as ChartGenerator;

export const chartFns: Record<string, ChartGenerator> = {
	histogram: asGenerator(histogram),
	barChartStacked,
	barChartStackedTimeseries: asGenerator(barChartStackedTimeseries),
	barChartHorizontalGrouped: asGenerator(barChartHorizontalGrouped),
	barChartVerticalGrouped,
	barChartVertical,
	barChartHorizontal: asGenerator(barChartHorizontal),
	line: asGenerator(lineChart),
	lineChartWithLineStyles: asGenerator(lineChartWithLineStyles),
	lineChartWithForecast: asGenerator(lineChartWithForecast),
	slopeChart,
	pairedDotPlot: asGenerator(pairedDotplot),

	incomeSlope: incomeSlopeChart,
	choropleth: asGenerator(choropleth)
};
