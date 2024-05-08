<script lang="ts">
	/**
	 * This provides a (round) radio-button component that can also be coloured and act as both a categorical color legend, and a control for which categories of things are displayed on a map or visualization.
	 *
	 * **Alternatives**: if representing a set of options that are not mututally exclusive, use the [Checkbox](./?path=/docs/ui-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-checkboxgroup--documentation) rather than the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation).
	 * @component
	 */

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
	 * String appearing next to the radio buton.
	 */
	export let label: string;

	/**
	 * Value set as the `id` attribute of the `<input>` element (after the prefix "input-" is added). Also the value that will be assigned to `selectedId` if this item is selected.
	 */
	export let id: string;

	/**
	 * Name of group to which radio button is assigned.
	 */
	export let name: string | undefined;

	/**
	 * Boolean indicating whether the radio button is *disabled*.
	 * If it is disabled, then the user cannot change whether it is selected by interacting with it (either using the mouse or keyboard).
	 */

	export let disabled = false;

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
			? `--border-color: ${color}; --background-color: ${color}; --tw-ring-color: ${color}`
			: ''}
	/>
	<span class="form-label mx-2">{label}</span>
</label>

{#if color}
	<style>
		.form-radio,
		.dark .form-radio {
			color: var(--border-color);
			border-color: var(--border-color);
			border-width: 2px;
		}

		.dark .form-radio:checked {
			background-color: var(--background-color);
		}

		.form-radio:disabled {
			@apply border-core-grey-300 cursor-not-allowed;
		}
	</style>
{/if}
