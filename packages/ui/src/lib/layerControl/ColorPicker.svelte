<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { currentTheme, tokenNameToValue } from '../theme/themeStore';
	import Tooltip from '../tooltip/Tooltip.svelte';
	import { classNames } from '../utils/classNames';

	export let label;

	export let activeColorName = 'data.categorical.blue';

	export let disabled = false;

	/**
	 * Optional custom colours to choose from. If these don't exist, default to categoricalColors.
	 */
	export let colorNames;

	const categoricalColors = [
		'data.categorical.blue',
		'data.categorical.darkpink',
		'data.categorical.pink',
		'data.categorical.red',
		'data.categorical.yellow',
		'data.categorical.green',
		'data.categorical.purple',
		'data.categorical.orange',
		'data.categorical.turquoise',
		'data.neutral.0',
		'data.neutral.1'
	];

	if (!colorNames.length) {
		colorNames = categoricalColors;
	}

	let isOpen = false;

	const trimTokenName = (token: string) => {
		const array = token.split('.');
		array.shift();
		return array.join(' ');
	};

	const activeOptionClasses =
		'ring-inset ring-2 ring-offset-2 ring-color-ui-background-secondary ring-offset-color-ui-border-primary hover:ring-offset-color-ui-border-primary focus-visible:ring-offset-color-ui-border-primary';

	const optionClasses =
		'rounded-full bg-color-container-level-0 hover:bg-color-container-level-0 hover:ring-inset hover:ring-offset-2 hover:ring-offset-color-ui-border-secondary hover:ring-2 hover:ring-color-ui-background-secondary focus-visible:ring-offset-color-ui-border-secondary';
</script>

{#if disabled}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="w-6 h-6 text-color-action-disabled cursor-not-allowed"
		aria-hidden="true"
	/>
{:else}
	<Popover bind:isOpen>
		<Trigger slot="trigger" size="xs" ariaLabel="Click to open {label} layer colour picker">
			<div
				class="w-[22px] h-[22px] relative border rounded-full"
				style:background={tokenNameToValue(activeColorName, $currentTheme)}
			/>
		</Trigger>

		<svelte:fragment slot="title">Colour</svelte:fragment>

		<span class="text-xs mb-2 inline-block">Click to assign a colour to this layer.</span>

		<div class="flex flex-wrap gap-0.5">
			{#each colorNames as colorOption}
				<Tooltip>
					<Trigger
						slot="trigger"
						variant="square"
						size="sm"
						class={classNames(
							activeColorName === colorOption ? activeOptionClasses : '',
							optionClasses
						)}
						on:click={() => {
							activeColorName = colorOption;
							isOpen = false;
						}}
					>
						<div
							class="w-6 h-6 rounded-full"
							style:background={tokenNameToValue(colorOption, $currentTheme)}
						/>
					</Trigger>
					<span class="sr-only">Color code:</span>
					{trimTokenName(colorOption)}
				</Tooltip>
			{/each}
		</div>
	</Popover>
{/if}
