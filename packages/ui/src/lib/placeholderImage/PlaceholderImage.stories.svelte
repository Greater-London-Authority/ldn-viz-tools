<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import PlaceholderImage from './PlaceholderImage.svelte';

	export const meta = {
		title: 'Ui/PlaceholderImage',
		component: PlaceholderImage,
		argTypes: {
			bgClass: {
				control: { type: 'text' },
				table: {
					defaultValue: { summary: '' },
					type: { summary: 'string' }
				}
			}
		},
		args: {}
	};
</script>

<Template let:args>
	<div class="max-w-md">
		<PlaceholderImage {...args} />
	</div>
</Template>

<Story name="Default" source />

<Story name="Stroke">
	<div class="max-w-md">
		<PlaceholderImage class="stroke-core-red-400" />
	</div>
</Story>

<Story name="Width and height">
	<PlaceholderImage width="160" height="200" />
</Story>

<Story name="Fixed background colour">
	<div class="max-w-md">
		<PlaceholderImage bgClass="bg-core-grey-600" />
	</div>
</Story>
