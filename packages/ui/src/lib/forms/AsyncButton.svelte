<script lang="ts">
	import Button from '../button/Button.svelte';
	import Spinner from '../spinners/Spinner.svelte';
	import type { FormButtonhandler } from './types';

	export let onClick: FormButtonhandler;
	export let working = false;

	const doClick: FormButtonhandler = async (event) => {
		if (working) {
			return;
		}

		working = true;

		try {
			await onClick(event);
		} catch (err) {
			console.error(err);
		} finally {
			working = false;
		}
	};
</script>

{#if working}
	<div class="relative px-4 py-2">
		<Spinner
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-50 left-50 w-8 h-8 stroke-[20]"
		/>
		<!-- This gives the outer div the correct size so the spinner is centered -->
		<span class="invisible"><slot /></span>
	</div>
{:else}
	<Button on:click={doClick} {...$$restProps}>
		<slot />
	</Button>
{/if}
