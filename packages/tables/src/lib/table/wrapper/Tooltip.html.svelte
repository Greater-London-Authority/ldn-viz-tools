<script lang="ts">
	/** evt - A svelte event created via [`dispatch`](https://svelte.dev/docs#createEventDispatcher) with event information under `evt.detail.e`. */
	export let evt: { [key: string]: any } = {};

	/** [offset=-35] - A y-offset from the hover point, in pixels. */
	export let offset = -16;
</script>

{#if evt.detail}
	<div
		class="absolute max-w-[200px] text-xs p-2 bg-core-grey-100 text-core-grey-700 dark:bg-core-grey-700 dark:text-core-grey-50 shadow-md -translate-x-1/2 -translate-y-full"
		style="
        top:{evt.detail.e.layerY + offset}px;
        left:{evt.detail.e.layerX}px;
      "
	>
		<slot detail={evt.detail} />
		<div
			class="absolute bg-core-grey-100 dark:bg-core-grey-700 rotate-45 w-4 h-4 left-1/2 -translate-x-1/2"
		/>
	</div>
{/if}
