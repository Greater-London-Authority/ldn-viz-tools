<script context="module">
	import CopyButton from './CopyButton.svelte';

	export const meta = {
		title: 'Ui/CopyButton',
		component: CopyButton,
		argTypes: {
			content: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			},
			label: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { ClipboardDocument, HandThumbUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<Template let:args>
	<CopyButton {...args} />
</Template>

<Story name="Default" source />

<Story name="Label">
	<CopyButton content="Text to be copied." label="Copy to clipboard" />
</Story>

<Story name="Indictor icon">
	<CopyButton content="One." label="One" />
	<CopyButton content="Two." label="Two" />
	<CopyButton content="Three." label="Three" />
</Story>

<Story name="Custom label">
	<CopyButton content="Content to copy.">
		<svelte:fragment slot="before-copy">
			Copy
			<Icon src={ClipboardDocument} class="w-6 h-6 pl-0.5 py-0.5 stroke-[0.1rem]" />
		</svelte:fragment>
		<svelte:fragment slot="after-copy">
			Copied
			<Icon src={HandThumbUp} class="w-6 h-6 pl-0.5 py-0.5 stroke-[0.1rem]" />
		</svelte:fragment>
	</CopyButton>
</Story>
