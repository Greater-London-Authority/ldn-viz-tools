<script lang="ts">
	import { ArrowRightIcon } from '@rgossiaux/svelte-heroicons/solid';

	export let href = '';
	export let newWindow = false;
</script>

<a
	{href}
	target={newWindow ? '_blank' : '_self'}
	rel={newWindow ? 'noopener noreferrer' : ''}
	class="bg-core-grey-700 group hover:bg-core-grey-800 transition h-full flex flex-col text-white"
>
	<div class="p-4 h-full space-y-2">
		{#if $$slots.title}
			<div class="text-2xl font-bold">
				<slot name="title" />
			</div>
		{/if}

		{#if $$slots.body}
			<div class="h-full text-core-grey-100 prose leading-snug">
				<slot name="body" />
			</div>
		{/if}
	</div>
	<div
		class="bg-core-grey-600 group-hover:bg-core-blue-600 dark:group-hover:bg-core-blue-600 p-4 mt-4 flex justify-between transition"
	>
		<slot name="footer" />
		<slot name="icon">
			<ArrowRightIcon class="h-6 w-6" />
		</slot>
	</div>
</a>
