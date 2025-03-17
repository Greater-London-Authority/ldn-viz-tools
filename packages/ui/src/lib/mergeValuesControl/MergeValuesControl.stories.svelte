<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';

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

	let groupings = { ungrouped: values, grouped: {} };
</script>

<Meta title="Ui/Components/MergeValuesControl" component={MergeValuesControl} />

<Story name="Default">
	<div class="w-96">
		<MergeValuesControl bind:groups={groupings} />
	</div>
</Story>

<Story name="Showing output">
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
</Story>
