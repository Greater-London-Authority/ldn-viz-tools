<script lang="ts">
	import type { InputProps } from '../input/types';
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	/**
	 * This provides a (round) radio-button component that can also be coloured and act as both a categorical color legend, and a control for which categories of things are displayed on a map or visualization.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	interface Props extends Omit<InputProps, 'children'> {
		/**
		 * Color of the radio button, as a string in any CSS color format
		 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
		 *  The color should be selected from the design system.
		 */
		color?: string | undefined;
		/**
		 * `id` of the selected radio button in group.
		 */
		selectedId?: string;
	}

	let {
		color = undefined,
		selectedId = $bindable(),
		label,
		id,
		name = undefined,
		disabled = false,
		hint = '',
		hintLabel = '',
		customOverlay = undefined
	}: Props = $props();

	let inputID = $derived(`input-${id}`);
</script>

<label class="flex items-center">
	<input
		id={inputID}
		class="form-radio"
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
		aria-disabled={disabled}
		{disabled}
		style={color
			? `--mode-input-border: ${color}; --mode-input-border-selected: ${color}; --mode-input-background-active: ${color}; --tw-ring-color: ${color};`
			: ''}
	/>
	{#if label}
		<span class="form-label ml-2 font-normal">{label}</span>
	{/if}

	{#if hint}
		<Overlay>
			{#snippet trigger(props)}
				<Trigger {...props} size="xs" {hintLabel} />
			{/snippet}
			{hint}
		</Overlay>
	{/if}

	{#if customOverlay}
		{@render customOverlay()}
	{/if}
</label>

<style>
	.form-radio:before {
		content: '';
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		transform: scale(0);
		box-shadow: inset 1em 1em var(--mode-input-background-active);
	}
	.form-radio:checked:before {
		transform: scale(1);
	}
</style>
