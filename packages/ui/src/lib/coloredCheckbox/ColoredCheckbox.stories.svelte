<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import ColoredCheckbox from './ColoredCheckbox.svelte';
	import ColoredCheckboxGroup from './ColoredCheckboxGroup.svelte';

	let checked = false;

	let selectedOptions: string[] = [];

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{ id: 'train', label: 'Train stations', color: '#008D48' },
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];
</script>

<Meta title="Ui/ColoredCheckbox" component={ColoredCheckbox} />

<Template let:args>
	<ColoredCheckbox {...args}>This content is the child of the modal!</ColoredCheckbox>
</Template>

<Story name="Colored Checkbox Group" id="ColoredCheckboxGroupStory">
	<ColoredCheckboxGroup options={optionsForGroup} bind:selectedOptions />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Colored Checkbox Group - disabled buttons">
	<ColoredCheckboxGroup options={optionsForGroup} bind:selectedOptions buttonsHidden />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">
		selectedOptions: {JSON.stringify(selectedOptions)}
	</p>
</Story>

<Story name="Single colored checkbox">
	<ColoredCheckbox color="#008D48" bind:checked id="single_id" label="Foo" />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Single colored checkbox (disabled)">
	<ColoredCheckbox color="#008D48" bind:checked id="disabled_id" label="Foo" disabled />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Multiple colored checkboxes not in group">
	<ColoredCheckbox color="#00AEEF" label="Foo" id="foo" />
	<ColoredCheckbox color="#008D48" label="Bar" id="bar" />
	<ColoredCheckbox color="#9E0059" label="Baz" id="baz" />
</Story>
