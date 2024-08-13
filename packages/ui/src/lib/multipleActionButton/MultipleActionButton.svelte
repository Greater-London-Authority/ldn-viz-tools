<script lang="ts">
	/**
	 * The `MultipleActionButton` combines a button and popover menu, so that the user can select which action
	 * (or variation on an action) will be performed when the button is pressed.
	 * @component
	 */
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	import { Check, ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { ButtonProps } from '../button/Button.svelte';
	import Button from '../button/Button.svelte';

	type Option = {
		id: string;
		buttonLabel: string;
		menuLabel: string;
		menuDescription: string;
		default?: boolean;
	};

	export let options: Option[] = [];
	let state = options.find((option) => option.default) ?? options[0];

	export let menuTitle = '';
	export let onClick: (id: string) => void;

	const {
		elements: { trigger, menu, arrow },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
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
	 * Determines how much visual emphasis is placed on the button.
	 */
	export let emphasis: ButtonProps['emphasis'] = 'primary';

	/**
	 * Provides ability to modify appearance to represent success/error/warning conditions.
	 */
	export let condition: ButtonProps['condition'] = 'default';

	/**
	 * Sets the size of the button.
	 */
	export let size: ButtonProps['size'] = 'md';

	/**
	 * If `true`, then the button cannot be interacted with (either by clicking, or by using the keyboard).
	 */
	export let disabled: ButtonProps['disabled'] = false;

	/** Text that appears in tooltip on hover, */
	export let title: ButtonProps['title'] = '';
</script>

<div class="flex items-center gap-0">
	<Button
		on:click={() => onClick(state.id)}
		{variant}
		{emphasis}
		{condition}
		{size}
		{disabled}
		{title}
	>
		<div class="flex items-center">
			<slot name="beforeLabel" />
			{state.buttonLabel}
			<slot name="afterLabel" />
		</div>
	</Button>

	<div
		use:$trigger.action
		{...$trigger}
		class={`${variant !== 'outline' && 'border-l border-color-action-border-secondary'}`}
	>
		<Button variant="square" {emphasis} {condition} {size} {disabled}>
			<Icon src={ChevronDown} theme="mini" class="h-5 w-5" />
			<span class="sr-only">Open Popover</span>
		</Button>
	</div>
</div>

{#if $open}
	<div
		class="bg-color-container-level-1 z-40 max-w-sm p-2 shadow flex flex-col space-y-2"
		use:$menu.action
		{...$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		<div {...$arrow} use:arrow />
		{#if menuTitle}
			<div class="text-sm text-color-text-secondary">{menuTitle}</div>
		{/if}

		<div class="divide-y divide-color-ui-border-secondary">
			{#each options as option}
				<button
					class="text-left p-2 hover:bg-color-action-background-primary-hover hover:text-color-static-white"
					on:click={() => changeOption(option)}
				>
					<div class="flex items-center">
						{#if state.id === option.id}
							<Icon src={Check} theme="mini" class="h-5 w-5 mr-2" />
						{/if}
						<div class="font-medium">{option.menuLabel}</div>
					</div>

					<div class="text-sm">{option.menuDescription}</div>
				</button>
			{/each}
		</div>
	</div>
	<div use:$arrow.action {...$arrow} />
{/if}
