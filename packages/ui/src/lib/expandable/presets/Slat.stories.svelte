<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Metric from '../../metric/Metric.svelte';
	import Slat from './Slat.svelte';
	import SlatGroup from './SlatGroup.svelte';

	/**
	 * Prototype. A `Slat` summarises something in one row and can open to show details.
	 * `SlatGroup` holds slats that each open on their own.
	 *
	 * The row has a title group and a `summary` snippet for metrics, a small chart or tags.
	 * The row is not a button, so it can hold links and tooltips; a separate toggle opens
	 * the slat. The sparklines here are placeholder SVGs; an app passes in real charts.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Expandable/Slat',
		component: Slat,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		argTypes: {
			toggle: { control: 'radio', options: ['icon', 'text'] },
			mount: { control: 'radio', options: ['first-open', 'always', 'open'] }
		},
		args: { toggle: 'icon', mount: 'first-open' }
	});

	const boroughs = [
		{
			name: 'Camden',
			region: 'Inner London',
			value: 212000,
			prior: 204000,
			trend: [4, 6, 5, 7, 8, 7, 9],
			tag: 'Rising'
		},
		{
			name: 'Barnet',
			region: 'Outer London',
			value: 398000,
			prior: 401000,
			trend: [9, 8, 8, 7, 7, 6, 6],
			tag: 'Falling'
		},
		{
			name: 'Hackney',
			region: 'Inner London',
			value: 259000,
			prior: 259000,
			trend: [5, 6, 5, 6, 5, 6, 5],
			tag: 'Stable'
		}
	];

	const points = (trend: number[]) => {
		const max = Math.max(...trend);
		const min = Math.min(...trend);
		return trend
			.map(
				(v, i) => `${(i / (trend.length - 1)) * 80},${24 - ((v - min) / (max - min || 1)) * 20 - 2}`
			)
			.join(' ');
	};
</script>

{#snippet sparkline(trend: number[])}
	<svg width="80" height="24" viewBox="0 0 80 24" aria-hidden="true">
		<polyline
			points={points(trend)}
			fill="none"
			stroke="var(--color-data-primary)"
			stroke-width="2"
		/>
	</svg>
{/snippet}

{#snippet tag(text: string)}
	<span class="label-sm border border-color-border-wash px-2 py-0.5 text-color-text-muted"
		>{text}</span
	>
{/snippet}

{#snippet details(name: string)}
	<div class="body-md grid gap-2 md:grid-cols-2">
		<div class="h-32 bg-color-surface-muted"></div>
		<p>
			A fuller view of {name}: a larger chart, a table or notes. The content is rendered the first
			time the slat opens.
		</p>
	</div>
{/snippet}

{#snippet slats(args: any)}
	<div class="max-w-3xl">
		<SlatGroup>
			{#each boroughs as b (b.name)}
				<Slat {...args} value={b.name} title={b.name} subtitle={b.region} headingLevel={3}>
					{#snippet summary()}
						<Metric
							value={b.value}
							comparisonValue={b.prior}
							size="sm"
							layout="horizontal"
							formatString=",.0f"
						/>
						{@render sparkline(b.trend)}
						{@render tag(b.tag)}
					{/snippet}
					{@render details(b.name)}
				</Slat>
			{/each}
		</SlatGroup>
	</div>
{/snippet}

<Story name="Default" template={slats} />

<!-- `toggle="text"` puts a "Show details" button below the row. -->
<Story name="Text toggle" args={{ toggle: 'text' }} template={slats} />

<!-- When the open slat should show something else in the row, `openHeader` replaces it. -->
<Story name="Open header">
	{#snippet template(args)}
		<div class="max-w-3xl">
			<SlatGroup>
				<Slat {...args} title="Camden" subtitle="Inner London">
					{#snippet summary()}
						{@render sparkline(boroughs[0].trend)}
					{/snippet}
					{#snippet openHeader()}
						<p class="title-md">Camden, population detail</p>
					{/snippet}
					{@render details('Camden')}
				</Slat>
			</SlatGroup>
		</div>
	{/snippet}
</Story>

<!-- Without `children`, a slat is a static row with no toggle. It can sit in a group with slats that open. -->
<Story name="Static and expandable">
	{#snippet template(args)}
		<div class="max-w-3xl">
			<SlatGroup>
				<Slat {...args} title="Westminster" subtitle="No further detail">
					{#snippet summary()}
						{@render tag('Static')}
					{/snippet}
				</Slat>
				<Slat {...args} title="Camden" subtitle="Inner London">
					{#snippet summary()}
						{@render sparkline(boroughs[0].trend)}
					{/snippet}
					{@render details('Camden')}
				</Slat>
			</SlatGroup>
		</div>
	{/snippet}
</Story>
