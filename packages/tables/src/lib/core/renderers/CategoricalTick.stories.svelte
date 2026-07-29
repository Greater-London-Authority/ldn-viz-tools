<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import CategoricalTick from './CategoricalTick.svelte';

	/**
	 * The `CategoricalTick` component encodes a single categorical value redundantly as both the position and color of a tick.
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/CategoricalTick',
		component: CategoricalTick,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			color: scaleOrdinal()
				.domain(['a', 'b', 'c', 'd'])
				.range(['#c5dcf2', '#8fb4db', '#628dba', '#3b6894', '#18446c']),

			extent: [0, 1],

			posScale: scaleBand().range([0, 1]).domain(['a', 'b', 'c', 'd'])
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<CategoricalTick {...args} value={args.value} color={args.color} posScale={args.posScale} />
	{/snippet}
</Story>

<Story name="Multiple">
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<CategoricalTick {...args} value="a" color={args.color} posScale={args.posScale} />
			<CategoricalTick {...args} value="b" color={args.color} posScale={args.posScale} />
			<CategoricalTick {...args} value="c" color={args.color} posScale={args.posScale} />
			<CategoricalTick {...args} value="d" color={args.color} posScale={args.posScale} />
		</div>
	{/snippet}
</Story>

<!-- With `showValues={false}` the tick renders without its text label (a blank spacer). -->
<Story name="Without values">
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<CategoricalTick
				{...args}
				value="a"
				color={args.color}
				posScale={args.posScale}
				showValues={false}
			/>
			<CategoricalTick
				{...args}
				value="b"
				color={args.color}
				posScale={args.posScale}
				showValues={false}
			/>
			<CategoricalTick
				{...args}
				value="c"
				color={args.color}
				posScale={args.posScale}
				showValues={false}
			/>
		</div>
	{/snippet}
</Story>

<!-- The `color` prop can be a function of the value. -->
<Story name="Color as a function">
	{#snippet template(args)}
		<div class="flex w-36 flex-col">
			<CategoricalTick
				{...args}
				value="a"
				posScale={args.posScale}
				color={(value) => (String(value) === 'a' ? 'crimson' : 'steelblue')}
			/>
			<CategoricalTick
				{...args}
				value="b"
				posScale={args.posScale}
				color={(value) => (String(value) === 'a' ? 'crimson' : 'steelblue')}
			/>
		</div>
	{/snippet}
</Story>

<!-- A long category label overflows the cell width. -->
<Story name="Long category label">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<CategoricalTick
				value="A very long category label that overflows"
				color="steelblue"
				posScale={scaleBand()
					.range([0, 1])
					.domain(['A very long category label that overflows', 'b', 'c'])}
			/>
		</div>
	{/snippet}
</Story>
