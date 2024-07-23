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
	<GoodOrBad {...args} value={2} benchmarkValue={5} colorScale={() => 'red'} />
</Template>

<Story name="Default" source />

<Story name="Multiple">
	<div class="flex flex-col">
		<GoodOrBad value={2} benchmarkValue={5} colorScale={() => 'red'} />
		<GoodOrBad value={5} benchmarkValue={5} colorScale={() => 'red'} />
		<GoodOrBad value={7} benchmarkValue={5} colorScale={() => 'red'} />
	</div>
</Story>
