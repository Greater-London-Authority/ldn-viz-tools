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

	/**
	 * If `true`, the user will not be able to interact with the Switch to download data.
	 */

	export let disabled = false;

	/**
	 * Value set as the `name` attribute of the hidden `<input>` element (optional, but required if providing value with a form submission)
	 */
	export let name = '';

	/**
	 * Determines whether field is required.
	 */
	export let required = false;

	/**
	 * Text displayed beside the switch.
	 */
	export let label = '';

	export let checked = false;

	const checkedStore = writable(checked);

	const {
		elements: { root, input },
		options: { disabled: disabledStore, name: nameStore, required: requiredStore }
	} = createSwitch({ disabled, checked: checkedStore });

	$: $disabledStore = disabled;
	$: $nameStore = name;
	$: $requiredStore = required;

	$: toggledExternally(checked);
	const toggledExternally = (newChecked: boolean) => {
		console.log('Toggled externally:', $checkedStore, checked);

		if ($checkedStore != newChecked) {
			$checkedStore = newChecked;
		}
	};

	$: console.log('checkedStore:', $checkedStore);
	$: toggledInternally($checkedStore);
	const toggledInternally = (newStoreValue: boolean) => {
		console.log('Toggled internally:', $checkedStore, checked);
		if (newStoreValue != checked) {
			checked = newStoreValue;
			console.log('Checked ins now:', checked);
		}
	};
</script>

<div class="flex items-center">
	<label class="pr-4 leading-none text-black" for="airplane-mode" id="airplane-mode-label">
		{label}
	</label>
	<button
		{...$root}
		use:root
		class="relative h-6 cursor-default rounded-full bg-core-grey-200 transition-colors data-[state=checked]:bg-core-blue-600 w-11 p-0.5"
		id="airplane-mode"
		aria-labelledby="airplane-mode-label"
	>
		<span
			class={classNames(
				'thumb w-5 h-5 block rounded-full transition',
				disabled ? 'bg-core-grey-100' : 'bg-white'
			)}
			style:transform={checked ? `translate(20px, 0px)` : ''}
		/>
	</button>
	<input {...$input} use:input />
</div>
