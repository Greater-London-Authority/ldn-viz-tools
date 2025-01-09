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
			},
			$$restprops: {
				description:
					'Any other props are passed through to [`<Button>` component](./?path=/docs/ui-button--documentation).',
				table: {
					category: 'properties'
				}
			}
		},
		args: {
			content: 'Thing To Copy'
		}
	};
</script>

<script lang="ts">
	import { ClipboardDocument, HandThumbUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<CopyButton {...args} />
</Template>

<Story name="Default" source />

<Story name="Label">
	<CopyButton content="Text to be copied." label="Copy to clipboard" />
</Story>

<!-- You can also provide any prop that is accepted by the [`<Button>` component](./?path=/docs/ui-button--documentation) -->
<Story name="Changing button style">
	<CopyButton content="Text to be copied." label="Copy" variant="solid" emphasis="secondary" />
</Story>

<Story name="Indicator icon">
	<CopyButton content="One." label="One" />
	<CopyButton content="Two." label="Two" />
	<CopyButton content="Three." label="Three" />
</Story>

<Story name="Custom label">
	<CopyButton content="Content to copy.">
		<svelte:fragment slot="before-copy">
			Copy
			<Icon src={ClipboardDocument} theme="outline" class="w-5 h-5 ml-1" />
		</svelte:fragment>
		<svelte:fragment slot="after-copy">
			Copied
			<Icon src={HandThumbUp} theme="mini" class="w-5 h-5 ml-1" />
		</svelte:fragment>
	</CopyButton>
</Story>
