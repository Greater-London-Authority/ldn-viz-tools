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
		/**
		 * The heading level of the title. Leave it unset for a title that isn't a heading.
		 */
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		children?: Snippet;
	}

	let { spinner = false, icon, title, headingLevel, children }: NonIdealStateProps = $props();
</script>

<!-- A status region, so that screen readers announce the state when it changes -->
<div
	role="status"
	class="flow-standard flex h-full w-full flex-col items-center justify-center border border-color-border-wash bg-color-surface-neutral-muted px-2 py-2 text-center text-color-text-muted"
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

	<svelte:element this={headingLevel ? `h${headingLevel}` : 'span'} class="title-sm max-w-xl">
		<!-- contains the title text, displayed below the icon -->
		{#if title}
			{@render title()}
		{:else}
			Nothing to display
		{/if}
	</svelte:element>

	<div class="max-w-xl">
		<!-- inserted into a `<div>` below the description -->
		{@render children?.()}
	</div>
</div>
