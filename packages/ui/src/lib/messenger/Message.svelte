<script context="module" lang="ts">
	export enum MessageType {
		Notice = 'Notice',
		Success = 'Success',
		Warning = 'Warning',
		Error = 'Error'
	}

	const TIME_TO_FADE = 250; // ms
	const messageClasses = {
		Notice: 'bg-core-blue-100 text-core-blue-600 border-blue-600',
		Success: 'bg-core-green-100 text-core-green-500 border-green-500',
		Warning: 'bg-core-orange-100 text-core-orange-500 border-orange-500',
		Error: 'bg-core-red-100 text-core-red-400 border-red-400'
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';

	import CloseIcon from '@rgossiaux/svelte-heroicons/outline/XCircle';
	import { newEnterKeyHandler } from '../util';

	export let id: string;
	export let type: MessageType = MessageType.Notice;
	export let text: string;
	export let remove: () => void;

	const classes = messageClasses[type];
</script>

<div
	{id}
	class="border p-2 pl-4 pr-4 max-h-24 message {classes}"
	out:fade={{ duration: TIME_TO_FADE }}
>
	<div class="text-lg font-bold flex justify-between items-center">
		{type}
		<button
			class="cursor-pointer w-6 h-6"
			on:click={remove}
			on:keypress={newEnterKeyHandler(remove)}
		>
			<CloseIcon />
		</button>
	</div>
	<div class="text-sm">{text}</div>
</div>

<style>
	.message {
		width: clamp(200px, 25rem, 90vw);
	}
</style>
