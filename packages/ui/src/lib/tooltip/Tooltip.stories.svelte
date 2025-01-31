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
			},
			triggerClass: { type: 'string', control: 'text' },
			triggerVariant: {
				options: ['brand', 'solid', 'outline', 'text'], //square
				control: { type: 'select' }
			},
			triggerEmphasis: {
				options: ['primary', 'secondary'],
				control: { type: 'radio' }
			},
			placement: {
				options: [
					'top',
					'top-start',
					'top-end',
					'right',
					'right-start',
					'right-end',
					'bottom',
					'bottom-start',
					'bottom-end',
					'left',
					'left-start',
					'left-end'
				],
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

<Story name="Default" source args={{ triggerClass: '!p-0' }} />

<Story name="Hint Size">
	<Tooltip hintSize="sm" triggerClass="!p-0">This is some text</Tooltip>
</Story>

<Story name="Custom hint label">
	<Tooltip hintLabel="Hover over me!" triggerClass="!p-0">This is some text</Tooltip>
</Story>

<Story name="Custom hint icon">
	<Tooltip triggerClass="!p-0">
		<svelte:fragment slot="hint">
			I have a different icon
			<Icon src={Cog6Tooth} theme="mini" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
		</svelte:fragment>
		But I still work the same
	</Tooltip>
</Story>

<Story name="Custom trigger styling">
	<Tooltip triggerVariant="square">This is a test!</Tooltip>
</Story>
