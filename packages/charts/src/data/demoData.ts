import { groupBy, mean, summarize, tidy } from '@tidyjs/tidy';
import demoMonthlyTimeseriesLongJSON from './demoMonthlyTimeseriesLong.json';

// Add year and parse JSON to real date object
export const demoMonthlyTimeseriesLong = demoMonthlyTimeseriesLongJSON.map((d) => ({
	...d,
	Year: d.Month.slice(0, 4),
	Month: new Date(d.Month)
}));

export const singleVariableData = demoMonthlyTimeseriesLong.filter(
	(d) => d.Variable == 'Variable A'
);

export const multiVariableData = demoMonthlyTimeseriesLong;

export const dualVariableData = demoMonthlyTimeseriesLong.filter(
	(d) => d.Variable === 'Variable A' || d.Variable === 'Variable B'
);

export const demoAggregatedByYearTimeseriesLong = tidy(
	demoMonthlyTimeseriesLong,
	groupBy(['Year', 'Variable'], summarize({ Average: mean('Value') }))
);

export const singleVarAggregatedByYear = demoAggregatedByYearTimeseriesLong.filter(
	(d) => d.Variable === 'Variable A'
);

export const multiVarSingleYearAggregatedByYear = demoAggregatedByYearTimeseriesLong.filter(
	(d) => d.Year === '2024'
);
