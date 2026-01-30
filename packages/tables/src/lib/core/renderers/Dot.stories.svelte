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
