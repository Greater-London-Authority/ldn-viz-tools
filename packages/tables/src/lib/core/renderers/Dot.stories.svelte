<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Dot from './Dot.svelte';

	/**
	 * The `Dot` component renders a table cell representing a numerical value as a tick;
	 * the horizontal position of the dot encodes the value.
	 * See also: [Tick](./?path=/docs/tables-components-renderers-tick--documentation)
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/Dot',
		component: Dot,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			extent: [0, 1]
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<Dot {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<Story name="Multiple">
	{#snippet template()}
		<div class="flex flex-col">
			<Dot value={0.2} extent={[0, 1]} formatString="0.1f" />
			<Dot value={0.7} extent={[0, 1]} formatString="0.1f" />
			<Dot value={0.5} extent={[0, 1]} formatString="0.1f" />
			<Dot value={0.3} extent={[0, 1]} formatString="0.1f" />
		</div>
	{/snippet}
</Story>

<!-- With `showValues={false}` the dot renders without its text label (a blank spacer). -->
<Story name="Without values">
	{#snippet template()}
		<div class="flex flex-col">
			<Dot value={0.2} extent={[0, 1]} showValues={false} />
			<Dot value={0.7} extent={[0, 1]} showValues={false} />
		</div>
	{/snippet}
</Story>

<!-- The `color` prop can be a function of the value. -->
<Story name="Color as a function of value">
	{#snippet template()}
		<div class="flex flex-col">
			<Dot
				value={0.2}
				extent={[0, 1]}
				formatString="0.1f"
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
			/>
			<Dot
				value={0.5}
				extent={[0, 1]}
				formatString="0.1f"
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
			/>
			<Dot
				value={0.8}
				extent={[0, 1]}
				formatString="0.1f"
				color={(val) => (val > 0.5 ? 'crimson' : 'steelblue')}
			/>
		</div>
	{/snippet}
</Story>

<!-- Values at the edges of the extent (0% and 100%) and beyond it (overflow). -->
<Story name="Extent edge and out of range">
	{#snippet template()}
		<div class="flex flex-col">
			<Dot value={0} extent={[0, 1]} formatString="0.1f" />
			<Dot value={1} extent={[0, 1]} formatString="0.1f" />
			<Dot value={1.3} extent={[0, 1]} formatString="0.1f" />
		</div>
	{/snippet}
</Story>
