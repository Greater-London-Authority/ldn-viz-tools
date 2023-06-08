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
</Story>

<Story name="Secondary">
	<Button style="secondary">Secondary Style</Button>
</Story>

<Story name="Ghost">
	<Button style="ghost">Ghost Style</Button>
</Story>

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Sizes">
	<Button size="xs">xs</Button>
	<Button size="sm">sm</Button>
	<Button size="base">base</Button>
	<Button size="lg">lg</Button>
	<Button size="xl">xl</Button>
</Story>

<Story name="With Icon">
	<Button>Icon via slot<ArrowCircleDownIcon class="ml-2 w-6 h-6" aria-hidden="true" /></Button>
</Story>

<Story name="With class prop">
	<Button class="text-core-darkPink-500 border-core-pink-700 bg-yellow-500"
		>Custom classes applied</Button
	>
</Story>

<Story name="Full width">
	<Button class="w-full">Custom classes applied</Button>
</Story>
