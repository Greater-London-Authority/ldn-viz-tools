<script lang="ts">
	/**
	 * The `RadioButtonSolid` component provides a set of buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](.-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import { Icon } from '@steeze-ui/svelte-icon';
	import { classNames } from '../utils/classNames';
	import type { RadioButtonSolidProps } from './types';

	let {
		selectedId = $bindable(''),
		label,
		id,
		name,
		disabled = false,
		icon,
		rawIcon,
		iconPlacement = 'above'
	}: RadioButtonSolidProps = $props();

	let inputID = `input-${name || ''}-${id}`;

	const labelClasses = $derived(
		classNames(
			disabled
				? '!bg-color-input-background-disabled !text-color-text-disabled cursor-not-allowed'
				: 'bg-color-input-background-off text-color-text-primary cursor-pointer',
			'form-label ring-color-container-level-1 hover:bg-color-input-background-hover peer-checked:text-color-static-white peer-checked:bg-color-input-background-on flex min-h-11 w-full flex-col items-center justify-center p-2 text-center ring-1',
			'peer-focus:ring-offset-color-action-primary-focussed peer-focus:ring-color-ui-background-primary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-inset peer-focus:ring-offset-2'
		)
	);

	const iconOrientationClasses = {
		above: 'h-5 w-5 mb-1',
		below: 'h-5 w-5 mt-1'
	};
</script>

{#snippet iconComponent()}
    {#if icon}
	<Icon
            src={icon}
            theme="mini"
            class={iconOrientationClasses[iconPlacement]}
            aria-hidden="true"
	/>
    {:else if rawIcon}
        <rawIcon class={iconOrientationClasses[iconPlacement]} aria-hidden="true" />
    {/if}
{/snippet}

<div class="flex w-full">
	<input
		id={inputID}
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
		aria-disabled={disabled}
		{disabled}
		class="peer absolute left-0 top-0 opacity-0"
	/>
	<label for={inputID} class={labelClasses}>
		<!-- contents of the radio button (name and/or icon) -->
		{#if (icon || rawIcon) && iconPlacement === 'above'}
                    {@render iconComponent()}
                    {label}
                {:else if (icon || rawIcon) && iconPlacement === 'below'}
                    {label}
                    {@render iconComponent()}
                {/if}
	</label>
</div>
