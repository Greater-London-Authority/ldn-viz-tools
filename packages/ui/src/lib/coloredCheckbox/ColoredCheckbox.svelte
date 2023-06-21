<script lang="ts">
	import { classNames } from '../utils/classNames';
	export let color = 'black';
	export let checked = false;
	export let label: string;
	export let id: string;

	export let disabled = false;

	let inputID = `input-${id}`;

	const lightClasses = 'border-core-grey-200  focus:ring-core-blue-600';

	const darkClasses =
		'dark:border-core-grey-500 dark:bg-core-grey-600 dark:focus:ring-offset-core-grey-800';

	const disabledClasses = '!bg-core-grey-300 !border-core-grey-300';

	let CheckboxClass: string;
	let LabelClass: string;

	$: CheckboxClass = classNames(
		'h-5 w-5 mr-2 border',
		disabled === true ? `${disabledClasses} pointer-events-none` : '',
		lightClasses,
		darkClasses
	);

	$: LabelClass = classNames(
		'flex items-center mr-4',
		disabled === true ? 'text-core-grey-300' : 'text-core-grey-700 dark:text-white'
	);
</script>

<label class={LabelClass}>
	<input
		id={inputID}
		class={CheckboxClass}
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
