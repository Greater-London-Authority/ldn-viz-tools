<script lang="ts" module>
	interface TypeClasses {
		[key: string]: string;
	}

	const typeClasses: TypeClasses = {
		Notice: 'bg-color-ui-background-notice border-color-ui-border-notice',
		Success: 'bg-color-ui-background-positive border-color-ui-border-positive',
		Warning: 'bg-color-ui-background-caution border-color-ui-border-caution',
		Error: 'bg-color-ui-background-negative border-color-ui-border-negative'
	};
</script>

<script lang="ts">
	import { Button } from '@ldn-viz/ui';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { fade } from 'svelte/transition';
	import type { ToastMessage } from './types';

	interface Props {
		message: ToastMessage;
	}

	let { message }: Props = $props();

	let classes = $derived(typeClasses[message.type] ?? 'bg-color-ui-background-neutral');
</script>

<div
	role="alert"
	id={message.id}
	class="text-color-text-primary shadow-lg"
	out:fade={{ duration: 100 }}
>
	<div class="border p-2 pb-4 pl-4 pr-2 {classes}">
		<div class="mb-1 flex items-center justify-between text-lg font-bold">
			{message.type}
			{#if message.closeButton}
				<Button
					title="Close"
					emphasis="secondary"
					variant="square"
					size="sm"
					onclick={message.remove}
				>
					<Icon src={XMark} theme="solid" class="h-6 w-6" aria-hidden="true" />
				</Button>
			{/if}
		</div>
		<div class="pr-2 text-sm">{message.text}</div>
	</div>
</div>

<style>
	div[role='alert'] {
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
