<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

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
