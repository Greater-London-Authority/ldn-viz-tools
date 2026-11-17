<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './Toast.svelte';
	import type { ToastMessage } from './types';

	/**
	 * The `<Toast>` component renders a single toast message. It is normally
	 * rendered for you by the `<Toaster>` container from messages posted via
	 * `newToastMessage()`, but is shown here in isolation so the per-`type` colour
	 * mapping (and the neutral fallback for an unknown type) can be reviewed
	 * statically, without the timing of a real toast.
	 */
	const { Story } = defineMeta({
		title: 'Ui/Components/Toaster/Toast',
		component: Toast,
		tags: ['autodocs']
	});

	// Builds a plain message object matching the ToastMessage shape. `post`/`remove`
	// are no-ops here because the Toast is rendered directly rather than through a
	// Toaster store.
	const makeMessage = (type: string, text: string, closeButton = false): ToastMessage =>
		({
			id: `toast-${type}-${closeButton ? 'close' : 'plain'}`,
			type,
			text,
			closeButton,
			post: () => {},
			remove: () => {}
		}) as ToastMessage;
</script>

<!--
Each `type` maps to its own surface/border colour. An unrecognised type
(here "Info") falls back to the neutral styling. The right-hand column adds a
close button.
-->
<Story name="All Toast variation">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<div class="flex flex-col gap-4">
				<Toast message={makeMessage('Notice', 'A notice message.')} />
				<Toast message={makeMessage('Success', 'A success message.')} />
				<Toast message={makeMessage('Warning', 'A warning message.')} />
				<Toast message={makeMessage('Error', 'An error message.')} />
				<Toast message={makeMessage('Info', 'An unknown type falls back to neutral styling.')} />
			</div>
			<div class="flex flex-col gap-4">
				<Toast message={makeMessage('Notice', 'A notice message.', true)} />
				<Toast message={makeMessage('Success', 'A success message.', true)} />
				<Toast message={makeMessage('Warning', 'A warning message.', true)} />
				<Toast message={makeMessage('Error', 'An error message.', true)} />
				<Toast
					message={makeMessage('Info', 'An unknown type falls back to neutral styling.', true)}
				/>
			</div>
		</div>
	{/snippet}
</Story>
