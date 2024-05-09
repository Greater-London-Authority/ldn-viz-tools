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
	 * Note that a different field can be used in place of `label`, if this name is provided as the `labelField` prop.
	 */
	export let items: { [key: string]: any }[];

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

	/**
	 * Name of the field of entries in `items` that should be used as the label.
	 */
	export let labelField = 'label';

	/**
	 * ???
	 */
	export let container: any = undefined;

	/**
	 * ???
	 */
	export let input: any = undefined;

	/**
	 * if `true`, then multiple items can be selected.
	 */
	export let multiple = false;

	/**
	 * if `false`, there is a cross-shaped symbol on each selected item to un-select it; if `true`, there is no cross symbol, and clicking anywhere on item un-selects it.
	 */
	export let multiFullItemClearable = false;

	/**
	 * if `true` element has focus.
	 */
	export let focused = false;

	/**
	 * Array containing the entries of `items` array that are currently selected. An array of just values is available as `justValues`.
	 */
	export let value: any = null;

	/**
	 * text used to filter `items`
	 */
	export let filterText = '';

	/**
	 * If `true` and `multiple` is also `true`, then the placeholder text is always displayed, rather than disappearing when first item is selected.
	 */
	export let placeholderAlwaysShow = false;

	export let itemFilter = (label: string, filterText: string, option: any) =>
		`${label}`.toLowerCase().includes(filterText.toLowerCase());
	export let groupBy: any = undefined;
	export let groupFilter = (groups: any) => groups;

	/**
	 * determines whether header items in `items` are selectable.
	 */
	export let groupHeaderSelectable = false;

	/**
	 * `id` of selected item.
	 */
	export let itemId = 'value';

	/**
	 * function that can be used to asynchronously load items.
	 */
	export let loadOptions: any = undefined;

	/**
	 * inline styles to be added to container.
	 */
	export let containerStyles = '';

	/**
	 * ???
	 */
	export let filterSelectedItems = true;

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
	 * inline styles to be applied to input.
	 */
	export let inputStyles = '';

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
	export let inputAttributes = {};

	/**
	 * if `false` will ignore width of select
	 */
	export let listAutoWidth = true;

	/**
	 * determines whether downwards pointing chevron is displayed in the right of the control
	 */
	export let showChevron = true;
	export let listOffset = 5;
	export let hoverItemIndex = 0;
	export let floatingConfig = {};

	/**
	 * array containing the `value`s of selected items; unlike the prop exposed by the `svelte-select` component it is writable
	 */
	export let justValue: any;

	// respond to external change in justValue
	const applyChangeFromjustValue = (newjustValue: any) => {
		if (!value || newjustValue != value[itemId]) {
			value = items.find((f) => f[itemId] === newjustValue);
		}
	};
	$: applyChangeFromjustValue(justValue);

	// respond to changes in selection
	const updatejustValueFromSelection = (newValue: { [key: string]: any }) => {
		const newjustValue = newValue && newValue[itemId];
		if (justValue !== newjustValue) {
			justValue = newjustValue;
		}
	};
	$: updatejustValueFromSelection(value);
</script>

<InputWrapper {...$$restProps} {id} {disabled} {error}>
	<div>
		<SvelteSelect
			{name}
			label={labelField}
			class="form-select"
			{items}
			{container}
			{input}
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
			{itemId}
			{loadOptions}
			{containerStyles}
			hasError={!!error}
			{filterSelectedItems}
			{required}
			{closeListOnChange}
			{createGroupHeaderItem}
			{searchable}
			{inputStyles}
			{clearable}
			{loading}
			{listOpen}
			{debounce}
			{debounceWait}
			{hideEmptyState}
			{inputAttributes}
			{listAutoWidth}
			{showChevron}
			{listOffset}
			{hoverItemIndex}
			{floatingConfig}
			{disabled}
			{placeholder}
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

{#if !!true}
	<style>
		:root {
			--bg-color-dark: #343434;
		}
		.form-select,
		.dark .form-select {
			--border-radius: 0px;
			--placeholder-color: #aeb1b4;
			--item-hover-bg: #3787d2;
			--item-is-active-bg: #2566a2;
			--item-hover-color: #ffffff;
			--border-focused: #3787d2 1px solid;
			--list-border-radius: 0px;
			--item-first-border-radius: 0px;
		}

		.dark .form-select {
			--border-radius: 0px;
			--background: var(--bg-color-dark);
			--border: 1px solid var(--bg-color-dark);
			--border-hover: 1px solid #515a5e;
			--error-background: var(--bg-color-dark);
			--disabled-background: #868b8e;
			--disabled-border-color: var(--bg-color-dark);
			--disabled-placeholder-color: #aeb1b4;
			--list-background: var(--bg-color-dark);
			--multi-item-color: var(--bg-color-dark);
		}
	</style>
{/if}
