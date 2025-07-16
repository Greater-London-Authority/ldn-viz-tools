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

	// TODO: chek events forwared

	let {
		value = $bindable(undefined),

		//svelect stuff
		options,

		reorderable,

		name,
		inputId,
		required,
		//disabled,
		optionResolver,
		valueAsObject,
		parentValue,
		valueField,
		labelField,
		groupLabelField,
		groupItemsField,
		disabledField,
		placeholder,
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
		class={classes}
		{i18n}
		{dndzone}
		{anchor_element}
		{controlClass}
		{dropdownClass}
		{optionClass}
	/>
</InputWrapper>
