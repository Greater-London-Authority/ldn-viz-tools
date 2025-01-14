<script lang="ts">
	/**
	 * The `Callout` component is used to display a short message in a coloured banner.
	 * @component
	 */
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	export let id = randomId();

	/**
	 * The status or message type, which determines the banner color.
	 */
	export let status: 'notice' | 'success' | 'warning' | 'error' = 'notice';

	export let size: 'sm' | 'md' | 'lg' = 'md';

	const statusClasses = {
		notice: 'bg-color-ui-background-notice border-color-ui-border-notice',
		success: 'bg-color-ui-background-positive border-color-ui-border-positive',
		warning: 'bg-color-ui-background-warning border-color-ui-border-warning',
		error: 'bg-color-ui-background-negative border-color-ui-border-negative'
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
		sm: 'text-sm mb-2',
		md: 'text-base mb-4',
		lg: 'text-base mb-4'
	};

	const moreClasses = {
		sm: 'pb-1',
		md: 'pb-2',
		lg: 'pb-4'
	};

	let calloutClasses: string;

	$: calloutClasses = classNames(sizeClasses[size], statusClasses[status]);
</script>

<aside class={calloutClasses} aria-labelledby="aside-label-{id}">
	{#if $$slots.title}
		<h3 id="aside-label-{id}" class={classNames('font-bold leading-tight', titleClasses[size])}>
			<slot name="title" />
		</h3>
	{/if}

	{#if $$slots.body}
		<div class={bodyClasses[size]}>
			<slot name="body" />
		</div>
	{/if}

	{#if $$slots.more}
		<div class={moreClasses[size]}>
			<slot name="more" />
		</div>
	{/if}
</aside>
