<script lang="ts" context="module">
	type ToasterPositionClass = {
		[key: string]: string;
	};

	const positionClasses: ToasterPositionClass = {
		TopLeft: 'top-6 left-6',
		TopCenter: 'top-6 left-1/2 -translate-x-1/2 transform',
		TopRight: 'top-6 right-6',
		CenterRight: 'top-1/2 -translate-y-1/2 right-6 transform',
		BottomRight: 'bottom-6 right-6',
		BottomCenter: 'bottom-6 left-1/2 -translate-x-1/2 transform',
		BottomLeft: 'bottom-6 left-6',
		CenterLeft: 'top-1/2 -translate-y-1/2 left-6 transform',
		Center: 'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform'
	};
</script>

<script lang="ts">
	import Toast from './Toast.svelte';
	import { messages } from './toaster';

	// position is used to layout the Toaster. You can specify your own classes
	// for positioning via the classes property if you want something bespoke.
	export let position = 'TopCenter';

	// classes for applying additional classes. These are appended to the class
	// string so they have implicit but weak priority over other styles.
	export let classes = '';

	// ...$$restProps applied to the top level element.

	$: posClasses = positionClasses[position] || '';
</script>

<div
	style:display={$messages.length === 0 ? 'none' : 'block'}
	class="fixed flex flex-col space-y-1 z-[50] w-fit {posClasses} {classes}"
	{...$$restProps}
>
	{#each $messages as message (message.id)}
		<Toast {message} />
	{/each}
</div>
