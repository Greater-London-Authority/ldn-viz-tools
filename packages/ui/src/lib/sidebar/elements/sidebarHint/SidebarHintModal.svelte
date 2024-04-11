<!-- THIS MAY BE TEMP -->
<script lang="ts">
	import { InformationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { writable } from 'svelte/store';
	import Button from '../../../button/Button.svelte';
	import Modal from '../../../modal/Modal.svelte';

	export let hintLabel: string;
	export let modalTitle: string = 'About';
	export let modalDescription: string = '';

	let isOpen = writable(false);
</script>

<!-- Force button styles to match sidebar tooltip etc -->
<Button
	variant="text"
	on:click={() => ($isOpen = true)}
	class="!p-0 !text-core-grey-400 dark:!text-core-grey-300"
>
	{hintLabel}
	<Icon
		src={InformationCircle}
		theme="solid"
		class="w-[18px] h-[18px] ml-0.5"
		aria-hidden="true"
	/></Button
>

<Modal bind:isOpen title={modalTitle} description={modalDescription}>
	<slot />
</Modal>
