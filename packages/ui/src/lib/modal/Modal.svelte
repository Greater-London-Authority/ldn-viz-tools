<script lang="ts">
	import { createDialog } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import CloseIcon from './CloseIcon.svelte';
	export let isOpen = writable(false);

	const {
		elements: { trigger, portalled, overlay, content, title: meltTitle, description: meltDescripton, close },
		states: { open }
	} = createDialog({ open: isOpen });

	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';

	export let title: string;
	export let description: string;
	export let width:
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
		| 'full' = 'md';

	const hasChildren = Object.keys($$slots).length > 0;

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

	$: modalClass = classNames(
		'inline-block w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl space-y-2 pb-4 pointer-events-auto',
		widthClasses[width]
	);
</script>

<div {...$portalled} use:$portalled.action>
	{#if $open}
		<div {...$overlay} use:$overlay.action class="fixed inset-0 bg-black bg-opacity-40" />

		<div class="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
			<div {...$content} use:$content.action class={modalClass}>
				<div
					class="bg-core-grey-600 text-white p-2 relative h-[56px] flex items-center justify-between border-l-4 border-core-blue-500"
				>
					<div class="text-lg" {...$meltTitle} use:$meltTitle.action>{title}</div>
					<div {...$close} use:$close.action>
						<Button
							variant="square"
							emphasis="secondary"
							class="w-8 h-8 self-center"
							on:click={() => ($isOpen = false)}
						>
							<span class="sr-only">Close</span>
							<CloseIcon class="w-8 h-8" />
						</Button>
					</div>
				</div>

				{#if description}
					<div {...$meltDescripton} use:$meltDescripton.action class="px-2">{description}</div>
				{/if}

				{#if hasChildren && description}
					<div class="border-dotted border-t border-core-grey-300 pt-4 mx-2 text-sm">
						<slot />
					</div>
				{:else if hasChildren}
					<div class="border-dotted border-core-grey-300 mx-2 text-sm">
						<slot />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
