<script>
	import { InformationCircleIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Modal } from '../../ui';

	export let title = undefined;

	let modalOpen = false;
	const openModal = () => (modalOpen = true);
	const keyHandler = (e) => (e.key === 'Enter' ? openModal() : null);
</script>

<button
	on:click={openModal}
	on:keypress={keyHandler}
	class="w-20 mt-1 text-xs text-core-grey-200 flex gap-1 cursor-pointer align-top float-right"
>
	<span class="ml-auto">more info</span>
	<InformationCircleIcon class="h-4 w-4 fill-current" on:click={openModal} />
</button>

<Modal bind:open={modalOpen} {title}>
	<slot />
</Modal>
