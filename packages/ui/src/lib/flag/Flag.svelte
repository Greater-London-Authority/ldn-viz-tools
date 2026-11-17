<script lang="ts">
	import { classNames } from '../utils/classNames.js';

	/**
	 * The `<Flag>` component displays a message at the top of a page (e.g., to indicate that it is in Beta release).
	 * @component
	 */

	export type FlagCondition = 'alpha' | 'beta' | 'alert' | 'warning' | 'positive' | 'notice';

	interface Props {
		/**
		 * Provides ability to modify appearance to represent condition or status.
		 */
		condition?: FlagCondition;
		/**
		 * URL to link to (optional). Can be a `mailto://` URL.
		 */
		link?: string;
		/**
		 * Text to be displayed as the body of the link.
		 */
		linkText?: string;
		children?: import('svelte').Snippet;
	}

	let {
		condition = 'alpha',
		link = '',
		linkText = 'Please provide feedback here',
		children
	}: Props = $props();

	const colorClass: Record<FlagCondition, string> = {
		alpha: 'bg-color-surface-alpha',
		beta: 'bg-color-surface-beta',
		alert: 'bg-color-surface-negative',
		warning: 'bg-color-surface-caution',
		positive: 'bg-color-surface-positive',
		notice: 'bg-color-surface-accent'
	};

	// The status fills lighten in dark mode, so their text darkens with inverse-text.
	// The alpha and beta fills stay dark enough for white in both modes.
	const textClass: Record<FlagCondition, string> = {
		alpha: 'text-color-static-white',
		beta: 'text-color-static-white',
		alert: 'text-color-inverse-text',
		warning: 'text-color-inverse-text',
		positive: 'text-color-inverse-text',
		notice: 'text-color-inverse-text'
	};

	const defaultMessage = {
		alpha: 'Alpha Preview',
		beta: 'Beta Preview',
		alert: 'Alert',
		warning: 'Warning',
		positive: 'Positive',
		notice: 'Notice'
	};
</script>

<div
	class={classNames(
		'typeset-product flex h-fit min-h-[24px] w-full justify-between px-4',
		colorClass[condition]
	)}
>
	<div class={classNames('label-md uppercase', textClass[condition])}>
		<!-- The message to be displayed in the flag. -->
		{#if children}
			{@render children()}
		{:else}
			{defaultMessage[condition]}
		{/if}
	</div>

	{#if link}
		<a href={link} class={classNames('underline', textClass[condition])}>{linkText}</a>
	{/if}
</div>
