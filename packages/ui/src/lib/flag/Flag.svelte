<script lang="ts">
	/**
	 * The `<Flag>` component displays a message at the top of a page (e.g., to indicate that it is in Beta release).
	 * @component
	 */

	import { classNames } from '../utils/classNames';

	type flagCondition = 'alpha' | 'beta' | 'alert' | 'warning' | 'positive' | 'notice';

	/**
	 * Provides ability to modify appearance to represent condition or status.
	 */
	export let condition: flagCondition = 'alpha';

	/**
	 * URL to link to (optional). Can be a `mailto://` URL.
	 */
	export let link = '';

	/**
	 * Text to be displayed as the body of the link.
	 */
	export let linkText = 'Please provide feedback here';

	const colorClass: Record<flagCondition, string> = {
		alpha: 'bg-color-ui-alpha',
		beta: 'bg-color-ui-beta',
		alert: 'bg-color-ui-negative',
		warning: 'bg-color-ui-warning',
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
	class={classNames('w-full min-h-[24px] h-fit flex justify-between px-4', colorClass[condition])}
>
	<div class="text-color-static-white uppercase text-base">
		<!-- The message to be displayed in the flag. -->
		<slot>
			{defaultMessage[condition]}
		</slot>
	</div>

	{#if link}
		<a href={link} class="text-color-static-white underline">{linkText}</a>
	{/if}
</div>
