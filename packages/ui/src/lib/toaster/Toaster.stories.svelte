<script context="module">
	import Toaster from './Toaster.svelte';

	export const meta = {
		title: 'Ui/Components/Toaster ',
		component: Toaster,
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
	};
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';

	import { newToastMessage } from './toaster';
	import { ToastType, ToasterPosition } from './types';

	const toastNotice = () => {
		newToastMessage('A notice!').post();
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

	let position: keyof typeof ToasterPosition = 'TopLeft';
	const setToaster = (event: MouseEvent) => {
		const target = event.target as HTMLButtonElement;
		if (target && target.textContent) {
			position = target.textContent as keyof typeof ToasterPosition;
		}
	};
</script>

<Template let:args>
	<Button on:click={toastNotice}>Notice</Button>

	<Toaster {...args} />
</Template>

<Story name="Default" source />

<Story name="Types">
	<Toaster position="Center" />
	<div class="flex gap-6">
		<Button on:click={toastNotice}>Notice</Button>
		<Button emphasis="positive" on:click={toastSuccess}>Success</Button>
		<Button emphasis="caution" on:click={toastWarning}>Warning</Button>
		<Button emphasis="negative" on:click={toastError}>Error</Button>
	</div>
</Story>

<Story name="Position">
	<div class="relative p-6 w-[100vw] h-[100vh]">
		<Toaster {position} />
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform flex flex-wrap justify-center gap-6 [&>*]:basis-3/12"
		>
			<Button on:click={setToaster} variant={position === 'TopLeft' ? 'solid' : 'outline'}>
				TopLeft
			</Button>
			<Button on:click={setToaster} variant={position === 'TopCenter' ? 'solid' : 'outline'}>
				TopCenter
			</Button>
			<Button on:click={setToaster} variant={position === 'TopRight' ? 'solid' : 'outline'}>
				TopRight
			</Button>
			<Button on:click={setToaster} variant={position === 'CenterLeft' ? 'solid' : 'outline'}>
				CenterLeft
			</Button>
			<Button condition="warning" on:click={toastNotice}>Add Toast!</Button>
			<Button on:click={setToaster} variant={position === 'CenterRight' ? 'solid' : 'outline'}>
				CenterRight
			</Button>
			<Button on:click={setToaster} variant={position === 'BottomLeft' ? 'solid' : 'outline'}>
				BottomLeft
			</Button>
			<Button on:click={setToaster} variant={position === 'BottomCenter' ? 'solid' : 'outline'}>
				BottomCenter
			</Button>
			<Button on:click={setToaster} variant={position === 'BottomRight' ? 'solid' : 'outline'}>
				BottomRight
			</Button>
		</div>
	</div>
</Story>

<Story name="Close Button">
	<div class="p-6 w-[100vw] h-[100vh]">
		<Toaster position="Center" />
		<div class="flex gap-6">
			<Button on:click={toastClosable}>Toast!</Button>
		</div>
	</div>
</Story>
