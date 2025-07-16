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
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';

	type SvelectComponentPropsType = ComponentProps<typeof Svelecte>;

	interface Props extends InputProps, SvelectComponentPropsType {}

	// TODO: chek events forwared

	let {
		value = $bindable(undefined),

		//svelect stuff
		options,

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
		//placeholder,
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

	const hint_render = $derived(hint);

	/*
	let propsForInputWrapper = $derived.by( () => {

		InputProps 
		return restProps.createFilter()

	} )

	*/

	type f = keyof InputProps;

	console.log();
</script>

<InputWrapper {...restProps} {id} {disabled} {error}>
	{#if hint}
		<Overlay>
			{#snippet trigger(props)}
				<Trigger {...props} size="xs" {hintLabel} />
			{/snippet}
			{hint}
		</Overlay>
	{/if}

	{#if customOverlay}
		{@render customOverlay()}
	{/if}

	<div>
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
			class={classes}
			{i18n}
			{dndzone}
			{anchor_element}
			{controlClass}
			{dropdownClass}
			{optionClass}
		/>
	</div>
</InputWrapper>

{#if true}{/if}
