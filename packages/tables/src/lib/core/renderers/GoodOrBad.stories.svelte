<script context="module">
	import GoodOrBad from './GoodOrBad.svelte';

	export const meta = {
		title: 'Tables/Encodings/GoodOrBad',
		component: GoodOrBad,
		argTypes: {
			goodIs: {
				options: ['high', 'low', 'n/a'],
				control: { type: 'radio' }
			},
			benchmarkValue: {
				type: 'number'
			}
		},
		args: {
			value: 2,
			benchmarkValue: 5
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<GoodOrBad value={0.5} benchmarkValue={5} colorScale={() => 'red'} {...args} />
</Template>

<Story name="Default" source />
