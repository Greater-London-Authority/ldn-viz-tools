<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import { theme } from '@ldn-viz/ui';
	import ColorAndLabel from './ColorAndLabel.svelte';

	/**
	 * The `ColorAndLabel` component renders a table cell representing a numerical value as a label, next to a small square with a background color encoding the value.
	 * See also [ColoredCell](./?path=/docs/tables-components-renderers-coloredcell--documentation).
	 */
	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/ColorAndLabel',
		component: ColorAndLabel,
		tags: ['autodocs'],

		argTypes: {
			value: {
				type: 'number',
				inputType: 'number'
			}
		},
		args: {
			value: 0.5,
			colorScale: () => theme.tokenNameToValue('data.primary')
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<ColorAndLabel {...args} value={args.value ?? 0.5} />
	{/snippet}
</Story>

<!-- The `color` prop can be a function of the value, e.g. a threshold scale. -->
<Story name="Color as a threshold scale">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ColorAndLabel
				value={0.2}
				color={(v) => (v < 0.33 ? '#c5dcf2' : v < 0.66 ? '#628dba' : '#18446c')}
			/>
			<ColorAndLabel
				value={0.5}
				color={(v) => (v < 0.33 ? '#c5dcf2' : v < 0.66 ? '#628dba' : '#18446c')}
			/>
			<ColorAndLabel
				value={0.9}
				color={(v) => (v < 0.33 ? '#c5dcf2' : v < 0.66 ? '#628dba' : '#18446c')}
			/>
		</div>
	{/snippet}
</Story>

<!-- A long label is truncated within a constrained cell width. -->
<Story name="Long label overflow">
	{#snippet template()}
		<div class="flex w-36 flex-col">
			<ColorAndLabel value={123456789012345.68} color={theme.tokenNameToValue('data.primary')} />
		</div>
	{/snippet}
</Story>

<!-- Omitting `color` falls back to the default `lightgrey` swatch. -->
<Story name="Default color">
	{#snippet template()}
		<ColorAndLabel value={0.5} />
	{/snippet}
</Story>
