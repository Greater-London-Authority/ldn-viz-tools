<script lang="ts">
  	import { ArrowCircleDownIcon } from '@rgossiaux/svelte-heroicons/solid';
	export let label = '';
	export let placeholder = ''; // type
	export let description = '';
	export let descriptionAlignment: 'left' | 'right' = 'left';
	export let tooltip = '';

	export let hintText = '';
    export let hintLabel = 'what is this?'; 

	export let error = false;
	export let errorMessage = '';
	export let disabled = false;
	export let optional = false;

	export let type = ''; // TODO: fix

	// TOOD: hint below?
	// prefix and suffix slots

	export let id: string;

	//const id = crypto.randomUUID() ;
</script>

<label for={id}>
	{label}
</label>

{#if hint}
{hintLabel} 
{/if}

<slot {id} />

{description}
