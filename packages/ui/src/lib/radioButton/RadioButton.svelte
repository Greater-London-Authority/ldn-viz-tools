<script lang="ts">
	import { classNames } from '../utils/classNames';

	export let color = 'black';
	export let selectedId = '';
	export let label: string;
	export let id: string;
	export let name: string | undefined;

	export let disabled = false;

	let inputID = `input-${id}`;

	let radioClass: string;
	let labelClass: string;

	// TODO: refactor these 'default' color classes into config

	$: radioClass = classNames(
		'h-5 w-5 mr-2 border-2',
		'border-core-grey-200 focus:ring-core-blue-600',
		'dark:border-core-grey-500 dark:bg-core-grey-600 dark:focus:ring-offset-core-grey-800 dark:text-core-grey-800',
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
		class={radioClass}
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
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
