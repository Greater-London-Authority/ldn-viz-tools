<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen = false;
	export let title: string;
	export let description: string;

	const hasChildren = Object.keys($$slots).length > 0;
</script>

<Dialog open={isOpen} on:close={() => (isOpen = false)} class="relative z-10 overflow-y-auto">
	<DialogOverlay class="fixed inset-0 bg-black bg-opacity-40" />

	<!--Full-screen container to center the panel -->
	<div class="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
		<div
			class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl space-y-2 pb-4 pointer-events-auto"
		>
			<div class="bg-core-grey-600 text-white p-2 relative">
				<DialogTitle>{title}</DialogTitle>
				<button
					on:click={() => (isOpen = false)}
					class="bg-core-grey-500 absolute top-2 right-2 hover:bg-core-grey-800"
				>
					<span class="sr-only">Close</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			{#if description}
				<DialogDescription class="px-2">{description}</DialogDescription>
			{/if}

			{#if hasChildren && description}
				<div class="border-dotted border-t border-core-grey-300 pt-4 mx-2 text-sm">
					<slot />
				</div>
			{:else if hasChildren}
				<div class="border-dotted border-core-grey-300 mx-2 text-sm">
					<slot />
				</div>
			{/if}
		</div>
	</div>
</Dialog>
