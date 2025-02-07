<script context="module">
	import Trigger from '../overlay/Trigger.svelte';
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
	import { Cog6Tooth } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Tooltip {...args}>
		<Trigger slot="trigger" />
		This is some text
	</Tooltip>
</Template>

<Story name="Default" source />

<Story name="Custom size">
	<Tooltip>
		<Trigger slot="trigger" size="lg" />
		This is some text inside a bigger button
	</Tooltip>
</Story>

<Story name="Custom hint label">
	<Tooltip>
		<Trigger slot="trigger" hintLabel="Hover over me!" />
		This is some text
	</Tooltip>
</Story>

<Story name="Custom hint icon">
	<Tooltip>
		<Trigger slot="trigger">
			I have a different icon
			<Icon src={Cog6Tooth} theme="mini" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
		</Trigger>
		But I still work the same
	</Tooltip>
</Story>
