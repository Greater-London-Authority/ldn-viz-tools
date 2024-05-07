<script context="module" lang="ts">
	export interface CheckboxProps {
		color: string;
		checked: boolean;
		indeterminate: boolean;
		label: string;
		id: string;
		disabled: boolean;
		hint: string;
		hintLabel: string;
	}
</script>

<script lang="ts">
	import Tooltip from '../tooltip/Tooltip.svelte';

	/** A hex string to add a color to the box - this should correspond to the design system colors. */
	export let color: CheckboxProps['color'] = '';
	export let checked: CheckboxProps['checked'] = false;
	export let indeterminate: CheckboxProps['indeterminate'] = false;
	export let label: CheckboxProps['label'];
	export let id: CheckboxProps['id'];
	export let disabled: CheckboxProps['disabled'] = false;
	export let hint: CheckboxProps['hint'] = '';
	export let hintLabel: CheckboxProps['hintLabel'] = '';

	let inputID = `input-${id}`;
</script>

<label class="flex items-center">
	<input
		id={inputID}
		name={id}
		class="form-checkbox"
		type="checkbox"
		bind:checked
		{disabled}
		{indeterminate}
		on:change
		style={color
			? `--border-color: ${color}; --background-color: ${color}; --tw-ring-color: ${color}`
			: ''}
	/>
	<span class="mx-2 form-label">{label}</span>
	{#if hint}
		<Tooltip {hintLabel}>
			{hint}
		</Tooltip>
	{/if}
</label>

{#if color}
	<style>
		.form-checkbox,
		.dark .form-checkbox {
			color: var(--border-color);
			border-color: var(--border-color);
			border-width: 2px;
		}

		.dark .form-checkbox:checked {
			background-color: var(--background-color);
		}

		.form-checkbox:disabled {
			@apply border-core-grey-300 cursor-not-allowed;
		}
	</style>
{/if}
