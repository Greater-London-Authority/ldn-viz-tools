<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import ProportionalSymbol from './ProportionalSymbol.svelte';
	/**
	 * The `ProportionalSymbol` component renders a table cell encoding a single value as a circle, with the radius encoding the value.
	 */

	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/ProportionalSymbol',
		component: ProportionalSymbol,
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
		<ProportionalSymbol {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<!-- With `showValues` set, the numeric value is displayed as a label. -->
<Story name="Show values">
	{#snippet template()}
		<ProportionalSymbol value={0.5} extent={[0, 1]} showValues={true} />
	{/snippet}
</Story>

<!-- A column of varying values shows how the radius scales with sqrt of the value. -->
<Story name="Multiple radii">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ProportionalSymbol value={0.1} extent={[0, 1]} />
			<ProportionalSymbol value={0.25} extent={[0, 1]} />
			<ProportionalSymbol value={0.5} extent={[0, 1]} />
			<ProportionalSymbol value={1} extent={[0, 1]} />
		</div>
	{/snippet}
</Story>

<!-- A custom fill `color`. -->
<Story name="Custom color">
	{#snippet template()}
		<ProportionalSymbol
			value={0.6}
			extent={[0, 1]}
			color={theme.tokenNameToValue('data.secondary')}
		/>
	{/snippet}
</Story>

<!-- At extent[0] the radius is 0; at extent[1] the radius is 1 (fills the cell). -->
<Story name="Value at extent bounds">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ProportionalSymbol value={0} extent={[0, 1]} />
			<ProportionalSymbol value={1} extent={[0, 1]} />
		</div>
	{/snippet}
</Story>
