<script context="module">
	import Modal from './Modal.svelte';

	export const meta = {
		title: 'Ui/Components/Overlays/Modal',
		component: Modal,
		argTypes: {
			isOpen: { options: ['true', 'false'], control: { type: 'radio' } },
			title: { type: 'string', control: 'text' },
			description: { type: 'string', control: 'text' },
			width: {
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
				control: { type: 'select' }
			}
		},
		args: {
			title: 'Expects a title',
			description: 'Expects a summarising description of modal for accessibility'
		}
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	let isOpen = false;
</script>

<Template let:args>
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal bind:isOpen {...args}></Modal>
</Template>

<Story name="Default" source />

<Story name="Description only">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal
		bind:isOpen
		title="A modal with description!"
		description="This modal has a description, but no contents!"
	/>
</Story>

<Story name="Description and Contents">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal bind:isOpen title="A modal with contents!" description="This modal has a description...">
		<div class="pt-4">
			...and contents!
			<p>A list</p>
			<ul class="list-disc list-inside">
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ul>
		</div>
	</Modal>
</Story>

<Story name="Modal with cancel and accept buttons">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal
		bind:isOpen
		title="A modal with cancel and accept buttons!"
		description="In a real example, these buttons would perform some action in addition to closing the modal."
	>
		<svelte:fragment slot="buttons">
			<Button variant="solid" emphasis="secondary" on:click={() => (isOpen = false)}>Cancel</Button>
			<Button variant="solid" on:click={() => (isOpen = false)}>Accept</Button>
		</svelte:fragment>
	</Modal>
</Story>

<Story name="Modal width">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal
		bind:isOpen
		width="6xl"
		title="A wider modal!"
		description="We can use the width prop to set different max-widths from xs though 7xl and full. Default is md"
	/>
</Story>

<Story name="Modal with very long content">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal
		bind:isOpen
		title="Modal with very long content!"
		description="An example of a modal with 10 paragraphs of dummy text content, to demonstrate the behaviour of a very long modal."
		width="xl"
	>
		{@const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}

		<div class="prose pt-4">
			{#each sections as _section}
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque orci leo, lacinia
					sed nulla vel, eleifend bibendum magna. Suspendisse potenti. Suspendisse vestibulum
					consequat maximus. Aenean nec odio pellentesque ligula fermentum tempor. Ut eu vulputate
					leo. Donec viverra viverra tellus a convallis. Fusce diam lacus, semper eget pulvinar sed,
					mattis in est. Cras vestibulum ultrices tortor et pulvinar. Maecenas id lorem et tellus
					ornare lacinia non posuere est. Suspendisse molestie tortor erat, id pharetra nibh aliquet
					vitae.
				</p>
			{/each}
		</div>

		<div slot="buttons" class="flex justify-end gap-4">
			<Button variant="solid" emphasis="secondary" on:click={() => (isOpen = false)}>Cancel</Button>
			<Button variant="solid" on:click={() => (isOpen = false)}>Accept</Button>
		</div>
	</Modal>
</Story>

<Story name="Light Theme (Experimental)">
	<Button on:click={() => (isOpen = true)}>Open modal!</Button>

	<Modal
		bind:isOpen
		title="A modal with a light header!"
		description="This modal has a description..."
		headerTheme="light"
	>
		<div class="pt-4">
			...and contents!
			<p>A list</p>
			<ul class="list-disc list-inside">
				<li>One</li>
				<li>Two</li>
				<li>Three</li>
			</ul>
		</div>
	</Modal>
</Story>

<!-- When using the `<Trigger>` component, you don't need to pass `isOpen` as a prop. -->

<Story name="With Trigger">
	<Modal title="The modal title" description="This demonstrates how to use the Trigger component.">
		<Trigger slot="trigger" variant="solid" emphasis="primary" size="md">Open modal!</Trigger>
	</Modal>
</Story>
