<script context="module" lang="ts">
	import RadioButton from './RadioButton.svelte';

	export const meta = {
		title: 'Ui/RadioButton',
		component: RadioButton,
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
			name: {
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

	let selectedId: string;
</script>

<Template let:args>
	<RadioButton label="Foo" id="foo" {...args} />
</Template>

<Story name="Default" source />

<Story name="Single RadioButton">
	<RadioButton bind:selectedId label="Foo" id="foo" name="isolated" />
	<div class="mt-8 text-color-text-secondary space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Single RadioButton (disabled)">
	<RadioButton bind:selectedId label="Foo" id="foo" name="isolated" disabled />
	<div class="mt-8 text-color-text-secondary space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Single Colored RadioButton">
	<RadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated" />
	<div class="mt-8 text-color-text-secondary space-y-2">
		<p>selectedId: {selectedId}</p>
		<p>Checked: {!!selectedId}</p>
	</div>
</Story>

<Story name="Single Colored RadioButton (disabled)">
	<RadioButton color="#008D48" bind:selectedId label="Foo" id="foo" name="isolated" disabled />
	<div class="mt-8 text-color-text-secondary space-y-2">
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
	<p class="mt-8 text-color-text-secondary">Selected id: {selectedId}</p>
</Story>
