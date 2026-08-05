<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Tick from './Tick.svelte';

	/**
	 * The `Tick` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the tick encodes the value.
	 * See also: [Dot](./?path=/docs/tables-components-renderers-dot--documentation)
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/Tick',
		component: Tick,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			colorScale: () => 'red',

			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Tick {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<Story name="Multiple">
	{#snippet template()}
		<div class="flex flex-col">
			<Tick value={0.2} extent={[0, 1]} formatString="0.1f" />
			<Tick value={0.7} extent={[0, 1]} formatString="0.1f" />
			<Tick value={0.5} extent={[0, 1]} formatString="0.1f" />
			<Tick value={0.3} extent={[0, 1]} formatString="0.1f" />
		</div>
	{/snippet}
</Story>

<!-- With `showValues` false, the value label is replaced by a blank spacer. -->
<Story name="Hide values">
	{#snippet template()}
		<Tick value={0.5} extent={[0, 1]} showValues={false} />
	{/snippet}
</Story>

<!-- `color` can be a function of the value. -->
<Story name="Color as a function of value">
	{#snippet template()}
		<div class="flex flex-col">
			<Tick
				value={0.2}
				extent={[0, 1]}
				formatString="0.1f"
				color={(value) => (value > 0.5 ? 'red' : 'blue')}
			/>
			<Tick
				value={0.8}
				extent={[0, 1]}
				formatString="0.1f"
				color={(value) => (value > 0.5 ? 'red' : 'blue')}
			/>
		</div>
	{/snippet}
</Story>

<!-- Values at the extent edges and beyond: the position is clamped by the layout but the derived offset can exceed the bounds. -->
<Story name="Extent edge and out-of-range values">
	{#snippet template()}
		<div class="flex flex-col">
			<Tick value={0} extent={[0, 1]} formatString="0.1f" />
			<Tick value={1} extent={[0, 1]} formatString="0.1f" />
			<Tick value={1.5} extent={[0, 1]} formatString="0.1f" />
		</div>
	{/snippet}
</Story>
