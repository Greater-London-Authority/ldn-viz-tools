<script lang="ts">
	/**
	 * The `Callout` component is used to display a short message in a coloured banner.
	 * @component
	 */
	import { classNames } from '../utils/classNames';

	/**
	 * The status or message type, which determines the banner color.
	 */
	export let status: 'note' | 'caution' | 'warning' = 'note';

	const statusClasses = {
		note: 'bg-core-blue-50 border-core-blue-500',
		caution: 'bg-core-orange-50 border-core-orange-500 ',
		warning: 'bg-core-red-50 border-core-red-500'
	};

	let calloutClasses: string;

	$: calloutClasses = classNames(
		'border-l-[5px] text-core-grey-700 px-4 pt-4 mt-4 ',
		statusClasses[status]
	);
</script>

<aside class={calloutClasses}>
	{#if $$slots.title}
		<h3 class="font-bold leading-tight text-xl mb-4">
			<!-- The title - displayed as large bold text. -->
			<slot name="title" />
		</h3>
	{/if}

	{#if $$slots.body}
		<div class="pb-4">
			<!-- The main body of the callout, displayed below the title. -->
			<slot name="body" />
		</div>
	{/if}

	{#if $$slots.more}
		<div class="pb-4">
			<!-- Any additional content to display below the body. -->
			<slot name="more" />
		</div>
	{/if}
</aside>
