<script>
	import { ArrowCircleDownIcon } from '@rgossiaux/svelte-heroicons/solid';

	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Button from './Button.svelte';
</script>

<Meta title="Ui/Button" component={Button} />

<Template let:args>
	<Button {...args}>I'm a button from UI!</Button>
</Template>

<Story name="Default" />

<Story name="Primary">
	<Button style="primary">Primary Style</Button>
	<Button style="primary" disabled>Primary Style (disabled)</Button>
</Story>

<Story name="Secondary">
	<Button style="secondary">Secondary Style</Button>
	<Button style="secondary" disabled>Secondary Style (disabled)</Button>
</Story>

<Story name="Ghost">
	<Button style="ghost">Ghost Style</Button>
	<Button style="ghost" disabled>Ghost Style (disabled)</Button>
</Story>

<Story name="Disabled">
	<Button disabled>Default Style</Button>
	<Button style="primary" disabled>Primary Style</Button>
	<Button style="secondary" disabled>Secondary Style</Button>
	<Button style="ghost" disabled>Ghost Style</Button>
</Story>

<Story name="Sizes">
	<div class="flex items-end space-x-2">
		<Button size="xs">xs</Button>
		<Button size="sm">sm</Button>
		<Button size="base">base</Button>
		<Button size="lg">lg</Button>
		<Button size="xl">xl</Button>
	</div>
</Story>

<Story name="With Icon">
	<div class="flex space-y-2 flex-col w-40">
		<Button
			>Icon via slot
			<ArrowCircleDownIcon class="w-6 h-6 ml-2" aria-hidden="true" />
		</Button>
		<Button>
			<ArrowCircleDownIcon class="w-6 h-6 mr-2" aria-hidden="true" />
			Icon via slot
		</Button>
		<Button class="flex-col items-center">
			Icon via slot
			<ArrowCircleDownIcon class="w-6 h-6" aria-hidden="true" />
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
</Story>
