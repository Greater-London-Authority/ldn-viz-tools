<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import GoodOrBad from './GoodOrBad.svelte';

	/**
	 * The `GoodOrBad` component renders a table cell comparing a single value to a reference or benchmark value.
	 */
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

<Story name="Default">
	{#snippet template(args)}
		<GoodOrBad {...args} value={2} benchmarkValue={5} color={() => 'red'} />
	{/snippet}
</Story>

<Story name="Multiple - good is n/a">
	{#snippet template()}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="n/a" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="n/a" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="n/a" />
		</div>
	{/snippet}
</Story>

<Story name="Multiple - good is high">
	{#snippet template()}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="high" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="high" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="high" />
		</div>
	{/snippet}
</Story>

<Story name="Multiple - good is low">
	{#snippet template()}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="low" />
			<GoodOrBad value={5} benchmarkValue={5} goodIs="low" />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="low" />
		</div>
	{/snippet}
</Story>

<!-- With `iconOnly` set, only the icon is rendered (no message text). -->
<Story name="Icon only">
	{#snippet template()}
		<div class="flex flex-col">
			<GoodOrBad value={2} benchmarkValue={5} goodIs="high" iconOnly={true} />
			<GoodOrBad value={7} benchmarkValue={5} goodIs="high" iconOnly={true} />
		</div>
	{/snippet}
</Story>

<!-- `benchmarkLabel` is interpolated into the comparison message. -->
<Story name="With benchmarkLabel">
	{#snippet template()}
		<GoodOrBad value={2} benchmarkValue={5} goodIs="high" benchmarkLabel="the London average of" />
	{/snippet}
</Story>

<!-- A non-numeric value skips the `typeof value === 'number'` comparison, so no icon/message is shown. -->
<Story name="Non-numeric value">
	{#snippet template()}
		<GoodOrBad value="N/A" benchmarkValue={5} goodIs="high" />
	{/snippet}
</Story>

<!-- When the value equals the benchmark (diff === 0) the neutral Minus icon is shown. -->
<Story name="Equal value">
	{#snippet template()}
		<GoodOrBad value={5} benchmarkValue={5} goodIs="high" />
	{/snippet}
</Story>
