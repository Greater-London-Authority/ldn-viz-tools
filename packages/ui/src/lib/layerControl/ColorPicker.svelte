<script lang="ts">
	import Trigger from '../overlay/Trigger.svelte';
	import Popover from '../popover/Popover.svelte';

	import { NoSymbol } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import { theme } from '../theme/themeState.svelte';

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

	const swatchClasses =
		'flex h-8 w-8 items-center justify-center rounded-full bg-color-surface hover:ring-2 hover:ring-color-border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-interactive-focus';

	const activeSwatchClasses = '!ring-2 !ring-color-border';
</script>

{#if disabled && !alwaysShowcolorChip}
	<Icon
		src={NoSymbol}
		theme="mini"
		class="h-6 w-6 cursor-not-allowed text-color-interactive-disabled"
		aria-hidden="true"
	/>
{:else if disabled && alwaysShowcolorChip}
	<div class="flex h-6 w-6 items-center justify-center" title="Layer color is not editable.">
		<div
			class="h-[22px] w-[22px] rounded-full border"
			style:background={activeColorName
				? theme.tokenNameToValue(activeColorName, theme.currentTheme)
				: ''}
		></div>
	</div>
{:else}
	<Popover>
		{#snippet trigger(props)}
			<Trigger {...props} size="xs" aria-label="Click to open {label} layer colour picker">
				<span class="flex h-6 w-6 items-center justify-center">
					<span
						class="h-[22px] w-[22px] rounded-full border"
						style:background={activeColorName
							? theme.tokenNameToValue(activeColorName, theme.currentTheme)
							: ''}
					></span>
				</span>
			</Trigger>
		{/snippet}

		{#snippet title()}
			Colour
		{/snippet}

		<span class="caption-sm mb-2 inline-block">Click to assign a colour to this layer.</span>

		<div class="flex flex-wrap gap-1" role="group" aria-label="{label} layer colours">
			{#each colorNames as colorOption}
				<button
					type="button"
					aria-label={trimTokenName(colorOption)}
					aria-pressed={activeColorName === colorOption}
					class={classNames(
						swatchClasses,
						activeColorName === colorOption ? activeSwatchClasses : ''
					)}
					onclick={() => {
						activeColorName = colorOption;
					}}
				>
					<span
						class="h-6 w-6 rounded-full"
						style:background={theme.tokenNameToValue(colorOption, theme.currentTheme)}
					></span>
				</button>
			{/each}
		</div>
	</Popover>
{/if}
