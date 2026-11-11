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
		id?: string;

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
		 * The size of the callout. It sets the padding, the left border, the space between parts and the text roles:
		 *
		 * * `sm` - a 1px border, 8px padding, `label-md` title and `body-sm` body
		 * * `md` - a 5px left border, 8px by 16px padding, `title-sm` title and `body-md` body
		 * * `lg` - a 5px left border, 16px padding, `title-md` title and `body-lg` body
		 */
		size?: 'sm' | 'md' | 'lg';

		/**
		 * The heading level of the title, so that it fits the headings on the page.
		 */
		headingLevel?: 2 | 3 | 4 | 5 | 6;
		title?: import('svelte').Snippet;
		body?: import('svelte').Snippet;
		more?: import('svelte').Snippet;
	}

	let {
		id = randomId(),
		ariaTitle = '',
		status = 'notice',
		size = 'md',
		headingLevel = 3,
		title,
		body,
		more
	}: Props = $props();

	const statusClasses = {
		notice: 'bg-color-surface-accent-muted border-color-surface-accent',
		positive: 'bg-color-surface-positive-muted border-color-surface-positive',
		caution: 'bg-color-surface-caution-muted border-color-surface-caution',
		negative: 'bg-color-surface-negative-muted border-color-surface-negative'
	};

	// The flow context sets the space between the title, body and more
	const sizeClasses = {
		sm: 'flow-compact border p-2',
		md: 'flow-compact border border-l-[5px] px-4 py-2',
		lg: 'flow-standard border border-l-[5px] p-4'
	};

	const titleClasses = {
		sm: 'label-md',
		md: 'title-sm',
		lg: 'title-md'
	};

	const bodyClasses = {
		sm: 'body-sm',
		md: 'body-md',
		lg: 'body-lg'
	};

	let calloutClasses: string = $derived(
		classNames(
			'typeset-product elevation-1 text-color-text',
			sizeClasses[size],
			statusClasses[status]
		)
	);
</script>

<aside class={calloutClasses} aria-labelledby={id}>
	{#if title}
		<svelte:element this={`h${headingLevel}`} {id} class={titleClasses[size]}>
			{@render title?.()}
		</svelte:element>
	{:else}
		<svelte:element this={`h${headingLevel}`} {id} class="sr-only">{ariaTitle}</svelte:element>
	{/if}

	{#if body}
		<div class={bodyClasses[size]}>
			{@render body?.()}
		</div>
	{/if}

	{#if more}
		<div>
			{@render more?.()}
		</div>
	{/if}
</aside>
