<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
	import Button from '../button/Button.svelte';
	import type { ButtonProps } from '$lib/button/types.js';
	import Trigger from '../overlay/Trigger.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Overlays/Modal',
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

	let isOpenLongModal = $state(false);
	let isOpenLightTheme = $state(false);
	let isOpenWide = $state(false);
	let isOpenButtons = $state(false);
</script>

<Story name="Default">
	{#snippet template(args)}
		<Modal {...args} hintLabel="Open Dialog">
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

<Story name="External Custom Trigger">
	{#snippet template(args)}
		{#snippet customTrigger(props: ButtonProps | undefined)}
			<Button {...props} variant="brand">Open Dialog</Button>
		{/snippet}

		<Modal {...args} trigger={customTrigger}>
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
			{#snippet trigger(props)}
				<Button {...props} variant="brand">Open Dialog</Button>
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

<Story name="Description only">
	{#snippet template(args)}
		<Modal {...args}>
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

<Story name="Description and Contents">
	{#snippet template(args)}
		<Modal {...args}>
			{#snippet title()}
				A modal with contents!
			{/snippet}

			{#snippet description()}
				This modal has a description...
			{/snippet}

			<div class="pt-4">
				...and contents!
				<p>A list</p>
				<ul class="list-inside list-disc">
					<li>One</li>
					<li>Two</li>
					<li>Three</li>
				</ul>
			</div>
		</Modal>
	{/snippet}
</Story>

<Story name="Modal with cancel and accept buttons">
	{#snippet template(args)}
		<Modal {...args} bind:open={isOpenButtons}>
			{#snippet title()}
				A modal with cancel and accept buttons!
			{/snippet}

			{#snippet description()}
				In a real example, these buttons would perform some action in addition to closing the modal.
			{/snippet}

			{#snippet buttons()}
				<Button variant="solid" emphasis="secondary" onclick={() => (isOpenButtons = false)}>
					Cancel
				</Button>
				<Button variant="solid" onclick={() => (isOpenButtons = false)}>Accept</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Modal width">
	{#snippet template(args)}
		<Modal {...args} width="5xl" bind:open={isOpenWide}>
			{#snippet title()}
				A wider modal!
			{/snippet}

			{#snippet description()}
				We can use the width prop to set different max-widths from xs though 7xl and full. Default
				is md
			{/snippet}

			{#snippet buttons()}
				<Button variant="solid" emphasis="secondary" onclick={() => (isOpenWide = false)}>
					Cancel
				</Button>
				<Button variant="solid" onclick={() => (isOpenWide = false)}>Accept</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Modal with very long content">
	{#snippet template(args)}
		{#snippet customTrigger(props: ButtonProps | undefined)}
			<Button {...props}>Open Dialog</Button>
		{/snippet}

		<Modal {...args} trigger={customTrigger} width="xl" bind:open={isOpenLongModal}>
			{#snippet title()}
				Modal with very long content!
			{/snippet}

			{#snippet description()}
				An example of a modal with 10 paragraphs of dummy text content, to demonstrate the behaviour
				of a very long modal.
			{/snippet}

			{@const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}

			<div class="prose pt-4">
				{#each sections as _section}
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque orci leo, lacinia
						sed nulla vel, eleifend bibendum magna. Suspendisse potenti. Suspendisse vestibulum
						consequat maximus. Aenean nec odio pellentesque ligula fermentum tempor. Ut eu vulputate
						leo. Donec viverra viverra tellus a convallis. Fusce diam lacus, semper eget pulvinar
						sed, mattis in est. Cras vestibulum ultrices tortor et pulvinar. Maecenas id lorem et
						tellus ornare lacinia non posuere est. Suspendisse molestie tortor erat, id pharetra
						nibh aliquet vitae.
					</p>
				{/each}
			</div>
			{#snippet buttons()}
				<Button variant="solid" emphasis="secondary" onclick={() => (isOpenLongModal = false)}>
					Cancel
				</Button>
				<Button variant="solid" onclick={() => (isOpenLongModal = false)}>Accept</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<Story name="Light Theme (Experimental)">
	{#snippet template(args)}
		<Modal {...args} width="5xl" bind:open={isOpenLightTheme} headerTheme="light">
			{#snippet title()}
				A modal with a light header!
			{/snippet}

			{#snippet description()}
				This modal has a description...
			{/snippet}

			<div class="pt-4">
				...and contents!
				<p>A list</p>
				<ul class="list-inside list-disc">
					<li>One</li>
					<li>Two</li>
					<li>Three</li>
				</ul>
			</div>
			{#snippet buttons()}
				<Button variant="solid" emphasis="secondary" onclick={() => (isOpenLightTheme = false)}>
					Cancel
				</Button>
				<Button variant="solid" onclick={() => (isOpenLightTheme = false)}>Accept</Button>
			{/snippet}
		</Modal>
	{/snippet}
</Story>

<!-- When using the `<Trigger>` component, you don't need to pass `isOpen` as a prop. -->

<Story name="With Trigger component">
	{#snippet template(args)}
		<Modal {...args} width="5xl">
			{#snippet trigger(props)}
				<Trigger {...props} />
			{/snippet}

			{#snippet title()}
				A modal with a light header!
			{/snippet}

			{#snippet description()}
				This demonstrates how to use the Trigger component.
			{/snippet}
		</Modal>
	{/snippet}
</Story>
