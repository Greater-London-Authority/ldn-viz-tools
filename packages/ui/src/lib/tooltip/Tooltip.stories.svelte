<script context="module">
	import Tooltip from './Tooltip.svelte';

	export const meta = {
		title: 'Ui/Tooltip',
		component: Tooltip,
		argTypes: {
			hintLabel: { type: 'string', control: 'text' },
			hintSize: {
				options: ['sm', 'md', 'lg'],
				control: { type: 'select' }
			}
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { Cog6Tooth } from '@steeze-ui/heroicons';

	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<Template let:args>
	<Tooltip {...args}>This is some text</Tooltip>
</Template>

<Story name="Default">
	<Tooltip>This is some text</Tooltip>
</Story>

<Story name="Hint Size">
	<Tooltip hintSize="sm">This is some text</Tooltip>
</Story>

<Story name="Custom hint label">
	<Tooltip hintLabel="Hover over me!">This is some text</Tooltip>
</Story>

<Story name="Custom hint icon">
	<Tooltip>
		<svelte:fragment slot="hint">
			I have a diffent icon
			<Icon src={Cog6Tooth} theme="mini" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
		</svelte:fragment>
		But I still work the same
	</Tooltip>
</Story>

<Story name="Toggles modal on click">
	<Tooltip modalTitle="This is the modal title" modalWidth="xl">
		Click me!
		<p slot="modal">This is the modal content in an extra large modal.</p>
	</Tooltip>
</Story>
