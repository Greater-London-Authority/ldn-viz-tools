<script lang="ts">
	import { createPopover, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});
</script>

<div type="button" class="trigger" {...$trigger} use:trigger aria-label="Update dimensions">
	<slot name="trigger" />
</div>

{#if $open}
	<div {...$content} use:content transition:fade={{ duration: 100 }} class="content">
		<div {...$arrow} use:arrow />
		<div class="flex flex-col gap-2.5">
			<slot />
		</div>

		<button class="close" {...$close} use:close>
			<Icon src={XMark} theme="solid" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
		</button>
	</div>
{/if}

<style lang="postcss">
	.trigger {
		@apply inline-flex h-9 w-fit items-center justify-center rounded-full  p-0;
		@apply text-sm font-medium transition-colors ;
		@apply focus-visible:ring  focus-visible:ring-offset-2;
	}

	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply transition-colors;
		@apply focus-visible:ring  focus-visible:ring-offset-2;
		@apply  p-0 text-sm font-medium;
	}

	.content {
		@apply z-10 w-60 rounded-[4px] bg-white dark:bg-core-grey-800 p-5 shadow-sm;
		@apply border border-core-grey-200 dark:border-core-grey-900;
		@apply text-black dark:text-white;
	}
</style>
