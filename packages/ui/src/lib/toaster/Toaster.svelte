<script lang="ts" context="module">
	export enum ToasterPosition {
		TopLeft = 'TopLeft',
		TopCenter = 'TopCenter',
		TopRight = 'TopRight',
		TopRightOffset = 'TopRightOffset',
		CenterRight = 'CenterRight',
		BottomRight = 'BottomRight',
		BottomCenter = 'BottomCenter',
		BottomLeft = 'BottomLeft',
		CenterLeft = 'CenterLeft'
	}

	type ToasterPositionClass = {
		[key: string]: string;
	};

	const positionClasses: ToasterPositionClass = {
		TopLeft: 'top-6 left-6',
		TopCenter: 'top-6 left-1/2 -translate-x-1/2 transform',
		TopRight: 'top-6 right-6',
		TopRightOffset: 'top-16 right-6',
		CenterRight: 'top-1/2 -translate-y-1/2 right-6 transform',
		BottomRight: 'bottom-6 right-6',
		BottomCenter: 'bottom-6 left-1/2 -translate-x-1/2 transform',
		BottomLeft: 'bottom-6 left-6',
		CenterLeft: 'top-1/2 -translate-y-1/2 left-6 transform'
	};
</script>

<script lang="ts">
	import Toast from './Toast.svelte';
	import { messages } from './toaster';

	export let position = 'TopCenter';
	export let classes = '';

	const posClasses = positionClasses[position] || '';
</script>

<div
	style:display={$messages.length === 0 ? 'none' : 'block'}
	class="fixed flex flex-col gap-4 z-[50] w-fit p-1 bg-core-grey-800/50 {posClasses} {classes}"
	{...$$restProps}
>
	{#each $messages as message (message.id)}
		<Toast {message} />
	{/each}
</div>
