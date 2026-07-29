<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import MergeValuesControl from './MergeValuesControl.svelte';

	const values = [
		'Single family household: No children',
		'Single family household: Dependendent children',

		'Single family household: All children non-dependent',
		'Single family household: Lone parent household',
		'One person household: 66 years and over',
		'One person household: other',
		'Other household types'
	];

	let groupings = $state({ ungrouped: values, grouped: {} });

	let preGrouped = $state({
		ungrouped: ['One person household: 66 years and over', 'Other household types'],
		grouped: {
			Families: [
				'Single family household: No children',
				'Single family household: Dependendent children',
				'Single family household: All children non-dependent',
				'Single family household: Lone parent household'
			],
			'Single occupancy': ['One person household: other']
		}
	});

	let callbackGroupings = $state({ ungrouped: values, grouped: {} });
	let callbackCount = $state(0);
	let lastChangedAt = $state('never');
	const handleGroupingsChanged = () => {
		callbackCount += 1;
		lastChangedAt = new Date().toLocaleTimeString();
	};

	let singleValue = $state({ ungrouped: ['Only one value'], grouped: {} });
	let emptyValues = $state({ ungrouped: [], grouped: {} });

	const { Story } = defineMeta({
		title: 'Ui/Components/MergeValuesControl',
		component: MergeValuesControl,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="w-96">
			<MergeValuesControl bind:groups={groupings} />
		</div>
	{/snippet}
</Story>

<Story name="Showing output">
	{#snippet template()}
		<div class="flex flex-col gap-8">
			<div class="w-96">
				<h2 class="text-large font-bold">Control</h2>
				<MergeValuesControl bind:groups={groupings} />
			</div>

			<div>
				<h2 class="text-large font-bold">Group object</h2>
				<pre>{JSON.stringify(groupings, null, 2)}</pre>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Seeded with existing named categories, exercising group headers, the rename input, remove-from-group and delete-category buttons without any drag interaction. -->
<Story name="Pre-grouped initial state">
	{#snippet template()}
		<div class="w-96">
			<MergeValuesControl bind:groups={preGrouped} />
		</div>
	{/snippet}
</Story>

<!-- The `onGroupingsChanged` callback fires on every mutation (rename, remove, delete, drag-drop). -->
<Story name="onGroupingsChanged callback">
	{#snippet template()}
		<div class="flex flex-col gap-8">
			<div class="w-96">
				<MergeValuesControl
					bind:groups={callbackGroupings}
					onGroupingsChanged={handleGroupingsChanged}
				/>
			</div>

			<div class="text-color-text">
				<h2 class="text-large font-bold">Callback</h2>
				<p>Times called: <strong>{callbackCount}</strong></p>
				<p>Last called at: <strong>{lastChangedAt}</strong></p>
			</div>
		</div>
	{/snippet}
</Story>

<!-- Edge cases: a single ungrouped value, and an empty value list showing the empty drop-target state. -->
<Story name="Empty / single value list">
	{#snippet template()}
		<div class="flex flex-col gap-8">
			<div class="w-96">
				<h2 class="text-large font-bold">Single value</h2>
				<MergeValuesControl bind:groups={singleValue} />
			</div>

			<div class="w-96">
				<h2 class="text-large font-bold">Empty list</h2>
				<MergeValuesControl bind:groups={emptyValues} />
			</div>
		</div>
	{/snippet}
</Story>
