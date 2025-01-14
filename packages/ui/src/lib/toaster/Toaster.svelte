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
	/**
	 * The `<Toaster>` component acts as a container for short messages that appear temporarily ("toasts").
	 * It can be included in the `+layout.svelte` file to avoid needing to add it to each route separately.
	 *
	 * On a page that includes a `<Toaster>` component, you can create a toast using the `newToastMessage()` function,
	 * then display it by calling `.post()` on the object it returns; calling `.post()` repeatedly will refresh the toast.
	 * You can remove a toast by calling `.remove()`.
	 *
	 * ```js
	 *  // there should be an at-sign in the package name, but JSDoc chokes on it
	 * import { newToastMessage, ToastType, ToastMessageOptions } from 'ldn-viz/ui';
	 *
	 * const staticToast = newToastMessage('This is a warning!', {
	 *	// Type: ToastMessageOptions
	 *	// An id is rarely needed but prevents HMR duplicates.
	 *	id: 'a-warning-toast',
	 *	type: ToastType.Warning,
	 *	closeButton: true,
	 * timeToLive: 10 * 1000, // in ms, so this is 10 seconds
	 *});
	 *
	 * // calling .post() repeatedly on same toast object will refresh it, rather than creating duplicate toasts
	 * staticToast.post();
	 * staticToast.post();
	 *
	 *```
	 *
	 * @component
	 */

	import Toast from './Toast.svelte';
	import { messages } from './toaster';
	import type { ToasterPosition } from './types';

	// position of the `Toaster`. You can specify your own classes
	// for positioning via the classes property if you want something bespoke.
	export let position: keyof typeof ToasterPosition = 'TopCenter';

	// classes for applying additional classes. These are appended to the class
	// string so they have implicit but weak priority over other styles.
	export let classes = '';

	// ...$$restProps applied to the top-level `<div>` that contains the toast messages.

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
