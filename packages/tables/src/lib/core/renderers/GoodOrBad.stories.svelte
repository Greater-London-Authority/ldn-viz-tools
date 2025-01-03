<script context="module">
	import GoodOrBad from './GoodOrBad.svelte';

	export const meta = {
		title: 'Tables/Renderers/GoodOrBad',
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

<Story name="Multiple - good is n/a">
	<div class="flex flex-col">
		<GoodOrBad value={2} benchmarkValue={5} goodIs="n/a" />
		<GoodOrBad value={5} benchmarkValue={5} goodIs="n/a" />
		<GoodOrBad value={7} benchmarkValue={5} goodIs="n/a" />
	</div>
</Story>

<Story name="Multiple - good is high">
	<div class="flex flex-col">
		<GoodOrBad value={2} benchmarkValue={5} goodIs="high" />
		<GoodOrBad value={5} benchmarkValue={5} goodIs="high" />
		<GoodOrBad value={7} benchmarkValue={5} goodIs="high" />
	</div>
</Story>

<Story name="Multiple - good is low">
	<div class="flex flex-col">
		<GoodOrBad value={2} benchmarkValue={5} goodIs="low" />
		<GoodOrBad value={5} benchmarkValue={5} goodIs="low" />
		<GoodOrBad value={7} benchmarkValue={5} goodIs="low" />
	</div>
</Story>
