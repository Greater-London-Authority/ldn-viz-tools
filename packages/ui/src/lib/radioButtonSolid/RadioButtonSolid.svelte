<script lang="ts">
	/**
	 * The `RadioButtonSolid` component provides a set of buttons for switching between tabs or selecting one option from a small number of alternatives.
	 *
	 * **Alternatives**: consider using the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation).
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
		{disabled}
		class="peer absolute top-0 left-0 opacity-0"
	/>
	<label
		for={inputID}
		class={classNames(
			disabled
				? 'cursor-not-allowed bg-color-input-background-disabled !text-color-text-disabled hover:bg-color-input-background-disabled'
				: 'cursor-pointer bg-color-action-background-secondary text-color-text-primary',
			'form-label flex flex-col justify-center items-center p-2 w-full ring-1 ring-color-container-level-1 hover:bg-color-action-background-primary hover:text-color-static-white peer-checked:text-color-static-white peer-checked:bg-color-action-background-primary'
		)}
	>
		<!-- contents of the radio button (name and/or icon) -->
		<slot>{label}</slot>
	</label>
</div>
