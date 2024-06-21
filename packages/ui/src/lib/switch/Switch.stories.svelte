<script context="module">
	import { writable } from 'svelte/store';
	import Button from '../button/Button.svelte';
	import Switch from './Switch.svelte';

	export const meta = {
		title: 'Ui/Switch',
		component: Switch
	};

	let checked = writable(false);
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	let disabled = false;
</script>

<Template let:args>
	<Switch {checked} {...args} />

	<div>Is checked?: {$checked}</div>
</Template>

<Story name="Default" source />

<Story name="With label" source>
	<Switch label="Enable something" {checked} />
</Story>

<Story name="Control whether disabled" source>
	<Button on:click={() => (disabled = !disabled)}>
		Click to {disabled ? 'enable' : 'disable'}
	</Button>

	<Switch label="Enable something" {checked} {disabled} />
</Story>
