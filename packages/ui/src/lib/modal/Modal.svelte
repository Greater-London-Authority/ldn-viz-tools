<script lang="ts">
	/**
	 * The `<Modal>` component provides content overlaid on the rest of the UI. It can provide the user with additional contextual information, or prompt for user interaction.
	 * It can be dismissed by clicking elsewhere on the screen, clicking on the close button, or pressing the Escape key.
	 *
	 * **Alternatives**: to display shorter messages less intrusively, consider using a [Tooltip](./?path=/docs/ui-tooltip--documentation).
	 * To display messages that remain open until dismissed, but are displayed close to the element that triggered them, consider using a [Popover](./?path=/docs/ui-popover--documentation).
	 * @component
	 */

	import { createDialog } from '@melt-ui/svelte';
	import { XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { writable } from 'svelte/store';
	import Button from '../button/Button.svelte';
	import { classNames } from '../utils/classNames';

	/**
	 * boolean Svelte store that determines whether the modal is currently open.
	 */
	export let isOpen = writable(false);

	const {
		elements: { portalled, overlay, content, title: meltTitle, description: meltDescription, close },
		states: { open }
	} = createDialog({ open: isOpen });

	/**
	 * title that appears at the top of the modal
	 */
	export let title: string;

	/**
	 * description that appears below the title (the `aria-describedby` for the modal points to the element containing this text)
	 */
	export let description: string = '';

	/**
	 * Colour scheme to apply to the header, either `light` or `dark`. The modal will respect global theme settings.
	 */
	export let headerTheme: 'light' | 'dark' = 'dark';

	/**
	 * width of the modal
	 */
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
		'inline-block w-full max-h-full flex flex-col overflow-hidden text-left align-middle transition-all transform bg-color-container-level-0 shadow-xl pointer-events-auto',
		widthClasses[width]
	);
</script>

<div {...$portalled} use:$portalled.action>
	{#if $open}
		<div {...$overlay} use:$overlay.action class="fixed inset-0 bg-black bg-opacity-40 z-40" />

		<div class="fixed inset-8 flex items-center justify-center pointer-events-none z-50">
			<div {...$content} use:$content.action class={modalClass}>
				<div
					class={`bg-color-container-level-1 text-color-text-primary p-2 pl-3 relative flex items-center justify-between border-l-[5px] border-color-static-brand ${headerTheme}`}
				>
					<div class="text-lg font-medium" {...$meltTitle} use:$meltTitle.action>{title}</div>
					<div {...$close} use:$close.action>
						<Button
							variant="square"
							emphasis="secondary"
							class="w-8 h-8 self-center"
							on:click={() => ($isOpen = false)}
						>
							<span class="sr-only">Close</span>
							<Icon src={XMark} theme="solid" class="w-6 h-6" aria-hidden="true" />
						</Button>
					</div>
				</div>

				<div class="overflow-y-auto">
					<div class="p-4">
						{#if description}
							<div {...$meltDescription} use:$meltDescription.action>{description}</div>
						{/if}

						{#if hasChildren}
							<!-- content to display below the `description`-->
							<slot />
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
