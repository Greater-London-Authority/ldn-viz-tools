<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Modal from './Modal.svelte';

	let isOpen = true;
</script>

<Meta title="Ui/Modal" component={Modal} />

<Template let:args>
	<Modal {...args}>This content is the child of the modal!</Modal>
</Template>

<Story name="Default" args={{ title: 'Title', description: 'Description', isOpen: true }} />

<Story name="Description only">
	<button class="btn bg-core-grey-500 text-core-grey-50 p-4" on:click={() => (isOpen = true)}
		>Open modal!</button
	>

	<Modal
		bind:isOpen
		title="A modal with contents!"
		description="This modal has a description, but no contents!"
	/>
</Story>

<Story name="Description and Contents">
	<button class="btn bg-core-grey-500 text-core-grey-50 p-4" on:click={() => (isOpen = true)}
		>Open modal!</button
	>

	<Modal
		bind:isOpen
		title="A modal with contents!"
		description="This modal has a description and contents!"
	>
		<p>A list</p>
		<ul>
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
		</ul>
	</Modal>
</Story>

<Story name="Contents without description">
	<button class="btn bg-core-grey-500 text-core-grey-50 p-4" on:click={() => (isOpen = true)}
		>Open modal!</button
	>

	<Modal bind:isOpen title="A modal with contents!">
		<p>A list</p>
		<ul>
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
		</ul>
	</Modal>
</Story>

<Story name="Modal with close button">
	<button class="btn bg-core-grey-500 p-4" on:click={() => (isOpen = true)}>Open modal!</button>

	<Modal bind:isOpen title="A modal with close button!">
		<div class="p-4">
			In a real example, these buttons would be appropriately styled, and potentially perform some
			action in addition to closing the modal.
		</div>

		<button class="btn bg-core-grey-500 text-core-grey-50 p-4" on:click={() => (isOpen = false)}
			>Accept</button
		>
		<button class="btn bg-core-grey-500 text-core-grey-50 p-4" on:click={() => (isOpen = false)}
			>Cancel</button
		>
	</Modal>
</Story>
