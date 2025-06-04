<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
	import Button from '../button/Button.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Modal',
		component: Modal,
		tags: ['autodocs']
		// argTypes: {
		// 	isOpen: { options: ['true', 'false'], control: { type: 'radio' } },
		// 	title: { type: 'string', control: 'text' },
		// 	description: { type: 'string', control: 'text' },
		// 	width: {
		// 		options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
		// 		control: { type: 'select' }
		// 	}
		// },
		// args: {
		// 	title: 'Expects a title',
		// 	description: 'Expects a summarising description of modal for accessibility'
		// }
	});

	let isOpen = $state(false);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Modal {...args} buttonText="Open Dialog">
			{#snippet title()}
				Account settings
			{/snippet}

			{#snippet description()}
				Manage your account settings and preferences.
			{/snippet}

			<!-- Additional dialog content here... -->
		</Modal>
	{/snippet}
</Story>

<Story name="External Custom Trigger ">
	{#snippet template(args)}
		<Button variant="brand" onclick={() => (isOpen = true)}>Open Dialog</Button>
		<Modal {...args} bind:open={isOpen}>
			{#snippet title()}
				Account settings
			{/snippet}

			{#snippet description()}
				Manage your account settings and preferences.
			{/snippet}

			<!-- Additional dialog content here... -->
		</Modal>
	{/snippet}
</Story>

<Story name="Internal Custom Trigger">
	{#snippet template(args)}
		<Modal {...args}>
			{#snippet trigger()}
				<Button variant="brand">Open Dialog</Button>
			{/snippet}

			{#snippet title()}
				Account settings
			{/snippet}

			{#snippet description()}
				Manage your account settings and preferences.
			{/snippet}

			<!-- Additional dialog content here... -->
		</Modal>
	{/snippet}
</Story>
