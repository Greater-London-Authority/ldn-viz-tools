<script lang="ts">
	/**
	 * A block with a tinted fill and no border, for a short message that needs less attention than a `Callout`.
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
		 * Required when `Well` has no title, to ensure screen reader can identify it.
		 * Defaults to empty string when there is a title inside `Well`.
		 */
		ariaTitle?: string;

		/**
		 * The status or message type, which sets the fill colour.
		 */
		status?: 'neutral' | 'notice' | 'positive' | 'caution' | 'negative';

		/**
		 * The size of the Well. It sets the padding, the space between parts and the text roles:
		 *
		 * * `sm` - 8px padding, `label-md` title and `body-sm` body
		 * * `md` - 8px by 16px padding, `title-sm` title and `body-md` body
		 * * `lg` - 16px padding, `title-md` title and `body-lg` body
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
		status = 'neutral',
		size = 'md',
		headingLevel = 3,
		title,
		body,
		more
	}: Props = $props();

	const statusClasses = {
		neutral: 'bg-color-surface-neutral-muted',
		notice: 'bg-color-surface-accent-muted',
		positive: 'bg-color-surface-positive-muted',
		caution: 'bg-color-surface-caution-muted',
		negative: 'bg-color-surface-negative-muted'
	};

	// The flow context sets the space between the title, body and more
	const sizeClasses = {
		sm: 'flow-compact p-2',
		md: 'flow-compact px-4 py-2',
		lg: 'flow-standard p-4'
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

	let WellClasses: string = $derived(
		classNames('typeset-product text-color-text', sizeClasses[size], statusClasses[status])
	);
</script>

<aside class={WellClasses} aria-labelledby={id}>
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
