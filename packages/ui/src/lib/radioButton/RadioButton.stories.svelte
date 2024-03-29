<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import RadioButton from './RadioButton.svelte';
	import RadioButtonGroup from './RadioButtonGroup.svelte';

	let selectedId: string;

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{ id: 'train', label: 'Train stations', color: '#008D48' },
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];
</script>

<Meta title="Ui/RadioButton" component={RadioButton} />

<Template let:args>
	<RadioButton {...args} />
</Template>

<Story name="Single RadioButton">
	<RadioButton bind:selectedId label="Foo" id="foo" name="isolated" />
	<div class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Single RadioButton (disabled)">
	<RadioButton bind:selectedId label="Foo" id="foo" name="isolated" disabled />
	<div class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="RadioGroup">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>

<Story name="RadioGroup - no clear button">
	<RadioButtonGroup options={optionsForGroup} name="station-type" bind:selectedId buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>

<Story name="Single Colored RadioButton">
	<RadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated" />
	<div class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Single Colored RadioButton (disabled)">
	<RadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated" disabled />
	<div class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Multiple RadioButtons not in group">
	<p class="my-8 text-core-grey-500 dark:text-core-grey-200">
		The Radio button is intended for use when only one option can be selected at a time. For this
		behaviour to work correctly for a set of <code>Radio</code> components, assign them the same
		<code>name</code> attribute, and bind their <code>selectedID</code> prop to the same variable.
	</p>

	<RadioButton color="#00AEEF" label="Foo" id="foo" name="group1" bind:selectedId />
	<RadioButton color="#008D48" label="Bar" id="bar" name="group1" bind:selectedId />
	<RadioButton color="#9E0059" label="Baz" id="baz" name="group1" bind:selectedId />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Selected id: {selectedId}</p>
</Story>
