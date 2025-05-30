<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowDownCircle, Camera } from '@steeze-ui/heroicons';
	import type { ButtonProps } from './types.js';

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/Button',
		component: Button,
		tags: ['autodocs'],
		render: defaultTemplate
	});

	let count = $state(0);
	const handleClick = () => {
		count += 1;
	};
</script>

{#snippet defaultTemplate(args: ButtonProps)}
	<Button {...args} onclick={handleClick}>
		You clicked: {count}
	</Button>
{/snippet}

<Story name="Default" />

<Story name="Emphasis">
	{#snippet template(args)}
		<div class="flex items-end space-x-2">
			<Button {...args}>Primary</Button>
			<Button {...args} emphasis="secondary">Secondary</Button>
		</div>
	{/snippet}
</Story>

<Story name="Brand" args={{ variant: 'brand' }} />

<Story name="Solid" args={{ variant: 'solid' }} />

<Story name="Outline" args={{ variant: 'outline' }} />

<Story name="Text" args={{ variant: 'text', emphasis: 'secondary' }} />

<Story name="Disabled">
	{#snippet template(args)}
		<Button {...args} disabled>Cant touch this!</Button>
	{/snippet}
</Story>

<Story name="Square" args={{ variant: 'square' }}>
	{#snippet template(args)}
		<div class="space-y-2">
			<Button {...args} variant="square" title="Down" size="sm">
				<Icon src={ArrowDownCircle} theme="mini" class="h-5 w-5" aria-hidden="true" />
			</Button>
			<Button {...args} variant="square" title="Down" size="md">
				<Icon src={ArrowDownCircle} theme="solid" class="h-6 w-6" aria-hidden="true" />
			</Button>
			<Button {...args} variant="square" title="Down" size="lg">
				<Icon src={ArrowDownCircle} theme="solid" class="h-8 w-8" aria-hidden="true" />
				Down
			</Button>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args)}
		<div class="flex items-end space-x-2">
			<Button {...args} size="xs">xs</Button>
			<Button {...args} size="sm">sm</Button>
			<Button {...args} size="md">md</Button>
			<Button {...args} size="lg">lg</Button>
		</div>
	{/snippet}
</Story>

<Story name="Slim">
	{#snippet template(args)}
		<div class="space-y-4">
			<p class="flex flex-wrap">
				sometime you may want a buttton to&nbsp;<Button {...args} slim variant="text"
					>go with the flow</Button
				>&nbsp;a bit more
			</p>

			<p class="flex flex-wrap text-lg">
				sometime you may want a buttton to&nbsp<Button {...args} slim variant="text" size="lg">
					go with the flow
				</Button>&nbsp;a bit more
			</p>

			<p class="flex flex-wrap text-lg">
				sometime you may want a buttton to&nbsp;<Button
					{...args}
					slim
					variant="solid"
					size="lg"
					class="!px-2"
				>
					go with the flow
				</Button>&nbsp;a bit more
			</p>
		</div>
	{/snippet}
</Story>

<Story name="With class prop">
	{#snippet template(args)}
		<Button
			{...args}
			class="border-4 border-color-palette-pink-700 bg-color-palette-yellow-500 !p-8 text-color-palette-pink-100"
		>
			Custom classes applied
		</Button>
	{/snippet}
</Story>

<Story
	name="Full width"
	parameters={{
		layout: 'fullscreen'
	}}
>
	{#snippet template(args)}
		<div class="space-y-4 py-4">
			<Button {...args} class="w-full">Custom classes applied</Button>

			<Button {...args} fullWidth>fullWidth prop applied</Button>
		</div>
	{/snippet}
</Story>

<Story name="With Icon">
	{#snippet template(args)}
		<Button {...args}>
			Download as PNG
			<Icon src={Camera} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
		</Button>
	{/snippet}
</Story>
