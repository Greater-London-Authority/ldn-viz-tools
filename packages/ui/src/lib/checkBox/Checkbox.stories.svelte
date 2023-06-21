<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';
	import CheckboxGroup from './CheckboxGroup.svelte';

	let checked = false;

	let selectedOptions: string[] = [];

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops' },
		{ id: 'train', label: 'Train stations' },
		{ id: 'underground', label: 'Underground stations' },
		{ id: 'taxi', label: 'Taxi ranks', disabled: true }
	];
</script>

<Meta title="Ui/Checkbox" component={Checkbox} />

<Template let:args>
	<Checkbox {...args}>This content is the child of the modal!</Checkbox>
</Template>

<Story name="Checkbox Group" id="CheckboxGroupStory">
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Checkbox Group - disabled buttons">
	<CheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Single checkbox">
	<Checkbox bind:checked label="Foo" id="single_id" />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Single checkbox (disabled)">
	<Checkbox bind:checked label="Foo" id="disabled_id" disabled />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Multiple checkboxes not in group">
	<Checkbox label="Foo" id="foo" />
	<Checkbox label="Bar" id="bar" />
	<Checkbox label="Baz" id="baz" />
</Story>
