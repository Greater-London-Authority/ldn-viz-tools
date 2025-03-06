<script lang="ts">
	/**
	 * The `RadioButtonSolid` component provides a set of buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](.-components-radiobuttons-radiobuttongroup--documentation).
	 * @component
	 */

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	/**
	 * String appearing next to the radio button.
	 */
	export let label = '';

	/**
	 * Value that will be assigned to `selectedId` of parent `<RadioButtonGroupSolid>` if this item is selected.
	 */
	export let id: string;

	/**
	 * Name of group to which radio button is assigned.
	 */
	export let name: string | undefined;

	/**
	 * if `true` then user cannot interact with this button to select it
	 */
	export let disabled = false;

	let inputID = `input-${name || ''}-${id}`;

	const { selectedId } = getContext<{ selectedId: Writable<string> }>('selectedId');
</script>

<div class="w-full flex">
	<input
		id={inputID}
		type="radio"
		{name}
		bind:group={$selectedId}
		value={id}
		aria-disabled={disabled}
		{disabled}
		class="peer absolute top-0 left-0 opacity-0"
	/>
	<label
		for={inputID}
		class={classNames(
			disabled
				? 'cursor-not-allowed !bg-color-input-background-disabled !text-color-text-disabled '
				: 'cursor-pointer bg-color-input-background-off text-color-text-primary',
			'form-label flex flex-col justify-center items-center text-center p-2 min-h-10 w-full ring-1 ring-color-container-level-1 hover:bg-color-input-background-hover peer-checked:text-color-static-white peer-checked:bg-color-input-background-on'
		)}
	>
		<!-- contents of the radio button (name and/or icon) -->
		<slot>{label}</slot>
	</label>
</div>
