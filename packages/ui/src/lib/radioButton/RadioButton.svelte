<script lang="ts">
	/**
	 * This provides a (round) radio-button component that can also be coloured and act as both a categorical color legend, and a control for which categories of things are displayed on a map or visualization.
	 *
	 * **Alternatives**: if representing a set of options that are not mutually exclusive, use the [Checkbox](./?path=/docs/ui-components-checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import Overlay from '../overlay/Overlay.svelte';

	/**
	 * Color of the radio button, as a string in any CSS color format
	 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
	 *  The color should be selected from the design system.
	 */
	export let color: string | undefined = undefined;

	/**
	 * `id` of the selected radio button in group.
	 */
	export let selectedId = '';

	/**
	 * String appearing next to the radio button.
	 */
	export let label: string;

	/**
	 * Value set as the `id` attribute of the `<input>` element (after the prefix "input-" is added). Also the value that will be assigned to `selectedId` if this item is selected.
	 */
	export let id: string;

	/**
	 * Name of group to which radio button is assigned.
	 */
	export let name: string | undefined = undefined;

	/**
	 * Boolean indicating whether the radio button is *disabled*.
	 * If it is disabled, then the user cannot change whether it is selected by interacting with it (either using the mouse or keyboard).
	 */

	export let disabled = false;

	/**
	 * Optional help text that appears in a tooltip when a user interacts with the tooltip trigger.
	 * It provides additional information intended to help the user decide whether or not to check the checkbox.
	 */
	export let hint = '';

	/**
	 * Optional text that appears next to the information icon (the letter "i" in a circle) in the tooltip trigger.
	 * It provides additional clues that help text is available (e.g. "More information", "About", "Help")
	 */
	export let hintLabel = '';

	let inputID = `input-${id}`;
</script>

<label class="flex items-center">
	<input
		id={inputID}
		class="form-radio"
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
		{disabled}
		style={color
			? `--theme-input-border: ${color}; --theme-input-border-selected: ${color}; --theme-input-background-active: ${color}; --tw-ring-color: ${color};`
			: ''}
	/>
	{#if label}
		<span class="form-label ml-2 font-normal">{label}</span>
	{/if}
	{#if $$slots.hint}
		<!-- An optional `<Overlay>` component to provide additional explanation. -->
		<slot name="hint" />
	{/if}
	{#if hint}
		<Overlay {hintLabel}>
			{hint}
		</Overlay>
	{/if}
</label>

<style>
	.form-radio:before {
		content: '';
		width: 0.65em;
		height: 0.65em;
		border-radius: 50%;
		transform: scale(0);
		box-shadow: inset 1em 1em var(--theme-input-background-active);
	}
	.form-radio:checked:before {
		transform: scale(1);
	}
</style>
