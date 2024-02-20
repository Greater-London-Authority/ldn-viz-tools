<script>
	import SidebarMoreInfoModal from './SidebarMoreInfoModal.svelte';

	export let title = '';
	export let infoTitle = title;
	export let classes = '';
</script>

<section class="relative text-white flex flex-col gap-4 {classes}" {...$$restProps}>
	{#if title || $$slots.info}
		<div class="-mb-2">
			{#if $$slots.info}
				<SidebarMoreInfoModal title={infoTitle}>
					<slot name="info" />
				</SidebarMoreInfoModal>
			{/if}

			{#if title}
				<h3 class="text-sm font-bold">
					{@html title}
				</h3>
			{/if}
		</div>
	{/if}

	<slot />
</section>
