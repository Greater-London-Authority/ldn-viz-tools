<script lang="ts">
	import { classNames } from '../utils/classNames';
	export let color = 'black';
	export let checked = false;
	export let label: string;
	export let id: string;

	export let disabled = false;

	let inputID = `input-${id}`;

	let checkboxClass: string;
	let labelClass: string;

	$: checkboxClass = classNames(
		'h-5 w-5 mr-2 border-2',
		'border-core-grey-200  focus:ring-core-blue-600',
		'dark:border-core-grey-500 dark:bg-core-grey-600 dark:focus:ring-offset-core-grey-800',
		disabled === true ? `!border-core-grey-300 !bg-core-grey-300 pointer-events-none` : ''
	);

	$: labelClass = classNames(
		'flex items-center mr-4',
		disabled === true ? 'text-core-grey-300' : 'text-core-grey-700 dark:text-white'
	);
</script>

<label class={labelClass}>
	<input
		id={inputID}
		class={checkboxClass}
		type="checkbox"
		bind:checked
		{disabled}
		style="--border-color: {color}; --background-color: {color}; --tw-ring-color: {color}"
	/>
	{label}
</label>

<style>
	input {
		border-color: var(--border-color);
	}

	input:focus,
	.dark input:focus {
		color: var(--background-color);
	}

	input:checked,
	.dark input:checked {
		background-color: var(--background-color);
	}
</style>
