<script>
	import SidebarMoreInfoModal from './SidebarMoreInfoModal.svelte';

	export let title;
	export let infoTitle = title;
	export let classes = '';
</script>

<header class="relative text-white flex flex-col gap-4 pb-1 {classes}" {...$$restProps}>
	{#if title || $$slots.info}
		<div>
			{#if $$slots.info}
				<SidebarMoreInfoModal title={infoTitle}>
					<slot name="info" />
				</SidebarMoreInfoModal>
			{/if}

			{#if title}
				<h1 class="text-xl font-bold">
					{@html title}
				</h1>
			{/if}
		</div>
	{/if}

	<slot />
</header>

<style>
	header {
		@apply before:content-[''];
	}
</style>
