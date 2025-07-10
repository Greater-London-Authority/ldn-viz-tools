<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type WithoutChild } from 'bits-ui';
	import { classNames } from '../utils/classNames.js';
	import Button from '../button/Button.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';
	import Trigger from '../overlay/Trigger.svelte';

	type Props = Dialog.RootProps & {
		hintLabel?: string;
		title?: Snippet;
		description?: Snippet;
		trigger?: Snippet<[Record<string, any>]>;
		buttons?: Snippet;

		width?:
			| 'xs'
			| 'sm'
			| 'md'
			| 'lg'
			| 'xl'
			| '2xl'
			| '3xl'
			| '4xl'
			| '5xl'
			| '6xl'
			| '7xl'
			| 'full';

		headerTheme?: 'light' | 'dark';

		contentProps?: WithoutChild<Dialog.ContentProps>;
		// ...other component props if you wish to pass them
	};

	let {
		open = $bindable(false),
		children,
		hintLabel,
		contentProps,
		/**
		 * Title that appears at the top of the modal
		 */
		title,

		/**
		 * Description that appears below the title
		 */
		description,

		trigger,

		buttons,
		/**
		 * width of the modal
		 */
		width = 'md',

		/**
		 * Colour scheme to apply to the header, either `light` or `dark`. The modal will respect global theme settings.
		 */
		headerTheme = 'dark',

		...restProps
	}: Props = $props();

	const widthClasses = {
		xs: 'max-w-xs',
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl',
		'5xl': 'max-w-5xl',
		'6xl': 'max-w-6xl',
		'7xl': 'max-w-7xl',
		full: 'max-w-full'
	};

	const modalClass = classNames(
		'inline-block w-full max-h-full flex flex-col overflow-hidden text-left align-middle transition-all transform bg-color-container-level-0 shadow-xl pointer-events-auto',
		widthClasses[width]
	);
</script>

{#snippet modalTrigger()}
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				{@render trigger({ ...props })}
			{/snippet}
		</Dialog.Trigger>
	{:else}
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Trigger {...props} {hintLabel} />
			{/snippet}
		</Dialog.Trigger>
	{/if}
{/snippet}

<Dialog.Root bind:open {...restProps}>
	{@render modalTrigger()}

	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-40 bg-black/60" />
		<div class="pointer-events-none fixed inset-8 z-50 flex items-center justify-center">
			<Dialog.Content {...contentProps} class={modalClass}>
				<div
					class={`border-color-static-brand bg-color-container-level-1 text-color-text-primary relative flex items-center justify-between border-l-[5px] p-3 pr-4 ${headerTheme}`}
				>
					<Dialog.Title class="font-medium">
						{@render title?.()}
					</Dialog.Title>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button {...props} variant="square" emphasis="secondary" class="h-8 w-8 self-center">
								<span class="sr-only">Close</span>
								<Icon src={XMark} theme="solid" class="h-6 w-6" aria-hidden="true" />
							</Button>
						{/snippet}
					</Dialog.Close>
				</div>

				<div class="overflow-y-auto">
					<div class="px-4 py-6">
						<Dialog.Description>
							{@render description?.()}
						</Dialog.Description>
						{@render children?.()}
					</div>
				</div>
				{#if buttons}
					<div class="flex justify-end gap-2 p-4">
						{@render buttons?.()}
					</div>
				{/if}
			</Dialog.Content>
		</div>
	</Dialog.Portal>
</Dialog.Root>
