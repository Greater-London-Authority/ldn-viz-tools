<script context="module">
	import { writable } from 'svelte/store';
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

	let checked = writable(false);
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	let disabled = false;
</script>

<Template let:args>
	<Switch {checked} {...args} />

	<div class="text-color-text-secondary">Is checked?: {$checked}</div>
</Template>

<Story name="Default" source />

<Story name="With label" source>
	<Switch label="Enable something" {checked} />
</Story>

<Story name="small" source>
	<Switch label="Enable something" size="sm" {checked} />
</Story>

<Story name="Label on left" source>
	<Switch label="Enable something" labelOn="left" {checked} />
</Story>

<Story name="Control whether disabled" source>
	<div class="flex flex-col space-y-4">
		<Button on:click={() => (disabled = !disabled)}>
			Click to {disabled ? 'enable' : 'disable'}
		</Button>

		<Switch label="Enable something" {checked} {disabled} />
	</div>
</Story>
