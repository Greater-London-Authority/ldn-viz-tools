<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Button from '../button/Button.svelte';

	import Toaster from './Toaster.svelte';
	import { newToastMessage } from './toaster';
	import { ToastType } from './types';

	import typeDocs from './types?raw';

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

	let position = 'TopLeft';
	const setToaster = (event: MouseEvent) => {
		const target = event.target as HTMLButtonElement;
		if (target && target.textContent) {
			position = target.textContent;
		}
	};
</script>

<Meta
	title="Ui/Toaster"
	component={Toaster}
	parameters={{
		layout: 'full'
	}}
/>

<Story name="Default">
	<Toaster />
</Story>

<Story name="Types Dark">
	<div class="p-6 w-[100vw] h-[100vh]">
		<Toaster position="Center" />
		<div class="flex gap-6">
			<Button on:click={toastNotice}>Notice</Button>
			<Button condition="success" on:click={toastSuccess}>Success</Button>
			<Button condition="warning" on:click={toastWarning}>Warning</Button>
			<Button condition="error" on:click={toastError}>Error</Button>
		</div>
	</div>
</Story>

<Story name="Types Light">
	<div class="bg-white p-6 w-[100vw] h-[100vh]">
		<Toaster position="Center" />
		<div class="flex gap-6">
			<Button on:click={toastNotice}>Notice</Button>
			<Button condition="success" on:click={toastSuccess}>Success</Button>
			<Button condition="warning" on:click={toastWarning}>Warning</Button>
			<Button condition="error" on:click={toastError}>Error</Button>
		</div>
	</div>
</Story>

<Story name="TypeScript">
	<div class="text-white p-6 w-[100vw]">
		<pre><code>{typeDocs}</code></pre>
	</div>
</Story>

<Story name="Position Dark">
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

<Story name="Position Light">
	<div class="bg-white relative p-6 w-[100vw] h-[100vh]">
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