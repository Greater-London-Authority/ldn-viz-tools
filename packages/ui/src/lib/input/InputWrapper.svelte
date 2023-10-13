<script lang="ts">
	import { ArrowCircleDownIcon } from '@rgossiaux/svelte-heroicons/solid';
	export let label = '';
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';
	export let tooltip = '';

	export let hintText = '';
	export let hintLabel = 'what is this?';

	export let error = false;
	export let errorMessage = '';
	export let disabled = false;
	export let optional = false;

	// TOOD: hint below?
	// prefix and suffix slots

	export let id: string;

	//const id = crypto.randomUUID() ;
</script>

<label for={id}>
	{label}{#if optional} (optional){/if}
</label>

{#if hintText}
	<span title={hintText}>
		{hintLabel}
		<ArrowCircleDownIcon class="w-[18px] h-[18px]" />
	</span>
{/if}

<slot {id} />

{description}
