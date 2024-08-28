<script context="module" lang="ts">
	import MultipleActionButton from './MultipleActionButton.svelte';

	export const meta = {
		title: 'Ui/MultipleActionButton',
		component: MultipleActionButton
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';

	import { ArrowDownTray } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const options = [
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
</script>

<Template let:args>
	<MultipleActionButton
		{options}
		menuTitle="Select image format"
		onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
		{...args}
	/>
</Template>

<Story name="Default" source />

<Story name="With icon After" source let:args>
	<MultipleActionButton
		{options}
		menuTitle="Select image format"
		onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
		{...args}
	>
		<svelte:fragment slot="afterLabel">
			<Icon src={ArrowDownTray} theme="mini" class="w-5 h-5 ml-2" aria-hidden="true" />
		</svelte:fragment>
	</MultipleActionButton>
</Story>

<Story name="With icon Before" source let:args>
	<MultipleActionButton
		{options}
		menuTitle="Select image format"
		onClick={(selectedOption) => console.log('Clicked on button in state:', selectedOption)}
		{...args}
		emphasis="secondary"
		variant="outline"
		size="sm"
	>
		<svelte:fragment slot="beforeLabel">
			<Icon src={ArrowDownTray} theme="mini" class="w-5 h-5 mr-2" aria-hidden="true" />
		</svelte:fragment>
	</MultipleActionButton>
</Story>
