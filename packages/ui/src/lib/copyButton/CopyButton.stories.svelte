<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CopyButton from './CopyButton.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ClipboardDocument, HandThumbUp } from '@steeze-ui/heroicons';

	/**
	 * The `<CopyButton>` component is a button enabling quick copy to clipboard
	 * for specific content. The button has a copied state to indicate the copy
	 * was successful. The button will revert back to an uncopied state if
	 * another copy button is clicked or after several seconds.
	 */

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/CopyButton',
		component: CopyButton,
		tags: ['autodocs'],
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
			'...rest': {
				description:
					'Any other props are passed through to [`<Button>` component](./?path=/docs/ui-components-buttons-button--documentation).',
				table: {
					category: 'properties'
				}
			}
		},
		args: {
			content: 'Thing To Copy'
		}
	});
</script>

<Story name="Default">
	{#snippet template(args)}
		<CopyButton {...args} />
	{/snippet}
</Story>

<Story name="Label">
	{#snippet template(args)}
		<CopyButton {...args} label="Copy to clipboard" />
	{/snippet}
</Story>

<Story name="Changing button style">
	{#snippet template(args)}
		<CopyButton {...args} variant="outline" emphasis="secondary" />
	{/snippet}
</Story>

<Story name="Custom Icon">
	{#snippet template(args)}
		<div class="space-y-4">
			<CopyButton {...args}>
				{#snippet beforeCopy()}
					Before Copy
					<Icon src={ClipboardDocument} theme="mini" class="ml-1 h-5 w-5" />
				{/snippet}

				{#snippet afterCopy()}
					After Copy
					<Icon src={HandThumbUp} theme="mini" class="ml-1 h-5 w-5" />
				{/snippet}
			</CopyButton>
		</div>
	{/snippet}
</Story>
