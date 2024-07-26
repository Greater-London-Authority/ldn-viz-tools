<script lang="ts">
	/**
	 * The `<FormSubmitButton>` component is the standard way to add a submit
	 * button to a `<Form>`. The component can only be used as slotted content
	 * in parent components that provide a `formActiveButtonStore` as context
	 * (such as `<Form>`).
	 * @component
	 */

	import { getContext } from 'svelte';
	import Button from '../../../button/Button.svelte';
	import AsyncButton from '../../AsyncButton.svelte';
	import type { FormButtonhandler, FormActiveButtonStore } from '../../types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	/**
	 * Called when the button is clicked.
	 */
	export let onSubmit: FormButtonhandler;

	/**
	 * If `true`, the label will be replaced by a spinner while the `onSubmit` function is being
	 * executed.
	 */
	export let async = false;

	/**
	 * Is set to `true` when the `onSubmit` function is being executed.
	 * THe intended use is to bind to it to reactively know when a submission is
	 * in progress.
	 *
	 * Working will be reset to `false` once the function (possibly including a
	 * returned promise) has finished executing.
	 */
	export let working = false;

	const onClick: FormButtonhandler = async (event) => {
		event.preventDefault();

		if ($activeButtonStore) {
			return;
		}

		activeButtonStore.set('submit');
		return onSubmit(event);
	};

	$: if (!working && $activeButtonStore === 'submit') {
		activeButtonStore.set('');
	}
</script>

{#if async}
	<AsyncButton
		disabled={$$props.disabled || $activeButtonStore}
		type="submit"
		variant="solid"
		class="flex gap-2"
		{onClick}
		bind:working
		{...$$restProps}
	>
		<!-- Text and icons slotted into the button, defaults to "Submit". -->
		<slot>Submit</slot>
	</AsyncButton>
{:else}
	<Button
		disabled={$$props.disabled || $activeButtonStore}
		type="submit"
		variant="solid"
		on:click={onClick}
		{...$$restProps}
	>
		<slot>Submit</slot>
	</Button>
{/if}
