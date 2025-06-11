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
		alpha: 'bg-color-ui-alpha',
		beta: 'bg-color-ui-beta',
		alert: 'bg-color-ui-negative',
		warning: 'bg-color-ui-caution',
		positive: 'bg-color-ui-positive',
		notice: 'bg-color-ui-notice'
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
	class={classNames('flex h-fit min-h-[24px] w-full justify-between px-4', colorClass[condition])}
>
	<div class="text-base uppercase text-color-static-white">
		<!-- The message to be displayed in the flag. -->
		{#if children}
			{@render children()}
		{:else}
			{defaultMessage[condition]}
		{/if}
	</div>

	{#if link}
		<a href={link} class="text-color-static-white underline">{linkText}</a>
	{/if}
</div>
