<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Modal from './Modal.svelte';

	import Button from '../button/Button.svelte';

	let isOpen = true;

	let dialog1;
	let dialog2;
	let dialog3;
	let dialog4;
	let dialog5;
</script>

<Meta title="Ui/Modal" component={Modal} />

<Template let:args>
	<Modal {...args}>This content is the child of the modal!</Modal>
</Template>


<Story name="Description only">
	<Button on:click={() => dialog1.open()}>Open modal!</Button>

	<Modal
		bind:dialog={dialog1}
		title="A modal with contents!"
		description="This modal has a description, but no contents!"
	/>
</Story>

<Story name="Description and Contents">
	<Button on:click={() => dialog2.open()}>Open modal!</Button>

	<Modal
		bind:dialog={dialog2}
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
	<Button on:click={() => dialog3.open()}>Open modal!</Button>

	<Modal bind:dialog={dialog3} title="A modal with contents!">
		<p>A list</p>
		<ul>
			<li>One</li>
			<li>Two</li>
			<li>Three</li>
		</ul>
	</Modal>
</Story>

<Story name="Modal with close button">
	<Button on:click={() => dialog4.open()}>Open modal!</Button>

	<Modal bind:dialog={dialog4} title="A modal with close button!">
		<div class="mb-4">
			In a real example, these buttons would be appropriately styled, and potentially perform some
			action in addition to closing the modal.
		</div>

		<Button variant="text" class="bg-core-green-400" on:click={dialog4.close()}
			>Accept</Button
		>
		<Button variant="text" class="bg-core-red-400" on:click={dialog4.close()}>Cancel</Button>
	</Modal>
</Story>

<Story name="Modal width">
	<Button on:click={() => dialog5.open()}>Open modal!</Button>

	<Modal
		bind:dialog={dialog5}
		width="6xl"
		title="A wider modal!"
		description="We can use the width prop to set different max-widths from xs though 7xl and full. Default is md"
	/>
</Story>
