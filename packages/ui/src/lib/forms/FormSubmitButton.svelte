<script lang="ts">
	import { getContext } from 'svelte';
	import AsyncButton from './AsyncButton.svelte';
	import type {
		FormButtonhandler,
		FormValues,
		FormValueStore,
		FormErrorStore,
		FormActiveButtonStore
	} from './types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	export let onSubmit: FormButtonhandler;
	export let condition = 'default';
	export let disabled = false;
	export let working = false;

	const onClick: FormButtonhandler = async (event) => {
		event.preventDefault();

		if ($activeButtonStore) {
			return;
		}

		activeButtonStore.set('submit');
		return onSubmit(event);
	};

	$: if (!working && $activeButtonStore === 'submit') {
		activeButtonStore.set('');
	}
</script>

<AsyncButton
	disabled={disabled || $activeButtonStore}
	type="submit"
	variant="solid"
	{condition}
	class="ml-auto min-w-28 flex gap-2"
	{onClick}
	bind:working
>
	<slot>Submit</slot>
</AsyncButton>
