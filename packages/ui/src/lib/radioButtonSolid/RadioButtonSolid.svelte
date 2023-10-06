<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { classNames } from '../utils/classNames';

	export let label = '';
	export let id: string;
	export let name: string | undefined;

	export let disabled = false;

	let inputID = `input-${id}`;

	const { selectedId } = getContext<{ selectedId: Writable<string> }>('selectedId');
</script>

<div class="w-full flex">
	<input
		id={inputID}
		type="radio"
		{name}
		bind:group={$selectedId}
		value={id}
		{disabled}
		class="peer absolute top-0 left-0 opacity-0"
	/>
	<label
		for={inputID}
		class={classNames(
			disabled
				? 'cursor-not-allowed bg-core-grey-200 !text-core-grey-400'
				: 'cursor-pointer bg-core-grey-100 hover:bg-core-grey-200 dark:bg-core-grey-700 dark:hover:bg-core-grey-600',
			'form-label flex flex-col justify-center items-center p-2 w-full ring-1 ring-white peer-checked:bg-core-blue-600 hover:peer-checked:bg-core-blue-600 peer-checked:text-white  dark:ring-core-grey-800'
		)}
	>
		<slot>{label}</slot>
	</label>
</div>
