<script lang="ts">
	import { createPopover } from '@melt-ui/svelte';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade } from 'svelte/transition';
	import Button from '../button/Button.svelte';

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true
	});
</script>

<button
	class="bg-core-grey-50 core-text-grey-800 pb-1 hover:bg-core-grey-100 dark:bg-core-grey-800 dark:text-white dark:hover:bg-core-grey-500"
	{...$trigger}
	use:$trigger.action
	aria-label="Update dimensions"
>
	<slot name="trigger" />
</button>

{#if $open}
	<div
		{...$content}
		use:$content.action
		transition:fade={{ duration: 100 }}
		class="z-10 w-60 bg-white p-5 shadow-sm border border-core-grey-200"
	>
		<div {...$arrow} use:$arrow.action />
		<div class="flex flex-col gap-2.5">
			<slot />
		</div>

		<button class="close" {...$close} use:$close.action>
			<Icon src={XMark} theme="solid" class="w-[18px] h-[18px] ml-0.5" aria-hidden="true" />
		</button>
	</div>
{/if}

<style lang="postcss">
	.close {
		@apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
		@apply transition-colors;
		@apply focus-visible:ring  focus-visible:ring-offset-2;
		@apply border-core-grey-200 p-0 text-sm font-medium;
	}
</style>
