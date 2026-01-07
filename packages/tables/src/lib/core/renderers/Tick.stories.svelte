<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Tick from './Tick.svelte';

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
