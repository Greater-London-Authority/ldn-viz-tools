<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type {
		FormValues,
		FormErrors,
		FormValueStore,
		FormErrorStore,
		FormHasErrors,
		FormActiveButtonStore
	} from './types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;

	export let initialValues: FormValues = {};
	export let initialErrors: FormErrors = {};

	export const valueStore: FormValueStore = writable(structuredClone(initialValues));
	export const errorStore: FormErrorStore = writable(structuredClone(initialErrors));
	export const activeButtonStore: FormActiveButtonStore = writable('');

	export const hasErrors: FormHasErrors = () => {
		return !!Object.values($errorStore).find((err) => !!err);
	};

	setContext('formValueStore', valueStore);
	setContext('formErrorStore', errorStore);
	setContext('formHasErrors', hasErrors);
	setContext('formActiveButtonStore', activeButtonStore);
</script>

<form {id} {name} class="w-full space-y-8" {...$$restProps}>
	{#if $$slots.default}
		<div class="flex flex-col gap-4">
			<slot />
		</div>
	{/if}

	{#if $$slots.leftButtons || $$slots.rightButtons}
		<div class="w-full flex justify-between">
			<slot name="leftButtons" />
			<div class="ml-auto">
				<slot name="rightButtons" />
			</div>
		</div>
	{/if}
</form>
