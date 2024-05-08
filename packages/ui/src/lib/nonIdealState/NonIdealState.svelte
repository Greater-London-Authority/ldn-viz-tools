<script lang="ts">
		/**
	 * The `<NonIdealState>` component acts as a placeholder for when other components are not ready render, or are prevented from successfully rendering by an error.
	 * It can include an icon or spinner, and explanatory text.
	 * 
	 * **Alternatives**: if no explanatory text is required, and a placeholder is not needed to prevent content re-flows, then consider using the [Spinner](./?path=/docs/ui-spinner--documentation) component.
	 * @component
	 */


	import { ExclamationTriangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Spinner from '../spinners/Spinner.svelte';

	/**
	 * If `true`, then a spinner is displayed in place of the icon.
	 */
	export let spinner = false;
</script>

<div
	class="flex flex-col items-center justify-center text-center text-core-grey-400 gap-2 background-white border border-grey-400 px-2 py-2 w-full h-full"
>
	{#if spinner}
		<Spinner class="w-12" />
	{:else}
		<slot name="icon">
			<Icon
				src={ExclamationTriangle}
				theme="solid"
				class="w-12 h-12 stroke-core-grey-200"
				aria-hidden="true"
			/>
		</slot>
	{/if}

	<span class="text-lg font-bold max-w-xl">
		<slot name="title">Nothing to display</slot>
	</span>

	<div class="max-w-xl">
		<slot />
	</div>
</div>
