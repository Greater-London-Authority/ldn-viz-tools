<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';
	import Button from '../button/Button.svelte';
	import type { SwitchProps } from './types.js';
	import { expect } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Ui/Components/Switch',
		component: Switch,
		tags: ['autodocs'],
		render: defaultTemplate,
		argTypes: {
			size: {
				options: ['md', 'sm'],
				control: { type: 'select' }
			},
			labelOn: {
				options: ['left', 'right'],
				control: { type: 'select' }
			}
		},
		parameters: {
			a11y: { test: 'error' }
		}
	});

	let checked = $state(false);
	let disabled = $state(false);
</script>

{#snippet defaultTemplate(args: SwitchProps)}
	<Switch {...args} bind:checked />
	<p class="text-color-text-secondary pt-2">Is checked?: {checked}</p>
{/snippet}

<Story
	name="Default"
	play={async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole('switch'));
		await expect(canvas.getByText('Is checked?: true')).toBeInTheDocument();
	}}
/>

<Story name="With label" args={{ label: 'Enable something' }} />

<Story name="Small" args={{ label: 'Enable something', size: 'sm' }} />

<Story name="Label on left" args={{ label: 'Enable something', labelOn: 'left' }} />

<Story
	name="Control whether disabled"
	args={{ label: 'Enable something' }}
	play={async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole('button'));
		await expect(canvas.getByRole('switch')).toHaveAttribute('disabled');
		await expect(canvas.getByRole('button')).toHaveTextContent('Click to enable');
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col space-y-4">
			<div class="flex">
				<Button onclick={() => (disabled = !disabled)} aria-controls="disabled-control">
					Click to {disabled ? 'enable' : 'disable'}
				</Button>
			</div>

			<Switch {...args} bind:checked {disabled} id="disabled-control" />
		</div>
	{/snippet}
</Story>

<Story
	name="Externally change"
	args={{ label: 'Enable something' }}
	play={async ({ canvas, userEvent }) => {
		await expect(canvas.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
		await expect(canvas.getByText('Toggle on')).toBeInTheDocument();
		await userEvent.click(canvas.getByRole('button'));
		await expect(canvas.getByText('Toggle off')).toBeInTheDocument();
		await expect(canvas.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
	}}
>
	{#snippet template(args)}
		<div class="flex flex-col space-y-4">
			<div class="flex">
				<Button onclick={() => (checked = !checked)} aria-controls="external-toggle">
					Toggle {checked ? 'off' : 'on'}
				</Button>
			</div>
			<Switch {...args} bind:checked id="external-toggle" />
		</div>
	{/snippet}
</Story>
