<script lang="ts" context="module">
	interface TypeClasses {
		[key: string]: string;
	}

	const typeClasses: TypeClasses = {
		Notice: 'bg-core-blue-100 text-core-blue-700 border-blue-700',
		Success: 'bg-core-green-100 text-core-green-800 border-green-800',
		Warning: 'bg-core-orange-100 text-core-orange-800 border-orange-800',
		Error: 'bg-core-red-50 text-core-red-800 border-red-800'
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Button } from '@ldn-viz/ui';
	import type { ToastMessage } from './types';

	export let message: ToastMessage;
	let classes = typeClasses[message.type];

	if (!classes) {
		classes = 'bg-core-grey-100 text-core-grey-800 border-core-grey-700';
	}
</script>

<div
	role="dialog"
	id={message.id}
	class="border p-2 pl-4 pr-4 max-h-24 {classes}"
	out:fade={{ duration: 100 }}
>
	<div class="text-lg font-bold flex justify-between items-center">
		{message.type}
		{#if message.closeButton}
			<Button
				emphasis="secondary"
				variant="square"
				class="cursor-pointer w-6 h-6"
				on:click={message.remove}
			>
				<Icon src={XMark} class="stroke-2 w-4 h-4" />
			</Button>
		{/if}
	</div>
	<div class="text-sm">{message.text}</div>
</div>

<style>
	div[role='dialog'] {
		width: clamp(200px, 24rem, calc(100vw - 1rem));
		/* 
			Because order is an integer with no intermediate values the transition
			duration is meaningless; it will always jump from position to position
			when in a flex box. The only way around is to calculate and absolutely
			position each toast element.

			transition: order 500ms ease-out;
		*/
	}
</style>
