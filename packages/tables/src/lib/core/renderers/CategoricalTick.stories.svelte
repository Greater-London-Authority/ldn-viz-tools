<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import CategoricalTick from './CategoricalTick.svelte';

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
