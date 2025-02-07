<script lang="ts">
	/**
	 * The `<Switch>` component provides a toggle switch as a Boolean input.
	 *
	 * **Alternatives**: consider using a [Checkbox](./?path=/docs/ui-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-checkboxgroup--documentation), or a [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation) (for a set of mutually-exclusive options).
	 *
	 * @component
	 */

	import { createSwitch } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';
	import { randomId } from '../utils/randomId';

	/**
	 * If `true`, the user will not be able to interact with the Switch to download data.
	 */
	export let disabled = false;

	/**
	 * Value set as the `name` attribute of the hidden `<input>` element (optional, but required if providing value with a form submission)
	 */
	export let name = '';

	export let id = randomId();

	/**
	 * Determines whether field is required.
	 */
	export let required = false;

	/**
	 * Text displayed beside the switch.
	 */
	export let label = '';

	/**
	 * Whether the checkbox is checked.
	 */
	export let checked = false;

	const checkedStore = writable(checked);

	/**
	 * The size of the switch.
	 */
	export let size: 'md' | 'sm' = 'md';

	/**
	 * Which side of the switch to display the label on.
	 */
	export let labelOn: 'left' | 'right' = 'right';

	const {
		elements: { root, input },
		options: { disabled: disabledStore, name: nameStore, required: requiredStore }
	} = createSwitch({ disabled, checked: checkedStore });

	$: $disabledStore = disabled;
	$: $nameStore = name;
	$: $requiredStore = required;

	$: toggledExternally(checked);
	const toggledExternally = (newChecked: boolean) => {
		if ($checkedStore != newChecked) {
			$checkedStore = newChecked;
		}
	};

	$: toggledInternally($checkedStore);
	const toggledInternally = (newStoreValue: boolean) => {
		if (newStoreValue != checked) {
			checked = newStoreValue;
		}
	};

	const translation = { md: '21px', sm: '15px' };
</script>

<div class="flex items-center">
	{#if labelOn === 'left'}
		<label class="form-label pr-2 leading-none text-color-input-label" for={id} id={`${id}-label`}>
			{label}
		</label>
	{/if}

	<button
		{...$root}
		use:root
		class={classNames(
			'relative h-6 cursor-default rounded-full bg-color-input-background-off transition-colors data-[state=checked]:bg-color-input-background-on',
			size === 'md' ? 'h-[24px] w-[44px]' : 'h-[16px] w-[30px]'
		)}
		{id}
		aria-labelledby={`${id}-label`}
	>
		<span
			class={classNames(
				'thumb block rounded-full transition ',
				size === 'md' ? 'w-[22px] h-[22px]' : 'w-[14px] h-[14px] ',
				disabled ? 'bg-color-input-background-disabled' : 'bg-color-input-background'
			)}
			style:transform={checked ? `translate(${translation[size]}, 0px)` : 'translate(1px, 0px)'}
		/>
	</button>
	<input {...$input} use:input />

	{#if labelOn === 'right'}
		<label class="form-label pl-2 leading-none text-color-input-label" for={id} id={`${id}-label`}>
			{label}
		</label>
	{/if}
</div>
