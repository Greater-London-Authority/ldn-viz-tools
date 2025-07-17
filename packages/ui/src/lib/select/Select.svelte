<script lang="ts">
	import type { ComponentProps } from 'svelte';

	/**
	 * The `Select` component allows users to select an option form a drop-down list of alternatives.
	 * Our select element is a wrapper around ['Svelte Select'](https://github.com/rob-balfre/svelte-select).
	 * Many of the props exposed by this component are provided by `svelte-select`, so you may find it helpful to consult its documentation and [list of examples](https://svelte-select-examples.vercel.app/examples).
	 *
	 * Notably, this wrapper implements a `justValues` prop that can be bound to, and the `InputWrapper` chrome (label, description, tooltip, error, etc.)
	 * @component
	 */

	import Svelecte from 'svelecte';

	import InputWrapper from '../input/InputWrapper.svelte';
	import type { InputProps } from '../input/types';

	type SvelectComponentPropsType = ComponentProps<typeof Svelecte>;

	interface Props extends InputProps, SvelectComponentPropsType {}

	// TODO: check events forwared

	let {
		value = $bindable(undefined),

		//svelect stuff
		options,

		name,
		inputId,
		required,
		optionResolver,
		valueAsObject,
		parentValue,
		valueField,
		labelField,
		groupLabelField,
		groupItemsField,
		disabledField,
		placeholder = 'Select an option',
		searchable,
		clearable,
		renderer,
		disableHighlight,
		highlightFirstItem,
		selectOnTab,
		resetOnBlur,
		resetOnSelect,
		closeAfterSelect,
		deselectMode,
		strictMode,
		multiple,
		max,
		collapseSelection,
		keepSelectionInList,
		creatable,
		creatablePrefix,
		allowEditing,
		keepCreated,
		delimiter,
		createFilter,
		createHandler,
		fetch,
		fetchProps,
		fetchCallback,
		fetchResetOnBlur,
		fetchDebounceTime,
		minQuery,
		lazyDropdown,
		positionResolver,
		virtualList,
		vlItemSize,
		searchProps,
		class: classes,
		i18n,
		dndzone,
		anchor_element,
		controlClass,
		dropdownClass,
		optionClass,

		// input wrapper stuff
		id,
		disabled,
		error,

		// overlays
		hint,
		hintLabel,
		customOverlay,

		...restProps
	}: Props = $props();
</script>

<InputWrapper {...restProps} {id} {disabled} {error}>
	<Svelecte
		bind:value
		{options}
		{name}
		{inputId}
		{required}
		{optionResolver}
		{valueAsObject}
		{parentValue}
		{valueField}
		{labelField}
		{groupLabelField}
		{groupItemsField}
		{disabledField}
		{searchable}
		{clearable}
		{renderer}
		{disableHighlight}
		{highlightFirstItem}
		{selectOnTab}
		{resetOnBlur}
		{resetOnSelect}
		{closeAfterSelect}
		{deselectMode}
		{strictMode}
		{multiple}
		{max}
		{collapseSelection}
		{keepSelectionInList}
		{creatable}
		{creatablePrefix}
		{allowEditing}
		{keepCreated}
		{delimiter}
		{createFilter}
		{createHandler}
		{fetch}
		{fetchProps}
		{fetchCallback}
		{fetchResetOnBlur}
		{fetchDebounceTime}
		{minQuery}
		{lazyDropdown}
		{positionResolver}
		{virtualList}
		{vlItemSize}
		{searchProps}
		class={`form-select ${classes}`}
		{i18n}
		{dndzone}
		{anchor_element}
		{controlClass}
		{dropdownClass}
		{optionClass}
		{disabled}
		{placeholder}
	/>
</InputWrapper>

{#if true}
	<style>
		/* See: https://svelecte.vercel.app/theme */
		.form-select.svelecte {
			/** Custom css varibales **/
			--sv-min-height: 42px;
			--sv-bg: var(--theme-input-background);
			--sv-color: var(--theme-input-valuetext);
			--sv-disabled-bg: var(--theme-input-background-disabled);
			--sv-border: var(--theme-input-border) 0px solid;
			--sv-border-radius: 0px;
			--sv-general-padding: var(--spacing-xs) var(--spacing-sm);
			--sv-control-bg: var(--sv-bg);

			--sv-item-wrap-padding: var(--spacing-sm) var(--spacing-xs);
			--sv-item-selected-bg: var(--theme-input-background-selected);
			--sv-item-btn-color: #000;
			--sv-item-btn-color-hover: #777;
			--sv-item-btn-bg: #efefef;
			--sv-item-btn-bg-hover: #ddd;

			--sv-icon-color: var(--theme-input-icon);
			--sv-icon-color-hover: #777;
			--sv-icon-bg: transparent;
			--sv-icon-size: 20px;
			--sv-separator-bg: var(--theme-ui-border-secondary);
			--sv-btn-border: 0;
			--sv-placeholder-color: var(--theme-input-placeholder);

			--sv-dropdown-bg: var(--sv-bg);
			--sv-dropdown-offset: var(--spacing-xs);
			--sv-dropdown-border: var(--theme-input-border) 1px solid;
			--sv-dropdown-width: auto;
			--sv-dropdown-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
			--sv-dropdown-height: 320px;

			--sv-dropdown-active-bg: var(--theme-input-background-active);
			--sv-dropdown-selected-bg: var(--theme-input-background-selected);

			--sv-create-kbd-border: var(--theme-input-border) 1px solid;
			--sv-create-kbd-bg: var(--theme-input-background);
			--sv-create-disabled-bg: var(--theme-input-background-disabled);
			--sv-loader-border: var(--theme-ui-border-secondary) 2px solid;

			/* OLD */
			/* 
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
			--multi-item-disabled-hover-color: var(--theme-ui-disabled); */
		}

		/* Reset allows use of form-select class elsehwere if needed */
		.form-select.svelecte {
			padding: 0;
		}

		/* Override svelecte */
		.form-select.svelecte .sv-item--wrap.in-dropdown:hover {
			background-color: var(--theme-input-background-hover);
		}

		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active,
		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active:hover {
			background-color: var(--theme-input-background-active);
			color: #fff;
		}

		.form-select.svelecte .sv-dropdown-scroll.has-items {
			padding: 0px;
		}

		.form-select.svelecte .sv-input--sizer:after,
		.form-select.svelecte .sv-input--text {
			padding: 0px;
		}
	</style>
{/if}
