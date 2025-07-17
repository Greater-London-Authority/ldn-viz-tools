<script module lang="ts">
	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MultipleActionButton, {
		type MultipleActionButtonOption
	} from './MultipleActionButton.svelte';

	/**
	 * The `MultipleActionButton` combines a button and popover menu, so that the user can select which action
	 * (or variation on an action) will be performed when the button is pressed.
	 */

	const options: MultipleActionButtonOption[] = [
		{
			id: 'PNG',
			buttonLabel: 'Download as PNG',
			menuLabel: 'PNG',
			menuDescription: 'A raster image format that can be widely read, but more difficult to edit.',
			default: true
		},
		{
			id: 'SVG',
			buttonLabel: 'Download as SVG',
			menuLabel: 'SVG',
			menuDescription:
				'A vector image format that can be edited in software such as Adobe Illustrator.'
		}
	];

	const { Story } = defineMeta({
		title: 'Ui/Components/Buttons/MultipleActionButton',
		component: MultipleActionButton,
		tags: ['autodocs'],
		argTypes: {
			menuTitle: {
				control: { type: 'text' }
			}
		},
		args: {
			options: options
		}
	});

	// let isOpen = $state(false);

	const handleClick = (selectedOption: string) =>
		console.log('Clicked on button in state:', selectedOption);
</script>

<Story name="Default">
	{#snippet template(args)}
		<MultipleActionButton {...args} menuTitle="Select image format" onClick={handleClick} />
	{/snippet}
</Story>

<Story name="With icon After">
	{#snippet template(args)}
		<MultipleActionButton
			{...args}
			menuTitle="Select image format"
			onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
		>
			{#snippet afterLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="ml-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</MultipleActionButton>
	{/snippet}
</Story>

<Story name="With icon Before">
	{#snippet template(args)}
		<MultipleActionButton
			{...args}
			menuTitle="Select image format"
			onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
		>
			{#snippet beforeLabel()}
				<Icon src={ArrowDownTray} theme="mini" class="mr-2 h-5 w-5" aria-hidden="true" />
			{/snippet}
		</MultipleActionButton>
	{/snippet}
</Story>

<Story name="With size">
	{#snippet template(args)}
		<div class="space-y-4">
			<MultipleActionButton
				{...args}
				size="xs"
				menuTitle="Select image format"
				onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
			/>

			<MultipleActionButton
				{...args}
				size="sm"
				menuTitle="Select image format"
				onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
			/>

			<MultipleActionButton
				{...args}
				size="md"
				menuTitle="Select image format"
				onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
			/>

			<MultipleActionButton
				{...args}
				size="lg"
				menuTitle="Select image format"
				onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
			/>
		</div>
	{/snippet}
</Story>
