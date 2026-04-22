<script lang="ts">
	import Modal from '../../modal/Modal.svelte';
	import Trigger from '../../overlay/Trigger.svelte';

	interface Props {
		label: string;
		hint: string;
	}

	let { label = '', hint = '' }: Props = $props();
</script>

<Modal>
	{#snippet trigger(props)}
		<Trigger
			{...props}
			size="xs"
			hintLabel=""
			aria-label="Click for more information about {label} layer"
		/>
	{/snippet}

	{#snippet title()}
		About {label} layer
	{/snippet}

	{#snippet description()}
		More information about the {label} layer.
	{/snippet}

	{#if hint}
		<p class="mt-4">{hint}</p>
	{/if}
</Modal>
