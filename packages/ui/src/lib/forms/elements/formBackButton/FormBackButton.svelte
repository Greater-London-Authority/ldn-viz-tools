<script lang="ts">
	/**
	 * The `<FormBackButton>` component is the standard way to add a back
	 * button to a multi page `<Form>`. The component can only be used as slotted
	 * content in parent components that provide a `formActiveButtonStore` as
	 * context (such as `<Form>`).
	 * @component
	 */

	import { ArrowLeft } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getContext } from 'svelte';
	import AsyncButton from '../../../button/AsyncButton.svelte';
	import Button from '../../../button/Button.svelte';
	import type { FormActiveButtonStore, FormButtonhandler } from '../../types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	interface Props {
		/**
		 * Called when the button is clicked.
		 */
		onBack: FormButtonhandler;

		/**
		 * If `true`, the label will be replaced by a spinner while the `onBack`
		 * function is being executed.
		 */
		async?: boolean;

		/**
		 * Is set to `true` when the `onBack` function is being executed.
		 *
		 * Bind to this property for reactive updates to button click state.
		 */
		working?: boolean;

		/**
		 * Button label to go after the left arrow icon. Alternatively, provide
		 * a default slot to label and icon.
		 */
		label?: string;

		disabled?: boolean;

		restProps: any;
	}

	let {
		onBack,
		async = false,
		working = false,
		label = 'Back',
		disabled = false,
		restProps
	} = $props();

	const onClick: FormButtonhandler = async (event) => {
		event.preventDefault();

		if ($activeButtonStore) {
			return;
		}

		activeButtonStore.set('back');

		if (!async) {
			activeButtonStore.set('');
		}

		return onBack(event);
	};
</script>

{#if async}
	<AsyncButton
		emphasis="secondary"
		variant="text"
		{onClick}
		onDone={() => activeButtonStore.set('')}
		bind:working
		{disabled}
		{...$restProps}
	>
		<!-- Text and icons slotted into the button, defaults to "<- Back". -->
		<slot>
			<div class="flex items-center">
				<Icon src={ArrowLeft} theme="mini" class="mr-1 h-5 w-5 stroke-[0.2rem]" />
				{label}
			</div>
		</slot>
	</AsyncButton>
{:else}
	<Button
		disabled={disabled || $activeButtonStore}
		emphasis="secondary"
		variant="text"
		onclick={onClick}
		{...restProps}
	>
		<slot>
			<Icon src={ArrowLeft} theme="mini" class="mr-1 h-5 w-5 stroke-[0.2rem]" />
			{label}
		</slot>
	</Button>
{/if}
