<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoodOrBad from './GoodOrBad.svelte';

	const { Story } = defineMeta({
		title: 'Tables/Components/Renderers/GoodOrBad',
		component: GoodOrBad,
		tags: ['autodocs'],

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
	});
</script>

{#snippet defaultTemplate({ args })}
	<GoodOrBad {...args} value={2} benchmarkValue={5} colorScale={() => 'red'} />
{/snippet}

<Story name="Default" source />

<Story name="Multiple - good is n/a">
	{#snippet template(args)}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="n/a" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="n/a" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="n/a" />
		</div>
	{/snippet}
</Story>

<Story name="Multiple - good is high">
	{#snippet template(args)}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="high" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="high" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="high" />
		</div>
	{/snippet}
</Story>

<Story name="Multiple - good is low">
	{#snippet template(args)}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="low" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="low" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="low" />
		</div>
	{/snippet}
</Story>
