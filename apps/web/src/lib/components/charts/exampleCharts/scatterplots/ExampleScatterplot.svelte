<script lang="ts">
	/**
	 * TODO: THIS EXAMPLE ALREADY EXISTS ESWHERE IN THIS REPO, SO THIS IS A REPETITION ??
	 */
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import penguinCSV from '@observablehq/sample-datasets/penguins.csv?raw';
	import { format } from 'd3';
	import { csvParse } from 'd3-dsv';

	const penguins = csvParse(penguinCSV);

	//const formatLow = format(',.0f'); // for lower than 10000, format commas and not dp
	const formatHigh = format(',.4~s'); // for 10000 and above, format commas and SI numbering (M & K)

	let spec = $derived({
		x: { insetLeft: 100, domain: [30, 65] },
		y: { domain: [7, 23] },
		color: {
			legend: true,
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
			]
		},
		marks: [
			Plot.gridX(),
			Plot.gridY(),
			Plot.axisX({ label: 'culmen_length_mm', labelArrow: true }),
			Plot.axisY({ label: 'culmen_depth_mm', labelArrow: true }),
			Plot.dot(penguins, {
				x: 'culmen_length_mm',
				y: 'culmen_depth_mm',
				fill: 'species',
				tip: true
			})
		]
	});
</script>

<ObservablePlot
	{spec}
	data={penguins}
	title="Adelie penguins have shortest culmen length, but similar depth to Chinstraps"
	subTitle="Penguin data from the islands of Biscoe, Dream and Torgersen"
	alt="Scatter plot chart of Penguin data"
	byline="GLA City Intelligence"
	source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
	note="Data for demonstration only"
	chartDescription="The scatter plot chart shows culmen length against culmen depth for Adelie, Chinstrap and Gentoo penguins. Adelie penguins have the shortest culmen length between 30 and 45 millimetres but have a similar culmen depth to Chinstrap penguins between 15 and 25 millimetres. Chinstrap and Gentoo penguins have culmen lengths between 40 and 60 millimetres. However, Gentoo penguin culmens are shorter than Chinstraps, between 10 and 20 millimetres."
/>
