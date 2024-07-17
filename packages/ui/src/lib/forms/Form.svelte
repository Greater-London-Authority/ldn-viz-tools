<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { FormValues, FormValueStore, FormErrorStore, FormActiveButtonStore } from './types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let initialValues: FormValues = {};

	export const valueStore: FormValueStore = writable(structuredClone(initialValues));
	export const errorStore: FormErrorStore = writable({});
	export const activeButtonStore: FormActiveButtonStore = writable('');

	setContext('formValueStore', valueStore);
	setContext('formErrorStore', errorStore);
	setContext('formActiveButtonStore', activeButtonStore);
</script>

<form {id} {name} class="w-full space-y-4" {...$$restProps}>
	<div class="flex flex-col gap-4">
		<slot />
	</div>

	{#if $$slots.buttons}
		<div class="w-full flex justify-between !mt-8">
			<slot name="buttons" />
		</div>
	{/if}
</form>
