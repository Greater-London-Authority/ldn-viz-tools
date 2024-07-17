<script lang="ts">
	import Button from '../button/Button.svelte';
	import Spinner from '../spinners/Spinner.svelte';

	export let onClick: (event: PointerEvent | TouchEvent) => void | Promise<unknwon>;
	export let working = false;

	const doClick = async (event) => {
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
	<div class="mx-12">
		<Spinner class="w-8 h-8 stroke-[20]" />
	</div>
{:else}
	<Button on:click={doClick} {...$$restProps}>
		<slot />
	</Button>
{/if}
