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
		alpha: 'bg-core-glaPink-500',
		beta: 'bg-core-blue-600',
		alert: 'bg-core-red-500', // or 100, or 500
		warning: 'bg-core-orange-500',
		positive: 'bg-core-green-600',
		notice: 'bg-core-blue-600'
	};

	const defaultMessage = {
		alpha: 'Alpha Preview',
		beta: 'Beta preview'
	};
</script>

<div
	class={classNames('w-full min-h-[24px] h-fit flex justify-between px-4', colorClass[condition])}
>
	<div class="text-white uppercase text-base">
		<!-- The message to be displayed in the flag. -->
		<slot>
			{defaultMessage[condition]}
		</slot>
	</div>

	{#if link}
		<a href={link} class="text-white underline">{linkText}</a>
	{/if}
</div>
