<script lang="ts" context="module">
	export type Option = {
		id: string;
		buttonLabel: string;
		menuLabel: string;
		menuDescription: string;
		default?: boolean;
	};
</script>

<script lang="ts">
	/**
	 * The `MultipleActionButton` combines a button and popover menu, so that the user can select which action
	 * (or variation on an action) will be performed when the button is pressed.
	 * @component
	 */
	import { createDropdownMenu, type FocusProp } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	import { Check, ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { classNames } from '../utils/classNames';

	import type { ButtonProps } from '../button/Button.svelte';
	import Button from '../button/Button.svelte';
	import { randomId } from '../utils/randomId';

	/**
	 * Array of options that appear in the drop-down menu. Each is defined by an object with the following properties:
	 * * `id` (string)
	 * * `buttonLabel` (string) - the label that appears in the button when this option is selected
	 * * `menuLabel` (String) - the label that appears in the drop-down menu
	 * * `menuDescription` (string) - description that appears below the label in the drop-down menu
	 * * `default` (boolean) - if `true`, then this option will initially be selected
	 */
	export let options: Option[] = [];

	/**
	 * The currently selected `option`.
	 */
	export let state: Option = options.find((option) => option.default) ?? options[0];

	/**
	 * title that appears at the top ot the drop-down menu
	 */
	export let menuTitle = '';

	/**
	 * Function that will be called when the user clicks on the button.
	 * The `id` of the currently selected option will be provided as an argument.
	 */
	export let onClick: (id: string) => void;

	/**
	 * Value set as the `id` attribute of the action button element (defaults to randomly generated value).
	 */
	export let id = randomId();

	const customCloseFocus: FocusProp = (defaultEl) => {
		const customElToFocus = document.getElementById(id);
		if (!customElToFocus && defaultEl) {
			return defaultEl;
		}
		return customElToFocus;
	};

	const {
		elements: { trigger, menu, item, arrow },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true,
		closeFocus: customCloseFocus
	});

	const changeOption = (newOption: Option) => {
		state = newOption;
		$open = false;
	};

	/**
	 * Selects which family of styles should be applied to the button.
	 */
	export let variant: ButtonProps['variant'] = 'solid';

	/**
	 * Determines the visual emphasis is placed on the button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'primary';

	/**
	 * Sets the size of the button.
	 */
	export let size: ButtonProps['size'] = 'md';

	/**
	 * If `true`, then button will fill full width of parent.
	 */
	export let fullWidth = false;

	/**
	 * If `true`, then the button cannot be interacted with (either by clicking, or by using the keyboard).
	 */
	export let disabled: ButtonProps['disabled'] = false;

	/** Text that appears in tooltip on hover, */
	export let title: ButtonProps['title'] = '';
</script>

{#if options.length === 1}
	<Button
		on:click={() => onClick(state.id)}
		{variant}
		{emphasis}
		{size}
		{disabled}
		{title}
		{id}
		{fullWidth}
	>
		<div class="flex items-center">
			<slot name="beforeLabel" />
			{options[0].buttonLabel}
			<slot name="afterLabel" />
		</div>
	</Button>
{:else}
	<div class={classNames('flex items-center gap-0 w-full', fullWidth ? 'w-full' : '')}>
		<Button
			on:click={() => onClick(state.id)}
			{variant}
			{emphasis}
			{size}
			{fullWidth}
			{disabled}
			{title}
			{id}
			class={`${variant === 'outline' ? 'border-r-0' : ''}`}
		>
			<div class="flex items-center">
				<slot name="beforeLabel" />
				{state.buttonLabel}
				<slot name="afterLabel" />
			</div>
		</Button>

		<Button
			variant="square"
			{emphasis}
			{size}
			{disabled}
			action={$trigger.action}
			actionProps={$trigger}
			class={`${variant === 'outline' ? ' border-l-0 ' : 'border-l border-color-action-secondary-muted'}`}
			ariaLabel={menuTitle ? 'Open popover to ' + menuTitle : 'Open popover'}
		>
			<Icon src={ChevronDown} theme="mini" class="h-5 w-5" />
		</Button>
	</div>

	{#if $open}
		<div
			class="bg-color-container-level-0 z-[60] max-w-sm p-1 shadow-lg flex flex-col border border-color-ui-border-secondary"
			use:$menu.action
			{...$menu}
			transition:fly={{ duration: 150, y: -10 }}
		>
			<div {...$arrow} use:arrow class="border-l border-t border-color-ui-border-secondary" />
			{#if menuTitle}
				<p class="text-sm p-1">{menuTitle}</p>
			{/if}

			<div class="divide-y divide-color-ui-border-secondary">
				{#each options as option}
					<button
						class="text-left w-full p-2 hover:bg-color-action-background-primary-hover hover:text-color-static-white group"
						on:click={() => changeOption(option)}
						use:$item.action
						{...$item}
					>
						<div class="flex items-center">
							{#if state.id === option.id}
								<Icon src={Check} theme="mini" class="h-5 w-5 mr-1" />
							{/if}
							<p class="font-medium text-sm">{option.menuLabel}</p>
						</div>

						<p
							class="text-xs leading-relaxed text-color-text-secondary group-hover:text-color-static-white"
						>
							{option.menuDescription}
						</p>
					</button>
				{/each}
			</div>
		</div>
		<div use:$arrow.action {...$arrow} />
	{/if}
{/if}
