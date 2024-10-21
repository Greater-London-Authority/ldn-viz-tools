<script lang="ts">
	import { classNames } from '../utils/classNames';

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

	<!-- The title - displayed as large bold text. -->
	{#if $$slots.title}
		<h3 class="font-bold leading-tight text-xl mb-4">
			<slot name="title" />
		</h3>
	{/if}

	<!-- The main body of the callout, displayed below the title. -->
	{#if $$slots.body}
		<div class="pb-4">
			<slot name="body" />
		</div>
	{/if}

	<!-- Any additional content to display below the body. -->
	{#if $$slots.more}
		<div class="pb-4">
			<slot name="more" />
		</div>
	{/if}
</aside>
