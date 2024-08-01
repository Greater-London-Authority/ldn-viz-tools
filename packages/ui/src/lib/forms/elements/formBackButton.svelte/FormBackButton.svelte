<script lang="ts">
	/**
	 * The `<FormBackButton>` component is the standard way to add a back
	 * button to a multi page `<Form>`. The component can only be used as slotted
	 * content in parent components that provide a `formActiveButtonStore` as
	 * context (such as `<Form>`).
	 * @component
	 */

	import { getContext } from 'svelte';
	import { ArrowLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import AsyncButton from '../../../button/AsyncButton.svelte';
	import Button from '../../../button/Button.svelte';
	import type { FormButtonhandler, FormActiveButtonStore } from '../../types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	/**
	 * Called when the button is clicked.
	 */
	export let onBack: FormButtonhandler;

	/**
	 * If `true`, the label will be replaced by a spinner while the `onBack`
	 * function is being executed.
	 */
	export let async = false;

	/**
	 * Is set to `true` when the `onBack` function is being executed.
	 *
	 * Bind to this property for reactive updates to button click state.
	 */
	export let working = false;

	/**
	 * Button label to go after the left arrow icon. Alternatively, provide
	 * a default slot to label and icon.
	 */
	export let label = 'Back';

	const onClick: FormButtonhandler = async (event) => {
		event.preventDefault();

		if ($activeButtonStore) {
			return;
		}

		activeButtonStore.set('back');
		return onBack(event);
	};

	$: if (!working && $activeButtonStore === 'back') {
		activeButtonStore.set('');
	}
</script>

{#if async}
	<AsyncButton emphasis="secondary" variant="text" {onClick} bind:working {...$$restProps}>
		<!-- Text and icons slotted into the button, defaults to "<- Back". -->
		<slot>
			<div class="flex items-center">
				<Icon src={ArrowLeft} class="stroke-[0.2rem] w-5 h-5 mr-1" />
				{label}
			</div>
		</slot>
	</AsyncButton>
{:else}
	<Button
		disabled={$$props.disabled || $activeButtonStore}
		emphasis="secondary"
		variant="text"
		on:click={onClick}
		{...$$restProps}
	>
		<slot>
			<Icon src={ArrowLeft} class="stroke-[0.2rem] w-5 h-5 mr-1" />
			{label}
		</slot>
	</Button>
{/if}
