<script lang="ts">
	import type { ComponentProps } from 'svelte';

	/**
	 * The `Select` component allows users to select an option from a drop-down list of alternatives.
	 * Our select element is a wrapper around ['svelecte'](https://github.com/mskocik/svelecte).
	 * Many of the props exposed by this component are provided by `svelecte`, so you may find it helpful to consult its [documentation](https://svelecte.vercel.app/).
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
	import { randomId } from '../utils/randomId';

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
		value = $bindable(),

		//svelecte stuff
		options,
		reorderable,
		name,
		inputId,
		required,
		optionResolver,
		valueAsObject,
		parentValue,
		valueField = 'value',
		labelField = 'label',
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

		onChange,
		onFocus,
		onBlur,
		onCreateOption,
		onCreateFail,
		onEnterKey,
		onFetch,
		onFetchError,
		onInvalidValue,
		readSelection,

		// input wrapper stuff
		id = randomId(),
		disabled,
		error,

		...restProps
	}: Props = $props();

	let dndzone = $derived(reorderable ? dnd : undefined);

	// The label points at `id`, so the input takes it unless `inputId` is set
	let controlId = $derived(inputId || id);

	// The error replaces the description, so the input is described by whichever shows
	let errorId = $derived(error ? `${id}-error` : undefined);
	let descriptionId = $derived(restProps.description ? `${id}-description` : undefined);
	let i18nWithDescription = $derived({
		...i18n,
		aria_describedby:
			errorId ?? descriptionId ?? (i18n as { aria_describedby?: string })?.aria_describedby ?? ''
	});

	// svelte-ignore state_referenced_locally
	overrideItemIdKeyNameBeforeInitialisingDndZones(valueField ?? 'value');
</script>

<InputWrapper {...restProps} id={controlId} {errorId} {descriptionId} {disabled} {error}>
	<Svelecte
		bind:value
		{options}
		{name}
		inputId={controlId}
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
		i18n={i18nWithDescription}
		{dndzone}
		{anchor_element}
		{controlClass}
		{dropdownClass}
		{optionClass}
		{disabled}
		{readSelection}
		{onChange}
		{onFocus}
		{onBlur}
		{onCreateOption}
		{onCreateFail}
		{onEnterKey}
		{onFetch}
		{onFetchError}
		{onInvalidValue}
	/>
</InputWrapper>

{#if true}
	<style>
		/* See: https://svelecte.vercel.app/theme */
		.form-select.svelecte {
			/** Custom css variables **/
			/* 38px inside the 1px border: 40px in all, as an input and the default button */
			--sv-min-height: 38px;
			--sv-bg: var(--color-surface);
			--sv-color: var(--color-text);
			--sv-disabled-bg: var(--color-interactive-disabled-muted);
			--sv-border: var(--color-border-muted) 0px solid;
			--sv-border-radius: 0px;
			--sv-general-padding: var(--spacing-2) var(--spacing-3);
			/* The gap between selected items. Svelecte also pads the selection with it,
			   which the rule below overrides. */
			--sv-selection-gap: var(--spacing-1);
			/* The selected value starts where the options' text does */
			--sv-selection-wrap-padding: 0;
			--sv-control-bg: var(--sv-bg);

			/* Options use the control's padding: 8px + 24px + 8px = 40px */
			--sv-item-wrap-padding: var(--spacing-2) var(--spacing-3);
			--sv-item-selected-bg: var(--color-interactive-primary-muted);
			--sv-item-btn-color: var(--color-text);
			--sv-item-btn-color-hover: var(--color-text-muted);
			--sv-item-btn-bg: var(--color-surface-muted);
			--sv-item-btn-bg-hover: var(--color-interactive-primary-muted-hover);

			--sv-icon-color: var(--color-text-muted);
			--sv-icon-color-hover: var(--color-text);
			--sv-icon-bg: transparent;
			--sv-icon-size: 20px;
			--sv-separator-bg: var(--color-border-wash);
			--sv-btn-border: 0;
			--sv-placeholder-color: var(--color-text-wash);

			--sv-dropdown-bg: var(--sv-bg);
			--sv-dropdown-offset: var(--spacing-2);
			--sv-dropdown-border: var(--color-border-wash) 1px solid;
			--sv-dropdown-width: auto;
			--sv-dropdown-shadow: var(--elevation-3);
			--sv-dropdown-height: 320px;

			--sv-dropdown-active-bg: var(--color-interactive-primary-muted);
			--sv-dropdown-selected-bg: var(--color-interactive-primary-muted-active);

			--sv-create-kbd-border: var(--color-border-wash) 1px solid;
			--sv-create-kbd-bg: var(--color-surface);
			--sv-create-disabled-bg: var(--color-interactive-disabled-muted);
			--sv-loader-border: var(--color-border-wash) 2px solid;
		}

		/* Reset allows use of form-select class elsehwere if needed */
		.form-select.svelecte {
			padding: 0;
		}

		/* The dropdown is placed inside the control's border; move it out by the
		   border's width so its edges, and its options' text, line up with the
		   control's */
		.form-select.svelecte .sv_dropdown {
			left: -1px;
			width: calc(100% + 2px);
		}

		/* The selection has the input's padding: the border sits inside the 8px */
		.form-select.svelecte .sv-control--selection {
			padding: calc(var(--spacing-2) - 1px) var(--spacing-3);
		}

		/* Override svelecte */
		.form-select.svelecte .sv-item--wrap.in-dropdown:hover {
			background-color: var(--color-interactive-primary-muted);
		}

		/* Stop active and selected having same color */
		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active.is-selected,
		.form-select.svelecte .sv-item--wrap.in-dropdown.sv-dd-item-active.is-selected:hover {
			background-color: var(--color-interactive-selected);
			color: var(--color-static-white);
		}

		.form-select.svelecte .in-dropdown.is-selected,
		.form-select.svelecte .in-dropdown.is-selected:hover {
			background-color: var(--color-interactive-selected);
			color: var(--color-static-white);
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
			border: var(--color-border-wash) 1px solid;
			border-right: none;
			padding-right: var(--spacing-2);
		}

		.form-select.svelecte .sv-item--container .sv-item--btn {
			border: var(--color-border-wash) 1px solid;
		}

		/* Selected items in a multi-select are body-sm, so an item and its
		   border fit the 24px line and the control stays 40px */
		.form-select.svelecte .sv-item--wrap.is-multi {
			background-color: var(--color-surface);
			font-size: var(--body-sm-font-size);
			line-height: var(--body-sm-line-height);
		}

		/* States */
		.form-select.svelecte.has-error {
			border: var(--color-interactive-error) 1px solid;
		}

		.form-select.svelecte:hover {
			border: var(--color-interactive-primary-hover) 1px solid;
		}

		/* Matches the focus style of the other form fields in system.css */
		.form-select.svelecte.is-focused {
			border: var(--color-interactive-focus) 1px solid;
			box-shadow: 0 0 0 1px var(--color-interactive-focus);
		}

		.form-select.svelecte.is-disabled {
			--sv-placeholder-color: var(--color-interactive-disabled);
		}

		.form-select.svelecte.is-disabled:hover {
			cursor: not-allowed;
			border: var(--color-border-muted) 1px solid;
		}
	</style>
{/if}
