<script lang="ts">
	/**
	 * The `MultipleActionButton` combines a button and popover menu, so that the use can select which action
	 * (or variation on an action) will be performed when the button is pressed.
	 * @component
	 */
	import { Check, ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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

	///
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { trigger, menu, arrow, overlay },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});

	const changeOption = (newOption: Option) => {
		state = newOption;
		$open = false;
	};
</script>

<div class="flex gap-0">
	<button
		on:click={() => onClick(state.id)}
		class="border rounded-l-md p-2 hover:bg-color-action-background-primary-hover"
	>
		<div class="flex items-center">
			<slot name="beforeLabel" />
			{state.buttonLabel}
			<slot name="afterLabel" />
		</div>
	</button>

	<button
		type="button"
		class="border rounded-r-md p-2 hover:bg-color-action-background-primary-hover"
		use:$trigger.action
		{...$trigger}
		aria-label="Update dimensions"
	>
		<Icon src={ChevronDown} class="h-4 w-4 mr-2" />
		<span class="sr-only">Open Popover</span>
	</button>
</div>

{#if $open}
	<div use:$overlay.action {...overlay} class="fixed inset-0 z-40" />
	<div
		class="bg-white z-40 max-w-sm"
		use:$menu.action
		{...$menu}
		transition:fly={{ duration: 150, y: -10 }}
	>
		{#if menuTitle}
			<div class="text-sm text-color-ui-secondary">{menuTitle}</div>
		{/if}

		{#each options as option}
			<div
				class="border-b hover:bg-color-action-background-primary-hover"
				on:click={() => changeOption(option)}
			>
				<div class="flex items-center">
					{#if state.id === option.id}
						<Icon src={Check} class="h-4 w-4 mr-2" />
					{:else}
						<div class="h-4 w-4 mr-2" />
					{/if}
					<div class="text-lg font-bold">{option.menuLabel}</div>
				</div>

				<div>{option.menuDescription}</div>
			</div>
		{/each}
	</div>
	<div use:$arrow.action {...$arrow} />
{/if}

<style lang="postcss">
	.menu {
		@apply z-40 flex max-h-[300px] min-w-[220px] flex-col shadow-lg;
		@apply rounded-md bg-white p-1 shadow-neutral-900/30 lg:max-h-none;
		@apply ring-0 !important;
	}
</style>
