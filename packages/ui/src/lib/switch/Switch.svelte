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
	 * The size of the switch.
	 */
	export let size: 'md' | 'sm' = 'md';

	/**
	 * Which side of the switch to display the label on.
	 */
	export let labelOn: 'left' | 'right' = 'right';

	export let checked = writable(false);

	const {
		elements: { root, input },
		options: { disabled: disabledStore, name: nameStore, required: requiredStore }
	} = createSwitch({ disabled, checked });

	$: $disabledStore = disabled;
	$: $nameStore = name;
	$: $requiredStore = required;

	const translation = { md: '20px', sm: '15px' };
</script>

<div class="flex items-center">
	{#if labelOn === 'left'}
		<label class="pr-2 leading-none text-black dark:text-white" for={id} id={`${id}-label`}>
			{label}
		</label>
	{/if}

	<button
		{...$root}
		use:root
		class={classNames(
			'relative cursor-default rounded-full bg-core-grey-200 transition-colors data-[state=checked]:bg-core-blue-600 ',
			size === 'md' ? 'h-6 w-11 p-[1px]' : 'h-4 w-[30px] p-[1px]'
		)}
		{id}
		aria-labelledby={`${id}-label`}
	>
		<span
			class={classNames(
				'thumb block rounded-full transition border-core-grey-200 border',
				size === 'md' ? 'w-[22px] h-[22px]' : 'w-3.5 h-3.5 ',
				disabled ? 'bg-core-grey-100' : 'bg-white'
			)}
			style:transform={$checked ? `translate(${translation[size]}, 0px)` : ''}
		/>
	</button>
	<input {...$input} use:input />

	{#if labelOn === 'right'}
		<label class="pl-2 leading-none text-black dark:text-white" for={id} id={`${id}-label`}>
			{label}
		</label>
	{/if}
</div>
