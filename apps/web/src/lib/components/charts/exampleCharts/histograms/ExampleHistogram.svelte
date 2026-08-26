<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { format, randomNormal } from 'd3';

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	const getRandomNormal = randomNormal(0.5, 0.2);
	const randomVals = [...Array(1000)].map(() => ({ x: getRandomNormal() }));
	const chartData = randomVals;

	let spec = $derived({
		marginTop: 40, // adjust for y label
		x: { insetLeft: 80, insetRight: 20 },
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'Random Value Range' }),
			Plot.axisY({ label: 'Frequency of value' }),
			Plot.rectY(chartData, Plot.binX({ y: 'count' }, { x: 'x', tip: true, inset: 0 })),
			// baseline last
			Plot.ruleY([0])
		]
	});
</script>

<ObservablePlot
	{spec}
	data={chartData}
	title="Using the RectY mark to create a histogram that shows random samples from a normal distribution"
	subTitle="1000 randomly generated and binned values"
	alt="Histogram chart of 1000 randomly generated values"
	byline="GLA City Intelligence"
	source="LDN Viz Tools Demo Data"
	note="Data for demonstration only"
	chartDescription="The histogram chart shows 1000 randomly generated and binned values in a normal distribution. The x axis ranges in value from around 0 to 1.0 and the y axis ranges in frequency from 0 to a randomly defined number."
/>
