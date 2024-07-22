<script lang="ts">
	import { getContext } from 'svelte';
	import Button from '../../../button/Button.svelte';
	import AsyncButton from '../../AsyncButton.svelte';
	import type { FormButtonhandler, FormActiveButtonStore } from '../../types';

	const activeButtonStore: FormActiveButtonStore = getContext('formActiveButtonStore');

	export let onSubmit: FormButtonhandler;
	export let async = false;
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

{#if async}
	<AsyncButton
		disabled={$$props.disabled || $activeButtonStore}
		type="submit"
		variant="solid"
		class="flex gap-2"
		{onClick}
		bind:working
		{...$$restProps}
	>
		<slot>Submit</slot>
	</AsyncButton>
{:else}
	<Button
		disabled={$$props.disabled || $activeButtonStore}
		type="submit"
		variant="solid"
		on:click={onClick}
		{...$$restProps}
	>
		<slot>Submit</slot>
	</Button>
{/if}
