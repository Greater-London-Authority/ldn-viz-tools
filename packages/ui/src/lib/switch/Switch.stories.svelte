<script context="module">
	import Button from '../button/Button.svelte';
	import Switch from './Switch.svelte';

	export const meta = {
		title: 'Ui/Switch',
		component: Switch,
		argTypes: {
			size: {
				options: ['md', 'sm'],
				control: { type: 'select' }
			},
			labelOn: {
				options: ['left', 'right'],
				control: { type: 'select' }
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	let disabled = false;
	let checked = false;
</script>

<Template let:args>
	<Switch bind:checked {...args} />

	<div>Is checked?: {checked}</div>
</Template>

<Story name="Default" source />

<Story name="With label" source>
	<Switch label="Enable something" bind:checked />
</Story>

<Story name="Small" source>
	<Switch label="Enable something" size="sm" {checked} />
</Story>

<Story name="Label on left" source>
	<Switch label="Enable something" size="sm" labelOn="left" {checked} />
</Story>

<Story name="Control whether disabled" source>
	<Button on:click={() => (disabled = !disabled)}>
		Click to {disabled ? 'enable' : 'disable'}
	</Button>

	<Switch label="Enable something" bind:checked {disabled} />
</Story>

<Story name="Externally change" source>
	<Button on:click={() => (checked = !checked)}>Toggle</Button>
	<Switch label="Enable something" bind:checked />
</Story>
