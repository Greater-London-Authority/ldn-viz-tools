<script lang="ts">
	/**
	 * The `<NonIdealState>` component acts as a placeholder for when other components are not ready render, or are prevented from successfully rendering by an error.
	 * It can include an icon or spinner, and explanatory text.
	 *
	 * **Alternatives**: if no explanatory text is required, and a placeholder is not needed to prevent content re-flows, then consider using the [LoadingIndicator](./?path=/docs/ui-components-loadingindicator--documentation) component.
	 * @component
	 */

	import { ExclamationTriangle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Snippet } from 'svelte';
	import LoadingIndicator from '../loadingIndicator/LoadingIndicator.svelte';

	export interface NonIdealStateProps {
		/**
		 * If `true`, then a spinner is displayed in place of the icon.
		 */
		spinner?: boolean;
		icon?: Snippet;
		title?: Snippet;
		children?: Snippet;
	}

	let { spinner = false, icon, title, children }: NonIdealStateProps = $props();
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center gap-2 border border-color-ui-border-secondary bg-color-ui-background-neutral px-2 py-2 text-center text-color-text-secondary"
>
	{#if spinner}
		<LoadingIndicator class="h-12 w-12" />
	{:else}
		<!-- contains the icon -->
		{#if icon}
			{@render icon()}
		{:else}
			<Icon src={ExclamationTriangle} theme="solid" class="h-6 w-6" aria-hidden="true" />
		{/if}
	{/if}

	<span class="max-w-xl text-lg font-bold">
		<!-- contains the title text, displayed below the icon -->
		{#if title}
			{@render title()}
		{:else}
			Nothing to display
		{/if}
	</span>

	<div class="max-w-xl">
		<!-- inserted into a `<div>` below the description -->
		{@render children?.()}
	</div>
</div>
