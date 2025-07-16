<script lang="ts">
	/**
	 * The `CheckboxSolid` component provides a set of buttons for selecting multiple options from a small list.
	 * @component
	 */

	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	/**
	 * String appearing next to checkbox.
	 */
	export let label: string;

	/**
	 * Value set as the `id` attribute of the `<input>` element (defaults to randomly generated value).
	 */
	export let id = randomId();

	/**
	 * Value set as the `name` attribute of the `<input>` element (optional, but required if providing value with a form submission)
	 */
	export let name: string | undefined;

	/**
	 * If true, then the user cannot interact with this button to change whether it is *checked*.
	 */
	export let disabled = false;

	/**
	 * Boolean indicating whether the checkbox is currently *checked*.
	 * Can be bound to and modified from outside the component.
	 */
	export let checked = false;
</script>

<div class="w-full flex">
	<input
		{id}
		{name}
		type="checkbox"
		bind:checked
		aria-disabled={disabled}
		{disabled}
		on:change
		class="peer absolute top-0 left-0 opacity-0"
		{...$$restProps}
	/>

	<label
		for={id}
		class={classNames(
			disabled
				? 'cursor-not-allowed !bg-color-input-background-disabled !text-color-text-disabled '
				: 'cursor-pointer bg-color-input-background-off text-color-text-primary',
			'form-label flex flex-col justify-center items-center text-center p-2 min-h-11 w-full ring-1 ring-color-container-level-1 hover:bg-color-input-background-hover peer-checked:text-color-static-white peer-checked:bg-color-input-background-on',
			'peer-focus:ring-inset peer-focus:ring-offset-2 peer-focus:ring-offset-color-action-primary-focussed peer-focus:ring-2 peer-focus:outline-none peer-focus:ring-color-ui-background-primary'
		)}
	>
		<!-- contents of the checkbox button (name and/or icon) -->
		<slot>{label}</slot>
	</label>
</div>
