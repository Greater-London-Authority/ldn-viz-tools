<script lang="ts">
	/**
	 * The `<FormSubmitButton>` component is the standard way to add a submit
	 * button to a `<Form>`. The component can only be used as slotted content
	 * in parent components that provide a `formActiveButtonStore` as context
	 * (such as `<Form>`).
	 * @component
	 */

	import { getContext } from 'svelte';
	import AsyncButton from '../../../button/AsyncButton.svelte';
	import Button from '../../../button/Button.svelte';
	import type { FormActiveButtonStore, FormButtonhandler } from '../../types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	interface Props {
		/**
		 * Called when the button is clicked.
		 */
		onSubmit: FormButtonhandler;

		/**
		 * If `true`, the label will be replaced by a spinner while the `onSubmit`
		 * function is being executed.
		 */
		async?: boolean;

		/**
		 * Is set to `true` when the `onSubmit` function is being executed.
		 *
		 * Bind to this property for reactive updates to button click state.
		 */
		working?: boolean;

		disabled?: boolean;

		restProps: any;
	}

	let { onSubmit, async = false, working = false, disabled = false, restProps } = $props();

	const onClick: FormButtonhandler = async (event) => {
		event.preventDefault();

		if ($activeButtonStore) {
			return;
		}

		activeButtonStore.set('submit');

		if (!async) {
			activeButtonStore.set('');
		}
		return onSubmit(event);
	};
</script>

{#if async}
	<AsyncButton
		type="submit"
		variant="solid"
		class="flex gap-2"
		onDone={() => activeButtonStore.set('')}
		{onClick}
		bind:working
		{disabled}
		{...restProps}
	>
		<!-- Text and icons slotted into the button, defaults to "Submit". -->
		<slot>Submit</slot>
	</AsyncButton>
{:else}
	<Button
		disabled={disabled || $activeButtonStore}
		type="submit"
		variant="solid"
		onclick={onClick}
		{...restProps}
	>
		<slot>Submit</slot>
	</Button>
{/if}
