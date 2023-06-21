<script lang="ts">
	import { classNames } from '../utils/classNames';
	export let checked = false;
	export let label: string;
	export let id: string;

	export let disabled = false;

	let inputID = `input-${id}`;

	const lightClasses = 'border-core-grey-200 checked:bg-core-blue-600 focus:ring-core-blue-600';

	const darkClasses =
		'dark:border-core-grey-500 dark:bg-core-grey-600 dark:focus:ring-offset-core-grey-800 dark:checked:bg-core-blue-600';

	const disabledClasses = '!bg-core-grey-300';

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
	<input id={inputID} class={CheckboxClass} type="checkbox" bind:checked {disabled} />
	{label}
</label>
