<script module lang="ts">
	import { getDefaultPlotStyles } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as d3 from 'd3';
	import { penguins } from '../../../data/demoData';
	import ObservablePlot from '../../observablePlot/ObservablePlot.svelte';
	import { Plot } from '../../observablePlotFragments/plot';

	const { Story } = defineMeta({
		title: 'Charts/Examples/Treemaps'
	});

	const { defaultTip } = $derived(getDefaultPlotStyles());

	let width = $state(0);
	const height = $derived(width * (6 / 16));

	// sanitising data for display by changing sex from uppercase to title case
	const toTitleCase = (str: string) => {
		return str
			.toLowerCase()
			.split(' ')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const penguinsPreprocessed = penguins.map((d) => ({
		...d,
		sex: d.sex ? toTitleCase(d.sex) : 'N/A'
	}));

	// turning tidy data into hierarchical data for use in treemap
	const group = (data: any, [name, ...path]: string[]): any => {
		return d3
			.groups(data, (d) => d[name])
			.map(([value, rows]) =>
				path.length
					? { name: value, children: group(rows, path) }
					: { name: value, value: rows.length }
			);
	};

	const root = {
		name: 'root',
		children: group(penguinsPreprocessed, ['island', 'species', 'sex'])
	};

	const leaves = (root: any, width: number, height: number) => {
		const hierarchy = d3
			.hierarchy(root)
			.sum((d) => d.value)
			.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
		d3.treemap().size([width, height]).padding(1)(hierarchy);
		return hierarchy.leaves();
	};

	const leafData = $derived.by(() => leaves(root, width, height));

	// function checking whether text should be displayed and which text should be displayed
	const showText = (text: string, datum: any) => {
		const width = text.toString().length * 5 + 5;
		const height = 20;
		const visible = datum.x1 - datum.x0 > width && datum.y1 - datum.y0 > height;
		return visible;
	};

	let spec = $derived({
		marginLeft: 0,
		marginRight: 0,
		marginTop: 16,
		marginBottom: 16,
		x: { insetLeft: 0, axis: null },
		y: { axis: null },
		color: {
			range: [
				theme.currentTheme.color.data.primary,
				theme.currentTheme.color.data.secondary,
				theme.currentTheme.color.data.tertiary
			]
		},
		marks: [
			Plot.rect(leafData, {
				x1: 'x0',
				x2: 'x1',
				y1: 'y0',
				y2: 'y1',
				fill: (d) => d.parent.parent.data.name,
				tip: {
					...defaultTip,
					lineHeight: 1.3,
					textAnchor: 'start',
					format: {
						fill: false,
						fx: false,
						fy: false,
						x1: false,
						x2: false,
						y1: false,
						y2: false
					},
					channels: {
						island: { value: (d) => d.parent.parent.data.name, label: '' },
						species: { value: (d) => d.parent.data.name, label: '' },
						sex: { value: (d) => d.data.name, label: '' },
						value: { value: (d) => d.value, label: '' }
					}
				}
			}),
			// // what are all the text in the group, how are they behaving and how should this text mark behave
			// // ensure text marks are 20px apart
			Plot.text(leafData, {
				x: 'x0',
				y: 'y1',
				dy: 12,
				dx: 6,
				textAnchor: 'start',
				text: (d) => {
					const textValue = d.value; // penguin name
					const visible = showText(textValue, d);
					return visible ? textValue : '';
				},
				fill: '#fff'
			})
		]
	});
</script>

<Story name="Top Left Text - simple">
	{#snippet template()}
		<div bind:clientWidth={width}>
			<ObservablePlot
				{spec}
				data={leafData}
				title="Adelie penguins live on all islands"
				subTitle="Penguin data from the islands of Biscoe, Dream and Torgersen"
				alt="Treemap of penguin counts split by island and species"
				byline="GLA City Intelligence"
				source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
				note="Data for demonstration only"
				chartDescription="The treemap chart shows count of penguins across three islands, split by species and sex. Adelie penguins have a highest total population of 151 across all islands. 124 Gentoo penguins live on Biscoe island, along with 44 Adelie penguins. 68 Chinstrap penguins live on Dream island, along with 56 Adelie penguins. 51 Adelie penguins live on Torgersen island. The split between male and female penguins is relatively equal across all species and islands."
			/>
		</div>
	{/snippet}
</Story>
