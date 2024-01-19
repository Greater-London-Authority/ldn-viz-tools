<script context="module">
	import Button from './Button.svelte';

	export const meta = {
		title: 'Ui/Button',
		component: Button,
		argTypes: {
			emphasis: {
				options: ['primary', 'secondary'],
				control: { type: 'radio' }
			},
			variant: {
				options: ['brand', 'solid', 'outline', 'text'], //square
				control: { type: 'select' }
			},
			condition: {
				options: ['default', 'success', 'error', 'warning'],
				control: { type: 'select' }
			},
			size: {
				options: ['sm', 'md', 'lg'],
				control: { type: 'radio' }
			},
			type: {
				options: ['button', 'submit'],
				control: { type: 'radio' }
			}
		},
		args: {
			title: 'storybook button'
		}
	};
</script>

<script lang="ts">
	import { ArrowDownCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let count = 0;
	function handleClick() {
		count += 1;
	}
</script>

<Template let:args>
	<Button {...args} on:click on:click={handleClick}>
		You clicked: {count}
	</Button>
</Template>

<Story
	name="Default"
	source
	parameters={{
		options: {
			showPanel: true
		}
	}}
/>

<Story name="Emphasis">
	<div class="flex items-end space-x-2">
		<Button>Primary</Button>
		<Button emphasis="secondary">Secondary</Button>
	</div>
</Story>

<Story name="Brand" source args={{ variant: 'brand' }} />

<Story name="Solid" source args={{ variant: 'solid' }} />

<Story name="Outline" source args={{ variant: 'outline' }} />

<Story name="Text" source args={{ variant: 'text' }} />

<Story name="Square" args={{ variant: 'square' }}>
	<Button variant="square" title="Down" size="sm">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" title="Down" size="md">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" title="Down" size="lg">
		<Icon src={ArrowDownCircle} theme="solid" class="w-8 h-8" aria-hidden="true" />
		Down
	</Button>
</Story>

<Story name="Disabled">
	<Button disabled>Cant touch this!</Button>
</Story>

<Story name="Sizes">
	<div class="flex items-end space-x-2">
		<Button size="sm">sm</Button>
		<Button size="md">md</Button>
		<Button size="lg">lg</Button>
	</div>
</Story>

<Story name="With class prop">
	<Button class="text-core-darkPink-500 border-core-pink-700 bg-yellow-500">
		Custom classes applied
	</Button>
</Story>

<Story
	name="Full width"
	parameters={{
		layout: 'fullscreen'
	}}
>
	<Button class="w-full">Custom classes applied</Button>
</Story>

<Story name="With Link">
	<Button href="#">Link</Button>
	<Button disabled href="#">Link</Button>
</Story>
