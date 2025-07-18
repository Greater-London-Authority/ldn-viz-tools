<script lang="ts">
	import type { ComponentProps } from 'svelte';

	/**
	 * The `Select` component allows users to select an option form a drop-down list of alternatives.
	 * Our select element is a wrapper around ['svelecte'](https://github.com/mskocik/svelecte).
	 * Many of the props exposed by this component are provided by `svelte-select`, so you may find it helpful to consult its [documentation](https://svelecte.vercel.app/).
	 *
	 * Notably, this wrapper applies the `InputWrapper` chrome (label, description, tooltip, error, etc.), and adds a Boolean `reorderable` prop.
	 * @component
	 */

	import Svelecte from 'svelecte';

	import {
		dndzone as dnd,
		overrideItemIdKeyNameBeforeInitialisingDndZones
	} from 'svelte-dnd-action';

	import InputWrapper from '../input/InputWrapper.svelte';
	import type { InputProps } from '../input/types';

	type SvelectComponentPropsType = ComponentProps<typeof Svelecte>;

	interface Props extends InputProps, SvelectComponentPropsType {
		/**
		 * If `true`, then selected items can be re-ordered by drag-and-drop.
		 */
		reorderable?: boolean;
	}

	// TODO: check events forwared
	// TODO: check relationship between inputID and id (wrapper) prop

	let {
		value = $bindable(undefined),

		//svelecte stuff
		options,
		reorderable,
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
		anchor_element,
		controlClass,
		dropdownClass,
		optionClass,

		// input wrapper stuff
		id,
		disabled,
		error,

		...restProps
	}: Props = $props();

	let dndzone = $derived(reorderable ? dnd : undefined);
	overrideItemIdKeyNameBeforeInitialisingDndZones(valueField ?? 'value');
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
		{placeholder}
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
		class={`form-select ${classes} ${error ? 'has-error' : ''}`}
		{i18n}
		{dndzone}
		{anchor_element}
		{controlClass}
		{dropdownClass}
		{optionClass}
		{disabled}
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

			--sv-dropdown-active-bg: var(--theme-input-background-hover);
			--sv-dropdown-selected-bg: var(--theme-input-background-selected);

			--sv-create-kbd-border: var(--theme-input-border) 1px solid;
			--sv-create-kbd-bg: var(--theme-input-background);
			--sv-create-disabled-bg: var(--theme-input-background-disabled);
			--sv-loader-border: var(--theme-ui-border-secondary) 2px solid;
		}

		/* Reset allows use of form-select class elsehwere if needed */
		.form-select.svelecte {
			padding: 0;
		}

		/* Override svelecte */
		.form-select.svelecte .sv-item--wrap.in-dropdown:hover {
			background-color: var(--theme-input-background-hover);
		}

		/* Stop active and selected having same color */
		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active.is-selected,
		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active.is-selected:hover {
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

		/* multiple selected items */
		.form-select.svelecte .sv-item--container > .sv-item--wrap.is-multi {
			border: var(--theme-input-border) 1px solid;
			border-right: none;
			padding-right: var(--spacing-xs);
		}

		.form-select.svelecte .sv-item--container .sv-item--btn {
			border: var(--theme-input-border) 1px solid;
		}

		.form-select.svelecte .sv-item--wrap.is-multi {
			background-color: var(--theme-input-background);
		}

		/* States */
		.form-select.svelecte.has-error {
			border: var(--theme-input-border-error) 1px solid;
		}

		.form-select.svelecte:hover {
			border: var(--theme-input-border-hover) 1px solid;
		}

		.form-select.svelecte:hover {
			border: var(--theme-input-border-focussed) 1px solid;
		}
	</style>
{/if}
