<script lang="ts">
	/**
	 * The `MultipleActionButton` combines a button and popover menu, so that the user can select which action
	 * (or variation on an action) will be performed when the button is pressed.
	 * @component
	 */

	import { Check, ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { DropdownMenu } from 'bits-ui';
	import { classNames } from '../utils/classNames';

	import Button from '../button/Button.svelte';

	import type { MultipleActionButtonOption, MultipleActionButtonProps } from './types';

	let {
		options = [],
		state = $bindable(),
		menuTitle = '',
		size,
		variant,
		fullWidth,
		onClick,
		beforeLabel,
		afterLabel,
		...restProps
	}: MultipleActionButtonProps = $props();

	$effect(() => {
		// apply fallback value to state if not defined
		if (!state || !options.map((d) => d.id).includes(state.id)) {
			const newState = options.find((option) => option.default) ?? options[0];

			if (newState.id !== state.id) {
				state = newState;
			}
		}
	});

	// apply fallback value when first rendering - effect doesn't firre, as state not changed
	if (!state) {
		state = options.find((option) => option.default) ?? options[0];
	}

	const changeOption = (newOption: MultipleActionButtonOption) => {
		state = newOption;
	};

	let triggerClasses = $derived(
		variant === 'outline' ? ' border-l-0 ' : 'border-l border-color-action-secondary-muted'
	);
</script>

{#if options.length === 1}
	<Button onclick={() => onClick(state.id)} {size} {variant} {fullWidth} {...restProps}>
		<div class="flex items-center">
			{@render beforeLabel?.()}
			{state.buttonLabel}
			{@render afterLabel?.()}
		</div>
	</Button>
{:else}
	<div class={classNames('flex items-center gap-0', fullWidth ? 'w-full' : '')}>
		<Button
			onclick={() => onClick(state.id)}
			{size}
			{variant}
			{fullWidth}
			{...restProps}
			class={`${variant === 'outline' ? 'border-r-0' : ''}`}
		>
			<div class="flex items-center">
				{@render beforeLabel?.()}
				{state?.buttonLabel}
				{@render afterLabel?.()}
			</div>
		</Button>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				aria-label={menuTitle ? 'Open popover to ' + menuTitle : 'Open popover'}
			>
				{#snippet child({ props })}
					<Button {...props} class={triggerClasses} variant="square" {size} {...restProps}>
						{#if size === 'xs'}
							<Icon src={ChevronDown} theme="mini" class="h-4 w-4" aria-hidden="true" />
						{:else}
							<Icon src={ChevronDown} theme="mini" class="h-5 w-5" aria-hidden="true" />
						{/if}
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					class="border-color-input-border bg-color-input-background z-[60] flex max-w-sm flex-col border p-1 shadow"
					preventScroll={false}
				>
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading class="p-1 text-sm">{menuTitle}</DropdownMenu.GroupHeading>

						<div class="divide-color-ui-border-secondary divide-y">
							{#each options as option (option.id)}
								<DropdownMenu.Item
									class="hover:bg-color-action-background-primary-hover hover:text-color-static-white group w-full cursor-pointer p-2 text-left"
									onSelect={() => changeOption(option)}
								>
									<div class="flex items-center">
										{#if state.id === option.id}
											<Icon src={Check} theme="mini" class="mr-1 h-5 w-5" />
										{/if}
										<p class="text-sm font-medium">{option.menuLabel}</p>
									</div>
									<p class="text-color-text-secondary group-hover:text-color-static-white text-xs">
										{option.menuDescription}
									</p>
								</DropdownMenu.Item>
							{/each}
						</div>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Arrow class="text-color-input-border" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</div>
{/if}
