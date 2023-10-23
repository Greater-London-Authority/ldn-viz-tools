<script lang="ts">
	import Select from 'svelte-select';
	import InputWrapper from '../input/InputWrapper.svelte';

	export let items: { [key: string]: any }[];

	export let id: string;
	export let name = '';
	export let placeholder = 'Select an option';
	export let disabled = false;
	export let error = false;

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
	export let hasError = error;
	export let filterSelectedItems = true;
	export let required = false;
	export let closeListOnChange = true;

	export let createGroupHeaderItem: any = undefined; // ?
	export const getFilteredItems: any = undefined; // ?

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
</script>

<InputWrapper {...$$restProps} {id} {disabled} {error}>
	<div>
		<Select
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
			{getFilteredItems}
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

<!-- --background
--border
--border-focused
--border-hover
--border-radius
--border-radius-focused
--box-sizing
--chevron-background
--chevron-border
--chevron-color
--chevron-height
--chevron-icon-colour
--chevron-icon-width
--chevron-pointer-events
--chevron-width
--clear-icon-color
--clear-icon-width
--clear-select-color
--clear-select-focus-outline
--clear-select-height
--clear-select-margin
--clear-select-width
--disabled-background
--disabled-border-color
--disabled-color
--disabled-placeholder-color
--disabled-placeholder-opacity
--error-background
--error-border
--font-size
--group-item-padding-left
--group-title-border-color
--group-title-border-style
--group-title-border-width
--group-title-color
--group-title-font-size
--group-title-font-weight
--group-title-padding
--group-title-text-transform
--height
--icons-color
--indicators-bottom
--indicators-position
--indicators-right
--indicators-top
--input-color
--input-left
--input-letter-spacing
--input-margin
--input-padding
--internal-padding
--item-active-background
--item-color
--item-first-border-radius
--item-height
--item-hover-bg
--item-hover-color
--item-is-active-bg
--item-is-active-color
--item-is-not-selectable-color
--item-line-height
--item-padding
--item-transition
--list-background
--list-border
--list-border-radius
--list-empty-color
--list-empty-padding
--list-empty-text-align
--list-max-height
--list-position
--list-shadow
--list-z-index
--loading--margin
--loading-color
--loading-height
--loading-width
--margin
--max-height
--multi-item-active-outline
--multi-item-bg
--multi-item-border-radius
--multi-item-clear-icon-color
--multi-item-color
--multi-item-disabled-hover-bg
--multi-item-disabled-hover-color
--multi-item-gap
--multi-item-height
--multi-item-margin
--multi-item-outline
--multi-item-padding
--multi-max-width
--multi-select-input-margin
--multi-select-input-padding
--multi-select-padding
--padding
--placeholder-color
--placeholder-opacity
--selected-item-color
--selected-item-overflow
--selected-item-padding
--spinner-color
--spinner-height
--spinner-width
--value-container-overflow
--value-container-padding
--width -->
