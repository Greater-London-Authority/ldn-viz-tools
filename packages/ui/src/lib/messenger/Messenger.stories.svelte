<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Messenger, { postMessage } from './Messenger.svelte';
	import { MessageType } from './Message.svelte';
</script>

<Meta title="Ui/Messenger" component={Messenger} />

<Template let:args>
	<Messenger {...args} />
</Template>

<Story name="Notice">
	<div class="gla-panel">
		<p class="gla-description">
			Post an information message that gets the users attention but can be ignored and will go away
			on its own. Noticeable but ignorable.
		</p>

		<button class="gla-button bg-core-blue-500" on:click={() => postMessage('Notice me!')}>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<Story name="Success">
	<div class="gla-panel">
		<p class="gla-description">Post a success message.</p>

		<button
			class="gla-button bg-core-green-400"
			on:click={() => postMessage('Something done successfully.', MessageType.Success)}
		>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<Story name="Warning">
	<div class="gla-panel">
		<p class="gla-description">Post a warning message.</p>

		<button
			class="gla-button bg-core-orange-500"
			on:click={() => postMessage('Consider this a warning.', MessageType.Warning)}
		>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<Story name="Error">
	<div class="gla-panel">
		<p class="gla-description">Post an error message.</p>

		<button
			class="gla-button bg-core-red-400"
			on:click={() => postMessage('You ignored the warning.', MessageType.Error)}
		>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<Story name="Absolute positioning">
	<div class="gla-panel gla-border">
		<p class="gla-description">By default messages are fixed to the bottom right.</p>

		<p class="gla-description">
			We can change this by providing the messenger with classes to reposition it. For example,
			bottom middle of the parent container.
		</p>

		<button
			class="gla-button bg-core-blue-500"
			on:click={() => postMessage('Positioned absolutely.')}
		>
			Post message
		</button>

		<Messenger classes="absolute left-1/2 transform -translate-x-1/2" />
	</div>
</Story>

<Story name="Timeout: long lived">
	<div class="gla-panel">
		<p class="gla-description">By default messages disappear after three and a half seconds.</p>

		<p class="gla-description">
			We can change this on a message by message basis by setting providing a timeout in
			milliseconds when posting. For example, you may want to display a longer message for a longer
			time to allow the user to read it. Eight seconds in this story.
		</p>

		<button
			class="gla-button bg-core-blue-500"
			on:click={() =>
				postMessage('Once upon a time on a planet far far away...', MessageType.Notice, 8000)}
		>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<Story name="Timeout: never">
	<div class="gla-panel">
		<p class="gla-description">By default messages disappear after three and a half seconds.</p>

		<p class="gla-description">
			We can disable this by setting the timeout to zero or a negative number when posting. The user
			will have to manually dismiss the message.
		</p>

		<p class="gla-description">
			This should be avoided as the Messenger is primarily intended for noticeable but ignorable
			messaging. If the users attention is not optional then a Model would be better.
		</p>

		<button
			class="gla-button bg-core-blue-500"
			on:click={() => postMessage('Never ending story.', MessageType.Notice, 0)}
		>
			Post message
		</button>

		<Messenger />
	</div>
</Story>

<style>
	.gla-border {
		@apply border-2 border-solid border-black dark:border-white;
	}

	.gla-panel {
		@apply relative m-4 space-y-2;
		width: 800px;
		height: 300px;
	}

	.gla-description {
		@apply text-core-grey-500 dark:text-core-grey-200 ml-2;
	}

	.gla-button {
		@apply ml-2 p-2 text-lg gla-border;
	}
</style>
