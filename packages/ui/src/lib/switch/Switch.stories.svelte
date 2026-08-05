<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import type { SwitchProps } from './Switch.svelte';
	import Switch from './Switch.svelte';

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
		}
	});

	let checked = $state(false);
	let disabled = $state(false);
</script>

{#snippet defaultTemplate(args: SwitchProps)}
	<Switch {...args} bind:checked />
	<p class="pt-2 text-color-text-muted">Is checked?: {checked}</p>
{/snippet}

<Story name="Default" />

<Story name="With label" args={{ label: 'Enable something' }} />

<Story name="Small" args={{ label: 'Enable something', size: 'sm' }} />

<Story name="Label on left" args={{ label: 'Enable something', labelOn: 'left' }} />

<Story name="Control whether disabled" args={{ label: 'Enable something' }}>
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

<Story name="Externally change" args={{ label: 'Enable something' }}>
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

<Story name="Checked by default">
	{#snippet template(args)}
		<Switch {...args} checked={true} label="Enable something" />
	{/snippet}
</Story>

<!--
The disabled appearance shown statically for both off and on, so the
`interactive-disabled` styling is reviewable without toggling.
-->
<Story name="Disabled (checked and unchecked)">
	{#snippet template()}
		<div class="flex flex-col space-y-4">
			<Switch label="Disabled, off" disabled checked={false} />
			<Switch label="Disabled, on" disabled checked={true} />
		</div>
	{/snippet}
</Story>

<Story
	name="Small + label on left"
	args={{ label: 'Enable something', size: 'sm', labelOn: 'left' }}
>
	{#snippet template(args)}
		<Switch {...args} />
	{/snippet}
</Story>
