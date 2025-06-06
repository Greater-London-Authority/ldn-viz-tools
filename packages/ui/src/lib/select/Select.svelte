<script lang="ts">
	/**
	 * The `Select` component allows users to select an option form a drop-down list of alternatives.
	 * Our select element is a wrapper around ['Svelte Select'](https://github.com/rob-balfre/svelte-select).
	 * Many of the props exposed by this component are provided by `svelte-select`, so you may find it helpful to consult its documentation and [list of examples](https://svelte-select-examples.vercel.app/examples).
	 *
	 * Notably, this wrapper implements a `justValues` prop that can be bound to, and the `InputWrapper` chrome (label, description, tooltip, error, etc.)
	 * @component
	 */

	import { randomId } from '../utils/randomId';

	import SvelteSelect from 'svelte-select';
	import InputWrapper from '../input/InputWrapper.svelte';

	/**
	 * Each element of this array represents an available option, and is an object with the properties:
	 * * `value` (string) - the value that is stored in `justValue` if this item is selected
	 * * `label` (string) - the text displayed in the drop-down list of options
	 *
	 * Note that a different field can be used in place of `label`, if this name is provided as the `itemLabelField` prop.
	 */
	export let items: { [key: string]: any }[];

	/**
	 * Name of the field of entries in `items` that should be used as the *label*.
	 */
	export let itemLabelField = 'label';

	/**
	 * Name of the field of entries in `items` that should be used as the *value* recorded in `justValue`.
	 */
	export let itemValueField = 'value';

	/**
	 * if `true`, then multiple items can be selected.
	 */
	export let multiple = false;

	/**
	 * Array containing the entries of `items` array that are currently selected. An array of just values is available as `justValues`.
	 */
	export let value: any = null;

	/**
	 * array containing the `value`s of selected items; unlike the prop exposed by the `svelte-select` component it is writable
	 */
	export let justValue: any = undefined;

	/**
	 * The `id` of the `<input>` element: defaults to a randomly-generated value.
	 */
	export let id = randomId();

	/**
	 * `name` attribute assigned to hidden input, used in form submissions
	 */
	export let name = '';

	/**
	 * Placeholder text displayed before any options are selected.
	 */
	export let placeholder = 'Select an option';

	/**
	 * If `true`, then users are prevented from interacting with the control.
	 */
	export let disabled = false;

	/**
	 * Message to be displayed below the control in red text (replacing description).
	 * If set, then the border of the control` is also red.
	 */
	export let error = '';

	// svelte-select options

	/**
	 * if `false`, there is a cross-shaped symbol on each selected item to un-select it; if `true`, there is no cross symbol, and clicking anywhere on item un-selects it.
	 */
	export let multiFullItemClearable = false;

	/**
	 * if `true` element has focus.
	 */
	export let focused = false;

	/**
	 * text used to filter `items`
	 */
	export let filterText = '';

	/**
	 * If `true` and `multiple` is also `true`, then the placeholder text is always displayed, rather than disappearing when first item is selected.
	 */
	export let placeholderAlwaysShow = false;

	export let itemFilter = (label: string, filterText: string) =>
		`${label}`.toLowerCase().includes(filterText.toLowerCase());
	export let groupBy: any = undefined;
	export let groupFilter = (groups: any) => groups;

	/**
	 * determines whether header items in `items` are selectable.
	 */
	export let groupHeaderSelectable = false;

	/**
	 * function that can be used to asynchronously load items.
	 */
	export let loadOptions: any = undefined;

	/**
	 * determines whether field is required.
	 */
	export let required = false;

	/**
	 * if `true`, then the list of options will close when `on:change` event fires.
	 */
	export let closeListOnChange = true;

	export let createGroupHeaderItem: any = undefined; // ?

	/**
	 * if `false` then filtering of options list is disabled.
	 */
	export let searchable = true;

	/**
	 * determines whether selected values can be cleared.
	 */
	export let clearable = false;

	/**
	 * if `true` then loading icon is displayed.
	 */
	export let loading = false;

	/**
	 * controls whether list of options is currently open.
	 */
	export let listOpen = false;

	export let debounce: any = undefined;

	/**
	 * debounce wait in milliseconds.
	 */
	export let debounceWait = 300;

	/**
	 * if `true`, then hide list of options when it is empty.
	 */
	export let hideEmptyState = false;

	/**
	 * if `false`, then Chevron is not shown.
	 */
	export let showChevron = true;

	/**
	 * if `false` will ignore width of select
	 */
	export let listAutoWidth = true;

	export let listOffset = 5;

	export let floatingConfig = {};

	// respond to external change in justValue
	const applyChangeFromjustValue = (newjustValue: any) => {
		if (multiple) {
			// in this case, newjustValue and newValue are both arrays
			if (
				!value ||
				JSON.stringify(newjustValue) != JSON.stringify(value.map((v: any) => v[itemValueField]))
			) {
				value = items.filter((f) => (newjustValue ?? []).includes(f[itemValueField]));
			}
		} else {
			if (value === null || value === undefined || newjustValue != value[itemValueField]) {
				value = items.find((f) => f[itemValueField] === newjustValue);
			}
		}
	};
	$: applyChangeFromjustValue(justValue);

	// respond to changes in selection
	const updatejustValueFromSelection = (newValue: { [key: string]: any }) => {
		if (multiple) {
			// in this case, newjustValue and newValue are both arrays
			const newjustValue = newValue && newValue.map((v: any) => v[itemValueField]);
			if (JSON.stringify(justValue) !== JSON.stringify(newjustValue)) {
				justValue = newjustValue;
			}
		} else {
			const newjustValue = newValue && newValue[itemValueField];
			if (justValue !== newjustValue) {
				justValue = newjustValue;
			}
		}
	};
	$: updatejustValueFromSelection(value);
</script>

<InputWrapper {...$$restProps} {id} {disabled} {error}>
	<slot name="hint" slot="hint" />
	<div>
		<SvelteSelect
			{name}
			{id}
			label={itemLabelField}
			class="form-select"
			{items}
			{multiple}
			{multiFullItemClearable}
			{focused}
			bind:value
			{filterText}
			{placeholderAlwaysShow}
			{itemFilter}
			{groupBy}
			{groupFilter}
			{groupHeaderSelectable}
			itemId={itemValueField}
			{loadOptions}
			hasError={!!error}
			{required}
			{closeListOnChange}
			{createGroupHeaderItem}
			{searchable}
			{clearable}
			{loading}
			{listOpen}
			{debounce}
			{debounceWait}
			{hideEmptyState}
			{listAutoWidth}
			{listOffset}
			{floatingConfig}
			{disabled}
			{placeholder}
			{showChevron}
			on:change
			on:input
			on:focus
			on:blur
			on:clear
			on:loaded
			on:error
			on:filter
			on:hoverItem
		/>
	</div>
</InputWrapper>

{#if true}
	<style>
		/* See: https://github.com/rob-balfre/svelte-select/blob/master/docs/theming_variables.md */
		.form-select {
			--border: var(--theme-input-border) 1px solid;
			--border-focused: var(--theme-input-border-focussed) 1px solid;
			--border-hover: var(--theme-input-border-hover) 1px solid;
			--border-radius: 0;
			--placeholder-color: var(--theme-input-placeholder);
			--placeholder-opacity: 100%;
			--background: var(--theme-input-background);
			--chevron-color: var(--theme-input-icon);
			--chevron-icon-colour: var(--theme-input-icon);
			--clear-icon-color: var(--theme-input-icon);
			--disabled-background: var(--theme-input-background-disabled);
			--disabled-border-color: var(--theme-input-border-disabled);
			--disabled-color: var(--theme-input-label-disabled);
			--disabled-placeholder-color: var(--theme-ui-disabled);
			--disabled-placeholder-opacity: 100%;
			--error-background: var(--theme-input-background);
			--error-border: var(--theme-input-border-error) 1px solid;
			--icons-color: var(--theme-input-icon);
			--input-color: var(--theme-input-valuetext);
			--item-first-border-radius: 0;
			--item-hover-bg: var(--theme-input-background-hover);
			--item-is-active-bg: var(--theme-input-background-selected);
			--item-is-active-color: var(--theme-static-white);
			--item-is-not-selectable-color: var(--theme-text-disabled);
			--list-background: var(--theme-input-background);
			--list-border: var(--theme-input-border) 1px solid;
			--list-border-radius: 0;
			--list-empty-color: var(--theme-ui-background-empty);
			--list-z-index: 40;
			--multi-item-active-outline: var(--theme-ui-border-secondary);
			--multi-item-bg: var(--theme-input-background);
			--multi-item-border-radius: 0;
			--multi-item-clear-icon-color: var(--theme-input-icon);
			--multi-item-color: var(--theme-text-primary);
			--multi-item-disabled-hover-bg: var(--theme-input-background-disabled);
			--multi-item-disabled-hover-color: var(--theme-ui-disabled);
		}
	</style>
{/if}
