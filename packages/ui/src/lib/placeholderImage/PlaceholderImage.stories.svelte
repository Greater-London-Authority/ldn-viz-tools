<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
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
			},
			$$restprops: {
				description: 'Any other props are passed through to `<svg>` element',
				table: {
					category: 'properties'
				}
			}
		},
		args: {}
	};
</script>

<script>
	let strokeClass = 'stroke-core-grey-400';
</script>

<Template let:args>
	<div class="max-w-md">
		<PlaceholderImage {...args} />
	</div>
</Template>

<Story name="Default" source />

<Story name="Stroke">
	<div class="max-w-md">
		<PlaceholderImage strokeClass="stroke-core-red-400 stroke-2" />
	</div>
</Story>

<Story name="Changing stroke">
	<Button on:click={() => (strokeClass = 'stroke-core-red-400')} condition="error">Make red</Button>
	<Button on:click={() => (strokeClass = 'stroke-core-blue-600')}>Make blue</Button>

	<div class="max-w-md">
		<PlaceholderImage {strokeClass} />
	</div>
</Story>

<Story name="Width and height">
	<PlaceholderImage width="160" height="200" />
</Story>

<Story name="Width and height as classes">
	<PlaceholderImage otherClasses="w-40 h-52" />
</Story>

<Story name="Fixed background colour">
	<div class="max-w-md">
		<PlaceholderImage bgClass="bg-core-grey-600" />
	</div>
</Story>
