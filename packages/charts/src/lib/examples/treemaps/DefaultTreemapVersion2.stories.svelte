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

	const width = $derived(window && window.innerWidth);
	const height = $derived(width * (6 / 16));

	const toTitleCase = (str: string) => {
		return str
			.toLowerCase()
			.split(' ')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const group = (data: any, [name, ...path]: string[]): any => {
		return d3
			.groups(data, (d) => d[name])
			.map(([value, rows]) =>
				path.length
					? { name: value, children: group(rows, path) }
					: { name: value, value: rows.length }
			);
	};

	const root = { name: 'root', children: group(penguins, ['island', 'species', 'sex']) };

	const leaves = (root: any) => {
		const hierarchy = d3
			.hierarchy(root)
			.sum((d) => d.value)
			.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
		d3.treemap().size([width, height]).padding(1)(hierarchy);
		return hierarchy.leaves();
	};

	const leafData = leaves(root);

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
					textAnchor: 'middle',
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
						sex: { value: (d) => (d.data.name ? toTitleCase(d.data.name) : 'N/A'), label: '' },
						value: { value: (d) => d.value, label: '' }
					}
				}
			}),
			// ensure text marks are 20px apart, centre the group vertically around 0
			Plot.text(leafData, {
				x: (d) => (d.x0 + d.x1) / 2, // center of node
				y: (d) => (d.y0 + d.y1) / 2, // vertical center, optional
				textAnchor: 'middle', // align text center to x
				dy: -20, // small vertical offset
				text: (d) => {
					const v = d.parent.data.name;
					const width = (v.length - 1) * 12 + 5;
					const height = 15 + 20;
					return d.x1 - d.x0 > width && d.y1 - d.y0 > height ? v : '';
				},
				fill: '#fff',
				fontWeight: 'bold'
			}),
			Plot.text(leafData, {
				x: (d) => (d.x0 + d.x1) / 2, // center of node
				y: (d) => (d.y0 + d.y1) / 2, // vertical center, optional
				textAnchor: 'middle', // align text center to x
				// dy: -10, // small vertical offset
				text: (d) => {
					const v = d.data.name ? toTitleCase(d.data.name) : 'N/A';
					const width = (v.length - 1) * 12 + 5;
					const height = 15 + 20;
					return d.x1 - d.x0 > width && d.y1 - d.y0 > height ? v : '';
				},
				fill: '#fff'
			}),
			Plot.text(leafData, {
				x: (d) => (d.x0 + d.x1) / 2, // center of node
				y: (d) => (d.y0 + d.y1) / 2, // vertical center, optional
				textAnchor: 'middle', // align text center to x
				dy: 20, // small vertical offset
				text: (d) => {
					const v = d.value?.toFixed(0);
					const width = v.length * 12 + 5;
					const height = 15 + 40;
					return d.x1 - d.x0 > width && d.y1 - d.y0 > height ? v : '';
				},
				fill: '#fff'
			})
		]
	});
</script>

<Story name="Default centred text - three facets">
	{#snippet template()}
		<ObservablePlot
			{spec}
			data={leafData}
			title="Adelie penguins live on all islands"
			subTitle="Penguin data from the islands of Biscoe, Dream and Torgersen"
			alt="Treemap of penguin counts split by island, species and sex"
			byline="GLA City Intelligence"
			source="Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: Palmer Archipelago (Antarctica) penguin data."
			note="Data for demonstration only"
			chartDescription=""
		/>
	{/snippet}
</Story>
