<script lang="ts">
	/**
	 * The `<LayerControlGroup>` component provides a way to create a set of `<LayerControlGroup>` components defined by an array of objects.
	 *
	 * @component
	 */

	import Checkbox from '../checkBox/Checkbox.svelte';

	import { randomId } from '../utils/randomId';
	import LayerControl from './LayerControl.svelte';

	/**
	 * Each element of this array defines the control for a layer, and is an object with the properties:
	 * * `id` (string)
	 * * `label` (string) - the text displayed next to the checkbox
	 * * `hint` (string, optional) - help text to be displayed in tooltip
	 *
	 * * `hideColorControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 * * `hideOpacityControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 * * `hideSizeControl` (boolean) - if `true`, then the trigger to open the opacity control for this layer is not displayed
	 *
	 * * `disabled` (boolean, optional) - if `true`, users cannot change whether the checkbox is checked
	 * * `color` (string, optional) - color of the layer
	 * * `visible` (boolean) - whether the layer should be displayed (indicated by checked checkbox)
	 * * `opacity` (number between 0 and 1, inclusive) - the opacity of the layer
	 * * `size` (number) - size of marker used to display the point
	 */
	export let options: {
		id: string;
		label: string;
		hint?: string;

		disabled?: boolean;
		hideColorControl?: boolean;
		hideOpacityControl?: boolean;
		hideSizeControl?: boolean;
	}[] = [];

	type LayerControlGroupState = Record<
		string,
		{
			color: string;
			visible: boolean;
			opacity: number;
			size: number;
		}
	>;

	/**
	 * Object containing the state of the layers.
	 */
	export let state: LayerControlGroupState;

	/**
	 * if `true`, then the "Select all" control is not displayed.
	 */
	export let buttonsHidden = false;

	/**
	 * if `true`, then the trigger to open the color picker is not displayed for any layers
	 */
	export let hideColorControl = false;

	/**
	 * if `true`, then the trigger to open the opacity control is not displayed for any layers
	 */
	export let hideOpacityControl = false;

	/**
	 * if `true`, then the trigger to open the size control is not displayed for any layers
	 */
	export let hideSizeControl = false;

	/**
	 * Message to be displayed next to the checkbox that toggles the visibility of all layers.
	 */
	export let showAllLabel = 'Show all';

	let allCheckboxesCheckedOrDisabled: boolean;
	$: allCheckboxesCheckedOrDisabled = options.every((o) =>
		o.disabled ? true : state[o.id]?.visible
	);

	let noCheckboxesChecked: boolean;
	$: noCheckboxesChecked = !Object.values(state).some((o) => o.visible);

	const selectAll = () => {
		for (const o of options) {
			state[o.id].visible = o.disabled ? state[o.id].visible : true;
		}
	};

	const clearAll = () => {
		for (const o of options) {
			state[o.id].visible = o.disabled ? state[o.id].visible : false;
		}
	};

	const toggleAll = () => {
		if (!allCheckboxesCheckedOrDisabled) {
			selectAll();
		} else {
			clearAll();
		}
	};

	// construct list of controls which are in use
	let controlsInUse: ('color' | 'opacity' | 'size')[] = [];
	$: {
		controlsInUse = [];
		if (!hideColorControl && !options.every((l) => l.hideColorControl)) {
			controlsInUse.push('color');
		}
		if (!hideOpacityControl && !options.every((l) => l.hideOpacityControl)) {
			controlsInUse.push('opacity');
		}
		if (!hideSizeControl && !options.every((l) => l.hideSizeControl)) {
			controlsInUse.push('size');
		}
	}
</script>

<div class="flex flex-col space-y-1">
	{#if !buttonsHidden}
		<!--
			form="" should prevent this checkbox from being included in form
			submissions.
		-->
		<Checkbox
			id={randomId()}
			form=""
			label={showAllLabel}
			checked={allCheckboxesCheckedOrDisabled}
			indeterminate={!allCheckboxesCheckedOrDisabled && !noCheckboxesChecked}
			on:change={toggleAll}
		/>
	{/if}

	<div class={`flex flex-col space-y-1 ${buttonsHidden ? '' : 'pl-5'}`}>
		{#each options as option (option.id)}
			<LayerControl
				label={option.label}
				disabled={option.disabled}
				hint={option.hint}
				hideColorControl={hideColorControl || option.hideColorControl}
				hideOpacityControl={hideOpacityControl || option.hideOpacityControl}
				hideSizeControl={hideSizeControl || option.hideSizeControl}
				{controlsInUse}
				bind:state={state[option.id]}
			/>
		{/each}
	</div>
</div>
