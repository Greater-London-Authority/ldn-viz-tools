<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { theme } from '../theme/themeState.svelte';

	import Tooltip from '../tooltip/Tooltip.svelte';
	import { classNames } from '../utils/classNames';

	interface Props {
		label: string;
		activeColorName?: string;
		disabled?: boolean;
		/**
		 * Optional custom colours to choose from. If these don't exist, default to categoricalColors.
		 */
		colorNames: string[];
		/**
		 * If `true`, shows the color chip even when the control is disabled (but clicking on it does not open the control).
		 */
		alwaysShowcolorChip?: boolean;
	}

	let {
		label,
		activeColorName = $bindable(),
		disabled = false,
		colorNames = $bindable(),
		alwaysShowcolorChip = false
	}: Props = $props();

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

	const trimTokenName = (token: string) => {
		const array = token.split('.');
		array.shift();
		return array.join(' ');
	};

	const activeOptionClasses =
		'ring-inset ring-2 ring-offset-2 ring-color-surface ring-offset-color-border hover:ring-offset-color-border focus-visible:ring-offset-color-border';

	const optionClasses =
		'rounded-full bg-color-container hover:bg-color-container hover:ring-inset hover:ring-offset-2 hover:ring-offset-color-border-muted hover:ring-2 hover:ring-color-surface focus-visible:ring-offset-color-border-muted';
</script>

{#if disabled && !alwaysShowcolorChip}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="h-6 w-6 cursor-not-allowed text-color-interactive-disabled"
		aria-hidden="true"
	/>
{:else if disabled && alwaysShowcolorChip}
	<div
		class="relative h-[22px] w-[22px] cursor-not-allowed rounded-full border"
		style:background={activeColorName
			? theme.tokenNameToValue(activeColorName, theme.currentTheme)
			: ''}
		title="Layer color is not editable."
	></div>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} layer colour picker">
				<div
					class="relative h-[22px] w-[22px] rounded-full border"
					style:background={activeColorName
						? theme.tokenNameToValue(activeColorName, theme.currentTheme)
						: ''}
				></div>
			</Trigger>
		{/snippet}

		{#snippet title()}
			Colour
		{/snippet}

		<span class="caption mb-2 inline-block">Click to assign a colour to this layer.</span>

		<div class="flex flex-wrap gap-0.5">
			{#each colorNames as colorOption}
				<Tooltip>
					{#snippet trigger()}
						<Trigger
							variant="square"
							size="sm"
							class={classNames(
								activeColorName === colorOption ? activeOptionClasses : '',
								optionClasses
							)}
							onclick={() => {
								activeColorName = colorOption;
							}}
						>
							<div
								class="h-6 w-6 rounded-full"
								style:background={theme.tokenNameToValue(colorOption, theme.currentTheme)}
							></div>
						</Trigger>
					{/snippet}
					<span class="sr-only">Color code:</span>
					{trimTokenName(colorOption)}
				</Tooltip>
			{/each}
		</div>
	</Popover>
{/if}
