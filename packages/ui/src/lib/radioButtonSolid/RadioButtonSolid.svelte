<script lang="ts">
	import { classNames } from '../utils/classNames';

	export let selectedId = '';
	export let label: string;
	export let id: string;
	export let name: string | undefined;

	export let disabled = false;

	let inputID = `input-${id}`;
</script>

<div class="w-1/3 relative">
	<input
		id={inputID}
		type="radio"
		bind:group={selectedId}
		{name}
		value={id}
		{disabled}
		class="peer absolute top-0 left-0 opacity-0"
	/>
	<label
		for={inputID}
		class={classNames(
			disabled
				? 'cursor-not-allowed bg-core-grey-200 !text-core-grey-400'
				: 'cursor-pointer bg-core-grey-100 hover:bg-core-grey-200 dark:bg-core-grey-700 dark:hover:bg-core-grey-900',
			'form-label flex justify-center items-center h-10 w-full ring-1 ring-white peer-checked:bg-core-blue-600 peer-checked:text-white  dark:ring-core-grey-800'
		)}
	>
		{label}
	</label>
</div>
