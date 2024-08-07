<script lang="ts" context="module">
	interface TypeClasses {
		[key: string]: string;
	}

	const typeClasses: TypeClasses = {
		Notice: 'bg-color-ui-background-notice border-color-ui-border-notice',
		Success: 'bg-color-ui-background-positive border-color-ui-border-positive',
		Warning: 'bg-color-ui-background-warning border-color-ui-border-warning',
		Error: 'bg-color-ui-background-negative border-color-ui-border-negative'
	};
</script>

<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade } from 'svelte/transition';
	import type { ToastMessage } from './types';

	export let message: ToastMessage;
	let classes = typeClasses[message.type];

	if (!classes) {
		classes = 'bg-color-ui-background-neutral';
	}
</script>

<div
	role="dialog"
	id={message.id}
	class="shadow-lg text-color-text-primary"
	out:fade={{ duration: 100 }}
>
	<div class="border pl-4 pb-4 p-2 pr-2 {classes}">
		<div class="text-lg font-bold flex justify-between items-center mb-1">
			{message.type}
			{#if message.closeButton}
				<Button
					title="Close"
					emphasis="secondary"
					variant="square"
					size="sm"
					on:click={message.remove}
				>
					<Icon src={XMark} theme="solid" class="w-6 h-6" aria-hidden="true" />
				</Button>
			{/if}
		</div>
		<div class="text-sm pr-2">{message.text}</div>
	</div>
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
