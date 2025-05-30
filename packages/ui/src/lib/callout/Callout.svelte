<script lang="ts">
	/**
	 * The `Callout` component is used to display a short message in a coloured banner.
	 * @component
	 */
	import { classNames } from '../utils/classNames.js';
	import { randomId } from '../utils/randomId.js';

	interface Props {
		/**
		 * Defaults to a random twelve-character string for use to identify the title by the screen reader.
		 */
		id?: any;

		/**
		 * Required when `Callout` has no title, to ensure screen reader can identify it.
		 * Defaults to empty string when there is a title inside `Callout`.
		 */
		ariaTitle?: string;

		/**
		 * The status or message type, which determines the banner color.
		 */
		status?: 'notice' | 'positive' | 'caution' | 'negative';

		/**
		 * The size of the callout, affects font size and spacing.
		 */
		size?: 'sm' | 'md' | 'lg';
		title?: import('svelte').Snippet;
		body?: import('svelte').Snippet;
		more?: import('svelte').Snippet;
	}

	let {
		id = randomId(),
		ariaTitle = '',
		status = 'notice',
		size = 'md',
		title,
		body,
		more
	}: Props = $props();

	const statusClasses = {
		notice: 'bg-color-ui-background-notice border-color-ui-border-notice',
		positive: 'bg-color-ui-background-positive border-color-ui-border-positive',
		caution: 'bg-color-ui-background-caution border-color-ui-border-caution',
		negative: 'bg-color-ui-background-negative border-color-ui-border-negative'
	};

	const sizeClasses = {
		sm: 'border shadow-sm text-color-text-primary px-2 pt-2 ',
		md: 'border-l-[5px] border shadow-sm text-color-text-primary px-2 pt-2 ',
		lg: 'border-l-[5px] border shadow-sm text-color-text-primary px-4 pt-4'
	};

	const titleClasses = {
		sm: 'text-base mb-1',
		md: 'text-lg mb-2',
		lg: 'text-xl mb-4'
	};

	const bodyClasses = {
		sm: 'text-sm mb-1',
		md: 'text-base mb-2',
		lg: 'text-base mb-4'
	};

	const moreClasses = {
		sm: 'pb-2',
		md: 'pt-2 pb-4',
		lg: 'pt-2 pb-4'
	};

	let calloutClasses: string = $derived(classNames(sizeClasses[size], statusClasses[status]));
</script>

<aside class={calloutClasses} aria-labelledby={id}>
	{#if title}
		<h3 {id} class={classNames('leading-tight font-bold', titleClasses[size])}>
			{@render title?.()}
		</h3>
	{:else}
		<h3 {id} class="sr-only">{ariaTitle}</h3>
	{/if}

	{#if body}
		<div class={bodyClasses[size]}>
			{@render body?.()}
		</div>
	{/if}

	{#if more}
		<div class={moreClasses[size]}>
			{@render more?.()}
		</div>
	{/if}
</aside>
