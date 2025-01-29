<script lang="ts">
	/**
	 * The `<Popover>` component provides content near to its trigger element, similar to a tooltip.
	 * However, like a modal, it remains open until it is dismissed by the user.
	 * It can be dismissed by clicking elsewhere on the screen, clicking on the close button, or pressing the Escape key.
	 *
	 * **Alternatives**: to display shorter messages less intrusively, consider using a [Tooltip](./?path=/docs/ui-tooltip--documentation).
	 * To display longer messages centrally on the screen, consider using a [Modal](./?path=/docs/ui-modal--documentation).
	 * @component
	 */

	import { createPopover } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	import { InformationCircle, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { Writable } from 'svelte/store';
	import Button, { type ButtonProps } from '../button/Button.svelte';

	/**
	 * Defaults to false, so when Popover opens, the first interactive element is focused.
	 *
	 * For shorter content where the first interactive element is the close button, set to
	 * true, to avoid screen readers skipping over the content completely.
	 *
	 * For longer content, where focusing the first interactive element means the beginning
	 * of content scrolls out of view, a `tabindex='-1'` should be added to the title or
	 * first paragraph to initially focus that element.
	 */
	export let disableFocusTrap: boolean = false;

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: { placement: 'top' },
		disableFocusTrap
	});

	/**
	 * text that appears in the tooltip target, next to the icon
	 */
	export let hintLabel = 'more info';

	/**
	 * text size for the tooltip target
	 */
	export let hintSize: 'sm' | 'md' | 'lg' | undefined = undefined;

	/**
	 * Store controlling whether popover is open.
	 */
	export let openStore: Writable<boolean> | undefined = undefined;
	$: openStore = open;

	/**
	 * Allows you to customise trigger button styling. Defaults to
	 * styling trigger button as a text button without padding.
	 * `triggerClass` exists to allow you to override
	 */
	export let triggerVariant: ButtonProps['variant'] = 'text';
	export let triggerEmphasis: ButtonProps['emphasis'] = 'secondary';
	export let triggerClass: string = '';
</script>

<!-- TODO: as this button wraps the hint slot any slotted item inherits button styles (color etc) This should be refactored to be more generic -->
<Button
	variant={triggerVariant}
	size={hintSize}
	class={triggerClass}
	emphasis={triggerEmphasis}
	customAction={$trigger.action}
	actionProps={$trigger}
>
	{#if $$slots.hint}
		<!-- if present, replaces the default `hintLabel` and icon  -->
		<slot name="hint" />
	{:else}
		{hintLabel}

		<Icon
			src={InformationCircle}
			theme="mini"
			class="w-[18px] h-[18px] ml-0.5"
			aria-hidden="true"
		/>
	{/if}
</Button>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-50 w-60 bg-color-container-level-1 p-4 shadow"
	>
		<div {...$arrow} use:arrow />

		<div class="text-sm flex flex-col space-y-2 text-color-text-primary">
			{#if $$slots.title}
				<p class="font-medium">
					<!-- Optional title for the popover -->
					<slot name="title" />
				</p>
			{/if}

			<div>
				<!-- Main content of the popover-->
				<slot />
			</div>
		</div>

		<div {...$close} use:close>
			<Button variant="square" emphasis="secondary" size="sm" class="absolute right-1.5 top-1.5">
				<span class="sr-only">Close</span>
				<Icon src={XMark} theme="solid" class="w-6 h-6" aria-hidden="true" />
			</Button>
		</div>
	</div>
{/if}
