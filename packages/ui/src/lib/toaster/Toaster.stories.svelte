<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import Toaster from './Toaster.svelte';

	const { Story } = defineMeta({
		title: 'Ui/Components/Toaster',
		component: Toaster,
		tags: ['autodocs'],

		argTypes: {
			position: {
				description:
					'Position is used to layout the Toaster. You can specify your own classes for positioning via the classes property if you want something bespoke.',
				options: [
					'TopLeft',
					'TopCenter',
					'TopRight',
					'CenterRight',
					'BottomRight',
					'BottomCenter',
					'BottomLeft',
					'CenterLeft',
					'Center'
				],
				control: { type: 'select' }
			},
			classes: {
				description:
					'classes for applying additional classes. These are appended to the class string so they have implicit but weak priority over other styles.',
				control: { type: 'text' }
			},
			$$restprops: {
				description:
					'Any other props are applied to the top-level `<div>` that contains the toast messages',
				table: {
					category: 'properties'
				}
			}
		}
	});
</script>

<script lang="ts">
	import Button from '../button/Button.svelte';

	import { newToastMessage } from './toaster';
	import { ToastType, ToasterPosition } from './types';

	let noticeNumber = 0;
	const toastNotice = () => {
		noticeNumber++;
		newToastMessage(`A notice! Number ${noticeNumber}`).post();
	};

	const toastSuccess = () => {
		newToastMessage('A success!', { type: ToastType.Success }).post();
	};

	const toastWarning = () => {
		newToastMessage('A warning!', { type: ToastType.Warning }).post();
	};

	const toastError = () => {
		newToastMessage('An error!', { type: ToastType.Error }).post();
	};

	const longLivedMessage = newToastMessage(
		'By default, messages disappear after five seconds. You can set a' +
			' longer timeToLive and enable closeButton if you need a message to' +
			' stick around. In the presence of a close button users will think they' +
			' have to manually dismiss the popup so short lived toasts should not' +
			' have a close button.',
		{
			id: 'a-long-lived-message',
			timeToLive: 30000,
			closeButton: true
		}
	);

	const toastClosable = () => {
		longLivedMessage.post();
	};

	let position: keyof typeof ToasterPosition = $state('TopLeft');
	const setToaster = (event: MouseEvent) => {
		const target = event.target as HTMLButtonElement;
		if (target && target.textContent) {
			position = target.textContent as keyof typeof ToasterPosition;
		}
	};

	// Functions for story showing refreshing toast
	let clickCount = $state(0);
	const refreshableMessage = newToastMessage('This message will refresh, not duplicate!', {
		id: 'refreshable-toast',
		timeToLive: 10000,
		closeButton: true
	});

	let secondsRemaining = $state(0);
	let timerInterval: ReturnType<typeof setInterval> | null = null;

	const startTimer = () => {
		if (timerInterval) {
			clearInterval(timerInterval);
		}

		secondsRemaining = 10;

		// Update every 100ms (=0.1s) for smooth countdown
		timerInterval = setInterval(() => {
			secondsRemaining -= 0.1;
			if (secondsRemaining <= 0) {
				secondsRemaining = 0;
				if (timerInterval) {
					clearInterval(timerInterval);
					timerInterval = null;
				}
			}
		}, 100);
	};
</script>

<!--
Note that MAX_MESSAGES=3; pressing the 'Notice' button quickly to create more messages shows that the older messages are pushed down and hidden.
-->
<Story name="Default">
	{#snippet template(args)}
		<Button onclick={toastNotice}>Notice</Button>

		<Toaster {...args} />
	{/snippet}
</Story>

<Story name="Types">
	{#snippet template()}
		<Toaster position="Center" />
		<div class="flex gap-6">
			<Button onclick={toastNotice}>Notice</Button>
			<Button emphasis="positive" onclick={toastSuccess}>Success</Button>
			<Button emphasis="caution" onclick={toastWarning}>Warning</Button>
			<Button emphasis="negative" onclick={toastError}>Error</Button>
		</div>
	{/snippet}
</Story>

<Story name="Position">
	{#snippet template()}
		<div class="relative h-[100vh] w-[100vw] p-6">
			<Toaster {position} />
			<div
				class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-wrap justify-center gap-6 [&>*]:basis-3/12"
			>
				<Button onclick={setToaster} variant={position === 'TopLeft' ? 'solid' : 'outline'}>
					TopLeft
				</Button>
				<Button onclick={setToaster} variant={position === 'TopCenter' ? 'solid' : 'outline'}>
					TopCenter
				</Button>
				<Button onclick={setToaster} variant={position === 'TopRight' ? 'solid' : 'outline'}>
					TopRight
				</Button>
				<Button onclick={setToaster} variant={position === 'CenterLeft' ? 'solid' : 'outline'}>
					CenterLeft
				</Button>
				<Button onclick={toastNotice}>Add Toast!</Button>
				<Button onclick={setToaster} variant={position === 'CenterRight' ? 'solid' : 'outline'}>
					CenterRight
				</Button>
				<Button onclick={setToaster} variant={position === 'BottomLeft' ? 'solid' : 'outline'}>
					BottomLeft
				</Button>
				<Button onclick={setToaster} variant={position === 'BottomCenter' ? 'solid' : 'outline'}>
					BottomCenter
				</Button>
				<Button onclick={setToaster} variant={position === 'BottomRight' ? 'solid' : 'outline'}>
					BottomRight
				</Button>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Close Button">
	{#snippet template()}
		<div class="h-[100vh] w-[100vw] p-6">
			<Toaster position="Center" />
			<div class="flex gap-6">
				<Button onclick={toastClosable}>Toast!</Button>
			</div>
		</div>
	{/snippet}
</Story>

<!--
Calling `.post()` repeatedly on same toast object will refresh it, rather than creating duplicate toasts.
-->

<Story name="Refreshing instead of duplicating">
	{#snippet template()}
		<div class="h-[100vh] w-[100vw] p-6">
			<Toaster position="TopCenter" />
			<div class="flex flex-col gap-4">
				<div class="flex gap-4">
					<Button
						onclick={() => {
							startTimer();
							refreshableMessage.post();
							clickCount++;
						}}
					>
						Post Toast (Count: {clickCount})
					</Button>

					<Button
						onclick={() => {
							refreshableMessage.remove();
							clickCount++;
							if (timerInterval) {
								clearInterval(timerInterval);
								timerInterval = null;
							}
							secondsRemaining = 0;
						}}
					>
						Remove Toast
					</Button>

					<Button
						emphasis="muted"
						variant="outline"
						onclick={() => {
							clickCount = 0;
						}}
					>
						Reset Count
					</Button>
				</div>

				{#if secondsRemaining > 0}
					<div class="text-color-text-muted">
						Toast will remain visible for <strong>{secondsRemaining.toFixed(1)}s</strong>
					</div>
				{/if}
			</div>
		</div>
	{/snippet}
</Story>
