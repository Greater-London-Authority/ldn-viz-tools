<script context="module" lang="ts">
	import Checkbox from './Checkbox.svelte';
	import CheckboxGroup from './CheckboxGroup.svelte';

	export const meta = {
		title: 'Ui/Checkbox',
		component: Checkbox,
		argTypes: {
			color: {
				control: { type: 'color' }
			},
			label: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			},
			id: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			},
			hint: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			},
			hintLabel: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		},
		args: {
			label: 'Label for Checkbox'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let checked = false;

	let selectedOptions: string[] = ['bus', 'underground'];

	let optionsForGroup = [
		{ id: 'bus', label: 'Bus stops', color: '#00AEEF' },
		{
			id: 'train',
			label: 'Train stations',
			color: '#008D48',
			hint: 'Excluding underground stations'
		},
		{ id: 'underground', label: 'Underground stations', color: '#9E0059' },
		{ id: 'taxi', label: 'Taxi ranks', color: 'firebrick', disabled: true }
	];
</script>

<Template let:args>
	<Checkbox {...args} />
</Template>

<Story
	name="Default"
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
/>

<Story name="Single checkbox">
	<Checkbox bind:checked id="single_id" label="Foo" />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Single checkbox (disabled)">
	<Checkbox bind:checked id="disabled_id" label="Foo" disabled />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Single checkbox with hint">
	<Checkbox bind:checked id="hint_id" label="Foo" hint="A helpful hint" />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

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

<Story name="Single colored checkbox">
	<Checkbox color="#008D48" bind:checked id="single_id" label="Foo" />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Single colored checkbox (disabled)">
	<Checkbox color="#008D48" bind:checked id="disabled_id" label="Foo" disabled />
	<p class="mt-8 text-core-grey-500 dark:text-core-grey-200 italic">Checked: {checked}</p>
</Story>

<Story name="Multiple checkboxes not in group">
	<Checkbox color="#00AEEF" label="Foo" id="foo" />
	<Checkbox color="#008D48" label="Bar" id="bar" />
	<Checkbox color="#9E0059" label="Baz" id="baz" />
</Story>
