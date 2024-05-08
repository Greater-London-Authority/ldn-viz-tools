<script lang="ts">
	/**
	 * The `Select` component allows users to select an option form a drop-down list of alternatives.
	 * Our select element is a wrapper around ['Svelte Select'](https://github.com/rob-balfre/svelte-select).
	 * @component
	 */

	import { randomId } from '../utils/randomId';

	import SvelteSelect from 'svelte-select';
	import InputWrapper from '../input/InputWrapper.svelte';

	export let items: { [key: string]: any }[];

	export let id = randomId();
	export let name = '';
	export let placeholder = 'Select an option';
	export let disabled = false;
	export let error = '';
	export let hasError = !!error;

	export let labelField = 'label';

	// svelte-select options
	export let container: any = undefined;
	export let input: any = undefined;
	export let multiple = false;
	export let multiFullItemClearable = false;
	export let focused = false;
	export let value: any = null;
	export let filterText = '';
	export let placeholderAlwaysShow = false;
	export let itemFilter = (label: string, filterText: string, option: any) =>
		`${label}`.toLowerCase().includes(filterText.toLowerCase());
	export let groupBy: any = undefined;
	export let groupFilter = (groups: any) => groups;
	export let groupHeaderSelectable = false;
	export let itemId = 'value';
	export let loadOptions: any = undefined;
	export let containerStyles = '';
	export let filterSelectedItems = true;
	export let required = false;
	export let closeListOnChange = true;

	export let createGroupHeaderItem: any = undefined; // ?

	export let searchable = true;
	export let inputStyles = '';
	export let clearable = false;
	export let loading = false;
	export let listOpen = false;

	export let debounce: any = undefined;

	export let debounceWait = 300;
	export let hideEmptyState = false;
	export let inputAttributes = {};
	export let listAutoWidth = true;
	export let showChevron = true;
	export let listOffset = 5;
	export let hoverItemIndex = 0;
	export let floatingConfig = {};

	// We expose a justValue prop that is writable: the main svelte-select component has one that is read-only
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
			{hasError}
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
