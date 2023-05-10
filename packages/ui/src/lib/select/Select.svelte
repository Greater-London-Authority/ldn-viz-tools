<script lang="ts">
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions
	} from '@rgossiaux/svelte-headlessui';

	import { createEventDispatcher } from 'svelte';

	export let options: { id: number | string; value: any; label: string }[];
	export let value: string | number | string[] | null | undefined;
	export let label: string | undefined = undefined;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	const classNames = (...classes: string[]) => {
		return classes.filter(Boolean).join(' ');
	};
</script>

<Listbox bind:value on:change={(ev) => dispatch('change', ev.detail)} {disabled} class="relative">
	{#if label !== undefined}
		<ListboxLabel
			class={({ disabled }) =>
				classNames(
					disabled
						? 'text-gray-700 dark:text-core-grey-400'
						: 'text-gray-700 dark:text-core-grey-50',
					'block text-sm font-medium'
				)}
			>{label}
		</ListboxLabel>
	{/if}
	<div class="relative mt-1">
		<ListboxButton
			class={({ disabled }) =>
				classNames(
					disabled
						? 'bg-gray-200 dark:bg-core-grey-600 dark:text-core-grey-400'
						: 'bg-white dark:bg-core-grey-600 dark:text-core-grey-50',
					'relative w-full cursor-default border border-gray-300 dark:border-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-core-blue-500 focus:outline-none focus:ring-1 focus:ring-core-blue-500 sm:text-sm'
				)}
		>
			<span class="block truncate">
				{!(value === undefined || value === null) && !disabled && options.length > 0
					? options.filter((d) => d.id === value)[0]?.label
					: 'Select option'}
			</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<!-- ChevronUpDownIcon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					class="w-5 h-5 text-gray-400"
					><path
						fill-rule="evenodd"
						d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
		</ListboxButton>
	</div>
	<ListboxOptions
		class="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-core-grey-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
	>
		{#each options as option (option.id)}
			<ListboxOption
				value={option.id}
				class={({ active }) =>
					classNames(
						active ? 'text-white bg-core-blue-600' : 'text-gray-900 dark:text-core-grey-50',
						'relative cursor-default select-none py-2 pl-3 pr-9'
					)}
				let:selected
			>
				<!-- {#if selected}
					<span class={'absolute inset-y-0 right-0 flex items-center pr-4'}>
						<CheckIcon class="h-5 w-5" aria-hidden="true" />
					</span>
				{/if} -->
				<span class="block truncate">
					{option.label}
				</span>
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>
