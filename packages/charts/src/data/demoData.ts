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
