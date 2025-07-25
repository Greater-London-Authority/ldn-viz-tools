<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';
	import type { CheckboxSolidProps } from './types.ts';

	/**
	 * The `<CheckboxSolid>` component provides a checkbox control as a Boolean input, styled as a button. It is intended to be used for selecting multiple options from a small list.
	 * The `<CheckboxGroupSolid>` component provides a way to create a set of `<CheckboxSolid>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButtonSolid](./?path=/docs/ui-components-radiobuttons-radiobuttongroupsolid--documentation).
	 * Consider using the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * Consider using a [Switch](./?path=/docs/ui-components-switch--documentation).
	 * @component
	 */

	let {
		id = randomId(),
		name = '',
		checked = $bindable(false),
		label = '',
		disabled = false,
		icon,
		rawIcon,
		iconPlacement = 'above',
		...restProps
	}: CheckboxSolidProps = $props();

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
		<rawIcon class={iconOrientationClasses[iconPlacement]} aria-hidden="true"></rawIcon>
	{/if}
{/snippet}

<div class="flex w-full">
	<input
		{id}
		{name}
		type="checkbox"
		bind:checked
		{disabled}
		aria-disabled={disabled}
		class="peer absolute left-0 top-0 opacity-0"
		{...restProps}
	/>

	<label for={id} class={labelClasses}>
		{#if (icon || rawIcon) && iconPlacement === 'above'}
			{@render iconComponent()}
			{label}
		{:else if (icon || rawIcon) && iconPlacement === 'below'}
			{label}
			{@render iconComponent()}
		{:else}
			{label}
		{/if}
	</label>
</div>
