<script context="module">
	import Button from './Button.svelte';

	export const meta = {
		title: 'Ui/Buttons/Button',
		component: Button,
		argTypes: {
			emphasis: {
				options: ['primary', 'secondary', 'caution', 'positive', 'negative'],
				control: { type: 'select' }
			},
			variant: {
				options: ['brand', 'solid', 'outline', 'text'], //square
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
	import { ArrowDownCircle, ArrowTopRightOnSquare, Camera } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let count = 0;
	const handleClick = () => {
		count += 1;
	};
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

<Story name="Text" source args={{ variant: 'text', emphasis: 'secondary' }} />

<Story name="Square" args={{ variant: 'square' }}>
	<div class="space-y-2">
		<Button variant="square" title="Down" size="sm">
			<Icon src={ArrowDownCircle} theme="mini" class="w-5 h-5" aria-hidden="true" />
		</Button>
		<Button variant="square" title="Down" size="md">
			<Icon src={ArrowDownCircle} theme="solid" class="w-6 h-6" aria-hidden="true" />
		</Button>
		<Button variant="square" title="Down" size="lg">
			<Icon src={ArrowDownCircle} theme="solid" class="w-8 h-8" aria-hidden="true" />
			Down
		</Button>
	</div>
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
	<Button
		class="text-color-palette-pink-100 border-2 border-color-palette-pink-700 bg-color-palette-yellow-500"
	>
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

<Story name="With Icon">
	<Button>
		Download as PNG
		<Icon src={Camera} theme="mini" class="ml-2 w-5 h-5" aria-hidden="true" />
	</Button>
</Story>

<Story name="With Link">
	<div class="space-y-2">
		<Button href="#" variant="text">Link</Button>
	</div>
</Story>

<!-- For accessibility, keep opening links in new tabs to a minimum. For cases where it's necessary to do so, you must make the functionality clear visually and to screen readers. -->
<Story name="With Link, opening in new tab">
	<div class="space-y-2">
		<Button href="http://google.com" openInNewTab>
			Link
			<Icon
				src={ArrowTopRightOnSquare}
				theme="mini"
				class="w-5 h-5 ml-2"
				aria-hidden="false"
				title="opens in new tab"
			/>
		</Button>
		<Button href="http://google.com" openInNewTab>Link (opens in new tab)</Button>
	</div>
</Story>
