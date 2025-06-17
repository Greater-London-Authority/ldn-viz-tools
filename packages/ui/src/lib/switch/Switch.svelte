<script lang="ts">
	import { classNames } from '../utils/classNames.js';
	import { randomId } from '../utils/randomId.js';
	import { Label, Switch } from 'bits-ui';

	export interface SwitchProps {
		/**
		 * If `true`, the user will not be able to interact with the Switch to download data.
		 */
		disabled?: boolean;
		/**
		 * Value set as the `name` attribute of the hidden `<input>` element (optional, but required if providing value with a form submission)
		 */
		name?: string;
		id?: any;
		/**
		 * Determines whether field is required.
		 */
		required?: boolean;
		/**
		 * Text displayed beside the switch.
		 */
		label?: string;
		/**
		 * Whether the checkbox is checked.
		 */
		checked?: boolean;
		/**
		 * The size of the switch.
		 */
		size?: 'md' | 'sm';
		/**
		 * Which side of the switch to display the label on.
		 */
		labelOn?: 'left' | 'right';
	}

	let {
		disabled = false,
		name = '',
		id = randomId(),
		required = false,
		label = '',
		checked = $bindable(false),
		size = 'md',
		labelOn = 'right'
	}: SwitchProps = $props();

	const switchRootClass = $derived(
		classNames(
			'bg-color-input-background-off data-[state=checked]:bg-color-input-background-on relative h-6 cursor-default rounded-full transition-colors',
			size === 'md' ? 'h-[24px] w-[44px]' : 'h-[16px] w-[30px]'
		)
	);

	// TODO replace color token with handle
	const switchThumbClass = $derived(
		classNames(
			'thumb block rounded-full transition',
			size === 'md' ? 'h-[22px] w-[22px]' : 'h-[14px] w-[14px]',
			disabled ? 'bg-color-input-label-disabled' : 'bg-color-input-background'
		)
	);

	// Does this need to be derived for the sake of the story? TO BE DISCUSSED
	const labelClass = $derived(
		classNames(
			'form-label text-color-input-label leading-none',
			labelOn === 'right' ? 'pl-2' : 'pr-2'
		)
	);

	const translation = { md: '21px', sm: '15px' };

	const translate = $derived(
		checked ? `translate(${translation[size]}, 0px)` : 'translate(1px, 0px)'
	);
</script>

<div class="flex items-center">
	{#if labelOn === 'left'}
		<Label.Root for={id} class={labelClass} id={`${id}-label`}>{label}</Label.Root>
	{/if}

	<Switch.Root class={switchRootClass} {id} {name} {required} {disabled} bind:checked>
		<Switch.Thumb class={switchThumbClass} style="transform: {translate}" />
	</Switch.Root>

	{#if labelOn === 'right'}
		<Label.Root for={id} class={labelClass} id={`${id}-label`}>{label}</Label.Root>
	{/if}
</div>
