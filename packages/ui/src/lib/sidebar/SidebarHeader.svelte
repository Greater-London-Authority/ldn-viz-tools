<script>
	import SidebarMoreInfoModal from './SidebarMoreInfoModal.svelte';

	export let title;
	export let infoTitle = title;
	export let classes = '';
</script>

<header class="before:bg-core-blue-500 pb-1 {classes}" {...$$restProps}>
	{#if title || $$slots.info}
		<div>
			{#if $$slots.info}
				<SidebarMoreInfoModal title={infoTitle}>
					<slot name="info" />
				</SidebarMoreInfoModal>
			{/if}

			{#if title}
				<h1 class="text-2xl uppercase leading-tight font-bold">
					{@html title}
				</h1>
			{/if}
		</div>
	{/if}

	<slot />
</header>

<style>
	header {
		@apply relative text-white flex flex-col gap-4 pl-4;
		@apply before:absolute before:top-0 before:left-0;
		@apply before:w-1 before:h-full before:content-[''];
	}
</style>
