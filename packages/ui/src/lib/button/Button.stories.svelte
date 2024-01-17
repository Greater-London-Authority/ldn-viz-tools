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

<!-- 
<Story name="Brand" args={{ variant: 'brand' }}>
	<Button variant="brand">Brand Primary</Button>
	<Button variant="brand" condition="success">Success</Button>
	<Button variant="brand" condition="warning">Warning</Button>
	<Button variant="brand" condition="error">Error</Button>
	<Button variant="brand" emphasis="secondary">Brand Secondary</Button>
	<Button variant="brand" emphasis="secondary" condition="success">Success</Button>
	<Button variant="brand" emphasis="secondary" condition="warning">Warning</Button>
	<Button variant="brand" emphasis="secondary" condition="error">Error</Button>
	<Button variant="brand" disabled>Brand Primary (disabled)</Button>
</Story>

<Story name="Solid">
	<Button variant="solid">Solid Primary</Button>
	<Button variant="solid" condition="success">Success</Button>
	<Button variant="solid" condition="warning">Warning</Button>
	<Button variant="solid" condition="error">Error</Button>
	<Button variant="solid" emphasis="secondary">Solid Secondary</Button>
	<Button variant="solid" condition="success" emphasis="secondary">Success</Button>
	<Button variant="solid" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="solid" condition="error" emphasis="secondary">Error</Button>
	<Button variant="solid" disabled>Solid Primary (disabled)</Button>
</Story>

<Story name="Outline">
	<Button variant="outline">Outline Primary</Button>
	<Button variant="outline" condition="success">Success</Button>
	<Button variant="outline" condition="warning">Warning</Button>
	<Button variant="outline" condition="error">Error</Button>
	<Button variant="outline" emphasis="secondary">Outline Secondary</Button>
	<Button variant="outline" condition="success" emphasis="secondary">Success</Button>
	<Button variant="outline" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="outline" condition="error" emphasis="secondary">Error</Button>
	<Button variant="outline" disabled>Outline Primary (disabled)</Button>
</Story>

<Story name="Text">
	<Button variant="text">Text Primary</Button>
	<Button variant="text" condition="success">Success</Button>
	<Button variant="text" condition="warning">Warning</Button>
	<Button variant="text" condition="error">Error</Button>
	<Button variant="text" emphasis="secondary">Text Secondary</Button>
	<Button variant="text" condition="success" emphasis="secondary">Success</Button>
	<Button variant="text" condition="warning" emphasis="secondary">Warning</Button>
	<Button variant="text" condition="error" emphasis="secondary">Error</Button>
	<Button variant="text" disabled>Text Primary (disabled)</Button>
</Story>

<Story name="Square">
	<Button variant="square" title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" emphasis="secondary" title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" disabled title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>

	<Button variant="square" size="sm" title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" size="md" title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
	</Button>
	<Button variant="square" size="lg" title="Down">
		<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6 mb-1" aria-hidden="true" />
		Large
	</Button>
</Story>

<Story name="Disabled">
	<Button disabled>Default Variant</Button>
	<Button variant="brand" disabled>Brand Variant</Button>
	<Button variant="solid" disabled>Solid Variant</Button>
	<Button variant="outline" disabled>Outline Variant</Button>
	<Button variant="text" disabled>Text Variant</Button>
</Story>

<Story name="Sizes">
	<div class="flex items-end space-x-2">
		<Button size="sm">sm</Button>
		<Button size="md">md</Button>
		<Button size="lg">lg</Button>
	</div>
</Story>

<Story name="With Icon">
	<div class="flex space-y-2 flex-col w-40">
		<Button
			>Icon via slot
			<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6 ml-2" aria-hidden="true" />
		</Button>
		<Button>
			<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6 mr-2" aria-hidden="true" />
			Icon via slot
		</Button>
		<Button class="flex-col items-center">
			Icon via slot
			<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
		</Button>
	</div>
</Story>

<Story name="With class prop">
	<Button class="text-core-darkPink-500 border-core-pink-700 bg-yellow-500"
		>Custom classes applied</Button
	>
</Story>

<Story name="Full width">
	<Button class="w-full">Custom classes applied</Button>
</Story>

<Story name="With Link">
	<Button href="#">Link</Button>
	<Button disabled href="#">Link</Button>
</Story> -->
