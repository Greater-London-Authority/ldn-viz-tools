<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import Modal from '../modal/Modal.svelte';

	export let title = '';

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
	<Icon
		src={InformationCircle}
		theme="solid"
		class="h-4 w-4 fill-current"
		aria-hidden="true"
		on:click={openModal}
	/>
</button>

<Modal bind:isOpen={modalOpen} {title}>
	<slot />
</Modal>
